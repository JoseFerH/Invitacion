"use client";

import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from "@/hooks/use-toast";
import { submitRsvp, type RsvpState } from '@/app/actions';
import { SectionTitle } from "./SectionTitle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
      {pending ? 'Enviando...' : 'Confirmar Asistencia'}
      {!pending && <Send className="ml-2 h-4 w-4" />}
    </Button>
  );
}

export function RsvpForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState: RsvpState = { message: '', errors: {}, success: false };
  const [state, dispatch] = useActionState(submitRsvp, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "¡Confirmación Exitosa!",
          description: state.message,
        });
        formRef.current?.reset();
      } else {
        const description = state.errors 
          ? Object.values(state.errors).flat().join(' ') 
          : state.message;
        toast({
          title: "Error en la Confirmación",
          description: description,
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  return (
    <section className="py-8">
      <SectionTitle>Confirmar Asistencia</SectionTitle>
      <form ref={formRef} action={dispatch} className="max-w-md mx-auto space-y-6 mt-8 p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-accent/20 shadow-xl">
        <div className="space-y-2 text-left font-body">
          <Label htmlFor="name" className="text-primary font-semibold">Nombre completo del invitado principal</Label>
          <Input
            id="name"
            name="name"
            placeholder="Ej. Gabriela Alvarado"
            aria-invalid={!!state.errors?.name}
            aria-describedby="name-error"
            className="bg-background/80"
          />
          {state.errors?.name && (
            <p id="name-error" className="text-sm text-destructive">{state.errors.name.join(', ')}</p>
          )}
        </div>
        <div className="space-y-2 text-left font-body">
          <Label htmlFor="attendees" className="text-primary font-semibold">Número de asistentes (incluyéndote)</Label>
           <Select name="attendees" defaultValue="1">
            <SelectTrigger id="attendees" aria-invalid={!!state.errors?.attendees} aria-describedby="attendees-error" className="bg-background/80">
              <SelectValue placeholder="Selecciona el número de personas" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                <SelectItem key={num} value={String(num)}>{num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
           {state.errors?.attendees && (
            <p id="attendees-error" className="text-sm text-destructive">{state.errors.attendees.join(', ')}</p>
          )}
        </div>
        <SubmitButton />
      </form>
    </section>
  );
}
