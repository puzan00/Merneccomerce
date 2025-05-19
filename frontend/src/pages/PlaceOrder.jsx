import React, { useState, useContext } from 'react';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const PlaceOrder = () => {
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    products,
    delivery_fee,
    getCartAmount
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [method, setMethod] = useState('cod');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === productId));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[productId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        method: method
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
            console.log(response.data);
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error('Error in placing order');
    }
  };

  return (
    <form
      className="flex flex-col lg:flex-row justify-between gap-6 pt-5 min-h-[80vh] container mx-auto px-4 py-8"
      onSubmit={onSubmitHandler}
    >
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Place Order</h1>

        {/* Delivery Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <Title text1="DELIVERY" text2="INFORMATION" />
          <div className="flex gap-3 my-3">
            <input name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First Name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
            <input name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last Name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
          </div>
          <div className="flex gap-3">
            <input name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email" type="email" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
            <input name="phone" value={formData.phone} onChange={onChangeHandler} placeholder="Phone Number" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
          </div>
          <div className="flex gap-3 mt-3">
            <input name="street" value={formData.street} onChange={onChangeHandler} placeholder="Street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
          </div>
          <div className="flex gap-3 mt-3">
            <input name="city" value={formData.city} onChange={onChangeHandler} placeholder="City" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
            <input name="state" value={formData.state} onChange={onChangeHandler} placeholder="State" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
          </div>
          <div className="flex gap-3 mt-3">
            <input name="zipcode" value={formData.zipcode} onChange={onChangeHandler} placeholder="Zip Code" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
            <input name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow p-6">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="text-gray-400 text-sm mb-4">-------------- Payment Method Selection --------------</div>

          <div
            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded ${method === 'cod' ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => setMethod('cod')}
          >
            <div className="min-w-[16px] h-[16px] border rounded-full flex items-center justify-center">
              {method === 'cod' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
            </div>
            <span className="text-gray-700 text-sm font-medium">CASH ON DELIVERY</span>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg">
            Place Order
          </button>
        </div>
      </div>

      {/* Cart Total */}
      <div className="w-full lg:w-1/3">
        <CartTotal selectedPayment={method} />
      </div>
    </form>
  );
};

export default PlaceOrder;
