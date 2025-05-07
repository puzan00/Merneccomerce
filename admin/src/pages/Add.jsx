import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } }); // Add the correct endpoint
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }

  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    switch (index) {
      case 0:
        setImage1(file);
        break;
      case 1:
        setImage2(file);
        break;
      case 2:
        setImage3(file);
        break;
      case 3:
        setImage4(file);
        break;
      default:
        break;
    }
  };

  const handleSizeChange = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-6 p-4 max-w-3xl mx-auto"
    >
      {/* Image Upload Section */}
      <div className="w-full">
        <p className="mb-2 font-medium">
          Upload Images <span className="text-red-500">*</span>
        </p>
        <div className="flex flex-wrap gap-4">
          {[image1, image2, image3, image4].map((img, index) => (
            <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
              <img
                className="w-20 h-20 object-cover border-2 border-dashed rounded-lg"
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt={`Upload ${index + 1}`}
              />
              <input
                type="file"
                id={`image${index}`}
                hidden
                required={index === 0}
                accept="image/*"
                onChange={(e) => handleImageChange(index, e)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2 font-medium">
          Product Name <span className="text-red-500">*</span>
        </p>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2 font-medium">
          Product Description <span className="text-red-500">*</span>
        </p>
        <textarea
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the product..."
          required
        />
      </div>

      {/* Price */}
      <div className="w-full">
        <p className="mb-2 font-medium">
          Price <span className="text-red-500">*</span>
        </p>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          required
        />
      </div>

      {/* Category Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="mb-2 font-medium">
            Product Category <span className="text-red-500">*</span>
          </p>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium">
            Sub Category <span className="text-red-500">*</span>
          </p>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            required
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
      </div>

      {/* Sizes Section */}
      <div className="w-full">
        <p className="mb-2 font-medium">
          Available Sizes <span className="text-red-500">*</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size} className="relative">
              <input
                type="checkbox"
                id={`size-${size}`}
                className="peer absolute opacity-0 w-0 h-0"
                value={size}
                checked={sizes.includes(size)}
                onChange={() => handleSizeChange(size)}
              />
              <label
                htmlFor={`size-${size}`}
                className="inline-block px-4 py-2 border rounded-lg cursor-pointer
                         hover:bg-gray-100 peer-checked:bg-black peer-checked:text-white"
              >
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          className="w-4 h-4 accent-black"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label htmlFor="bestseller" className="font-medium cursor-pointer">
          Mark as Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full md:w-48 px-6 py-3 bg-black text-white rounded-lg
                   hover:bg-gray-800 transition-colors"
      >
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
