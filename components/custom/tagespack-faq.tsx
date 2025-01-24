import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/primitives/accordion";

export default function TagespackFAQ() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl text-primary font-medium mb-8">
            Deine Fragen
            <br />
            beantwortet.
          </h2>
        </div>

        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Wie nehme ich die Tagespacks am besten ein?
              </AccordionTrigger>
              <AccordionContent>
                Die praktischen vorportionierten Tagespacks kannst du einnehmen, wann und
                wo du möchtest. Am besten nimmst du die Kapseln und Tabletten nacheinander
                mit reichlich Flüssigkeit und einem leckeren Getränk ein. Und nicht
                vergessen, vorher oder währenddessen eine Kleinigkeit zu essen. So werden
                die konzentrierten Mikronährstoffe am besten aufgenommen. Wir empfehlen
                die Einnahme zum Frühstück oder Mittagessen. Du kannst die Kapseln
                natürlich auch auf beide Mahlzeiten aufteilen.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                Wann ist der ideale Zeitpunkt für die Einnahme?
              </AccordionTrigger>
              <AccordionContent>
                Der beste Zeitpunkt für die Einnahme ist zu einer Hauptmahlzeit,
                vorzugsweise zum Frühstück oder Mittagessen. Die Nährstoffe werden
                zusammen mit der Mahlzeit optimal aufgenommen und verwertet. Vermeide die
                Einnahme auf nüchternen Magen.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                Sind die Tagespacks auch für Kinder geeignet?
              </AccordionTrigger>
              <AccordionContent>
                Unsere Tagespacks sind für Erwachsene und Jugendliche ab 16 Jahren
                konzipiert. Für Kinder empfehlen wir eine altersgerechte
                Nährstoffversorgung in Absprache mit einem Kinderarzt.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                Soll ich die Mikronährstoffe täglich einnehmen?
              </AccordionTrigger>
              <AccordionContent>
                Ja, für optimale Ergebnisse empfehlen wir die tägliche Einnahme. Die
                Mikronährstoffe unterstützen deinen Körper am besten bei regelmäßiger
                Versorgung. Eine Pause ist nicht notwendig, da alle Inhaltsstoffe sehr gut
                verträglich sind.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                Kann ich mehrere Tagespacks gleichzeitig einnehmen?
              </AccordionTrigger>
              <AccordionContent>
                Wir empfehlen nicht, mehrere Tagespacks gleichzeitig einzunehmen. Jedes
                Tagespack ist bereits optimal dosiert und enthält alle wichtigen
                Nährstoffe in der richtigen Menge. Eine Kombination könnte zu einer
                Überversorgung führen.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>
                Kann ich die Tagespacks mit verschreibungspflichtigen Medikamenten
                kombinieren?
              </AccordionTrigger>
              <AccordionContent>
                Bei der Einnahme von Medikamenten empfehlen wir, die Kombination mit den
                Tagespacks vorab mit deinem behandelnden Arzt zu besprechen. Generell
                sollte zwischen der Einnahme von Medikamenten und
                Nahrungsergänzungsmitteln ein zeitlicher Abstand von mindestens 2-3
                Stunden eingehalten werden.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
