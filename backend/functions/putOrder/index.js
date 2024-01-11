import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses/index";
import { generateOrderNumber } from "./generateOrderNr";
import { generateTimestamp } from "./generateTimeStamp";
import { calculateTotalPrice } from "./calculateTotalPrice";
import { calculateDeliveryTime } from "./calculateDeliveryTime";
import { format } from "date-fns";

exports.handler = async (event) => {
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
        timeCooked: "",
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
