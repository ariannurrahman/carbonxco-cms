import VIPApi from 'api';
import { CreateCustomerPayload, Customer, CustomerGetAllResponse, CustomerQueryParams } from 'types/Customer';

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
