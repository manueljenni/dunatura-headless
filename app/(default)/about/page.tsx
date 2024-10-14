import RoundedContainer from "@/components/custom/RoundedContainer";
import { Button } from "@/components/primitives/button";

export default function page() {
  return (
    <RoundedContainer>
      <div className="w-full h-full max-w-6xl space-y-6 mx-auto pb-12 pt-6 px-4">
        <h1 className="text-4xl font-medium text-primary">Über uns</h1>
        <div className="flex flex-col gap-6">
          <div className="space-y-8 text-primary text-base font-medium">
            <div>
              Jedes unserer Produkte wird mit größter Sorgfalt von unseren Experten in
              Mikronährstoffen und Ernährungswissenschaften entwickelt. Wir vermeiden
              unnötige Zusatzstoffe und verwenden nur die besten Rohstoffe. Garantiert und
              kontinuierlich in der Labor überprüft.
            </div>
            <div>
              Wir verpacken alle unsere Bestellungen in unserem lokalen Lager in München,
              um sicherzustellen, dass alles die höchste Qualität hat.
            </div>
            <div className="space-y-4">
              <div>Mit Liebe, dein dunatura Team</div>
              {/* <Image src={signature} alt="signature" className="w-full pb-4" /> */}
            </div>
            <Button variant={"pill"}>Unsere Produkte</Button>
          </div>
        </div>
      </div>
    </RoundedContainer>
  );
}
