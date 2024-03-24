import {asyncHandler} from '../utils/asyncHandler.js'
 import {ApiError} from '../utils/ApiError.js'
 import {User} from '../models/user.model.js'
 import {uploadOnCloudinary} from '../utils/cloudnary.js'
 import { ApiResponse } from '../utils/ApiResponse.js'


const registerUser = asyncHandler( async (req, res) => {
          
    const {fullName, email, username, passoword}= req.body;
    console.log("email: ",email)
         
    // if(fullName==="") {
    //     throw new ApiError(400, "Full Name is required")
    // } // used to check if full name is empty. Similarity you can use other fields to to check

    // alternative approach to check at once

    if(
        [fullName, passoword, email,username].some((field) => field ?.trim() === true)
    )
{
    throw new ApiError(400, "Full Name is required")
}
  

//find if user exits
      const existedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409, "User already exist")
    }
      

    const avatarLocalPath =  req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

   const avatar =  await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }


  const user =  await User.create(
        {
            fullName,
            email,
            passoword,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            username: username.toLowerCase(),
        }
     )

     //find user to check if it exists

    const createdUser = await  user.findOne(user._id).select(        //to remove password and refresh token field
        "-password -refreshToken"
    )
     

     if(!createdUser){
        throw new ApiError("500", "Something went wrong while registering a user")
     }

     return res.status(201).json(
        
            new ApiResponse(200, createdUser, "User registered Successfully")
        
     )

})
export {registerUser}