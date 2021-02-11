import React, { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiRoutes from "../../constants/apiRoutes";

export type ProductsListType = {};

const ProductsList = (): ReactElement => {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);
  console.log("searchParam", searchParam.get("search"));

  const [products, setProducts] = useState(null);

  const handleSearchByQuery = async () => {
    try {
      const response = await fetch(
        `${apiRoutes.expressApi}/api/items?q=${searchParam.get("search")}`
      );
      const data = await response.json();

      console.log("search", data);
      setProducts(data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    handleSearchByQuery();
  }, [location]);

  return (
    <div>
      <p>ProductsList works</p>
    </div>
  );
};

export default ProductsList;
