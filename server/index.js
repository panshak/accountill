import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import pdf from 'html-pdf';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import invoiceRoutes from './routes/invoices.js';
import clientRoutes from './routes/clients.js';
import userRoutes from './routes/userRoutes.js';
import profile from './routes/profile.js';
import pdfTemplate from './documents/index.js';
import emailTemplate from './documents/email.js';





// You will add more routes here for handling invoices, clients, etc.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Routes
app.use('/invoices', invoiceRoutes);
app.use('/clients', clientRoutes);
app.use('/users', userRoutes);
app.use('/profiles', profile);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
});

const pdfOptions = { format: 'A4' };

// SEND PDF VIA EMAIL
app.post('/send-pdf', async (req, res) => {
  try {
    const { email, company } = req.body;

    await new Promise((resolve, reject) => {
      pdf.create(pdfTemplate(req.body), pdfOptions).toFile('invoice.pdf', (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    await transporter.sendMail({
      from: 'Accountill <hello@accountill.com>',
      to: email,
      replyTo: company.email,
      subject: `Invoice from ${company.businessName || company.name}`,
      text: `Invoice from ${company.businessName || company.name}`,
      html: emailTemplate(req.body),
      attachments: [{ filename: 'invoice.pdf', path: `${__dirname}/invoice.pdf` }],
    });

    res.status(200).send({ message: 'Invoice sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to send invoice.' });
  }
});

// CREATE PDF
app.post('/create-pdf', async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      pdf.create(pdfTemplate(req.body), pdfOptions).toFile('invoice.pdf', (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
    res.status(200).send({ message: 'PDF created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to create PDF.' });
  }
});

// FETCH PDF
app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/invoice.pdf`);
});

// Test endpoint
app.get('/', (req, res) => {
  res.send('SERVER IS RUNNING');
});

// MongoDB connection & server start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .then(() => app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)))
  .catch((err) => console.error('❌ MongoDB connection error:', err));
