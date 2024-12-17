import { getAllProducts } from "@/api/fetch";
import AddToCartButton from "@/components/custom/button/AddToCartButton";
import Image from "next/image";
import Link from "next/link";

export default function TagespackPreview(props: {
  product: Awaited<ReturnType<typeof getAllProducts>>[number];
}) {
  return (
    <Link
      href={`/products/${props.product.handle}`}
      key={props.product.id}
      className="h-full">
      <div className="w-full h-full rounded-2xl bg-[#FBFCF8] p-6 border border-[#E5E9E6] hover:border-primary/20 transition-colors flex flex-col justify-end">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">{props.product.title}</h2>
          <div className="py-8">
            <div className="relative h-[200px] w-full">
              <Image
                src={
                  props.product.metafield?.reference?.image?.originalSrc ||
                  props.product.images.edges[0]?.node.originalSrc
                }
                alt={props.product.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-auto flex flex-col justify-between items-start gap-4">
          <div>
            <p className="text-2xl font-bold text-primary">
              €
              {Number(props.product.priceRange.minVariantPrice.amount).toLocaleString(
                "de-DE",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}
            </p>
            <span className="text-sm text-primary">
              (€
              {(
                Number(props.product.priceRange.minVariantPrice.amount) / 100
              ).toLocaleString("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              / 100g)
            </span>
          </div>
          <AddToCartButton
            variantId={props.product.variants.edges[0]?.node.id}
            variant="pill"
            size="pill-lg"
            className="w-fit"
          />
        </div>
      </div>
    </Link>
  );
}
