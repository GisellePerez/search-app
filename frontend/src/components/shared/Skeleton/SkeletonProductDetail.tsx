import React from "react";
import styled from "styled-components";
import theme from "../../../constants/theme";
import Skeleton from "./Skeleton";

const TopContentWrapper = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 48px;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
`;

const ImageSkeleton = styled(Skeleton)`
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitlesWrapper = styled.div<{ position: string }>`
  display: ${({ position }) => (position === "top" ? "none" : "block")};

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    display: ${({ position }) => (position === "top" ? "block" : "none")};
  }
`;

const SkeletonProductDetail = () => {
  return (
    <div>
      <TopContentWrapper>
        <TitlesWrapper position={"top"}>
          <Skeleton mobileHeight={18} mobileWidth={40} mobileMarginBottom={8} />
          <Skeleton mobileMarginBottom={16} mobileHeight={22} />
        </TitlesWrapper>
        <ImageSkeleton height={300} mobileHeight={280} />
        <ContentWrapper>
          <TitlesWrapper position={"bottom"}>
            <Skeleton width={60} height={19} marginBottom={16} />
            <Skeleton height={30} marginBottom={4} />
            <Skeleton width={100} height={30} marginBottom={32} />
          </TitlesWrapper>
          <Skeleton height={58} mobileHeight={30} mobileWidth={120} />
          <Skeleton height={48} marginTop={32} borderRadius mobileHeight={42} />
        </ContentWrapper>
        <ContentWrapper>
          <Skeleton
            width={300}
            height={34}
            marginTop={64}
            marginBottom={32}
            mobileHeight={22}
            mobileMarginTop={24}
            mobileMarginBottom={16}
          />

          <Skeleton width={400} height={18} marginBottom={4} />
          <Skeleton width={400} height={18} marginBottom={4} />
          <Skeleton width={400} height={18} marginBottom={4} />
          <Skeleton width={200} height={18} marginBottom={4} />
        </ContentWrapper>
      </TopContentWrapper>
    </div>
  );
};

export default SkeletonProductDetail;
