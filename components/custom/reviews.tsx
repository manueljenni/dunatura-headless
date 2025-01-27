import { Star } from "lucide-react";
import Image from "next/image";

interface Review {
  rating: number;
  text: string;
  author: string;
}

const reviews: Review[] = [
  {
    rating: 5,
    text: "Das Spray ist einfach in der Anwendung und schmeckt sehr neutral. Es ist wirklich perfekt zu dosieren. Ein Gamechanger!",
    author: "Laura",
  },
  {
    rating: 5,
    text: "Sehr angenehm einzunehmen und die Wirkung ist spürbar. Ich bin begeistert!",
    author: "Michael",
  },
  {
    rating: 5,
    text: "Endlich eine praktische Lösung für die tägliche Nährstoffversorgung. Toll!",
    author: "Sophie",
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
                <span className="text-gray-500">Verified buyer</span>
              </div>
              <Image
                src="/images/trusted-shops.svg"
                alt="Trusted Shops"
                width={100}
                height={24}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="mx-auto mt-8 block px-6 py-2 rounded-full border border-[#E2E1DC] hover:bg-[#FCFCF8]">
        Mehr Bewertungen anzeigen
      </button>
    </div>
  );
}
