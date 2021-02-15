import React, { ReactElement } from "react";
import styled from "styled-components";
import theme from "../../../constants/theme";

type GenericParagraphType = {
  fontSize: string;
  fontWeight: number;
  color: string;
};

const Paragraph = styled.p<GenericParagraphType>`
  margin: 0;

  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-family: ${theme.fontFamily.montserrat};
  color: ${({ color }) => (color ? color : theme.color.gray1)};
`;

/**
 * Components that return paragraphs with different sizes and weights.
 *
 * @component
 * @param   {number} fontWeight Custom font weight
 * @param   {string} color Custom color. Should be passed as hexadecimal. E.g.: #dedede
 * @param   {string} fontSize Custom font size
 * @param   {any} children Accepts any kind of children
 */

type ParagraphType = {
  fontWeight?: number;
  color?: string;
  fontSize?: string;
  children: any;
};

const ParagraphExtraSmall = ({
  fontWeight,
  color,
  children,
}: ParagraphType): ReactElement => {
  return (
    <Paragraph
      fontSize={theme.fontSize.extraSmall}
      fontWeight={fontWeight ? fontWeight : theme.fontWeight.light}
      color={color ? color : theme.color.gray1}
    >
      {children}
    </Paragraph>
  );
};

const ParagraphSmall = ({
  fontWeight,
  color,
  children,
}: ParagraphType): ReactElement => {
  return (
    <Paragraph
      fontSize={theme.fontSize.small}
      fontWeight={fontWeight ? fontWeight : theme.fontWeight.light}
      color={color ? color : theme.color.gray1}
    >
      {children}
    </Paragraph>
  );
};

const ParagraphMedium = ({
  fontWeight,
  color,
  children,
}: ParagraphType): ReactElement => {
  return (
    <Paragraph
      fontSize={theme.fontSize.medium}
      fontWeight={fontWeight ? fontWeight : theme.fontWeight.light}
      color={color ? color : theme.color.gray1}
    >
      {children}
    </Paragraph>
  );
};

const ParagraphRegular = ({
  fontWeight,
  color,
  children,
}: ParagraphType): ReactElement => {
  return (
    <Paragraph
      fontSize={theme.fontSize.regular}
      fontWeight={fontWeight ? fontWeight : theme.fontWeight.light}
      color={color ? color : theme.color.gray1}
    >
      {children}
    </Paragraph>
  );
};

const ParagraphLarge = ({
  fontWeight,
  color,
  children,
}: ParagraphType): ReactElement => {
  return (
    <Paragraph
      fontSize={theme.fontSize.large}
      fontWeight={fontWeight ? fontWeight : theme.fontWeight.light}
      color={color ? color : theme.color.gray1}
    >
      {children}
    </Paragraph>
  );
};

const ParagraphExtraLarge = ({
  fontWeight,
  color,
  children,
}: ParagraphType): ReactElement => {
  return (
    <Paragraph
      fontSize={theme.fontSize.extraLarge}
      fontWeight={fontWeight ? fontWeight : theme.fontWeight.light}
      color={color ? color : theme.color.gray1}
    >
      {children}
    </Paragraph>
  );
};

export {
  ParagraphExtraSmall,
  ParagraphSmall,
  ParagraphRegular,
  ParagraphMedium,
  ParagraphLarge,
  ParagraphExtraLarge,
};
