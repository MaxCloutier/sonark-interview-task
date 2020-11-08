import { removeToken } from "./common";
import axios from './axios'

export const getCostumer = async (id) => {
  try {
    const response = await axios.get(`/customers/${id}`);

    return response.data
  } catch ({response}) {
    return handleError(response)
  }
};

export const getCostumers = async (filters = '') => {
  try {
    const response = await axios.get(`/customers${filters ? `?${filters}` : ''}`);

    return response.data
  } catch ({response}) {
    return handleError(response)
  }
};

export const getCostumersFilters = async () => {
  try {
    const response = await axios.get("/customers-filters");

    return response.data
  } catch ({response}) {
    return handleError(response)
  }
};

export const getCostumerOrders = async (id) => {
  try {
    const response = await axios.get(`/customers/${id}/orders`);

    return response.data
  } catch ({response}) {
    return handleError(response)
  }
};

async function handleError(response) {
  if (!response) {
    return
  }

  const { status } = response

  if (status === 401) {
    removeToken()
  }

  if (status !== 200) {
    throw response.data
  }
}
