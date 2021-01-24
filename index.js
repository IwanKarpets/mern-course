const express = require("express")
const config = require('config')
const app = express()
const mongoose = require("mongoose")
const cors = require('cors')

app.use(express.json())
app.use(cors())

const PORT = config.get('port') || 5000

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

async function start(){

    try{
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        },()=>{
            console.log("Connected to MongoDB")
        }) 

        app.listen(PORT, ()=>{
            console.log('Server started')
        })   
    }
    catch(e){
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()

 