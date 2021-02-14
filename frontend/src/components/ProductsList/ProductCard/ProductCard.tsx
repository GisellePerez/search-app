import React, { ReactElement } from "react";
import { Link, useHistory } from "react-router-dom";
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

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    grid-template-columns: 1fr 2fr;
    grid-gap: 16px;
  }
`;

const ImageWrapper = styled.div`
  place-self: center;

  width: 180px;
  height: 180px;

  text-align: center;

  img {
    justify-self: center;

    height: 100%;
    width: 100%;

    object-fit: contain;
    border-radius: 4px;
  }

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    width: 30vw;
    height: 30vw;
  }
`;

const SideInfoWrapper = styled.div`
  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const Price = styled(H2)`
  margin-top: 16px;
  margin-bottom: 32px;
  height: 30px;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    margin-top: 16px;
    margin-bottom: 8px;
    height: auto;
  }
`;

const Title = styled(H3)`
  width: 80%;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    width: 100%;
  }
`;

const StateWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-top: 16px;
  height: 30px;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    display: none;

    p {
      font-size: ${theme.fontSize.medium};
    }
  }
`;

const ProductCard = (item: ProductCardType): ReactElement => {
  return (
    <Wrapper>
      <ImageWrapper>
        <picture>
          <img src={item?.picture} alt={item?.title} title={item?.title} />
        </picture>
      </ImageWrapper>

      <SideInfoWrapper>
        <Price>
          <span>{item?.price?.currency}</span>
          <span>{item?.price?.amount}</span>
          <span>
            {item?.price?.decimals > 0 ? `.${item?.price?.decimals}` : null}
          </span>
        </Price>
        <Title>{item?.title}</Title>
      </SideInfoWrapper>

      <StateWrapper>
        {item?.address?.state_name ? (
          <ParagraphExtraSmall color={theme.color.gray2}>
            {item.address.state_name}
          </ParagraphExtraSmall>
        ) : null}
      </StateWrapper>
    </Wrapper>
  );
};

export default ProductCard;
