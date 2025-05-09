const express = require('express')
const axios = require('axios')
const { LocalAuth, Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')


const app = express()
const port = process.env.PORT || 3000

const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'andriana' })
})

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true })
})

client.on("authenticated", () => {
    console.log("udah login!")
})

client.on("ready", () => {
    console.log("ready gan!")
})

client.on("message", message => {
    if (message.body === "woi asu") {
        message.reply("apa tohapokkkkk")
    }
})

client.initialize()


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})