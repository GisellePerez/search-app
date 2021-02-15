import React, { ReactElement } from "react";
import styled from "styled-components";
import theme from "../../../constants/theme";
import Skeleton from "./Skeleton";

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  padding: 16px;

  box-sizing: border-box;
  background-color: #ffffff;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    grid-template-columns: 1fr 2fr;
    grid-gap: 16px;
  }
`;

const ImageWrapper = styled.div`
  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    width: 30vw;
    height: 30vw;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    flex-direction: column-reverse;
  }
`;

const StateWrapper = styled.div`
  display: flex;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    display: none;
  }
`;

/**
 * Component for showing ProductCard skeleton.
 *
 * @component
 */
const SkeletonProductCard = (): ReactElement => {
  return (
    <Wrapper>
      <ImageWrapper>
        <Skeleton width={180} height={180} borderRadius mobileHeight={110} />
      </ImageWrapper>
      <PriceWrapper>
        <Skeleton
          width={118}
          height={30}
          marginTop={16}
          marginBottom={32}
          mobileMarginBottom={8}
        ></Skeleton>

        <Skeleton
          width={240}
          mobileWidth={80}
          height={24}
          mobileHeight={22}
          mobileMarginTop={4}
        ></Skeleton>
        <Skeleton
          width={180}
          height={24}
          mobileHeight={22}
          marginTop={8}
        ></Skeleton>
      </PriceWrapper>
      <StateWrapper>
        <Skeleton width={82} height={18} marginTop={16}></Skeleton>
      </StateWrapper>
    </Wrapper>
  );
};

export default SkeletonProductCard;
