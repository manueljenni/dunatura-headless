import checkmark from "@/public/images/icons/checkmark.svg";
import Image from "next/image";

export default function Testimonial({
  index,
  currentIndex,
  testimonial,
}: {
  index: number;
  currentIndex: number;
  testimonial: {
    text: string;
    author: string;
    className: string;
  };
}) {
  return (
    <div
      key={index}
      className={`testimonial flex-shrink-0 lg:flex-shrink lg:w-1/3 w-full ${
        index !== currentIndex ? "hidden lg:block" : ""
      }`}>
      <div
        className={`relative rounded-xl border p-4 text-left lg:text-left lg:text-[#807A78] min-h-[350px] flex flex-col justify-between h-full  ${testimonial.className}`}>
        <p className="text-3xl flex-grow">{testimonial.text}</p>
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full text-[#807A78] text-lg">
          <p className="font-medium w-full">{testimonial.author}</p>
          <div className="flex items-center space-x-4 w-full">
            <Image
              src={checkmark}
              alt="checkmark"
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <span>Verifizierte Bewertung</span>
          </div>
        </div>
      </div>
    </div>
  );
}
