"use client";

import { getThemenpacksWithIngredients } from "@/api/fetch";
import { Ingredient, Tagespack } from "@/api/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PreconfiguredPacks() {
  const [themenpacks, setThemenpacks] = useState<Tagespack[]>([]);

  useEffect(() => {
    async function fetchThemenpacks() {
      try {
        const packs = await getThemenpacksWithIngredients();
        setThemenpacks(packs);
        console.log(packs);
      } catch (error) {
        console.error("Error fetching themenpacks:", error);
      }
    }

    fetchThemenpacks();
  }, []);

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
        className={`rounded-full px-4 py-2 border border-[#324132] cursor-pointer whitespace-nowrap ${
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
        <Image
          src={pill.image}
          alt="pill"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="relative z-10 text-left text-white w-full rounded-lg flex flex-col justify-end text-[#324132]">
          <p className="font-medium text-xl text-[#324132] mb-2">
            {pill.title.replace("(Vegan)", "")}
          </p>
        </div>
      </div>
    );
  }

  const addToCart = (productId: string) => {
    const formData = new FormData();
    formData.append("form_type", "product");
    formData.append("utf8", "✓");
    formData.append("id", productId);
    formData.append("sections", "cart-drawer,cart-icon-bubble");
    formData.append("sections_url", "/");

    fetch("https://www.dunatura.com/cart/add", {
      method: "POST",
      headers: {
        accept: "application/javascript",
        "accept-language": "de,en;q=0.9",
        "x-requested-with": "XMLHttpRequest",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product added to cart", data);
      })
      .catch((error) => {
        console.error("Error adding product to cart", error);
      });
  };

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
          <p className="text-sm font-medium">{formatPrice(pack.price / 100)} / 100g</p>
        </div>
        <div>
          <button
            className="rounded-full bg-[#232E23] text-center py-2 px-1 w-full text-white"
            onClick={() => addToCart(pack.shopifyId)}>
            Jetzt kaufen
          </button>
        </div>
      </div>
    );
  }

  function PacksContent() {
    const [selectedCategory, setSelectedCategory] = useState(themenpacks[0]);

    return (
      <div className="overflow-x-scroll no-scrollbar w-full h-full">
        <div className="flex flex-row overflow-x-scroll space-x-4 text-[#324132] w-full no-scrollbar">
          {themenpacks.map((pack) => (
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

  return (
    <div className="p-6 md:p-12 z-10 bg-white shadow-xl rounded-[32px] border border-[#E7E9D8] space-y-8 max-w-[1200px] mx-auto">
      <div className="bg-[#E8EDE8] px-3 py-1 rounded-full inline-flex text-center">
        <p className="text-primary font-medium whitespace-normal">
          Oder doch einfach schnell ausprobieren?
        </p>
      </div>
      <h1 className="text-4xl font-semibold w-full lg:w-2/3 text-primary">
        Für bestimmte Ziele haben wir uns&shy; um die Kombination gekümmert
      </h1>
      <PacksContent />
    </div>
  );
}
