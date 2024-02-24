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
