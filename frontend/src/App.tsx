import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: gray;
`;

function App() {
  const [test, setTest] = useState("");

  const fetchResponse = () => {
    fetch("http://localhost:9000/users")
      .then((res) => res.text())
      .then((res) => setTest(res))
      .catch((err) => err);
  };

  useEffect(() => {
    fetchResponse();
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
