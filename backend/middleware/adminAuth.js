import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains the correct admin email
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Authentication failed. Please login again." });
    }
};

export default adminAuth;
