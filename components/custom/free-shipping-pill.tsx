import truck from "@/public/images/icons/truck.svg";
import Image from "next/image";

export default function FreeShippingPill(props: {}) {
  return (
    <div className="flex justify-center w-full">
      <div className="w-fit py-2 px-4 text-center text-sm mb-8 rounded-full text-primary font-medium bg-[#E8E7DE]">
        <div className="flex items-center gap-2 bg-[#E8E7DE]">
          <Image src={truck} alt="Truck" width={20} height={20} />
          <p>Kostenloser Versand, innerhalb von 2 Tagen versandt</p>
        </div>
      </div>
    </div>
  );
}
