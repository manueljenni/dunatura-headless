import { getAllProducts } from "@/api/fetch";
import FreeShippingPill from "@/components/custom/free-shipping-pill";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/primitives/accordion";
import { Leaf, MilkOff, Wheat } from "lucide-react";
import { notFound } from "next/navigation";
import PlanSelector from "./PlanSelector";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    productName: product.handle,
  }));
}

export default async function ProductPage({
  params: { productName },
}: {
  params: { productName: string };
}) {
  const products = await getAllProducts();
  const product = products.find((p) => p.handle === productName);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="w-full mx-auto">
        <FreeShippingPill />
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between gap-8">
        <div className="w-full md:w-1/2">
          <img
            src={
              product.metafield?.reference?.image?.originalSrc ||
              product.images.edges[0]?.node.originalSrc
            }
            alt={product.title}
            className="w-full rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-medium mb-2">{product.title}</h1>

          <p className="mb-4 text-secondary">11'234+ mal bestellt</p>

          <p className="text-gray-600 mb-8">{product.description.slice(0, 200)}</p>

          <PlanSelector variantId={product.variants.edges[0].node.id} />

          <div className="flex justify-center items-center gap-8 mt-8">
            <div className="text-center flex flex-col items-center">
              <div className="w-12 h-12 border border-neutral-300 rounded-full mb-2 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm">Vegan</span>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-12 h-12 border border-neutral-300 rounded-full mb-2 flex items-center justify-center">
                <MilkOff className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm">Laktosefrei</span>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="w-12 h-12 border border-neutral-300 rounded-full mb-2 flex items-center justify-center">
                <Wheat className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm">Glutenfrei</span>
            </div>
          </div>

          <div className="mt-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Konsumation</AccordionTrigger>
                <AccordionContent>
                  Mit einem Glas Wasser und ohne Kauen einnehmen, nicht auf leeren Magen.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Aufbewahrung</AccordionTrigger>
                <AccordionContent>
                  Bei Raumtemperatur und trocken aufbewahren.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-medium mb-6 text-primary text-center">
          Was ist drin?
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {/* {product.metafield?.reference?.ingredients.map((ingredient) => (
                <div className="flex flex-col items-center">
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="w-12 h-12"
                  />
                  <span className="text-sm">{ingredient.name}</span>
                </div>
              ))} */}
        </div>
      </div>
    </div>
  );
}
