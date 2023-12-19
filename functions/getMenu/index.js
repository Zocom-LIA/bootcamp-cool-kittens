import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
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
