import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

const Label = styled.label`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); // IE6, IE7
  clip: rect(1px, 1px, 1px, 1px);
`;

// Placeholder and label are customizable
// Label is for a11y purposes. It's hidden with css, but abailable for screen readers
type SearchBarType = {
  label?: string;
  placeholder?: string;
};

const SearchBar = ({ placeholder, label }: SearchBarType) => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: any): void => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    if (inputValue !== "") {
      history.push({ pathname: "/items", search: `?search=${inputValue}` });
    }
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
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
