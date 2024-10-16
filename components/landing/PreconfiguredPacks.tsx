import { getThemenpacksWithIngredients } from "@/api/fetch";
import PacksContent from "./PacksContent";

export default async function PreconfiguredPacks() {
  const themenpacks = await getThemenpacksWithIngredients();

  return (
    <div className="p-6 md:p-12 z-10 bg-white shadow-xl rounded-[32px] border border-[#E7E9D8] space-y-8 max-w-[1200px] mx-auto">
      <div className="bg-primaryBackground px-3 py-1 rounded-full inline-flex text-center">
        <p className="text-primary font-medium whitespace-normal">
          Oder doch einfach schnell ausprobieren?
        </p>
      </div>
      <h1 className="text-4xl font-semibold w-full lg:w-2/3 text-primary">
        Für bestimmte Ziele haben wir uns&shy; um die Kombination gekümmert
      </h1>
      <PacksContent themenpacks={themenpacks} />
    </div>
  );
}
