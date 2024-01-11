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
      const BASE_URL = import.meta.env.VITE_API_BASE_URL
      const API_ENDPOINT = `filterOrders/${orderStatus}?timeStamp=${todaysDate}`
      const API_URL = BASE_URL + API_ENDPOINT
      const response = await fetch(API_URL,
        {
          method: 'GET',
          headers: {
            authorization: `${import.meta.env.VITE_AUTH_API_KEY}`
          }
        })
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

  return (
    <section className="kitchen-page">
      <Header/>
      <main className="kitchen-wrap">
        {
          statusList.map((orderStatus) => (
            <KitchenStatusColumn 
            orders={ordersByStatus[orderStatus]}
            name={orderStatus}
            />
          ))
        }
      </main>
    </section> 
  );
};