import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/client";
import { sendResponse } from "../../responses";

exports.handler = async (event) => {
  const { category } = event.pathParameters;
  const categoryValue = category;

  try {
    const command = new QueryCommand({
      TableName: "yygs-menu",
      IndexName: "filterByCategory",
      KeyConditionExpression: "category = :category",
      ExpressionAttributeValues: {
        ":category": categoryValue,
      },
    });

    const response = await docClient.send(command);
    const filteredMenuItems = response.Items;

    return sendResponse(200, {
      success: true,
      message: "Retrieved menu by category",
      filteredMenuItems: filteredMenuItems,
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
      message: "Unable to filter menu items by category",
      error,
    });
  }
};
