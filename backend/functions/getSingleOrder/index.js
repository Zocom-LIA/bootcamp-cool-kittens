import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";
import middy from "@middy/core";
import { validateToken } from "../../middleware/auth";

exports.handler = async (event) => {


  if (event?.error && event?.error === '401')
  return sendResponse(401, {success: false , message: 'Invalid token' });

  const { orderNr } = event.pathParameters;

  try {
    const command = new GetCommand({
      TableName: "yygs-orders",
      Key: {
        orderNr: orderNr,
      },
    });

    const response = await docClient.send(command);
    const order = response.Item;

    if (!order) {
      return sendResponse(404, {
        success: false,
        message: `Order with order number: ${orderNr} not found`,
      });
    }

    return sendResponse(200, {
      success: true,
      message: `Order with order number: ${orderNr} fetched`,
      order: order,
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: `Unable to fetch order with order number: ${orderNr}`,
      error: error,
    });
  }
};

const validatedHandler = middy(handler).use(validateToken);

export { validatedHandler as handler };


