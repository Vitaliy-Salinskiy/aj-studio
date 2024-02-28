export const getDiscountPrice = (
  price: number,
  discount: number,
  quantity?: number
) => {
  if (quantity) {
    return (price * quantity - (price * quantity * discount) / 100).toFixed();
  }
  return (price - (price * discount) / 100).toFixed();
};

export const formatDate = (providedDate: Date) => {
  const date = new Date(providedDate);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString().slice(2);

  return `${day}/${month}/${year}`;
};
