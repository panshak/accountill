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
import emailTemplate from './documents/email.js'

dotenv.config()
const app = express()

// Middleware
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// Routes
app.use('/invoices', invoiceRoutes)
app.use('/clients', clientRoutes)
app.use('/users', userRoutes)
app.use('/profiles', profile)

// Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
})

const pdfOptions = { format: 'A4' }

// POST /send-pdf - create PDF and send via email
app.post('/send-pdf', (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: "Missing 'email' in request body" })

  pdf.create(pdfTemplate(req.body), pdfOptions).toFile('invoice.pdf', (err) => {
    if (err) {
      console.error('PDF creation error:', err)
      return res.status(500).json({ error: 'PDF creation failed' })
    }

    const mailOptions = {
      from: `Accountill <hello@accountill.com>`,
      to: email,
      replyTo: req.body.company?.email,
      subject: `Invoice from ${req.body.company?.businessName || req.body.company?.name || 'Accountill'}`,
      text: `Invoice from ${req.body.company?.businessName || req.body.company?.name || 'Accountill'}`,
      html: emailTemplate(req.body),
      attachments: [{ filename: 'invoice.pdf', path: `${__dirname}/invoice.pdf` }],
    }

    transporter.sendMail(mailOptions, (mailErr, info) => {
      if (mailErr) {
        console.error('Email sending error:', mailErr)
        return res.status(500).json({ error: 'Email sending failed' })
      }
      return res.status(200).json({ message: 'Invoice sent successfully', info })
    })
  })
})

// POST /create-pdf - create invoice PDF and store locally
app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), pdfOptions).toFile('invoice.pdf', (err) => {
    if (err) {
      console.error('PDF creation error:', err)
      return res.status(500).json({ error: 'PDF creation failed' })
    }
    return res.status(200).json({ message: 'PDF created successfully' })
  })
})

// GET /fetch-pdf - return the generated PDF
app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/invoice.pdf`, (err) => {
    if (err) {
      console.error('fetch-pdf error:', err)
      res.status(404).end()
    }
  })
})

app.get('/', (req, res) => res.send('SERVER IS RUNNING'))

// Start server
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 5000

if (!DB_URL) {
  console.error('Missing DB_URL in environment variables')
  process.exit(1)
}

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })

// End of file
//Copyright (c) 2022 Panshak Solomon

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

    // Body parsing and CORS
    app.use(express.json({ limit: '30mb', extended: true }))
    app.use(express.urlencoded({ limit: '30mb', extended: true }))
    app.use(cors())

    // Routes
    app.use('/invoices', invoiceRoutes)
    app.use('/clients', clientRoutes)
    app.use('/users', userRoutes)
    app.use('/profiles', profile)

    // NODEMAILER TRANSPORT FOR SENDING INVOICE VIA EMAIL
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    })

    const options = { format: 'A4' }

    // SEND PDF INVOICE VIA EMAIL
    app.post('/send-pdf', (req, res) => {
        try {
            const { email, company } = req.body

            if (!email) {
                return res.status(400).json({ error: "Missing 'email' in request body" })
            }

            pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
                if (err) {
                    console.error('PDF creation error:', err)
                    return res.status(500).json({ error: 'PDF creation failed' })
                }

                transporter.sendMail(
                    {
                        from: `Accountill <hello@accountill.com>`, // sender address
                        to: email,
                        replyTo: company?.email,
                        subject: `Invoice from ${company?.businessName || company?.name || 'Accountill'}`,
                        text: `Invoice from ${company?.businessName || company?.name || 'Accountill'}`,
                        html: emailTemplate(req.body),
                        attachments: [
                            {
                                filename: 'invoice.pdf',
                                path: `${__dirname}/invoice.pdf`,
                            },
                        ],
                    },
                    (mailErr, info) => {
                        if (mailErr) {
                            console.error('Email sending error:', mailErr)
                            return res.status(500).json({ error: 'Email sending failed' })
                        }
                        return res.status(200).json({ message: 'Invoice sent successfully', info })
                    }
                )
            })
        } catch (error) {
            console.error('Unexpected error in /send-pdf:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    })

    // CREATE PDF
    app.post('/create-pdf', (req, res) => {
        try {
            pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
                if (err) {
                    console.error('PDF creation error:', err)
                    return res.status(500).json({ error: 'PDF creation failed' })
                }
                return res.status(200).json({ message: 'PDF created successfully' })
            })
        } catch (error) {
            console.error('Unexpected error in /create-pdf:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    })

    // SEND PDF INVOICE
    app.get('/fetch-pdf', (req, res) => {
        res.sendFile(`${__dirname}/invoice.pdf`, (err) => {
            if (err) {
                console.error('fetch-pdf error:', err)
                res.status(404).end()
            }
        })
    })

    app.get('/', (req, res) => {
        res.send('SERVER IS RUNNING')
    })

    const DB_URL = process.env.DB_URL
    const PORT = process.env.PORT || 5000

    if (!DB_URL) {
        console.error('Missing DB_URL in environment variables')
        process.exit(1)
    }

    mongoose
        .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        .catch((error) => console.log(error.message))

    // Note: Most recent mongoose versions no longer need useFindAndModify/useCreateIndex options