import { getAllProducts } from "@/api/fetch";
import AddToCartButton from "@/components/custom/button/AddToCartButton";
import Image from "next/image";

export default async function page() {
  const products = await getAllProducts();

  return (
    <main
      className="flex min-h-screen flex-col items-center p-8 
    mx-auto">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg p-6 shadow-md flex flex-col h-full">
            <div className="w-full aspect-square mb-4 flex items-center justify-center">
              <Image
                src={product.images.edges[0]?.node.originalSrc}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
                width={400}
                height={400}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 h-14 overflow-hidden">
              {product.title}
            </h2>
            <p className="text-sm text-gray-600 mb-2">28 Beutel = 4 Wochen</p>
            <div className="flex justify-between items-center mt-auto">
              <div>
                <p className="text-2xl font-bold">
                  €{product.priceRange.minVariantPrice.amount}
                </p>
                <span className="text-sm text-gray-600">
                  (€{(product.priceRange.minVariantPrice.amount / 100).toFixed(2)} / 100g)
                </span>
              </div>
              <AddToCartButton variantId={product.variants.edges[0]?.node.id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
