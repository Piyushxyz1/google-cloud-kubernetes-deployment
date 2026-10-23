
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // Get token from request headers
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Token not found.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store user id in request
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Auth Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default auth;
