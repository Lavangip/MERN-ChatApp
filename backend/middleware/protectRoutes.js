import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protectRoute = async (req,res,next) =>{
    try{
        const token = req.cookies.jwt;
        
        if(!token){
            res.status(401).json({Unauthorized:"No Token Found"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            res.status(401).json({Unauthorized:"Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            res.status(401).json({Unauthorized:"User not found"});
        }

        req.user = user;

        next();
    }
    catch(error){
        console.log("Error in protectRoute middleware",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export default protectRoute;