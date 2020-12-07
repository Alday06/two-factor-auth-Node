
// AUTENTICACION DE 2 FACTORES 2FA USANDO UN CODIGO QR

const express = require('express')
const speakeasy = require('speakeasy')
const QRcode = require('qrcode')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const secret = speakeasy.generateSecret()
console.log(secret)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/auth', (req, res) => {
    QRcode.toDataURL(secret.otpauth_url, (err, data_url) => {
        res.send(
            `<center>
                <h1>Authentication 2TF</h1>
                <h3>Use the QR Code to your authentication</h3>
                <img src=${data_url}>
            </center>`
        )
    })
})

app.post('/validar', (req, res) => {
    const token = req.body.userToken
    const verified = speakeasy.totp.verify({ secret: secret.base32, encoding: 'base32', token: token })
    res.json({ success: verified })
})


app.listen(4000, () => console.log('Server ready'))