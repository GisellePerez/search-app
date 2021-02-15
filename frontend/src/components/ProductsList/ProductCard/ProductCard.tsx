import React, { ReactElement } from "react";
import styled from "styled-components";
import theme from "../../../constants/theme";
import formatDecimals from "../../../utils/formatDecimals";
import formatNumbersWithDots from "../../../utils/formatNumbersWithDots";

import { ParagraphExtraSmall } from "../../shared/Paragraph/Paragraph";
import { H2, H3 } from "../../shared/Titles/Titles";
import { ProductCardType } from "../ProductsTypes";

import freeShippingIcon from "../../../assets/ic_shipping.png";
import freeShippingIcon2x from "../../../assets/ic_shipping@2x.png";

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

const PriceWrapper = styled.div`
  display: flex;
`;

const Price = styled(H2)`
  margin-top: 16px;
  margin-bottom: 32px;
  height: 30px;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    margin-bottom: 8px;
    height: auto;
  }
`;

const FreeShippingWrapper = styled.div`
  margin-top: 18px;
  margin-left: 8px;
  width: 24px;
  height: 24px;

  img {
    justify-self: center;
    height: 100%;
    width: 100%;
    object-fit: contain;
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

/**
 * Component for showing cards of each product in the list of results.
 *
 * @component
 * @param   {ProductCardType} item  Object with all the properties of the item (id, title, price, etc)
 */
const ProductCard = (item: ProductCardType): ReactElement => {
  return (
    <Wrapper>
      {/** Image */}
      <ImageWrapper>
        <picture>
          <img src={item?.picture} alt={item?.title} title={item?.title} />
        </picture>
      </ImageWrapper>

      <SideInfoWrapper>
        {/** Price with formatted numbers */}
        <PriceWrapper>
          <Price>
            <span>{item?.price?.currency}</span>
            <span>{formatNumbersWithDots(item?.price?.amount)}</span>
            <span>{formatDecimals(item?.price?.decimals)}</span>
          </Price>

          {/** Free Shipping icon with different qualities for different screens */}
          {item?.free_shipping ? (
            <FreeShippingWrapper>
              <picture>
                <source
                  srcSet={freeShippingIcon2x}
                  media="(min-width:650px)"
                  type="image/png"
                />
                <img src={freeShippingIcon} alt="Envío gratis" />
              </picture>
            </FreeShippingWrapper>
          ) : null}
        </PriceWrapper>

        {/** Title */}
        <Title>{item?.title}</Title>
      </SideInfoWrapper>

      {/** State */}
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
