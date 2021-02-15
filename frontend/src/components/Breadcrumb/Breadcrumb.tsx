import React, { ReactElement } from "react";
import styled from "styled-components";
import theme from "../../constants/theme";
import { ParagraphSmall } from "../../utils/Paragraph";

const Wrapper = styled.section`
  margin: 16px 0;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;

  list-style: none;

  li {
    display: inline-flex;

    ::after {
      content: ">";

      padding: 0 6px;

      color: ${theme.color.gray2};
      font-weight: ${theme.fontWeight.light};
    }

    &:last-of-type {
      p {
        font-weight: ${theme.fontWeight.medium};
      }

      ::after {
        content: "";
      }
    }
  }
`;

/**
 * Component for showing breadcrumb in the differnt pages.
 *
 * @component
 * @param   {string[]} categories  Array of category names
 */

type BreadcrumbType = {
  categories: string[];
};

const Breadcrumb = ({ categories }: BreadcrumbType): ReactElement => {
  return (
    <Wrapper>
      {/*
       * List of categories
       */}
      {categories && categories.length > 0 ? (
        <List>
          {categories.map((category: string) => {
            return (
              <li key={category}>
                <ParagraphSmall color={theme.color.gray2}>
                  {category}
                </ParagraphSmall>
              </li>
            );
          })}
        </List>
      ) : null}
    </Wrapper>
  );
};

export default Breadcrumb;
