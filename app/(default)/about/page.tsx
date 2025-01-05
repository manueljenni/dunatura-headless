import RoundedContainer from "@/components/custom/RoundedContainer";
import { Button } from "@/components/primitives/button";
import signature from "@/public/images/landing/signatures.png";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="max-w-3xl mx-auto pt-6 pb-12">
      <RoundedContainer title="Über uns">
        <div className="flex flex-col gap-6">
          <div className="space-y-8 text-primary text-base font-medium">
            <div>
              Jedes unserer Produkte wird mit größter Sorgfalt von unseren Experten in
              Mikronährstoffen und Ernährungswissenschaften entwickelt. Wir vermeiden
              unnötige Zusatzstoffe und verwenden nur die besten Rohstoffe. Garantiert und
              kontinuierlich in der Labor überprüft.
            </div>
            <div>
              Wir verpacken alle unsere Bestellungen in unserem lokalen Standort in
              München, um sicherzustellen, dass alles die höchste Qualität hat.
            </div>
            <div>
              Hast du Anregungen oder Wünsche? Schreibe uns an{" "}
              <Link
                href="mailto:hello@dunatura.com"
                className="underline underline-offset-4">
                {/* TODO: Fix mailto link */}
                hello@dunatura.com
              </Link>
              !
            </div>
            <div className="space-y-4">
              <div>Mit Liebe, dein dunatura Team</div>
              <Image src={signature} alt="signature" className="w-full max-w-[400px]" />
            </div>
            <Button variant={"pill"}>Unsere Produkte</Button>
          </div>
        </div>
      </RoundedContainer>
    </div>
  );
}
