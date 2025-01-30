"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { Button } from "../primitives/button";

interface Review {
  id: number;
  author: string;
  location?: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    author: "Krisztián H.",
    location: "Bonn",
    rating: 5,
    date: "18.11.2024",
    text: "Schnelle Bearbeitung, schnelle Lieferung. Ich habe meine Bestellung in 1-2 Tagen erhalten. Danke!",
    verified: true,
  },
  {
    id: 2,
    author: "Michaela R.",
    location: "München",
    rating: 5,
    date: "11.05.2024",
    text: "Endlich muss ich nicht mehr alle diversen Dosen und Pillen mit mir herumschleppen wenn ich unterwegs bin und in der Küche daheim schaut es auch ordentlich aus!",
    verified: true,
  },
  {
    id: 3,
    author: "Anonym",
    rating: 4,
    date: "30.07.2024",
    text: "Was die Bestellung, die Zusendung, den Preis und das Design, sowie die Idee und die Abwicklung des Ganzen betrifft sehr gut - was die Wirkung der Produkte betrifft, kann ich noch keine Bewertung abgeben, da ich sie noch zu kurz konsumiere!",
    verified: true,
  },
  {
    id: 4,
    author: "Sophie K.",
    rating: 5,
    date: "21.10.2024",
    text: "Tolle Produkte und super Service. Die Lieferung kam schnell und die Qualität ist erstklassig.",
    verified: true,
  },
  {
    id: 5,
    author: "Michael B.",
    rating: 5,
    date: "02.11.2024",
    text: "Alles Bestens!",
    verified: true,
  },
];

export default function Reviews() {
  const averageRating = 4.73;
  const totalReviews = 231;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-medium mb-4">Bewertungen</h2>
      <div className="flex items-center gap-2 mb-8">
        <div className="flex">
          {[1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-6 h-6 fill-primary text-primary" />
          ))}
          <Star className="w-6 h-6 fill-primary/50 text-primary" />
        </div>
        <span className="font-medium">{averageRating}</span>
        <span className="text-gray-500">{totalReviews} reviews</span>
      </div>

      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div key={i} className="bg-[#FCFCF8] rounded-3xl border border-[#E2E1DC] p-6">
            <div className="flex mb-2">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="mb-4">{review.text}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.author}</span>
                {review.location && (
                  <span className="text-gray-500">({review.location})</span>
                )}
                {review.verified && (
                  <span className="text-gray-500">Verifizierter Käufer/in</span>
                )}
              </div>
              <Image
                src="/images/trusted-shops.png"
                alt="Trusted Shops"
                width={100}
                height={24}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center w-fit mx-auto mt-8">
        <Button
          onClick={() =>
            window.open(
              "https://www.trustedshops.de/bewertung/info_X74130EC45B7127CCB2895DC010B38040.html",
              "_blank",
            )
          }
          size="pill-xl"
          className="w-full lg:w-aut mb-8">
          Mehr Bewertungen anzeigen
        </Button>
      </div>
    </div>
  );
}
