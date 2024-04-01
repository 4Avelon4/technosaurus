import axios from 'axios';
import { API_BASE_URL } from '@/config';

export function orderInfoRequest(userAccessKey, orderId) {
  return axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
    params: {
      userAccessKey,
    },
  });
}

export function orderRequest(userAccessKey, formData) {
  return axios.post(
    `${API_BASE_URL}/api/orders`,
    {
      ...formData,
    },
    {
      params: {
        userAccessKey,
      },
    }
  );
}
