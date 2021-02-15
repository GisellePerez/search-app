import React from "react";
import styled, { keyframes } from "styled-components";
import theme from "../../../constants/theme";

type SkeletonType = {
  width?: number;
  height?: number;
  mobileWidth?: number;
  mobileHeight?: number;
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
  /* If desktop width is not set, it's fallback value will be 100% */
  width: ${({ width }) => (width ? `${width}px` : "100%")};

  /* If desktop height is not set, it's fallback value will be 100% */
  height: ${({ height }) => (height ? `${height}px` : 0)};
  max-width: 100%;

  /* If desktop margins are not set, their fallback value will be 0 */
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : 0)};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? `${marginBottom}px` : 0};
  margin-left: ${({ marginLeft }) => (marginLeft ? `${marginLeft}px` : 0)};
  margin-right: ${({ marginRight }) => (marginRight ? `${marginRight}px` : 0)};

  position: relative;
  overflow: hidden;

  /* Background color can be chosen passing a hexadecimal value. Eg: #dedede */
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : theme.color.gray4};
  border-radius: ${({ borderRadius }) => (borderRadius ? "4px" : 0)};

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;

    /* Desktop width for ::before: if width is not specified, it's fallback value  will be 100% */
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

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    /* Mobile width: if mobileWidth is not specified, it's fallback value  will be 100% */
    width: ${({ mobileWidth }) => (mobileWidth ? `${mobileWidth}px` : "100%")};

    /* Mobile height: if mobileHeight is not specified, it's fallback value  will be desktopHeight */
    height: ${({ mobileHeight, height }) =>
      mobileHeight ? `${mobileHeight}px` : height};

    /* Mobile margin: if mobile margins are not specified, they will take the value of the desktop margins
     If the desktop margins are not specified, their fallback values are 0 (and mobile margins will have that value set as well) */
    margin-top: ${({ mobileMarginTop, marginTop }) =>
      mobileMarginTop ? `${mobileMarginTop}px` : `${marginTop}px`};
    margin-bottom: ${({ mobileMarginBottom, marginBottom }) =>
      mobileMarginBottom ? `${mobileMarginBottom}px` : `${marginBottom}px`};
    margin-left: ${({ mobileMarginLeft, marginLeft }) =>
      mobileMarginLeft ? `${mobileMarginLeft}px` : `${marginLeft}px`};
    margin-right: ${({ mobileMarginRight, marginRight }) =>
      mobileMarginRight ? `${mobileMarginRight}px` : `${marginRight}px`};

    ::before {
      /* Mobile width for ::before: if mobileWidth is not specified, it's fallback value  will be 100% */
      width: ${({ mobileWidth }) =>
        mobileWidth ? `${mobileWidth}px` : "100%"};
    }
  }
`;

const Skeleton = ({
  width,
  height,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  mobileMarginTop,
  mobileMarginBottom,
  mobileMarginLeft,
  mobileMarginRight,
  borderRadius,
  backgroundColor,
  mobileWidth,
  mobileHeight,
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
      mobileWidth={mobileWidth}
      mobileHeight={mobileHeight}
    />
  );
};

export default Skeleton;
