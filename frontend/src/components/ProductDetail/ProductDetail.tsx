import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import apiRoutes from "../../constants/apiRoutes";
import theme from "../../constants/theme";

import formatDecimals from "../../utils/formatDecimals";
import formatNumbersWithDots from "../../utils/formatNumbersWithDots";
import { ParagraphExtraSmall, ParagraphRegular } from "../../utils/Paragraph";
import { H1, H2, H3 } from "../../utils/Titles";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { ProductDetailType } from "../ProductsList/ProductsTypes";

import freeShippingIcon from "../../assets/ic_shipping.png";
import freeShippingIcon2x from "../../assets/ic_shipping@2x.png";
import SkeletonBreadcrumb from "../shared/Skeleton/SkeletonBreadcrumb";
import SkeletonProductDetail from "../shared/Skeleton/SkeletonProductDetail";
import Button from "../shared/Button/Button";

const Wrapper = styled.section`
  width: 100%;
  max-width: 1240px;

  padding: 0 20px;
  margin-right: auto;
  margin-left: auto;

  box-sizing: border-box;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    width: 100%;
    padding: 0 16px;
  }
`;

const ContentWrapper = styled.div`
  padding: 32px;

  background-color: ${theme.color.white};
  border-radius: 4px;
`;

const ImageWrapper = styled.div`
  width: 100%;

  img {
    justify-self: center;
    width: 100%;
  }
`;

const TopWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 48px;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
`;

const TopInfoWrapper = styled.div`
  margin-right: 32px;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    margin-right: 0;
  }
`;

const Subtitle = styled.div`
  margin-bottom: 16px;

  p {
    display: inline;
    padding-right: 4px;

    &:last-of-type {
      padding-right: 0;
    }
  }

  span {
    padding-right: 4px;

    font-weight: ${theme.fontWeight.light};
    color: ${theme.color.gray2};
  }

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    margin-bottom: 8px;
  }
`;

const Title = styled(H1)`
  margin-bottom: 32px;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    margin-bottom: 16px;
    font-size: ${theme.fontSize.medium};
  }
`;

const DescriptionTitle = styled(H3)`
  margin-top: 64px;
  margin-bottom: 32px;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    margin-top: 24px;
    margin-bottom: 16px;

    font-size: ${theme.fontSize.medium};
  }
`;

const DescriptionTextWrapper = styled.div`
  width: 70%;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    width: 100%;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Price = styled(H2)`
  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    font-size: ${theme.fontSize.large};
  }
`;

const FreeShippingWrapper = styled.div`
  margin-left: 8px;
  width: 32px;
  height: 32px;

  img {
    justify-self: center;
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    width: 24px;
    height: 24px;
  }
`;

const TitlesWrapper = styled.div<{ position: string }>`
  display: ${({ position }) => (position === "top" ? "none" : "block")};

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    display: ${({ position }) => (position === "top" ? "block" : "none")};
  }
`;

/**
 * Component for title and subtitle of products.
 *
 * @component
 * @param   {{name: string; lastname: string}} itemData Object with all the properties of the item (id, title, price, etc)
 * @param   {ProductDetailType} position Indicates position on the parent (top or bottom)
 */

const Titles = ({ itemData, position }: any): ReactElement => {
  return (
    /**
     * Title and subtitle of item
     *
     * @params {string} position Used to show/hide according to viewport size ('top' it will show only for mobile, 'bottom' will only show on desktop)
     */
    <TitlesWrapper position={position}>
      <Subtitle>
        {/** Item condition */}
        <ParagraphExtraSmall color={theme.color.gray2}>
          {itemData?.condition}
        </ParagraphExtraSmall>

        {/** Item sold quantity */}
        {itemData?.sold_quantity ? (
          <>
            <span>-</span>
            <ParagraphExtraSmall color={theme.color.gray2}>
              {`${itemData?.sold_quantity} vendidos`}
            </ParagraphExtraSmall>
          </>
        ) : null}
      </Subtitle>

      {/** Item title */}
      <Title size={theme.fontSize.large} weight={theme.fontWeight.medium}>
        {itemData?.title}
      </Title>
    </TitlesWrapper>
  );
};

/**
 * Component for showing the detail of a product.
 *
 * @component
 * @param   {{name: string; lastname: string}} author  Author's name and lastname
 * @param   {ProductDetailType} item  Object with all the properties of the item (id, title, price, etc)
 */

export type ProductDetailResponseType = {
  author: {
    name: string;
    lastname: string;
  };
  item: ProductDetailType;
};

const ProductDetail = (): ReactElement => {
  /**
   * Get id in the url using useParams provided by react-router-dom
   */
  const { id } = useParams<{ id: string }>();

  /**
   * Initial states
   */
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState<ProductDetailResponseType | null>(
    null
  );

  /**
   * Function to fetch data from server and set states
   */
  const handleFetchItemById = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiRoutes.expressApi}/api/items/${id}`);
      const data = await response.json();

      setRawData(data);
      setLoading(false);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  /**
   * Call to the function that fetchs the data
   */
  useEffect(() => {
    handleFetchItemById();
  }, [id]);

  const itemData = rawData?.item && rawData.item;

  const handleBuyClick = (): void => {
    // Your code for triggering the buying process goes here
  };

  return (
    <Wrapper>
      {/** Breadcrumb */}
      {!loading && itemData?.categories && itemData?.categories.length > 0 ? (
        <Breadcrumb categories={itemData?.categories} />
      ) : (
        <SkeletonBreadcrumb />
      )}

      {/** Content */}
      <ContentWrapper>
        {!loading && rawData?.item ? (
          <>
            <TopWrapper>
              <Titles itemData={itemData} position="top" />

              {/** Image */}
              <ImageWrapper>
                <picture>
                  <img
                    src={itemData?.picture}
                    alt={itemData?.title}
                    title={itemData?.title}
                  />
                </picture>
              </ImageWrapper>

              <TopInfoWrapper>
                <Titles itemData={itemData} position="bottom" />

                {/** Price with formatted numbers and decimals */}
                <PriceWrapper>
                  <Price size={theme.fontSize.extraLarge}>
                    <span>{itemData?.price?.currency}</span>
                    <span>
                      {formatNumbersWithDots(itemData?.price?.amount)}
                    </span>
                    <span>{formatDecimals(itemData?.price?.decimals)}</span>
                  </Price>

                  {/** Free shipping icon */}
                  {itemData?.free_shipping ? (
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

                {/** Buy button */}
                <Button type="primary" onClick={handleBuyClick} fullWidth>
                  Comprar
                </Button>
              </TopInfoWrapper>
            </TopWrapper>

            {/** Desription */}
            {itemData?.description ? (
              <div>
                <DescriptionTitle
                  size={"28px"}
                  weight={theme.fontWeight.medium}
                >
                  Descripción del producto
                </DescriptionTitle>

                <DescriptionTextWrapper color={theme.color.gray2}>
                  <ParagraphRegular>{itemData?.description}</ParagraphRegular>
                </DescriptionTextWrapper>
              </div>
            ) : null}
          </>
        ) : (
          <SkeletonProductDetail />
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default ProductDetail;
