import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Order Placed Successfully" }); // Fixed typo from res.join to res.json
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in Placing Order" });
    }
};


// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// userOrders.js or in your existing API file
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};





const updateStatus = async (req, res) => {
};

export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus };