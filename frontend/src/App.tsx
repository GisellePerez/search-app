import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProductsList from "./components/ProductsList/ProductsList";
import SearchBar from "./components/SearchBar/SearchBar";

const Title = styled.h1`
  color: gray;
`;

function App() {
  return (
    <div className="App">
      <section>
        <Router>
          <header className="App-header">
            <SearchBar placeholder="Nunca dejes de buscar" />
          </header>
          <ul>
            <li>
              <Link to="/items">Items</Link>
            </li>
            <li>
              <Link to="/items/MLA601795056">Item id</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/items" component={ProductsList} />
            <Route path="/items/:id" component={ProductDetail} />
          </Switch>
        </Router>
      </section>
    </div>
  );
}

export default App;
