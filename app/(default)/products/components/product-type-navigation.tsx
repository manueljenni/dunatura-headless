"use client";

type ProductType = {
  name: string;
  count: number;
};

interface ProductTypeNavigationProps {
  availableTypes: {
    tagespacks: number;
    bottles: number;
    sprays: number;
    cans: number;
    tea: number;
  };
}

export function ProductTypeNavigation(props: ProductTypeNavigationProps) {
  const { availableTypes } = props;
  const productTypes: ProductType[] = [
    { name: "Tagespacks", count: availableTypes.tagespacks },
    { name: "Flaschen", count: availableTypes.bottles },
    { name: "Sprays", count: availableTypes.sprays },
    { name: "Dosen", count: availableTypes.cans },
    { name: "Tee", count: availableTypes.tea },
  ].filter((type) => type.count > 0);

  if (productTypes.length === 0) return null;

  console.log(productTypes.length);

  return (
    <section className="py-12">
      <div className="">
        <div
          className={`grid grid-cols-2 md:grid-cols-${Math.min(3, productTypes.length + 1)} lg:grid-cols-${productTypes.length + 1} gap-4`}>
          {productTypes.map((type) => (
            <button
              key={type.name}
              onClick={() => {
                const element = document.getElementById(type.name.toLowerCase());
                if (element) {
                  const offset = element.offsetTop - 20;
                  window.scrollTo({ top: offset, behavior: "smooth" });
                }
              }}
              className="text-center">
              <div className="relative bg-[#E7E7DE] rounded-3xl w-full pt-[100%] border-2 border-transparent hover:border-primary/800 transition-all duration-200">
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex-1 flex items-center justify-center p-4">
                    <img
                      src={`/images/product-types/${type.name.toLowerCase().replace(/\s+/g, "-")}.png`}
                      alt={type.name}
                      className="max-w-[80%] max-h-[80%] w-auto h-auto object-contain"
                    />
                  </div>
                  <p className="text-primary text-lg font-medium">{type.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
