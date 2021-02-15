import React from "react";
import styled from "styled-components";
import Skeleton from "./Skeleton";

const TopContentWrapper = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 48px;
`;

const ImageSkeleton = styled(Skeleton)`
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SkeletonProductDetail = () => {
  return (
    <div>
      <TopContentWrapper>
        <ImageSkeleton height={300} />
        <ContentWrapper>
          <Skeleton width={60} height={19} marginBottom={16} />

          <Skeleton height={30} marginBottom={4} />
          <Skeleton width={100} height={30} marginBottom={32} />

          <Skeleton height={58} />

          <Skeleton height={48} marginTop={32} borderRadius />
        </ContentWrapper>

        <ContentWrapper>
          <Skeleton width={300} height={34} marginTop={64} marginBottom={32} />

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
