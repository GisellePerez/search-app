/**
 * Type for ProductCard.
 *
 * @type
 */
export type ProductCardType = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  description: string;
  address: {
    state_id: number;
    state_name: string;
    city_id: number;
    city_name: string;
  };
};

/**
 * Type for ProductDetail.
 *
 * @type
 */
export type ProductDetailType = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  description: string;
  categories: string[];
  sold_quantity: number;
};
