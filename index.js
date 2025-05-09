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


function capitalizeWords(str) {
    return str.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
}

client.on("message", async message => {
    const messageBody = message.body.trim().toLowerCase()
    const userQuestion = capitalizeWords(messageBody)
    if (messageBody) {
        // respon ai code here
        message.reply(`*${userQuestion}* \n\n> bentar tohapokkkk...`)
    } else {
        client.sendMessage(message.from, 'ngomong apa tohapokkkk')
    }
})
client.initialize()


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})