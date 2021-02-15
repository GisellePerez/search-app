import React from "react";
import styled from "styled-components";
import theme from "../constants/theme";

/**
 * Components that return titles with different sizes and weights.
 *
 * @component
 * @param   {number} weight Custom font weight
 * @param   {string} color Custom color. Should be passed as hexadecimal. E.g.: #dedede
 * @param   {string} size Custom font size
 */
type GenericTitleType = {
  size?: string;
  weight?: number;
  color?: string;
};

const H1 = styled.h1<GenericTitleType>`
  margin: 0;

  font-size: ${({ size }) => (size ? size : theme.fontSize.extraLarge)};
  font-weight: ${({ weight }) => (weight ? weight : theme.fontWeight.light)};
  font-family: ${theme.fontFamily.montserrat};
  color: ${({ color }) => (color ? color : theme.color.gray1)};
`;

const H2 = styled.h2<GenericTitleType>`
  margin: 0;

  font-size: ${({ size }) => (size ? size : theme.fontSize.large)};
  font-weight: ${({ weight }) => (weight ? weight : theme.fontWeight.light)};
  font-family: ${theme.fontFamily.montserrat};
  color: ${({ color }) => (color ? color : theme.color.gray1)};
`;

const H3 = styled.h3<GenericTitleType>`
  margin: 0;

  font-size: ${({ size }) => (size ? size : theme.fontSize.medium)};
  font-weight: ${({ weight }) => (weight ? weight : theme.fontWeight.light)};
  font-family: ${theme.fontFamily.montserrat};
  color: ${({ color }) => (color ? color : theme.color.gray1)};
`;

const H4 = styled.h4<GenericTitleType>`
  margin: 0;

  font-size: ${({ size }) => (size ? size : theme.fontSize.medium)};
  font-weight: ${({ weight }) => (weight ? weight : theme.fontWeight.light)};
  font-family: ${theme.fontFamily.montserrat};
  color: ${({ color }) => (color ? color : theme.color.gray1)};
`;

const H5 = styled.h5<GenericTitleType>`
  margin: 0;

  font-size: ${({ size }) => (size ? size : theme.fontSize.small)};
  font-weight: ${({ weight }) => (weight ? weight : theme.fontWeight.light)};
  font-family: ${theme.fontFamily.montserrat};
  color: ${({ color }) => (color ? color : theme.color.gray1)};
`;

const H6 = styled.h6<GenericTitleType>`
  margin: 0;

  font-size: ${({ size }) => (size ? size : theme.fontSize.small)};
  font-weight: ${({ weight }) => (weight ? weight : theme.fontWeight.light)};
  font-family: ${theme.fontFamily.montserrat};
  color: ${({ color }) => (color ? color : theme.color.gray1)};
`;

export { H1, H2, H3, H4, H5, H6 };
