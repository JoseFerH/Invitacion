"use client";

import { useState, useRef, useTransition, use } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth, useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { signInAnonymously } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({...prev, name: e.target.value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState(prev => ({...prev, attendees: value }));
  }

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
      if (!firestore || !auth) {
        toast({ title: "Error", description: "Los servicios de Firebase no están disponibles.", variant: "destructive" });
        return;
      }
      
      try {
        // 1. Ensure user is authenticated (anonymously)
        if (!auth.currentUser) {
          await signInAnonymously(auth);
        }

        // We need to wait for the user object to be available
        const user = auth.currentUser;
        if (!user) {
          toast({ title: "Error de autenticación", description: "No se pudo autenticar. Intenta de nuevo.", variant: "destructive" });
          return;
        }

        const guestData = {
          name: validatedFields.data.name,
          attendees: validatedFields.data.attendees,
          createdAt: serverTimestamp(), // Use server timestamp for consistency
        };
        
        // Use the user's UID as the document ID for the guest
        const guestDocRef = doc(firestore, 'guests', user.uid);

        // 2. Save data to Firestore using setDoc to control the ID.
        // The .catch block will handle permission errors.
        setDoc(guestDocRef, guestData)
          .then(() => {
            // 3. Show success and reset form
            toast({
              title: "¡Confirmación Exitosa!",
              description: `¡Gracias por confirmar, ${validatedFields.data.name}! Tu asistencia ha sido registrada.`,
            });
            // Store guestId in local storage to be used by song suggestions
            localStorage.setItem('guestId', user.uid);
            formRef.current?.reset();
            setFormState({ name: '', attendees: '1' });
          })
          .catch((serverError) => { // This will catch network errors or permission errors
             const permissionError = new FirestorePermissionError({
              path: guestDocRef.path,
              operation: 'create', // or 'update' if overwriting is a concern
              requestResourceData: guestData,
            });
            errorEmitter.emit('permission-error', permissionError); // Throws the contextual error for debugging
          });

      } catch (error) {
           console.error('RSVP submission failed:', error);
           toast({
              title: "Error Inesperado",
              description: "Ocurrió un error al procesar tu confirmación. Revisa tu conexión y vuelve a intentarlo.",
              variant: "destructive",
          });
      }
    });
  };

  return (
    <section className="py-8">
      <SectionTitle>Confirmar Asistencia</SectionTitle>
      <form ref={formRef} onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 mt-8 p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-accent/20 shadow-xl">
        <p className='text-sm text-foreground/70 text-left -mb-2'>Confirma tu asistencia para poder sugerir canciones.</p>
        <div className="space-y-2 text-left font-body">
          <Label htmlFor="name" className="text-primary font-semibold">Nombre completo del invitado principal</Label>
          <Input
            id="name"
            name="name"
            placeholder="Ej. Gabriela Alvarado"
            onChange={handleInputChange}
            value={formState.name}
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
           <Select name="attendees" value={formState.attendees} onValueChange={handleSelectChange}>
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
