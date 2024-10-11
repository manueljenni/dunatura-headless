export type Tagespack = {
  shopifyId: string;
  title: string;
  description: string | null;
  price: number;
  pricePer100g: number;
  ingredients: Ingredient[];
};

export type Ingredient = {
  shopifyId: string;
  title: string;
  image: string;
};
