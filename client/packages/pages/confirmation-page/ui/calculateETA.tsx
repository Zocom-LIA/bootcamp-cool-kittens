import { differenceInMinutes } from 'date-fns';

export const calculateETA = (deliveryTime: string) => {
    if(deliveryTime) {
      const currentTime = new Date().toISOString();
    
      const remainingMinutes = differenceInMinutes(deliveryTime, currentTime)
      
      return remainingMinutes
    }
    return 0
  }