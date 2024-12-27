"use client";

type ProductType = {
  name: string;
};

export function ProductTypeNavigation() {
  const productTypes: ProductType[] = [
    { name: "Tagespacks" },
    { name: "Flaschen" },
    { name: "Sprays" },
    { name: "Dosen" },
    { name: "Tee" },
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
