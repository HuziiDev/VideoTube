import mongoose from "mongoose";
import { DB_Name } from "./constants";

(async() =>{
 try {
  await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
    
 } catch (error) {
    console.log("Error", error)
    throw err
    
 }

})()