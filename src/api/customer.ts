import VIPApi from 'api';
import {
  CreateCustomerItemPayload,
  CreateCustomerPayload,
  Customer,
  CustomerGetAllItemsResponse,
  CustomerGetAllResponse,
  CustomerItemQueryParams,
  CustomerQueryParams,
  UpdateCustomerItemPayload,
} from 'types/Customer';

export const getAllCustomer = async ({ pagination, query }: CustomerQueryParams) => {
  const { page = 1, limit = 15 } = pagination;
  const { query_customer_name = '' } = query;
  const response = await VIPApi.get<CustomerGetAllResponse>(
    `customers?page=${page}&limit=${limit}&query_customer_name=${query_customer_name}`,
  );
  return response.data;
};

export const createCustomer = async (data: CreateCustomerPayload) => {
  const response = await VIPApi.post('customers', data);
  return response.data;
};

export const updateCustomer = async (data: Customer) => {
  const response = await VIPApi.put(`customers/${data.id}`, data);
  return response.data;
};

export const getAllCustomerItems = async ({ customerId, pagination, query }: CustomerItemQueryParams) => {
  const { page = 1, limit = 15 } = pagination;
  const { query_item_name = '' } = query;
  const response = await VIPApi.get<CustomerGetAllItemsResponse>(
    `customers/${customerId}/customer_items?page=${page}&limit=${limit}&query_item_name=${query_item_name}`,
  );
  return response.data;
};

export const createCustomerItem = async (data: CreateCustomerItemPayload) => {
  const response = await VIPApi.post(`customers/${data.customer_id}/customer_items`, data);
  return response.data;
};

export const updateCustomerItem = async (data: UpdateCustomerItemPayload) => {
  const response = await VIPApi.put(`/customer_items/${data.customer_id}`, data);
  return response.data;
};
