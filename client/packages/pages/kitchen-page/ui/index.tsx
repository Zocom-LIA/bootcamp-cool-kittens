import { useState, useEffect } from "react";
import "./style.scss";
// import { filteredOrderData } from ".."
import { Header } from "@zocom/page-header";
import { KitchenStatusColumn } from "@zocom/kitchen-status-column";

type Order = {
  orderNr: string;
  orderItems: [];
  orderStatus: string;
  timeStamp: string;
  deliveryTime: string;
  totalPrice: number;
}

export const KitchenPage = () => {

  // const {fetchFilteredOrders} = filteredOrderData();

  const statusList = ["preparing", "ready"]

  const [ordersByStatus, setOrdersByStatus] = useState<{
    [orderStatus: string]: Order[];
  }>({});

  const today = new Date();
  const todaysDate = today.toISOString().split("T")[0] + " 00:00:00";

  const fetchFilteredOrders = async (orderStatus: string) => {
    try {
      const URL = `https://s1ev3z9454.execute-api.eu-north-1.amazonaws.com/api/filterOrders/${orderStatus}?timeStamp=${todaysDate}`;
      const response = await fetch(URL)
      const data = await response.json()
      console.log(data);
      

      setOrdersByStatus((prevOrders) => ({
        ...prevOrders,
        [orderStatus]: data.filteredOrders
      }))

      // console.log(ordersByStatus);
      
      
    } catch (error) {
      console.error(error, `Failed to fetch ${orderStatus} orders`);
    }
  }

  useEffect(()=> {
    statusList.forEach((orderStatus) => fetchFilteredOrders(orderStatus))
  }, [])

  console.log(ordersByStatus);
  

  const updateOrderStatus = async (orderNr: string) => {
    const API_URL = "https://s1ev3z9454.execute-api.eu-north-1.amazonaws.com/api/updateOrderStatus"
    const response = await fetch(API_URL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderNr: orderNr,
        orderStatus: "ready",
      }),
    })

    await response.json()
    setOrdersByStatus((prevOrders) => {
      const updatedOrders = prevOrders["preparing"].filter((order) => order.orderNr !== orderNr);
      return {
        ...prevOrders,
        preparing: updatedOrders,
        ready: [...prevOrders["ready"], ...updatedOrders], // Move the order to the "ready" status
      };
    });
  }

  return (
    <section className="kitchen-page">
      <Header/>
      <main className="kitchen-wrap">
        {
          statusList.map((orderStatus) => (
            <KitchenStatusColumn 
            orders={ordersByStatus[orderStatus]}
            name={orderStatus}
            buttonAction={() => updateOrderStatus(ordersByStatus[orderStatus].orderNr)}
            />
          ))
        }
      </main>
    </section> 
  );
};