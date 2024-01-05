import { format } from "date-fns";

export const generateTimestamp = () => {
  const timeStamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  return timeStamp;
};
