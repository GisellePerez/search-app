import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Skeleton from './Skeleton';

const Wrapper = styled.section`
  display: flex;
  margin: 16px 0;

  div {
    margin-right: 8px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const SkeletonBreadcrumb = (): ReactElement => {
  return (
    <Wrapper>
      <Skeleton width={100} height={20} backgroundColor={'#dedede'} />
      <Skeleton width={100} height={20} backgroundColor={'#dedede'} />
      <Skeleton width={100} height={20} backgroundColor={'#dedede'} />
    </Wrapper>
  );
};

export default SkeletonBreadcrumb;
