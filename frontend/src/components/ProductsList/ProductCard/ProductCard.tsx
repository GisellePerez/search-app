import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import theme from "../../../constants/theme";
import { ParagraphExtraSmall } from "../../../utils/Paragraph";
import { H2, H3 } from "../../../utils/Titles";
import { ProductCardType } from "../ProductsTypes";

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  padding: 16px;

  box-sizing: border-box;
  background-color: ${theme.color.white};

  &:hover {
    cursor: pointer;
  }
`;

const ImageWrapper = styled.div`
  width: 160px;
  height: 160px;

  img {
    width: 100%;
    border-radius: 4px;
  }
`;

const Price = styled(H2)`
  margin-top: 16px;
  margin-bottom: 32px;
  height: 30px;
`;

const Title = styled(H3)`
  width: 80%;
`;

const StateWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-top: 16px;
  height: 30px;
`;

const ProductCard = (item: ProductCardType): ReactElement => {
  const history = useHistory();

  const handleClick = (): void => {
    history.push(`/items/${item.id}`);
  };

  return (
    <Wrapper onClick={() => handleClick()}>
      <ImageWrapper>
        <picture>
          <img src={item.picture} alt={item.title} title={item.title} />
        </picture>
      </ImageWrapper>

      <div>
        <Price>{item.price.amount}</Price>
        <Title>{item.title}</Title>
      </div>

      <StateWrapper>
        {/* TODO: add this to response in api */}
        <ParagraphExtraSmall color={theme.color.gray2}>
          Buenos Aires
        </ParagraphExtraSmall>
      </StateWrapper>
    </Wrapper>
  );
};

export default ProductCard;
