import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protectRoute = async (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.jwt;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No Token Found" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded payload is valid
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }

    // Fetch the user from the database
    const user = await User.findById(decoded.userId).select("-password");

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    // Attach the user object to the request
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
