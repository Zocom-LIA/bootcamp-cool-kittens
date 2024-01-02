import { nanoid } from "nanoid";

export const generateOrderNumber = () => {
  const orderNr = nanoid();
  return orderNr;
};
