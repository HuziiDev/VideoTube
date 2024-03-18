
// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import mongoose from "mongoose";

import connectDb from './db/index.js'
dotenv.config({
    path:'./env'
})


connectDb()

// (async() =>{
//  try {
//   await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
    
//  } catch (error) {
//     console.log("Error", error)
//     throw err
    
//  }

// })()