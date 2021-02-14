import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProductsList from "./components/ProductsList/ProductsList";
import SearchBar from "./components/SearchBar/SearchBar";
import theme from "./constants/theme";

const Title = styled.h1`
  color: gray;
`;

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <header className="App-header">
            <SearchBar placeholder="Nunca dejes de buscar" />
          </header>

          <Switch>
            <Route exact path="/items" component={ProductsList} />
            <Route path="/items/:id" component={ProductDetail} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
