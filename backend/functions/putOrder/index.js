import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses/index";
import { generateOrderNumber } from "./generateOrderNr";
import { generateTimestamp } from "./generateTimeStamp";
import { calculateTotalPrice } from "./calculateTotalPrice";
import { calculateDeliveryTime } from "./calculateDeliveryTime";
import { format } from "date-fns";
import middy from "@middy/core";
import { validateToken } from "../../middleware/auth";

exports.handler = async (event) => {

  if (event?.error && event?.error === '401')
  return sendResponse(401, {success: false , message: 'Invalid token' });

  const orderItems = JSON.parse(event.body);
  const orderNr = generateOrderNumber();
  const orderStatus = event.headers["x-order-status"] || undefined;

  try {
    const command = new PutCommand({
      TableName: "yygs-orders",
      Item: {
        orderNr: orderNr,
        timeStamp: format(new Date(), "yyyy-MM-dd HH:mm:ss"), //Direkt här eller i separat funktion?
        totalPrice: calculateTotalPrice(orderItems),
        orderItems: orderItems,
        orderStatus: orderStatus,
        deliveryTime: calculateDeliveryTime(orderItems),
      },
    });

    await docClient.send(command);

    return sendResponse(200, {
      success: true,
      message: "A new order has been added to database",
      orderNr: orderNr,
    });
  } catch (error) {
    console.log("Error", error);
    return sendResponse(500, {
      success: false,
      message: "Unable to add order to database",
      error: error,
    });
  }
};

const validatedHandler = middy(handler).use(validateToken);

export { validatedHandler as handler };
