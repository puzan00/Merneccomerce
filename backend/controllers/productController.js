import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
    let imagesURL = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );


    let parsedSizes = [];
    try {
      parsedSizes = JSON.parse(sizes.replace(/'/g, '"')); // replace single quotes with double quotes
    } catch (err) {
      console.error("Failed to parse sizes:", sizes);
    }
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      sizes: parsedSizes,
      image: imagesURL,
      date: Date.now()
    };
    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for listing all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for removing a product by ID
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;  // FIXED: use req.body
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Function for retrieving a single product by ID
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params; // now using params correctly
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct
};