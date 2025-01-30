import { getAllVitamins } from "@/api/fetch";

export default async function page() {
  const vitamins = await getAllVitamins();

  return (
    <div>
      <pre>{JSON.stringify(vitamins, null, 2)}</pre>
    </div>
  );
}
