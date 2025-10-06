"use client";

import { useState, useRef, useTransition } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth, useFirestore } from '@/firebase';
import { signInAnonymously } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { SectionTitle } from "./SectionTitle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Loader2 } from 'lucide-react';
import { z } from 'zod';

const RsvpSchema = z.object({
  name: z.string().min(2, { message: 'Tu nombre es requerido.' }),
  attendees: z.coerce.number().min(1, { message: 'Debes seleccionar al menos un asistente.' }),
});

type RsvpFormState = {
  name: string;
  attendees: string;
};

export function RsvpForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, startSubmitTransition] = useTransition();

  const firestore = useFirestore();
  const auth = useAuth();
  
  const [formState, setFormState] = useState<RsvpFormState>({ name: '', attendees: '1' });
  const [errors, setErrors] = useState<{ name?: string[]; attendees?: string[] } | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const validatedFields = RsvpSchema.safeParse({
      name: formState.name,
      attendees: formState.attendees,
    });

    if (!validatedFields.success) {
      setErrors(validatedFields.error.flatten().fieldErrors);
      return;
    }
    
    setErrors(null);

    startSubmitTransition(async () => {
      try {
        // 1. Ensure user is authenticated (anonymously)
        let currentUser = auth.currentUser;
        if (!currentUser) {
          const userCredential = await signInAnonymously(auth);
          currentUser = userCredential.user;
        }

        // 2. Save data to Firestore
        const guestsCollection = collection(firestore, 'guests');
        await addDoc(guestsCollection, {
          name: validatedFields.data.name,
          attendees: validatedFields.data.attendees,
          createdAt: new Date(),
        });
        
        // 3. Show success and reset form
        toast({
          title: "¡Confirmación Exitosa!",
          description: `¡Gracias por confirmar, ${validatedFields.data.name}! Tu asistencia ha sido registrada.`,
        });
        formRef.current?.reset();
        setFormState({ name: '', attendees: '1' });

      } catch (error) {
        console.error('Error submitting RSVP to Firestore:', error);
        toast({
          title: "Error en la Confirmación",
          description: "Ocurrió un error al registrar tu asistencia. Por favor, intenta de nuevo.",
          variant: "destructive",
        });
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({...prev, name: e.target.value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState(prev => ({...prev, attendees: value }));
  }

  return (
    <section className="py-8">
      <SectionTitle>Confirmar Asistencia</SectionTitle>
      <form ref={formRef} onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 mt-8 p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-accent/20 shadow-xl">
        <div className="space-y-2 text-left font-body">
          <Label htmlFor="name" className="text-primary font-semibold">Nombre completo del invitado principal</Label>
          <Input
            id="name"
            name="name"
            placeholder="Ej. Gabriela Alvarado"
            onChange={handleInputChange}
            aria-invalid={!!errors?.name}
            aria-describedby="name-error"
            className="bg-background/80"
          />
          {errors?.name && (
            <p id="name-error" className="text-sm text-destructive">{errors.name.join(', ')}</p>
          )}
        </div>
        <div className="space-y-2 text-left font-body">
          <Label htmlFor="attendees" className="text-primary font-semibold">Número de asistentes (incluyéndote)</Label>
           <Select name="attendees" defaultValue="1" onValueChange={handleSelectChange}>
            <SelectTrigger id="attendees" aria-invalid={!!errors?.attendees} aria-describedby="attendees-error" className="bg-background/80">
              <SelectValue placeholder="Selecciona el número de personas" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                <SelectItem key={num} value={String(num)}>{num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
           {errors?.attendees && (
            <p id="attendees-error" className="text-sm text-destructive">{errors.attendees.join(', ')}</p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          {isSubmitting ? 'Enviando...' : 'Confirmar Asistencia'}
        </Button>
      </form>
    </section>
  );
}
