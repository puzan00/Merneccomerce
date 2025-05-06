
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products,currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
 
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [productId]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 container mx-auto px-4 pb-16">
      {/* Product Main Section */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:max-h-[500px] scrollbar-thin scrollbar-thumb-gray-300">
              {productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item || "/placeholder.svg"}
                  key={index}
                  className={`w-[24%] sm:w-[100px] cursor-pointer transition-all duration-200 border-2 ${
                    image === item ? "border-orange-500" : "border-transparent"
                  } hover:opacity-80`}
                  alt={`${productData.name} view ${index + 1}`}
                />
              ))}
            </div>
            <div className="w-full">
              <img
                className="w-full h-auto object-cover rounded-lg shadow-md"
                src={image || "/placeholder.svg"}
                alt={productData.name}
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                {productData.category}
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                {productData.subCategory}
              </span>
            </div>
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3 5" />
              <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3 5" />
              <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3 5" />
              <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3 5" />
              <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3 5" />
              <p className="pl-2">(122)</p>
            </div>
            <p className="mt-5 text-3xl font-medium">
              {currency}
              {productData.price}
            </p>
            {productData.oldPrice && (
              <p className="text-gray-500 line-through">
                {currency}
                {productData.oldPrice}
              </p>
            )}
            <p className="mt-5 text-gray-500 md:w-4/5">
              {productData.description}
            </p>
            <div className="flex flex-col gap-4 my-8">
              <p className="font-medium">Select Size:</p>
              <div className="flex gap-2 flex-wrap">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    key={index}
                    className={`border rounded-full px-4 py-1 text-sm transition-all duration-200
          ${
            item === size
              ? "border-orange-500 bg-orange-100 text-orange-600"
              : "bg-gray-100 hover:bg-gray-200"
          } `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div className="flex flex-col gap-2 mb-8">
              <p className="font-medium">Quantity:</p>
              <div className="flex items-center">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="border border-gray-300 px-3 py-1 rounded-l hover:bg-gray-100"
                >
                  -
                </button>
                <span className="border-t border-b border-gray-300 px-4 py-1">
                  {quantity}
                </span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="border border-gray-300 px-3 py-1 rounded-r hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button onClick={() => addToCart(productData._id,size)} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition flex-grow sm:flex-grow-0">
                Add to Cart
              </button>
            
            </div>
            
            {/* Product Details */}
            <div className="mt-10 border-t pt-6">
              <div className="flex gap-2 border-b">
                <button 
                  onClick={() => setActiveTab("description")}
                  className={`px-4 py-2 font-medium ${activeTab === "description" ? "border-b-2 border-black" : ""}`}
                >
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab("details")}
                  className={`px-4 py-2 font-medium ${activeTab === "details" ? "border-b-2 border-black" : ""}`}
                >
                  Details
                </button>
                <button 
                  onClick={() => setActiveTab("reviews")}
                  className={`px-4 py-2 font-medium ${activeTab === "reviews" ? "border-b-2 border-black" : ""}`}
                >
                  Reviews
                </button>
              </div>
              
              <div className="py-4">
                {activeTab === "description" && (
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      {productData.description}
                    </p>
                  </div>
                )}
                
                {activeTab === "details" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-500">Material</p>
                      <p>Cotton, Polyester</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-500">Style</p>
                      <p>Casual</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-500">Pattern</p>
                      <p>Solid</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-500">Care Instructions</p>
                      <p>Machine wash cold, tumble dry low</p>
                    </div>
                  </div>
                )}
                
                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-4" />
                        <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-4" />
                        <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-4" />
                        <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-4" />
                        <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-4" />
                      </div>
                      <p className="font-medium">4.8 out of 5</p>
                    </div>
                    
                    {/* Sample Reviews */}
                    <div className="border-t pt-4">
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                          <p className="font-medium">John D.</p>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3" />
                          <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3" />
                          <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3" />
                          <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3" />
                          <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3" />
                          <span className="text-xs text-gray-500 ml-2">2 months ago</span>
                        </div>
                        <p className="text-gray-700">Great product! The quality is excellent and it fits perfectly.</p>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                          <p className="font-medium">Sarah M.</p>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3" />
                          <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3" />
                          <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3" />
                          <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3" />
                          <span className="text-xs text-gray-500 ml-2">1 month ago</span>
                        </div>
                        <p className="text-gray-700">I love the design and color. Shipping was fast too!</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products Section */}
      {productData && (
        <div className="mt-16">
          <RelatedProducts 
            category={productData.category} 
            subCategory={productData.subCategory} 
          />
        </div>
      )}
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
