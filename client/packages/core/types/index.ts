export type ItemMenu = {
  id: string, 
  title: string,
  desc: string,
  price: number,
  category: string
  ingredients?: [],
}

export type CartItemProps = {
  id: string, 
  title: string, 
  price: number,
  desc: string,
  quantity: number
}

export type Order = {
  orderNr: string;
  orderItems: [];
  orderStatus: string;
  timeStamp: string;
  deliveryTime: string;
  totalPrice: number;
  timeCooked: string;
}