import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

const uploadOnCloudinary = async (localFilePath) =>{
try {
    if(!localFilePath) return null
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath,{
        resource_type:'auto'
    })
    //file has been upload successfully to cloudinary
    console.log("File has been uploaded on cloudinray", response.url)
    return response
} catch (error) {
    fs.unlinkSync(localFilePath)//remove the locally saved file as the upload gets failed
    return null
     
}
}


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_APIKEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

export {uploadOnCloudinary}