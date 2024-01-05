export const calculateDeliveryTime = (orderItems) => {
  // Define delivery time parameters
  const preparationTimePerMeal = 5; // in minutes
  const averageDeliveryTime = 15; // in minutes

  // Calculate total preparation time based on the quantity of meals in the order
  let totalPreparationTime = 0;
  orderItems.forEach((item) => {
    totalPreparationTime += item.quantity * preparationTimePerMeal;
  });

  // Calculate the estimated delivery time
  const currentTimestamp = new Date();
  const estimatedDeliveryTime = new Date(
    currentTimestamp.getTime() +
      totalPreparationTime * 60 * 1000 +
      averageDeliveryTime * 60 * 1000
  );

  return estimatedDeliveryTime.toISOString();
};
