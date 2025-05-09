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

// client.on("message", async message => {
//     const msg = message.body.trim().toLowerCase()
//     const chatId = message.from
//     message.reply('mau apa tohapokkkkk', {chatId })
//     // if (msg === 'halo') {
//     //     client.sendMessage('halo juga')
//     // }
// })

client.on("message", async message => {
    const msg = message.body.trim().toLowerCase()
    if (msg === 'halo') {
        message.reply( 'halo juga')
    }
    client.sendMessage(message.from, 'ngomong apa tohapokkkk') 
})
client.initialize()


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})