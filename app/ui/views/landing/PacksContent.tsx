"use client";
import { Ingredient, Tagespack } from "@/api/types";
import Image from "next/image";
import { useState } from "react";
import AddToCartButton from "../../components/custom/AddToCartButton";

export default function PacksContent(props: { themenpacks: Tagespack[] }) {
  const [selectedCategory, setSelectedCategory] = useState(props.themenpacks[0]);

  function CategoryItem({
    category,
    onClick,
    isSelected,
  }: {
    category: Tagespack;
    onClick: (category: Tagespack) => void;
    isSelected: boolean;
  }) {
    let cleanedTitle = category.title.replace("Tagespacks ", "");
    return (
      <div
        className={`rounded-full px-4 py-2 border border-[#324132] cursor-pointer whitespace-nowrap transition-all duration-300 hover:bg-primary hover:text-white ${
          isSelected ? "bg-[#324132] text-white" : "bg-white text-[#324132]"
        }`}
        onClick={() => onClick(category)}>
        <p>{cleanedTitle}</p>
      </div>
    );
  }

  function PillItem({ pill }: { pill: Ingredient }) {
    return (
      <div className="relative p-4 border rounded-2xl flex flex-col justify-end items-center min-w-[250px] w-full aspect-square overflow-hidden h-full">
        <Image src={pill.image} alt="pill" className="z-0" fill sizes="100vw" />
        <div className="relative z-10 text-left text-red-200 w-full rounded-lg flex flex-col justify-end">
          <p className="font-medium text-xl text-[#324132] mb-2">
            {pill.title.replace("(Vegan)", "")}
          </p>
        </div>
      </div>
    );
  }

  function Pricing({ category: pack }: { category: Tagespack }) {
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(price);
    };

    return (
      <div className="text-[#324132] space-y-2 w-full flex-shrink-0 lg:w-[300px]">
        <p className="text-2xl font-medium">{pack.title}</p>
        <p className="text-lg text-[#5B685B]">{pack.description}</p>
        <div className="flex space-x-2 items-baseline pb-4">
          <p className="text-2xl font-medium">{formatPrice(pack.price)}</p>
          <p className="text-sm font-medium">{formatPrice(pack.pricePer100g)} / 100g</p>
        </div>
        <div>
          <AddToCartButton
            variantId={pack.shopifyId}
            variant="pill"
            size="pill-xl"
            className="w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-scroll no-scrollbar w-full h-full">
      <div className="flex flex-row overflow-x-scroll space-x-4 text-[#324132] w-full no-scrollbar">
        {props.themenpacks.map((pack) => (
          <CategoryItem
            key={pack.shopifyId}
            category={pack}
            onClick={setSelectedCategory}
            isSelected={pack === selectedCategory}
          />
        ))}
      </div>
      <div className="relative flex md:flex-col justify-between h-full lg:flex-row pt-8 gap-12 w-full flex-col-reverse">
        {selectedCategory && <Pricing category={selectedCategory} />}
        <div className="vitamin-scroll-container w-full flex overflow-x-scroll">
          <div className="flex gap-4">
            {selectedCategory &&
              selectedCategory.ingredients?.map((ingredient) => (
                <PillItem key={ingredient.shopifyId} pill={ingredient} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
