import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import apiRoutes from "../../constants/apiRoutes";
import theme from "../../constants/theme";
import Button from "../../utils/Button/Button";
import { ParagraphExtraSmall, ParagraphRegular } from "../../utils/Paragraph";
import { H1, H2, H3 } from "../../utils/Titles";
import { ProductDetailType } from "../ProductsList/ProductsTypes";

const Wrapper = styled.section`
  width: 100%;
  max-width: 1240px;

  padding: 8px 20px;
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
`;

const TopInfoWrapper = styled.div`
  margin-right: 32px;
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
`;

const Title = styled(H1)`
  margin-bottom: 32px;
`;

const DescriptionTitle = styled(H3)`
  margin-top: 64px;
  margin-bottom: 32px;
`;

const DescriptionTextWrapper = styled.div`
  width: 70%;
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
  const [rawData, setRawData] = useState<ProductDetailResponseType | null>(
    null
  );

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

  useEffect(() => {
    handleFetchItemById();
  }, [id]);

  const itemData = rawData?.item && rawData.item;

  const handleBuyClick = (): void => {
    // This function should trigger buying process
  };

  return (
    <>
      {!loading
        ? rawData?.item && (
            <Wrapper>
              <ContentWrapper>
                <TopWrapper>
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
                    <Subtitle>
                      <ParagraphExtraSmall color={theme.color.gray2}>
                        {itemData?.condition}
                      </ParagraphExtraSmall>
                      {itemData?.sold_quantity ? (
                        <>
                          <span>-</span>
                          <ParagraphExtraSmall color={theme.color.gray2}>
                            {`${itemData?.sold_quantity} vendidos`}
                          </ParagraphExtraSmall>
                        </>
                      ) : null}
                    </Subtitle>
                    <Title
                      size={theme.fontSize.large}
                      weight={theme.fontWeight.medium}
                    >
                      {itemData?.title}
                    </Title>
                    <H2 size={theme.fontSize.extraLarge}>
                      {`${itemData?.price?.currency} ${itemData?.price?.amount}`}
                    </H2>
                    <Button type="primary" onClick={handleBuyClick} fullWidth>
                      Comprar
                    </Button>
                  </TopInfoWrapper>
                </TopWrapper>
                {itemData?.description ? (
                  <div>
                    <DescriptionTitle
                      size={"28px"}
                      weight={theme.fontWeight.medium}
                    >
                      Descripción del producto
                    </DescriptionTitle>

                    <DescriptionTextWrapper color={theme.color.gray2}>
                      <ParagraphRegular>
                        {itemData?.description}
                      </ParagraphRegular>
                    </DescriptionTextWrapper>
                  </div>
                ) : null}
              </ContentWrapper>
            </Wrapper>
          )
        : "cargando"}
    </>
  );
};

export default ProductDetail;
