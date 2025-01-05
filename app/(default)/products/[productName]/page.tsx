import { getAllProducts } from "@/api/fetch";
import FreeShippingPill from "@/components/custom/free-shipping-pill";
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

          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-full mb-2"></div>
              <span className="text-sm">Vegan</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-full mb-2"></div>
              <span className="text-sm">Lactose-free</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-full mb-2"></div>
              <span className="text-sm">Gluten-free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
