import { vitamins } from "@/app/questionnaire/types";
import RoundedContainer from "@/components/custom/RoundedContainer";

export default async function page() {
  const allVitamins = Object.values(vitamins);

  return (
    <RoundedContainer title="Rohstoffe">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allVitamins?.map((vitamin) => (
          <div
            key={vitamin.id}
            className="relative p-6 rounded-3xl bg-[#FCFCF8] ring-1 ring-[#E2E1DC]">
            <div className="flex flex-col items-center text-center">
              <img src={vitamin.getImageSrc()} />
              <h3 className="font-medium text-xl mb-6">{vitamin.name}</h3>
              <p>{vitamin.getImageSrc()}</p>
            </div>
          </div>
        ))}
      </div>
    </RoundedContainer>
  );
}
