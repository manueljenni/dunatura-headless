import { vitaminsArray } from "@/app/questionnaire/types";
import RoundedContainer from "@/components/custom/RoundedContainer";
import pillOmega from "@/public/images/pills/pill-yellow.png";
import Image from "next/image";

export default function page() {
  return (
    <RoundedContainer title="Erstelle deine eigene Kombination">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {vitaminsArray.map((vitamin) => {
          return (
            <div className="bg-[#FCFCF8] p-6 rounded-4xl border text-left border-[#E2E1DC]">
              <div className="flex justify-center flex-col items-center h-full">
                <p className="text-primary w-full font-medium text-2xl">{vitamin.name}</p>
                <Image
                  src={pillOmega}
                  alt="pill"
                  className="h-full w-1/2 max-w-[80px] object-contain py-8"
                />
                <div className="space-y-2 w-full">
                  <div>
                    <p className="text-primary w-full font-medium text-sm">€1/Tag</p>
                    <p className="text-neutral-400 w-full font-medium text-sm">
                      €12.90/Monat
                    </p>
                  </div>
                  <div className="flex w-full gap-2">
                    <div className="bg-primary text-white px-6 py-2 rounded-full text-center w-2/3 font-medium border">
                      +
                    </div>
                    <div className="bg-[#E8E7DE] text-primary px-6 py-2 rounded-full text-center w-1/3 font-medium">
                      -
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </RoundedContainer>
  );
}
