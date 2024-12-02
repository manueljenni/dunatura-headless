import { getAllProducts } from "@/api/fetch";
import { notFound } from "next/navigation";

type Product = {
  handle: string;
  title: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: number;
  subscriptionPrice: number;
  features: string[];
};

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
    <div className="container mx-auto px-4">
      <div className="w-fit mx-auto py-2 px-4 text-center text-sm mb-8 rounded-full text-primary font-medium bg-[#E8E7DE]">
        Kostenloser Versand, innerhalb von 2 Tagen versendet
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.images.edges[0].node.originalSrc}
            alt={product.title}
            className="w-full rounded-lg"
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-4xl font-medium mb-2">{product.title}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < Math.floor(5) ? "text-black" : "text-gray-300"}>
                  ★
                </span>
              ))}
            </div>
            <span className="font-medium">5</span>
            <span className="text-gray-500">10 reviews</span>
          </div>

          <p className="text-gray-600 mb-8">{product.description}</p>

          <div className="space-y-4">
            <label className="block">
              <input type="radio" name="purchase-type" className="mr-2" />
              <span>One-time purchase</span>
              <span className="float-right">
                €{product.priceRange.minVariantPrice.amount}
              </span>
            </label>

            <div className="border rounded-lg p-4 bg-white">
              <label className="flex justify-between">
                <div>
                  <input
                    type="radio"
                    name="purchase-type"
                    className="mr-2"
                    defaultChecked
                  />
                  <span>1 month - Flexible Routine</span>
                  <div className="ml-6 text-sm text-gray-500">28 packs, €1/day</div>
                </div>
                <div className="text-right">
                  <div>€{product.priceRange.minVariantPrice.amount}/mo</div>
                  <div className="text-sm text-gray-500">Save €8/mo</div>
                </div>
              </label>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-black text-white px-2 py-1 rounded-full text-xs">
                    Most popular
                  </span>
                  <span>Reschedule or cancel anytime</span>
                </div>
                <div>✓ Delivered every 28 days</div>
                <div>✓ Free shipping</div>
                <div>✓ Subscriber benefits</div>
              </div>
            </div>

            <button className="w-full bg-green-950 text-white py-3 rounded-lg hover:bg-green-900">
              Add to cart
            </button>
          </div>

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
