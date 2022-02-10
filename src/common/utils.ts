//This function formats a number to currency
export const formatToCurrency = (value: number) =>
  Number(value).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });
