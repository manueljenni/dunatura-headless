import { getAllProducts } from "@/api/fetch";
import { Button } from "@/components/primitives/button";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getAllProducts();
  const featuredProducts = products.slice(0, 2);

  return (
    <>
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h1 className="text-5xl font-medium mb-8">
                Fühl dich bestens,
                <br />
                jeden einzelnen Tag.
              </h1>
              <p className="text-xl mb-8">
                Dein Körper ist einzigartig —<br />
                deine Vitamine sollten es auch sein.
              </p>
              <Button asChild variant="pillSecondary" size="pill-xl">
                <Link href="/questionnaire">Zum Selbsttest →</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/products/hero.png"
                alt="Tagespacks Vegan Complete"
                className="h-full w-full object-contain rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Type Navigation */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Tagespacks", "Bottles", "Oral spray", "Cans", "Tea mixes"].map((type) => (
              <Link
                href={`/products/${type.toLowerCase()}`}
                key={type}
                className="text-center">
                <div className="bg-[#E7E7DE] p-4 space-y-6 aspect-square rounded-3xl">
                  <img
                    src={`/images/product-types/${type.toLowerCase().replace(/\s+/g, "-")}.png`}
                    alt={type}
                    className="w-full"
                  />
                  <p className="text-primary text-lg font-medium">{type}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {/* <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="bg-white p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className={index === 0 ? "text-blue-600" : "text-yellow-600"}>
                    {index === 0 ? "NEW" : "TOP RATED"}
                  </span>
                </div>
                <img
                  src={product.images.edges[0]?.node.originalSrc}
                  alt={product.title}
                  className="w-full mb-4"
                />
                <h3 className="text-lg font-medium mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">Starting from €8.90</p>
                <Link
                  href={`/products/${product.handle}`}
                  className="bg-[#F6F5F1] text-black px-6 py-2 rounded-full w-full inline-block text-center">
                  View product
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Tagespacks Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-medium mb-8">Tagespacks</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                href={`/products/${product.handle}`}
                key={product.id}
                className="block">
                <div className="bg-[#FCFCF8] p-6 rounded-4xl border border-[#E2E1DC] text-center">
                  <img
                    src={
                      product.metafield?.reference?.image?.originalSrc ||
                      product.images.edges[0]?.node.originalSrc
                    }
                    alt={product.title}
                    className="w-full mb-4"
                  />
                  <h3 className="text-lg font-medium mb-1">{product.title}</h3>
                  <p className="text-[#808E80] mb-3">
                    Ab €
                    {Number(product.priceRange.minVariantPrice.amount).toLocaleString(
                      "de-DE",
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 },
                    )}
                  </p>
                  <div className="flex justify-center">
                    <div className="bg-[#E8E7DE] text-primary px-6 py-2 rounded-full text-center font-medium">
                      Zum Produkt
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
