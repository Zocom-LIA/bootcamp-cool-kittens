import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses/index";
import { generateOrderNumber } from "./generateOrderNr";
import { generateTimestamp } from "./generateTimeStamp";
import { calculateTotalPrice } from "./calculateTotalPrice";

exports.handler = async (event) => {
  const orderItems = JSON.parse(event.body).orderItems;
  const orderNr = generateOrderNumber();

  try {
    const command = new PutCommand({
      TableName: "yygs-orders",
      Item: {
        orderNr: orderNr,
        timeStamp: generateTimestamp(),
        totalPrice: calculateTotalPrice(orderItems),
        orderItems: orderItems,
        // status: status,
        // deliveryTime: deliveryTime,
      },
    });

    const response = await docClient.send(command);

    return sendResponse(200, {
      success: true,
      message: "A new order has been added to database",
      orderNr: orderNr,
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Unable to add order to database",
    });
  }
};
