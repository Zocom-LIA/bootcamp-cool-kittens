export const calculateTotalPrice = (orderItems) => {
  let totalPrice = 0;
  orderItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return totalPrice;
};
