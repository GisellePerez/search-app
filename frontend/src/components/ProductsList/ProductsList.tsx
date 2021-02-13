import React, { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiRoutes from "../../constants/apiRoutes";
import ProductCard from "./ProductCard/ProductCard";

export type ProductsListType = {};

const ProductsList = (): ReactElement => {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);

  const [products, setProducts] = useState([]);

  const handleSearchByQuery = async () => {
    try {
      const response = await fetch(
        `${apiRoutes.expressApi}/api/items?q=${searchParam.get("search")}`
      );
      const data = await response.json();

      console.log("search", data);
      setProducts(data?.items);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    handleSearchByQuery();
  }, [location]);

  return (
    <div>
      <p>ProductsList</p>
      {products && products.length > 0
        ? products.map((item) => <ProductCard {...item} />)
        : "Cargando"}
      {/* TODO: add loading and skeletons */}
    </div>
  );
};

export default ProductsList;
