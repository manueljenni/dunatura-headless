import AddToCartButton from "./AddToCartButton";
import { getAllProducts } from "./api/fetch";
import CheckOutButton from "./CheckOutButton";
import ClearCartButton from "./ClearCartButton";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <ClearCartButton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-sm mb-2">{product.description}</p>
            <img
              src={product.images.edges[0]?.node.originalSrc}
              alt={product.images.edges[0]?.node.altText || product.title}
              className="w-full h-48 object-cover mb-2"
            />
            <p className="text-lg font-bold mb-2">
              {product.priceRange.minVariantPrice.amount}{" "}
              {product.priceRange.minVariantPrice.currencyCode}
            </p>
            <p className="text-sm mb-2">
              {product.variants.edges[0]?.node.availableForSale
                ? "In stock"
                : "Out of stock"}
            </p>
            <AddToCartButton variantId={product.variants.edges[0]?.node.id} />
            <CheckOutButton variantId={product.variants.edges[0]?.node.id} />
            <div className="flex flex-wrap">
              {product.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-200 rounded-full px-2 py-1 text-xs mr-1 mb-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
