import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  const orderStatus = event.pathParameters.status;
  const orderStatusValue = orderStatus;

  const timeStampValue = event.queryStringParameters
    ? event.queryStringParameters.timeStamp
    : null;

  try {
    console.log(
      "Querying orders with status:",
      orderStatusValue,
      "and timestamp:",
      timeStampValue
    );

    const command = new QueryCommand({
      TableName: "yygs-orders",
      IndexName: "filterByStatus",
      KeyConditionExpression:
        "#orderStatus = :orderStatus AND #timeStamp >= :timeStamp",
      ExpressionAttributeValues: {
        ":orderStatus": orderStatusValue,
        ":timeStamp": timeStampValue,
      },
      ExpressionAttributeNames: {
        "#orderStatus": "orderStatus",
        "#timeStamp": "timeStamp",
      },
    });

    const response = await docClient.send(command);
    const filteredOrders = response.Items;

    return sendResponse(200, {
      success: true,
      message: "Retreived orders by timestamp and status",
      filteredOrders: filteredOrders,
      timestamp: timeStampValue,
      orderStatus: orderStatusValue,
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Unable to retreive orders by timestamp and status",
      timestamp: timeStampValue,
      orderstatus: orderStatusValue,
      error: error,
    });
  }
};
