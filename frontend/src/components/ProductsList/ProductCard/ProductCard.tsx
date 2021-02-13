import React, { ReactElement } from "react";
import styled from "styled-components";
import theme from "../../../constants/theme";
import { ParagraphExtraLarge } from "../../../utils/Paragraph";
import { H2 } from "../../../utils/Titles";

const Title = styled.p``;

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
  return (
    <div>
      <H2>{item.title}</H2>
    </div>
  );
};

export default ProductCard;
