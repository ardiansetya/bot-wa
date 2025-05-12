const express = require('express')
const { LocalAuth, Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const QRCode = require('qrcode')
const axios = require('axios')


const app = express()
const port = process.env.PORT || 3000

const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'andriana' }),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
})

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true })
    QRCode.toDataURL(qr, (err, url) => {
        if (err) return console.error("Gagal buat QR:", err)
        console.log(url)
    })
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

// client.on("message", async message => {
//     const messageBody = message.body.trim().toLowerCase()
//     const userQuestion = capitalizeWords(messageBody)
//     if (messageBody) {
//         // respon ai code here
//         console.log({messageBody});
//         message.reply(`*${userQuestion}* \n\n> bentar tohapokkkk...`)
//     } else {
//         client.sendMessage(message.from, 'ngomong apa tohapokkkk')
//     }
// })

client.on("message", async message => {
    const messageBody = message.body.trim()

    if (!messageBody) {
        await client.sendMessage(message.from, 'Ngomong apa tohapokkkk')
        return
    }

    try {
        // Panggil model AI dari Olama (misalnya model 'llama3')
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: "deepseek-r1:7b", // atau ganti dengan model lain yang tersedia
            prompt: messageBody,
            stream: false
        })

        let botReply = response.data.response.trim()

        // Hapus seluruh <think>...</think> beserta isinya
        botReply = botReply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim()
        console.log(`[USER] ${messageBody}`);
        console.log(`[AI] ${botReply}`)

        await message.reply(botReply)
    } catch (error) {
        console.error("Gagal ambil jawaban dari AI:", error.message)
        await message.reply("Maaf, AI-nya lagi ngambek 😔")
    }
})

client.initialize()


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})