export const numberFormatter = (value: string) => {
  if (!value) return '0';
  return parseInt(value!.replace(/\$\s?|(,*)/g, ''));
};

export const thousandFormatter = (value: string | undefined) => {
  if (!value) return '0';
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const dollarFormatter = (value: string | undefined) => {
  if (!value) return '0';
  return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
