import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import theme from "../../constants/theme";

const Label = styled.label`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); // IE6, IE7
  clip: rect(1px, 1px, 1px, 1px);
`;

// Placeholder and label are customizable
// Label is for a11y purposes. It's hidden with css, but available for screen readers
type SearchBarType = {
  label?: string;
  placeholder?: string;
};

const SearchBar = ({ placeholder, label }: SearchBarType) => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: any): void => {
    // Get input value when change event is fired
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    // If query isn't empty string, it will change the url and trigger data fetch
    if (inputValue !== "") {
      history.push({ pathname: "/items", search: `?search=${inputValue}` });
    }

    // Clear input after search is done
    setInputValue("");
  };

  return (
    <form>
      <Label>{label ? label : "Introducí un texto para buscar"}</Label>
      <input
        aria-label="Buscar"
        type="text"
        name="search"
        placeholder={placeholder ? placeholder : ""}
        onChange={(e) => handleChange(e)}
        value={inputValue}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
