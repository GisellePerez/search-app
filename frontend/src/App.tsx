import React, { useEffect, useState } from "react";
import styled from "styled-components";

import apiRoutes from "./constants/apiRoutes";

const Title = styled.h1`
  color: gray;
`;

function App() {
  const [test, setTest] = useState("");

  const handleSearchByQuery = async () => {
    const query = "bicicleta";

    fetch(`${apiRoutes.expressApi}/api/items?q=${query}`, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((data) => console.log(data))
      .catch((error) => error);
  };

  const handleFetchItemById = async () => {
    const id = "MLA601795056";

    fetch(`${apiRoutes.expressApi}/api/items/${id}`, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((data) => console.log(data))
      .catch((error) => error);
  };

  useEffect(() => {
    handleSearchByQuery();
    handleFetchItemById();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Title>Hello world!</Title>
        <p>{test}</p>
      </header>
    </div>
  );
}

export default App;
