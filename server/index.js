// Copyright (c) 2022 Panshak Solomon

import dotenv from 'dotenv';
dotenv.config(); // THIS MUST BE THE VERY FIRST THING

console.log("DB_URL =", process.env.DB_URL);
console.log("PORT =", process.env.PORT);

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import pdf from 'html-pdf';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import invoiceRoutes from './routes/invoices.js';
import clientRoutes from './routes/clients.js';
import userRoutes from './routes/userRoutes.js';
import profile from './routes/profile.js';
import pdfTemplate from './documents/index.js';
// import invoiceTemplate from './documents/invoice.js';
import emailTemplate from './documents/email.js';

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/invoices', invoiceRoutes);
app.use('/clients', clientRoutes);
app.use('/users', userRoutes);
app.use('/profiles', profile);

// NODEMAILER TRANSPORTER
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
});

const options = { format: 'A4' };

// SEND PDF INVOICE VIA EMAIL
app.post('/send-pdf', (req, res) => {
    const { email, company } = req.body;

    pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
        transporter.sendMail({
            from: `Accountill <hello@accountill.com>`,
            to: email,
            replyTo: company.email,
            subject: `Invoice from ${company.businessName || company.name}`,
            text: `Invoice from ${company.businessName || company.name}`,
            html: emailTemplate(req.body),
            attachments: [{
                filename: 'invoice.pdf',
                path: `${__dirname}/invoice.pdf`
            }]
        });

        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

// CREATE AND SEND PDF INVOICE
app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

// FETCH PDF INVOICE
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/invoice.pdf`);
});

app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING');
});

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
