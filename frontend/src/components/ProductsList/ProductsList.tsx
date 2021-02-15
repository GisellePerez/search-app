import React, { ReactElement, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import apiRoutes from '../../constants/apiRoutes';
import theme from '../../constants/theme';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import SkeletonBreadcrumb from '../shared/Skeleton/SkeletonBreadcrumb';
import SkeletonProductCard from '../shared/Skeleton/SkeletonProductCard';
import ProductCard from './ProductCard/ProductCard';
import { ProductCardType } from './ProductsTypes';

const Wrapper = styled.section`
  width: 100%;
  max-width: 1240px;

  padding: 0 20px;
  margin-right: auto;
  margin-left: auto;

  box-sizing: border-box;

  @media screen and (max-width: ${theme.breakpoints.mobileLG}) {
    width: 100%;
    padding: 0 16px;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;

  box-sizing: border-box;
  list-style: none;

  li {
    border-bottom: 1px solid ${theme.color.gray4};

    a {
      text-decoration: none;
    }

    &:last-of-type {
      border-bottom: none;
    }
  }
`;

export type ProductsListType = {};

const ProductsList = (): ReactElement => {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchByQuery = async () => {
    try {
      const response = await fetch(
        `${apiRoutes.expressApi}/api/items?q=${searchParam.get('search')}`,
      );
      const data = await response.json();

      setProducts(data?.items);
      setCategories(data?.categories);
      setLoading(false);
    } catch (error) {
      console.log('error', error.message);
    }
  };

  useEffect(() => {
    handleSearchByQuery();
  }, [location]);

  return (
    <Wrapper>
      {!loading && categories && categories.length > 0 ? (
        <Breadcrumb categories={categories} />
      ) : (
        <SkeletonBreadcrumb />
      )}
      <List>
        {!loading && products && products.length > 0 ? (
          products.map((item: ProductCardType) => (
            <li key={item.id}>
              <Link to={`/items/${item.id}`}>
                <ProductCard {...item} />
              </Link>
            </li>
          ))
        ) : (
          <>
            <li>
              <SkeletonProductCard />
            </li>
            <li>
              <SkeletonProductCard />
            </li>
            <li>
              <SkeletonProductCard />
            </li>
            <li>
              <SkeletonProductCard />
            </li>
          </>
        )}
      </List>
      {/* TODO: add loading and skeletons */}
    </Wrapper>
  );
};

export default ProductsList;
