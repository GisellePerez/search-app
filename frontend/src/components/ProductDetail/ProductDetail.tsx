import React, { ReactElement, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import apiRoutes from "../../constants/apiRoutes";

export type ProductDetailType = {};

const ProductDetail = (): ReactElement => {
  const { id } = useParams<{ id: string }>();

  const [itemData, setItemData] = useState(null);

  const handleFetchItemById = async () => {
    try {
      const response = await fetch(`${apiRoutes.expressApi}/api/items/${id}`);
      const data = await response.json();

      setItemData(data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    handleFetchItemById();
  }, [id]);

  return (
    <div>
      <p>ProductDetail works</p>
    </div>
  );
};

export default ProductDetail;
