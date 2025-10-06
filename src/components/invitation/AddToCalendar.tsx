
"use client";

import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";

export function AddToCalendar() {
  const handleAddToCalendar = () => {
    const event = {
      title: "Graduación de Gabriela Alvarado",
      description: "¡Acompáñame a celebrar! Será una noche especial, donde cada sonrisa será parte del diseño de un recuerdo inolvidable.",
      location: "Hotel Tikal Futura, Salón Menta, Guatemala",
      // Guatemala is UTC-6. We won't handle daylight saving for simplicity.
      // Event: Nov 8, 2025, 7:30 PM (19:30)
      // Start in UTC: Nov 9, 2025, 1:30 AM (01:30)
      startTime: new Date("2025-11-09T01:30:00.000Z"),
      // Let's assume the party lasts 5 hours.
      // End in UTC: Nov 9, 2025, 6:30 AM (06:30)
      endTime: new Date("2025-11-09T06:30:00.000Z"),
    };

    // Format dates for Google Calendar URL (YYYYMMDDTHHMMSSZ)
    const formatGoogleDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, "");
    };

    const googleCalendarUrl = new URL("https://www.google.com/calendar/render");
    googleCalendarUrl.searchParams.append("action", "TEMPLATE");
    googleCalendarUrl.searchParams.append("text", event.title);
    googleCalendarUrl.searchParams.append("dates", `${formatGoogleDate(event.startTime)}/${formatGoogleDate(event.endTime)}`);
    googleCalendarUrl.searchParams.append("details", event.description);
    googleCalendarUrl.searchParams.append("location", event.location);

    window.open(googleCalendarUrl.toString(), "_blank");
  };

  return (
    <div className="-mt-8 text-center">
      <Button 
        variant="outline"
        onClick={handleAddToCalendar}
        className="bg-card/50 backdrop-blur-sm border-primary/20 hover:bg-accent/20 hover:text-accent-foreground shadow-lg"
      >
        <CalendarPlus className="mr-2 h-4 w-4" />
        Añadir al Calendario
      </Button>
    </div>
  );
}
