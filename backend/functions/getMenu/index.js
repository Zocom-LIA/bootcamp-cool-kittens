import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";
import middy from "@middy/core";
import { validateToken } from "../../middleware/auth";

exports.handler = async (event) => {

  if (event?.error && event?.error === '401')
      return sendResponse(401, {success: false , message: 'Invalid token' });


  try {
    const command = new ScanCommand({
      TableName: "yygs-menu",
    });

    const response = await docClient.send(command);
    const menu = response.Items;

    return sendResponse(200, { success: true, menu });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Unable to get menu",
      error,
    });
  }
};

const validatedHandler = middy(handler).use(validateToken);

export { validatedHandler as handler };
