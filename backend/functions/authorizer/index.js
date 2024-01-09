// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

exports.handler = async (event) => {
  console.log(event);
  //   console.log(process.env.VITE_AUTH_API_KEY);
  //   //   console.log(import.meta.env.VITE_AUTH_API_KEY);

  //   const secretKey = process.env.VITE_AUTH_API_KEY;
  //   //   const secretKey = import.meta.env.VITE_AUTH_API_KEY;

  let response = {
    isAuthorized: false,
  };

  if (
    event.headers.authorization === "DiIA4SPIxA80wwwYYsrwh2dtYL79LIJD7StpF08a"
  ) {
    response = {
      isAuthorized: true,
    };
  }

  return response;
};
