import { getAllProducts } from "@/api/fetch";
import AddToCartButton from "@/components/custom/button/AddToCartButton";
import Image from "next/image";
import Link from "next/link";

export default async function page() {
  const products = await getAllProducts();

  return (
    <main
      className="flex min-h-screen flex-col items-center p-8 
    mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link href={`/products/${product.handle}`} key={product.id} className="h-full">
            <div className="w-full h-full rounded-2xl bg-[#FBFCF8] p-6 border border-[#E5E9E6] hover:border-primary/20 transition-colors flex flex-col justify-end">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-primary">{product.title}</h2>
                <div className="py-8">
                  <div className="relative h-[200px] w-full">
                    <Image
                      src={
                        product.metafield?.reference?.image?.originalSrc ||
                        product.images.edges[0]?.node.originalSrc
                      }
                      alt={product.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-auto flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    €
                    {Number(product.priceRange.minVariantPrice.amount).toLocaleString(
                      "de-DE",
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 },
                    )}
                  </p>
                  <span className="text-sm text-primary">
                    (€
                    {(
                      Number(product.priceRange.minVariantPrice.amount) / 100
                    ).toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    / 100g)
                  </span>
                </div>
                <AddToCartButton
                  variantId={product.variants.edges[0]?.node.id}
                  variant="pill"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
