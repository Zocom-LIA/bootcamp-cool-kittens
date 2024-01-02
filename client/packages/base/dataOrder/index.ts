export type DataOrderItem = {
   itemId: string;
   itemName: string;
   itemPrice: number;
   quantity: number;
 };
 
export type DataOrder = {
    orderId: string;
    items: DataOrderItem[];
    totalAmount: number;
    status: OrderStatus;
    orderDate: Date;
  };
  
  
  type OrderStatus = 'InProgress' | 'Ready' | 'Delivered';
  