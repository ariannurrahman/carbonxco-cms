import dayjs from 'dayjs';

export const numberFormatter = (value: string) => {
  if (!value) return '';
  return parseInt(value!.replace(/\$\s?|(,*)/g, ''));
};

export const thousandFormatter = (value: string | undefined) => {
  if (!value) return '';
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const dollarFormatter = (value: string | undefined) => {
  if (!value) return '';
  return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return '-';
  return dayjs(dateStr).format('DD-MM-YYYY');
};
