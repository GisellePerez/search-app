import React from "react";
import styled, { keyframes } from "styled-components";
import theme from "../../../constants/theme";

type SkeletonType = {
  width?: number;
  height?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  mobileMarginTop?: number;
  mobileMarginBottom?: number;
  mobileMarginLeft?: number;
  mobileMarginRight?: number;
  borderRadius?: boolean;
  backgroundColor?: string;
};

const Keyframes = keyframes`
  100% {
    transform: translateX(100%);
  }
  `;

const SkeletonPart = styled.div<SkeletonType>`
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  height: ${({ height }) => (height ? `${height}px` : "100%")};
  max-width: 100%;

  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : 0)};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? `${marginBottom}px` : 0};
  margin-left: ${({ marginLeft }) => (marginLeft ? `${marginLeft}px` : 0)};
  margin-right: ${({ marginRight }) => (marginRight ? `${marginRight}px` : 0)};

  position: relative;
  overflow: hidden;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : theme.color.gray4};
  border-radius: ${({ borderRadius }) => (borderRadius ? "4px" : 0)};

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: ${({ width }) => (width ? `${width}px` : "100%")};

    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(148, 148, 148, 0.3) 60%,
      rgba(255, 255, 255, 0)
    );
    transform: translateX(-100%);
    animation: ${Keyframes} 1.2s infinite;
  }
`;

const Skeleton = ({
  width,
  height,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  mobileMarginTop,
  mobileMarginBottom,
  mobileMarginLeft,
  mobileMarginRight,
  borderRadius,
  backgroundColor,
}: SkeletonType) => {
  return (
    <SkeletonPart
      width={width}
      height={height}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      mobileMarginTop={mobileMarginTop}
      mobileMarginBottom={mobileMarginBottom}
      mobileMarginLeft={mobileMarginLeft}
      mobileMarginRight={mobileMarginRight}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
    />
  );
};

export default Skeleton;
