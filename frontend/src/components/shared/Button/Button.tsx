import React, { ReactElement } from "react";
import styled from "styled-components";
import theme from "../../../constants/theme";

const PrimaryButton = styled.button<{ fullWidth: boolean }>`
  margin-top: 32px;
  padding: 0 24px;
  height: 48px;
  width: ${({ fullWidth }): string => (fullWidth ? "100%" : "auto")};

  color: ${theme.color.white};
  font-size: ${theme.fontSize.regular};
  font-weight: ${theme.fontWeight.semibold};
  font-family: ${theme.fontFamily.montserrat};
  line-height: 48px;
  text-align: center;

  background-color: ${theme.color.blue1};
  border: none;
  border-radius: 6px;
  transition: all ease 0.2s;

  &:hover {
    cursor: pointer;
    background-color: ${theme.color.blue2};
  }

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    height: 42px;
    line-height: 42px;
  }
`;

type ButtonType = {
  type: "primary" | "secondary";
  children: any;
  onClick: () => any;
  fullWidth?: boolean;
};

/**
 * Component to show a button that triggers an action.
 *
 * @component
 * @param   {any} children Children inside the button to make it more dynamic
 * @param   {() => any} onClick Function that should trigger on click event
 * @param   {string} type For scalability purposes. It should change its appearance according to type
 * @param   {boolean} fullWidth Determines if the button takes all space available
 */
const Button = ({
  children,
  onClick,
  type = "primary",
  fullWidth = false,
}: ButtonType): ReactElement => {
  switch (type) {
    /** case 'primary' */
    case "primary":
      return (
        <PrimaryButton onClick={onClick} fullWidth={fullWidth}>
          {children}
        </PrimaryButton>
      );

    /** Your code for 'secondary' button goes here */

    /** default case is 'primary' */
    default:
      return (
        <PrimaryButton onClick={onClick} fullWidth={fullWidth}>
          {children}
        </PrimaryButton>
      );
  }
};

export default Button;
