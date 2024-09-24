import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// purpose of this middleware is to retrieve and validate the access token used for authenticating requests in a web application.
/* 
Key Purposes of the Middleware
Token Retrieval:
The middleware retrieves the access token from two potential sources: cookies and the Authorization header. This provides flexibility in how clients can send their tokens, accommodating different client implementations.
Authentication:
By extracting the access token, the middleware can validate the user's identity or permissions for the requested resource. This is essential for protecting routes and ensuring that only authenticated users can access certain functionalities.
Session Management:
The access token often represents a user session. By validating the token, the middleware helps manage user sessions, determining whether a user is logged in and if their session is still valid.
Error Handling:
If the access token is absent or invalid, the middleware can respond with an appropriate error message (e.g., 401 Unauthorized). This prevents further processing of the request and helps inform the client of the authentication failure.
Security:
Using tokens (especially JWTs - JSON Web Tokens) enhances security by allowing stateless authentication. The server does not need to store session information, reducing the risk of session hijacking.
Rate Limiting and Access Control:
By validating the token, the middleware can also enforce rate limits or access controls based on user roles or permissions encoded within the token.
*/
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // retrieve access token from two possible sources

    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    //throw error if token doesn't not come with request
    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    // if token is received, decode and fetch data from it
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // get user data from the fetched token
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    // if decoded data doesn't have user, token is not valid, throw error
    if (!user) {
      // NEXT_VIDEO: discuss aboout frontend
      throw ApiError(401, "Invalid Access Token");
    }

    // otherwise attach the user data to req obj
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
