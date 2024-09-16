import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - specailly non empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // creaet user object, create entry in db
  // remove password and refresh token from response
  // check for user creation
  // return response

  // Step 1 - get user details from frontend
  const { fullname, email, username, password } = req.body;
  console.log("email: ", email);

  // Step 2 - validation - specailly non empty
  //beginners use this way of validation
  // if (fullname === "") {
  //   throw new ApiError(400, "Fullname is required");
  // }

  // pros use this
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  // Step 3 - check if user already exists: username, email
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  //STEP 4 -  check for images, check for avatar
  // req.files has files coming from Multer usage in user.routes.js
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required!");
  }

  // STEP 5 - upload them to cloudinary
  const avatar = await uploadOncloudinary(avatarLocalPath);
  const coverImage = await uploadOncloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required!");
  }

  // STEP 6 - creaet user object, create entry in db
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // STEP 7 - remove password and refresh token from response
  // _id is auto created in db
  // "-password -refreshToken" will remove these from response we are going to send
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // STEP 8 - check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // STEP 9 - return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

export { registerUser };
