import axios from 'axios';
import { API_BASE_URL } from '@/config';

export function cartRequest(userAccessKey) {
  return axios.get(`${API_BASE_URL}/api/baskets`, {
    params: {
      userAccessKey,
    },
  });
}

export function addProduct(userAccessKey, { productId, amount }) {
  return axios.post(
    `${API_BASE_URL}/api/baskets/products`,
    {
      productId,
      quantity: amount,
    },
    {
      params: {
        userAccessKey,
      },
    }
  );
}

export function updateCart(userAccessKey, { productId, amount }) {
  return axios.put(
    `${API_BASE_URL}/api/baskets/products`,
    {
      productId,
      quantity: amount,
    },
    {
      params: {
        userAccessKey,
      },
    }
  );
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
