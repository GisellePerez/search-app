import React, { ReactElement } from "react";

export type ProductCardType = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  description: string;
};

const ProductCard = (item: ProductCardType): ReactElement => {
  return <p>{item.title}</p>;
};

export default ProductCard;
