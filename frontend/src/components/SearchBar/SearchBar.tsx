import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styled from "styled-components";
import theme from "../../constants/theme";

import logo from "../../assets/Logo_ML.png";
import logo2x from "../../assets/Logo_ML@2x.png";
import searchIcon from "../../assets/ic_Search.png";
import searchIcon2x from "../../assets/ic_Search@2x.png";

const Wrapper = styled.div`
  background: ${theme.color.yellow};
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 44px 1fr;
  grid-gap: 24px;

  width: 100%;
  max-width: 1240px;

  padding: 8px 20px;
  margin-right: auto;
  margin-left: auto;

  box-sizing: border-box;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    width: 100%;
    padding: 8px 16px;
  }
`;

const LogoWrapper = styled.div`
  align-self: center;

  width: 44px;
  height: 32px;

  box-sizing: border-box;

  img {
    height: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  align-self: center;

  box-sizing: border-box;
`;

const Label = styled.label`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); // IE6, IE7
  clip: rect(1px, 1px, 1px, 1px);
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;

  font-family: ${theme.fontFamily.montserrat};
  font-size: ${theme.fontSize.regular};
  font-weight: ${theme.fontWeight.light};

  border: none;
  box-sizing: border-box;
  border-radius: 4px 0 0 4px;

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: ${theme.color.gray3};
    font-family: ${theme.fontFamily.montserrat};
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: ${theme.color.gray3};
    font-family: ${theme.fontFamily.montserrat};
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: ${theme.color.gray3};
    font-family: ${theme.fontFamily.montserrat};
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: ${theme.color.gray3};
    font-family: ${theme.fontFamily.montserrat};
  }
`;

const Button = styled.button`
  padding: 0;
  width: 40px;
  height: 40px;

  background-color: ${theme.color.gray4};
  box-sizing: border-box;
  border: none;
  border-radius: 0 4px 4px 0;
  transition: all ease 0.2s;

  img {
    height: 16px;
  }

  &:hover {
    background-color: ${theme.color.gray3};
    cursor: pointer;
  }
`;

/**
 * Component for showing cards of each product in the list of results.
 *
 * @component
 * @param   {string} label Custm label for input. For a11y purposes. It's hidden with css, but available for screen readers
 * @param   {string} placeholder Custom placeholder
 */
type SearchBarType = {
  label?: string;
  placeholder?: string;
};

const SearchBar = ({ placeholder, label }: SearchBarType) => {
  /**
   * Use useHistory hook from react-router-dom
   */
  const history = useHistory();

  /**
   * Initial state for input value
   */
  const [inputValue, setInputValue] = useState("");

  /**
   * Get input value when change event is fired
   */
  const handleChange = (e: any): void => {
    setInputValue(e.target.value);
  };

  /**
   * If query isn't empty string, it will change the url to fetch data from server
   */
  const handleSubmit = (e: any): void => {
    e.preventDefault();
    if (inputValue !== "") {
      history.push({
        pathname: "/items",
        search: `?search=${inputValue}`,
      });
    }

    /**
     *  Clear input after search is done
     */
    setInputValue("");
  };

  return (
    <Wrapper>
      <ContentWrapper>
        {/* Logo with link to redirect to home */}
        <LogoWrapper>
          <Link to="/">
            <picture>
              <source
                srcSet={logo2x}
                media="(min-width:650px)"
                type="image/png"
              />
              <img src={logo} alt="Mercado Libre" />
            </picture>
          </Link>
        </LogoWrapper>

        {/* Input */}
        <Form>
          {/* Label (hidden with styles, but available for screen readers) */}
          <Label>{label ? label : "Ingresá lo que quieras encontrar"}</Label>

          {/* Input */}
          <Input
            aria-label="Ingresá lo que quieras encontrar"
            type="text"
            name="search"
            placeholder={placeholder ? placeholder : ""}
            onChange={(e) => handleChange(e)}
            value={inputValue}
          />

          {/* Button */}
          <Button type="submit" onClick={(e) => handleSubmit(e)}>
            <picture>
              <source
                srcSet={searchIcon2x}
                media="(min-width:650px)"
                type="image/png"
              />
              <img src={searchIcon} alt="Buscar" />
            </picture>
          </Button>
        </Form>
      </ContentWrapper>
    </Wrapper>
  );
};

export default SearchBar;
