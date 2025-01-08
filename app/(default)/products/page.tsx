import { getAllProducts } from "@/api/fetch";
import FreeShippingPill from "@/components/custom/free-shipping-pill";
import { Button } from "@/components/primitives/button";
import Link from "next/link";
import ProductPreview from "./components/product-preview";
import { ProductTypeNavigation } from "./components/product-type-navigation";

export default async function ProductsPage() {
  const products = await getAllProducts();
  const tagespacks = products.filter((product) => product.tags.includes("Themenpack"));
  const bottles = products.filter((product) => product.title.includes("Flasche"));
  const sprays = products.filter((product) => product.title.includes("Spray"));
  const cans = products.filter((product) => product.title.includes("Dose"));
  const tea = products.filter((product) => product.title.includes("Tee"));

  console.log("Teas: ", tea);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="pt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 text-primary">
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
              <Link href="/questionnaire">
                <Button asChild variant="pillSecondary" size="pill-xl">
                  Zum Selbsttest →
                </Button>
              </Link>
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

      <section className="py-12 max-w-6xl mx-auto px-4">
        <ProductTypeNavigation
          availableTypes={{
            tagespacks: tagespacks.length,
            bottles: bottles.length,
            sprays: sprays.length,
            cans: cans.length,
            tea: tea.length,
          }}
        />
      </section>

      {/* Featured Products */}
      {/* <section >
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

      {tagespacks.length > 0 && (
        <section id="tagespacks">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-3xl font-medium mb-6 text-primary">Tagespacks</h2>
              <div className="w-fit">
                <FreeShippingPill />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {tagespacks.map((product) => (
                <ProductPreview product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {bottles.length > 0 && (
        <section id="flaschen">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-medium mb-6 text-primary">Flaschen</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {bottles.map((product) => (
                <ProductPreview product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {cans.length > 0 && (
        <section id="dosen">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-medium mb-6 text-primary">Dosen</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {cans.map((product) => (
                <ProductPreview product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {sprays.length > 0 && (
        <section id="sprays">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-medium mb-6 text-primary">Sprays</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {sprays.map((product) => (
                <ProductPreview product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {tea.length > 0 && (
        <section id="tee">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-medium mb-6 text-primary">Tee</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {tea.map((product) => (
                <ProductPreview product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
