import VIPApi from 'api';

export const getReports = async (month: string, year: string) => {
  const response = await VIPApi.get<any>(`invoice_report?invoice_month=${month}&invoice_year=${year}`);
  return response.data;
};
