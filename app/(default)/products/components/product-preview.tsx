import { getAllProducts } from "@/api/fetch";
import Link from "next/link";

export default function ProductPreview(props: {
  product: Awaited<ReturnType<typeof getAllProducts>>[number];
}) {
  const { product } = props;
  return (
    <Link href={`/products/${product.handle}`} key={product.id} className="block">
      <div className="bg-[#FCFCF8] p-6 rounded-4xl border border-[#E2E1DC] text-center hover:shadow transition-all duration-200">
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
          {Number(product.priceRange.minVariantPrice.amount).toLocaleString("de-DE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <div className="flex justify-center">
          <div className="bg-[#E8E7DE] text-primary px-6 py-2 rounded-full text-center font-medium">
            Zum Produkt
          </div>
        </div>
      </div>
    </Link>
  );
}
