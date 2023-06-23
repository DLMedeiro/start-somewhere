// Entry point
// If changes are made to this file, the server needs to be reset

// backend web framework
// const express = require("express");
import express from 'express'

import path from 'path'
// const path = require('path')
// Bring in environment variables
// const dotenv = require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config()
// make sure this is called before items requiring this file are used.  ConnectDB will have an error if this requirement is after it.

import connectDB from './config/db.ts'
// const connectDB = require('./config/db.ts')
connectDB()

// Port for server to run on, 5000 if the .env port is not found
const port = process.env.PORT || 5000

// initialize express
const app = express()
// const cors = require('cors')
import cors from 'cors'

// Bring in error handler
import errorHandler from './middleware/errorMiddleware.ts'
// const errorHandler = require("./middleware/errorMiddleware");
// changed to export default on middleware to eliminate errors when bringing the function to this file ?

// add this middleware so req.body within the controller will not show as undefined
// body parser for raw json
app.use(express.json())
// parses urlencoded
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin: ['https://steppingstones.onrender.com','http://localhost:5000']
}))
// when api/goals is hit on the front end, goalRoutes will respond
import goalRoutes from './routes/goalRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')))
//   //

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'),
//     ),
//   )
//   // * -> any route aside from API routes and point it towards the index.html file that is in the build folder
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'))
// }

app.use(errorHandler)
// This will overwrite the express default handler

// call listen on app object
app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})
