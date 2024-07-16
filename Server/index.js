require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/route')
require('./DB/connection')

const FastFood = express()

FastFood.use(cors())
FastFood.use(express.json())
FastFood.use(router)
FastFood.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

FastFood.listen(PORT,()=>{
    console.log(`Server Started At : ${PORT}`);
})


FastFood.get("/",(req,res)=>{
res.status(200).send(`Server Started!!!`)
})

