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

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StateWrapper = styled.div`
  display: flex;
`;

const SkeletonProductCard = (): ReactElement => {
  return (
    <Wrapper>
      <div>
        <Skeleton width={180} height={180} borderRadius />
      </div>
      <PriceWrapper>
        <Skeleton
          width={118}
          height={30}
          marginTop={16}
          marginBottom={32}
        ></Skeleton>
        <Skeleton width={240} height={24}></Skeleton>
        <Skeleton width={180} height={24} marginTop={8}></Skeleton>
      </PriceWrapper>
      <StateWrapper>
        <Skeleton width={82} height={18} marginTop={16}></Skeleton>
      </StateWrapper>
    </Wrapper>
  );
};

export default SkeletonProductCard;
