import React, { useState } from 'react';
import CartTotal from '../components/CartTotal'; // Import the CartTotal component
import { assets } from '../assets/assets'; // Import assets for payment logos
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


const PlaceOrder = () => {
  const [selectedPayment, setSelectedPayment] = useState('stripe');
  const navigate = useNavigate();
  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Place Order</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Delivery Information */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <div className="border-b pb-4 mb-4">
              <p className="font-medium">Shipping Address:</p>
              <p className="text-gray-600">John Doe</p>
              <p className="text-gray-600">123 Main Street</p>
              <p className="text-gray-600">New York, NY 10001</p>
              <p className="text-gray-600">United States</p>
              <p className="text-gray-600">Phone: (123) 456-7890</p>
            </div>
            <div>
              <p className="font-medium">Shipping Method:</p>
              <p className="text-gray-600">Standard Shipping (3-5 business days)</p>
            </div>
          </div>
          
          {/* Payment Method Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mt-4">
              <div className="mb-4">
                <Title text1="PAYMENT" text2="METHOD" />
                {/* Comment line that matches the image */}
                <div className="text-gray-400 text-sm">{/* -------------- Payment Method Selection -------------- */}</div>
              </div>
              
              <div className="flex gap-3 flex-col lg:flex-row">
                {/* Stripe Payment Option */}
                <div 
                  className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${selectedPayment === 'stripe' ? 'border-blue-500' : ''}`}
                  onClick={() => handlePaymentSelect('stripe')}
                >
                  <p className="min-w-3.5 h-3.5 border rounded-full flex items-center justify-center">
                    {selectedPayment === 'stripe' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </p>
                  <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
                </div>
                
                {/* RazorPay Payment Option */}
                <div 
                  className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${selectedPayment === 'razorpay' ? 'border-blue-500' : ''}`}
                  onClick={() => handlePaymentSelect('razorpay')}
                >
                  <p className="min-w-3.5 h-3.5 border rounded-full flex items-center justify-center">
                    {selectedPayment === 'razorpay' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </p>
                  <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
                </div>
                
                {/* Cash on Delivery Option */}
                <div 
                  className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${selectedPayment === 'cod' ? 'border-blue-500' : ''}`}
                  onClick={() => handlePaymentSelect('cod')}
                >
                  <p className="min-w-3.5 h-3.5 border rounded-full flex items-center justify-center">
                    {selectedPayment === 'cod' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </p>
                  <span className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Cart Total Component */}
        <div className="w-full lg:w-1/3">
          <CartTotal selectedPayment={selectedPayment} />
        </div>
      </div>
      
      {/* Place Order Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate('/orders')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;