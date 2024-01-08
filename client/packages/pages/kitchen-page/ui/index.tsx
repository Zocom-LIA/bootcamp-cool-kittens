import { useState, useEffect } from "react";
import "./style.scss";
import { KitchenOrderItem } from "@zocom/kitchen-item";
import { filteredOrderData } from ".."
import { Header } from "@zocom/page-header";
import { PrimaryButton } from "@zocom/primary-button";

type Order = {
  orderNr: number;
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

      console.log(ordersByStatus);
      
      
    } catch (error) {
      console.error(error, `Failed to fetch ${orderStatus} orders`);
    }
  }

  useEffect(()=> {
    statusList.forEach((orderStatus) => fetchFilteredOrders(orderStatus))
  }, [])

  return (
    <section className="kitchen-page">
      <Header/>

      <main className="kitchen-wrap">

        {
          statusList.map((orderStatus) => (
            <aside>
              {
                ordersByStatus[orderStatus] && ordersByStatus[orderStatus].map((order) => (
                  <>
                    <h2>{order.orderNr}</h2>
                    <KitchenOrderItem orderItems={order.orderItems} />
                    <PrimaryButton title={orderStatus === "preparing" ? "Redo att serveras" : "Serverad"} className={orderStatus === "preparing" ? "red-bg" : "green-bg"}/>
                  </>
                ))
              }
            </aside>
          ))
        }
      </main>
    </section>
    // <div className="kitchen-page">
    //   <h1>Kitchen Page</h1>
    //   <p>Welcome to the kitchen! This is where the magic happens.</p>

    //   <section className="order-list">
    //     {isLoading ? (
    //       <p>Loading orders...</p>
    //     ) : (
    //       // Map through the fetched orders and render KitchenOrderItem for each
    //       orderItems.map((item) => (
    //         <KitchenOrderItem key={item.id} orderItem={item} />
    //       ))
    //     )}
    //   </section>

    //   <section>
    //     {
    //       ordersByStatus["preparing"].map((order) => (
    //         <p>{order.orderNr}</p>
    //       ))
    //     }
    //   </section>
    // </div>
  );
};


// export default KitchenPage;