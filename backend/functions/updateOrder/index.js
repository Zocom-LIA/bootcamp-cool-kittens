import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { sendResponse } from "../../responses";
import { docClient } from "../../services/client";

exports.handler = async (event) => {
  const { orderNr, orderStatus, timeCooked } = JSON.parse(event.body);

  try {
    const command = new UpdateCommand({
      TableName: "yygs-orders",
      Key: { orderNr: orderNr },
      UpdateExpression:
        "set #statusField = :orderStatus, #timeCookedField = :timeCooked",
      ExpressionAttributeNames: {
        "#statusField": "orderStatus",
        "#timeCookedField": "timeCooked",
      },
      ExpressionAttributeValues: {
        ":orderStatus": orderStatus,
        ":timeCooked": timeCooked,
      },
      ReturnValues: "ALL_NEW",
    });

    const response = await docClient.send(command);
    const updatedOrder = response.Attributes;

    return sendResponse(200, {
      success: true,
      message: "Order has been updated",
      order: updatedOrder,
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Unable to update order",
      error,
    });
  }
};
