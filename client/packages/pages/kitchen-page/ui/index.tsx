// KitchenPage.jsx

import React, { useState, useEffect } from "react";
import "./style.scss";
import { KitchenOrderItem } from "@zocom/kitchen-item";
import { fetchOrdersFromApi } from "../data"; // Adjust the path based on your project structure

type OrderItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
};

export const KitchenPage = () => {
  // State to manage order items
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch orders when the component mounts
    const fetchData = async () => {
      try {
        const data = await fetchOrdersFromApi();
        setOrderItems(data);
      } catch (error) {
        // Handle error as needed
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="kitchen-page">
      <h1>Kitchen Page</h1>
      <p>Welcome to the kitchen! This is where the magic happens.</p>

      <section className="order-list">
        {isLoading ? (
          <p>Loading orders...</p>
        ) : (
          // Map through the fetched orders and render KitchenOrderItem for each
          orderItems.map((item) => (
            <KitchenOrderItem key={item.id} orderItem={item} />
          ))
        )}
      </section>
    </div>
  );
};


// export default KitchenPage;