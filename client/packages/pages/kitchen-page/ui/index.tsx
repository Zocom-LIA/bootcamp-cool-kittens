import { useEffect, useContext } from "react";
import { AppContext } from "@zocom/app-context";
import "./style.scss";
// import { filteredOrderData } from ".."
import { Header } from "@zocom/page-header";
import { KitchenStatusColumn } from "@zocom/kitchen-status-column";

export const KitchenPage = () => {

  // const {fetchFilteredOrders} = filteredOrderData();

  const statusList = ["preparing", "ready"]

  const {ordersByStatus, setOrdersByStatus} = useContext(AppContext);

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
      
    } catch (error) {
      console.error(error, `Failed to fetch ${orderStatus} orders`);
    }
  }

  useEffect(()=> {
    statusList.forEach((orderStatus) => fetchFilteredOrders(orderStatus))
  }, [])

  console.log(ordersByStatus);

  return (
    <section className="kitchen-page">
      <Header/>
      <main className="kitchen-wrap">
        {
          statusList.map((orderStatus) => (
            <KitchenStatusColumn 
            orders={ordersByStatus[orderStatus]}
            title={orderStatus}
            />
          ))
        }
      </main>
    </section> 
  );
};