import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses/index";
import { calculateTotalPrice } from "./calculateTotalPrice";
import { calculateDeliveryTime } from "./calculateDeliveryTime";
import { nanoid } from "nanoid";
import { format } from "date-fns";

exports.handler = async (event) => {
  const orderItems = JSON.parse(event.body);
  const orderStatus = event.headers["x-order-status"] || undefined;

  const orderNr = nanoid();
  const timeStamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const totalPrice = calculateTotalPrice(orderItems);
  const deliveryTime = calculateDeliveryTime(orderItems);

  try {
    const command = new PutCommand({
      TableName: "yygs-orders",
      Item: {
        orderNr: orderNr,
        timeStamp: timeStamp,
        totalPrice: totalPrice,
        orderItems: orderItems,
        orderStatus: orderStatus,
        deliveryTime: deliveryTime,
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
