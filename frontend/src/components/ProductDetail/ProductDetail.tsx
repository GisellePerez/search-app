import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import apiRoutes from '../../constants/apiRoutes';
import theme from '../../constants/theme';

import Button from '../../utils/Button/Button';
import formatDecimals from '../../utils/formatDecimals';
import formatNumbersWithDots from '../../utils/formatNumbersWithDots';
import { ParagraphExtraSmall, ParagraphRegular } from '../../utils/Paragraph';
import { H1, H2, H3 } from '../../utils/Titles';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { ProductDetailType } from '../ProductsList/ProductsTypes';

import freeShippingIcon from '../../assets/ic_shipping.png';
import freeShippingIcon2x from '../../assets/ic_shipping@2x.png';
import SkeletonBreadcrumb from '../shared/Skeleton/SkeletonBreadcrumb';
import SkeletonProductDetail from '../shared/Skeleton/SkeletonProductDetail';

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
  display: ${({ position }) => (position === 'top' ? 'none' : 'block')};

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    display: ${({ position }) => (position === 'top' ? 'block' : 'none')};
  }
`;

export type ProductDetailResponseType = {
  author: {
    name: string;
    lastname: string;
  };
  item: ProductDetailType;
};

const ProductDetail = (): ReactElement => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState<ProductDetailResponseType | null>(null);

  const handleFetchItemById = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiRoutes.expressApi}/api/items/${id}`);
      const data = await response.json();

      setRawData(data);
      setLoading(false);
    } catch (error) {
      console.log('error', error.message);
    }
  };

  useEffect(() => {
    handleFetchItemById();
  }, [id]);

  const itemData = rawData?.item && rawData.item;

  const Titles = ({ itemData, position }: any): ReactElement => {
    return (
      <TitlesWrapper position={position}>
        <Subtitle>
          <ParagraphExtraSmall color={theme.color.gray2}>{itemData?.condition}</ParagraphExtraSmall>
          {itemData?.sold_quantity ? (
            <>
              <span>-</span>
              <ParagraphExtraSmall color={theme.color.gray2}>
                {`${itemData?.sold_quantity} vendidos`}
              </ParagraphExtraSmall>
            </>
          ) : null}
        </Subtitle>
        <Title size={theme.fontSize.large} weight={theme.fontWeight.medium}>
          {itemData?.title}
        </Title>
      </TitlesWrapper>
    );
  };

  const handleBuyClick = (): void => {
    // This function should trigger buying process
  };

  return (
    <Wrapper>
      {!loading && itemData?.categories && itemData?.categories.length > 0 ? (
        <Breadcrumb categories={itemData?.categories} />
      ) : (
        <SkeletonBreadcrumb />
      )}

      <ContentWrapper>
        {!loading && rawData?.item ? (
          <>
            <TopWrapper>
              <Titles itemData={itemData} position="top" />
              <ImageWrapper>
                <picture>
                  <img src={itemData?.picture} alt={itemData?.title} title={itemData?.title} />
                </picture>
              </ImageWrapper>

              <TopInfoWrapper>
                <Titles itemData={itemData} position="bottom" />
                <PriceWrapper>
                  <Price size={theme.fontSize.extraLarge}>
                    <span>{itemData?.price?.currency}</span>
                    <span>{formatNumbersWithDots(itemData?.price?.amount)}</span>
                    <span>{formatDecimals(itemData?.price?.decimals)}</span>
                  </Price>
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
                <Button type="primary" onClick={handleBuyClick} fullWidth>
                  Comprar
                </Button>
              </TopInfoWrapper>
            </TopWrapper>

            {itemData?.description ? (
              <div>
                <DescriptionTitle size={'28px'} weight={theme.fontWeight.medium}>
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
