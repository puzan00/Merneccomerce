import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        try {
            if (!token) return;

            const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, {
                headers: { token }
            });

            if (response.data.success) {
                let allOrdersItem = [];

                response.data.orders.forEach((order) => {
                    order.items.forEach((item) => {
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        allOrdersItem.push(item);
                    });
                });

                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadOrderData();
    }, [token]);
    //  Helper function to get status color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return "bg-green-100 text-green-800"
            case "shipped":
                return "bg-blue-100 text-blue-800"
            case "processing":
                return "bg-yellow-100 text-yellow-800"
            case "cancelled":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="border-b pb-6">
                <h1 className="text-3xl font-bold tracking-tight">
                    <span className="text-gray-900">MY</span> <span className="text-gray-700">ORDERS</span>
                </h1>
            </div>

            {orderData.length === 0 ? (
                <div className="py-12 text-center">
                    <p className="text-gray-500">You don't have any orders yet.</p>
                </div>
            ) : (
                <div className="mt-6 space-y-6">
                    {orderData.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6">
                                {/* Left - Product Image */}
                                <div className="md:col-span-2 flex justify-center md:justify-start">
                                    <img
                                        className="w-24 h-24 object-cover rounded-md"
                                        src={item.image && item.image[0] ? item.image[0] : "https://via.placeholder.com/80"}
                                        alt={item.name}
                                    />
                                </div>

                                {/* Middle - Product Details */}
                                <div className="md:col-span-6 flex flex-col justify-center">
                                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-700">
                                        <p className="flex items-center">
                                            <span className="font-medium mr-2">Price:</span>
                                            <span className="text-gray-900 font-semibold">
                                                {currency}
                                                {item.price}
                                            </span>
                                        </p>
                                        <p className="flex items-center">
                                            <span className="font-medium mr-2">Quantity:</span> {item.quantity}
                                        </p>
                                        <p className="flex items-center">
                                            <span className="font-medium mr-2">Size:</span> {item.size}
                                        </p>
                                        <p className="flex items-center">
                                            <span className="font-medium mr-2">Payment:</span> {item.paymentMethod}
                                        </p>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Ordered on{" "}
                                        {new Date(item.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>

                                {/* Right - Status and Actions */}
                                <div className="md:col-span-4 flex flex-col md:items-end justify-between">
                                    <div className="flex items-center justify-between w-full md:justify-end md:space-x-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                        <div className="flex-shrink-0">
                                            <button
                                                onClick={loadOrderData}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                            >
                                                Track Order
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4 md:mt-0 w-full md:w-auto">
                                        <div className="text-xs text-gray-500 md:text-right">Order ID: #{index + 1000}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Orders
