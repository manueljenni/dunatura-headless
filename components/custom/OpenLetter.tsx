import { Button } from "@/components/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/primitives/dialog";
import heart from "@/public/images/icons/heart.svg";
import signature from "@/public/images/landing/signatures.png";
import Image from "next/image";
import Link from "next/link";

export default function OpenLetter() {
  return (
    <div className="flex items-start md:items-center flex-col md:flex-row justify-between w-full max-w-2xl space-y-2 md:space-y-0 md:space-x-4 bg-white rounded-3xl px-6 py-3 shadow-lg border">
      <div className="flex items-center space-x-4">
        <Image src={heart} alt="heart" width={24} height={24} />
        <span className="text-lg font-medium">Mehr über unsere Mission erfahren</span>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"pillSecondary"}>Lese unseren Brief →</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] md:max-w-none overflow-y-auto max-w-[95vw] md:max-w-[85vw] px-4 md:px-6 rounded-xl md:rounded-none">
          <DialogHeader>
            <DialogTitle>Unser offener Brief: an Dich</DialogTitle>
            <DialogDescription>
              <div className="space-y-8 text-primary text-base font-medium">
                <div>
                  Jedes unserer Produkte wird mit größter Sorgfalt von unseren Experten in
                  Mikronährstoffen und Ernährungswissenschaften entwickelt. Wir vermeiden
                  unnötige Zusatzstoffe und verwenden nur die besten Rohstoffe. Garantiert
                  und kontinuierlich in der Labor überprüft.
                </div>
                <div>
                  Wir verpacken alle unsere Bestellungen in unserem lokalen Lager in
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
                  <Image src={signature} alt="signature" className="w-full pb-4" />
                </div>
                <Button variant={"pill"}>Erfahre mehr über uns</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
