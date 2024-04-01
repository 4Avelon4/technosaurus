import axios from 'axios';
import { API_BASE_URL } from '@/config';

export function productsRequest(page, productsPerPage, categoryId, colorId, priceFrom, priceTo) {
  return axios.get(`${API_BASE_URL}/api/products`, {
    params: {
      page,
      limit: productsPerPage,
      categoryId,
      colorId,
      minPrice: priceFrom,
      maxPrice: priceTo,
    },
  });
}

export function productRequest(id) {
  return axios.get(`${API_BASE_URL}/api/products/${id}`);
}

export function removeCart(userAccessKey, { productId }) {
  return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
    data: {
      productId,
    },
    params: {
      userAccessKey,
    },
  });
}
