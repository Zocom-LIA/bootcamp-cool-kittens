import { differenceInMinutes, parse, format } from 'date-fns';

export const calculateETA = (deliveryTime: string) => {
    if(deliveryTime) {
      const currentTime = format(
        new Date(),
        "yyyy-MM-dd HH:mm:ss"
      );
      console.log("current", currentTime);
      console.log("delivery", deliveryTime);
    
      const parsedDeliveryTime = parse(deliveryTime, "yyyy-MM-dd HH:mm:ss", new Date())
      const parsedCurrentTime = parse(currentTime, "yyyy-MM-dd HH:mm:ss", new Date())
      
      // const remainingMinutes = differenceInMinutes(parsedDeliveryTime, parsedCurrentTime)
      const remainingMinutes = differenceInMinutes(parsedCurrentTime, parsedDeliveryTime,)
      console.log("REmaining", remainingMinutes);
      
      return remainingMinutes
    }
    return 0
  }