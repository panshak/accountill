import { sendInvoiceEmail } from "./sendEmail.js";

const invoiceData = {
  dueDate: new Date(),
  type: "Invoice",
  balanceDue: 1500,
  company: {
    logo: "https://i.postimg.cc/hGZKzdkS/logo.png",
    businessName: "Accountill",
    phoneNumber: "1234567890",
    website: "https://accountill.com"
  },
  link: "https://accountill.com/invoice/123",
  id: "123"
};

sendInvoiceEmail("recipient@example.com", invoiceData);
