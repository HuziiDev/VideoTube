
// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import mongoose from "mongoose";
import {app} from './app.js'

import connectDb from './db/index.js'
dotenv.config({
    path:'./env'
})


connectDb()
.then(() =>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed !!!!", err)
})

// (async() =>{
//  try {
//   await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
    
//  } catch (error) {
//     console.log("Error", error)
//     throw err
    
//  }

// })()