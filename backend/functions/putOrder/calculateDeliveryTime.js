export const calculateDeliveryTime = (orderItems) => {
  const preparationTimePerMeal = 1; // in minutes
  const averageDeliveryTime = 5; // in minutes

  let totalPreparationTime = 0;
  orderItems.forEach((item) => {
    totalPreparationTime += item.quantity * preparationTimePerMeal;
  });

  const currentTimestamp = new Date();
  const estimatedDeliveryTime = new Date(
    currentTimestamp.getTime() +
      totalPreparationTime * 60 * 1000 +
      averageDeliveryTime * 60 * 1000
  );

  return estimatedDeliveryTime.toISOString();
};
