import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal"; // ✅ Import CartTotal

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              id: itemId,
              size: size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }

  }, [cartItems, products]);

  const handleQuantityChange = (id, size, value) => {
    const quantity = parseInt(value);
    if (isNaN(quantity) || quantity < 1) return;
    updateQuantity(id, size, quantity);
  };

  return (
    <div className="border-t pt-14 px-4 sm:px-10">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item.id);
            if (!productData) return null;

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr,1fr] items-center"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20 object-cover border rounded"
                    src={productData.image?.[0] || "/placeholder.jpg"}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2 text-sm">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border border-gray-400 rounded">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 justify-end">
                  <input
                    className="border w-16 text-center py-1 rounded"
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, item.size, e.target.value)}
                  />
                  <img
                    className="w-5 cursor-pointer hover:scale-110 transition"
                    src={assets.bin_icon}
                    alt="Remove"
                    onClick={() => updateQuantity(item.id, item.size, 0)}
                  />
                </div>
              </div>
            );
          })}

          {/* ✅ Reusable Total Section */}
          <div className="mt-6">
            <CartTotal />
            <div className="text-right">
              <button onClick={() => navigate("/place-order")} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
