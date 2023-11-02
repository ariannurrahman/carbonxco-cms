export const numberFormatter = (value: string) => {
  if (!value) return '';
  return parseInt(value!.replace(/\$\s?|(,*)/g, ''));
};

export const thousandFormatter = (value: string | undefined) => {
  if (!value) return '';
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const dollarFormatter = (value: string | undefined) => {
  if (!value) return '';
  return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
