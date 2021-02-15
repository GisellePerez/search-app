import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProductsList from "./components/ProductsList/ProductsList";
import SearchBar from "./components/SearchBar/SearchBar";

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
