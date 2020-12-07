
// AUTENTICACION DE 2 FACTORES 2FA NORMAL, MOSTRANDO EL CODIGO

const express = require('express')
const bp = require('body-parser')
const speakeasy = require('speakeasy')
const app = express()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const secret = speakeasy.generateSecret({ length: 20 })

app.get('/generateCode', (req, res) => {
    res.send({
        "token": speakeasy.totp({ secret: secret.base32, encoding: 'base32' })
    })
})

app.post('/validate', (req, res) => {
    const verified = speakeasy.totp.verify({ secret: secret.base32, encoding: 'base32', token: req.body.token})
    res.send({
        "success": verified
    })
})

app.listen('6000', () => console.log('Server ready port: 6000'))

