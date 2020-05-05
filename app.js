const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer');
const cors = require('cors')


const app = express()
dotenv.config()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/api/contact', async (req, res)=>{
    const specification = req.body.specification
    const email = req.body.email
    const serviceWanted = req.body.serviceWanted
    const name = req.body.clientName
    const budget = req.body.budget


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.MYGMAIL,
            pass: process.env.MYPASSWORD
        }
        
    })

    const mailOptions = {
        from: process.env.MYGMAIL,
        to: process.env.CLIENTMAIL,
        subject: 'New client contact you',
        html: `<div>client name: ${name}</div>

        <div>client email: ${email}</div>

        <div> client requested service: ${serviceWanted}</div>

        <div>client requirement: <p>${specification}</p></div>
        <div>client budget in dollar: ${budget} </div>

        `
    }

 transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return res.status(500).json({error: error.message, success: false})
        }else{
            console.log('Email sent: ' + info.response)
            return res.status(201).json({success: true})
        }
    }
    )
})



app.listen(process.env.PORT, ()=> console.log('working'))
