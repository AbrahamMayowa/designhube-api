const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer');
const sendMail = require('@sendgrid/mail')
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
    const socialMedia = req.body.socialMedia


    sendMail.setApiKey(process.env.SENDGRID_API_KEY)
    console.log(process.env.CLIENTMAIL)


    const mailOptions = {
        from: process.env.MYGMAIL,
        to: process.env.CLIENTMAIL,
        subject: 'New client contact you',
        html: `<div>client name: ${name}</div>

        <div>client email: ${email}</div>
        <div>client social media account: ${socialMedia}</div>

        <div> client requested service: ${serviceWanted}</div>

        <div>client requirement: <p>${specification}</p></div>
        <div>client budget in dollar: ${budget} </div>

        `
    }


    sendMail.send(mailOptions)
    .then(()=> {
        console.log('Email sent: ')
        res.status(201).json({success: true})
    }, error =>{
        console.log(error)
        res.status(500).json({error, success: false})
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error, success: false})
    })
})


app.listen(process.env.PORT, ()=> console.log('working'))
