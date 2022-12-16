const route = require('./routes/index')
const {MONGO_URL} =require('./models/index')
const express = require('express')
const mongoose= require('mongoose')
const {PORT} = require('./models/index')
const app =express()

const connectDB= async()=>{
    try{
        await mongoose.connect(MONGO_URL,{
                // useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useFindAndModify: false
            }
        )

        console.log('Connected')
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }

}

app.use(express.json())
app.use(route);
connectDB();


app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))