// Copyright (c) 2022 Panshak Solomon

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import pdf from 'html-pdf';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// === Environment variables ===
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

// === Debug logs ===
console.log("Loaded DB_URL:", DB_URL);
console.log("Connecting to MongoDB...");

// === App setup ===
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// === Route imports ===
import invoiceRoutes from './routes/invoices.js';
import clientRoutes from './routes/clients.js';
import userRoutes from './routes/userRoutes.js';
import profile from './routes/profile.js';
import pdfTemplate from './documents/index.js';
import emailTemplate from './documents/email.js';

// === Routes ===
app.use('/invoices', invoiceRoutes);
app.use('/clients', clientRoutes);
app.use('/users', userRoutes);
app.use('/profiles', profile);

// === Email transport ===
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  },
  tls: { rejectUnauthorized: false }
});

// === PDF options ===
const pdfOptions = { format: 'A4' };

// === Send PDF invoice via email ===
app.post('/send-pdf', (req, res) => {
  const { email, company } = req.body;

  pdf.create(pdfTemplate(req.body), pdfOptions).toFile('invoice.pdf', (err) => {
    if (err) {
      console.error("PDF creation error:", err);
      return res.status(500).send(Promise.reject());
    }

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

    res.send(Promise.resolve());
  });
});

// === Create and save PDF invoice ===
app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), pdfOptions).toFile('invoice.pdf', (err) => {
    if (err) {
      console.error("PDF creation error:", err);
      return res.status(500).send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

// === Fetch generated PDF ===
app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/invoice.pdf`);
});

// === Test route ===
app.get('/', (req, res) => {
  res.send('SERVER IS RUNNING');
});

// === Connect to MongoDB ===
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4 // Forces IPv4, prevents old URL parsing warning
})

  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
  });

// === Mongoose config ===
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
