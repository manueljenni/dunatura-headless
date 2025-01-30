import { getAllProducts } from "@/api/fetch";
import { vitamins } from "@/app/questionnaire/types";
import AddToCartButton from "@/components/custom/button/AddToCartButton";
import FreeShippingPill from "@/components/custom/free-shipping-pill";
import Reviews from "@/components/custom/reviews";
import TagespackFAQ from "@/components/custom/tagespack-faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/primitives/accordion";
import { Leaf, MilkOff, Star, Wheat } from "lucide-react";
import { notFound } from "next/navigation";

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

  const getVitaminByName = (name: string) => {
    return Object.values(vitamins).find((v) => v.name.startsWith(name));
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="w-full mx-auto">
        <FreeShippingPill />
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between gap-8">
        <div className="w-full md:w-1/2">
          <img
            src={product.images.edges[0]?.node.originalSrc}
            alt={product.title}
            className="w-full rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-medium mb-2">{product.title}</h1>

          <p className="mb-4 text-secondary flex items-center gap-1">
            <div className="flex text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current/50" />
            </div>
            4,72 Sehr gut
          </p>

          <p className="text-gray-600 mb-8">{product.description.slice(0, 200)}</p>

          <AddToCartButton
            variantId={product.variants.edges[0].node.id}
            title={product.title}
            image={product.images.edges[0]?.node.originalSrc}
            price={product.price}
            showSubscriptionOptions={false}
            variant="pill"
            size="pill-2xl"
            className="w-full"
          />

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

      <div className="mt-16 max-w-lg mx-auto">
        <h2 className="text-3xl font-medium mb-6 text-primary text-center">
          Was ist drin?
        </h2>
        <div className="bg-[#FCFCF8] rounded-3xl border border-[#E2E1DC] p-6">
          {product.ingredients.length > 0 ? (
            product.ingredients.map((ingredient: any) => {
              const vitamin = getVitaminByName(ingredient.title);
              return (
                <div
                  key={ingredient.shopifyId}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <img
                      src={vitamin?.getImageSrc() || ingredient.image}
                      alt={vitamin?.name || ingredient.title}
                      className="w-10 h-10 object-contain"
                    />
                    <div>
                      <p className="font-medium text-xl font-primary font-denimink">
                        {vitamin?.name || ingredient.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {vitamin?.effects?.map((effect) => effect.text).join(", ") || ""}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={product.images.edges[0]?.node.originalSrc}
                alt={product.title}
                className="w-48 h-48 object-contain"
              />
              <p className="mt-4 text-xl font-medium text-primary font-denimink">
                {product.title}
              </p>
            </div>
          )}
        </div>
      </div>

      <TagespackFAQ />
      <Reviews />
    </div>
  );
}
