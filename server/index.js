// Copyright (c) 2022 Panshak Solomon

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import pdf from 'html-pdf'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import invoiceRoutes from './routes/invoices.js'
import clientRoutes from './routes/clients.js'
import userRoutes from './routes/userRoutes.js'

import profile from './routes/profile.js'
import pdfTemplate from './documents/index.js'
// import invoiceTemplate from './documents/invoice.js'
import emailTemplate from './documents/email.js'

const app = express()
dotenv.config()

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/invoices', invoiceRoutes)
app.use('/clients', clientRoutes)
app.use('/users', userRoutes)
app.use('/profiles', profile)

// NODEMAILER TRANSPORT FOR SENDING INVOICE VIA EMAIL
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

var options = { format: 'A4' }

// SEND PDF INVOICE VIA EMAIL
app.post('/send-pdf', (req, res) => {
    const { email, company } = req.body

    pdf.create(pdfTemplate(req.body), options).toFile(`${__dirname}/invoice.pdf`, async (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send({ error: 'Failed to create PDF' })
        }

        try {
            await transporter.sendMail({
                from: `Accountill <hello@accountill.com>`,
                to: email,
                replyTo: company.email,
                subject: `Invoice from ${company.businessName ? company.businessName : company.name}`,
                text: `Invoice from ${company.businessName ? company.businessName : company.name}`,
                html: emailTemplate(req.body),
                attachments: [
                    {
                        filename: 'invoice.pdf',
                        path: `${__dirname}/invoice.pdf`
                    }
                ]
            })
            res.status(200).json({ message: 'Invoice sent successfully!' })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Failed to send invoice email', error })
        }
    })
})

// CREATE AND SEND PDF INVOICE
app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body)).toBuffer((err, buffer) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to create PDF' })
        }
        res.setHeader('Content-Type', 'application/pdf')
        res.send(buffer)
    })
})

// FETCH PDF INVOICE
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/invoice.pdf`)
})

app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING')
})

// NEW ROUTE: SEND INVOICE EMAIL (CALLING EMAIL TEMPLATE DIRECTLY)
app.post('/send-invoice', async (req, res) => {
    const { email } = req.body
    try {
        await transporter.sendMail({
            from: `Accountill <hello@accountill.com>`,
            to: email,
            subject: 'Your Invoice',
            html: emailTemplate(req.body)
        })
        res.status(200).json({ message: 'Invoice email sent successfully!' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to send invoice email', error })
    }
})

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 5000

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
