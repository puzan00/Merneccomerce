import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const currency = "₹"; // Define the currency symbol (you can adjust this as needed)

  const fetchAllOrders = async () => {
    if (!token) {
      toast.error("No authentication token provided");
      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p> // Fallback message if no orders are available
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <img src={assets.parcel_icon} alt="Parcel Icon" style={{ width: '50px' }} />
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>;
                  } else {
                    return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>;
                  }
                })}
              </div>
              <p>{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ", "}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country}</p>
              </div>
              <p>{order.address.phone}</p>
              <div>
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p>{currency}{order.amount}</p>
              <select defaultValue="Order Placed">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;