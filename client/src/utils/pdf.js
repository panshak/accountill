import jsPDF from "jspdf";

export const generateInvoicePDF = (invoice) => {
  const doc = new jsPDF();

  const companyName = invoice.company || 'N/A';
  const companyEmail = invoice.companyEmail || '';
  const companyPhone = invoice.companyPhone || '';

  doc.text(`Company: ${companyName}`, 20, 30);
  doc.text(`Email: ${companyEmail}`, 20, 40);
  doc.text(`Phone: ${companyPhone}`, 20, 50);

  doc.text(`Customer: ${invoice.customerName}`, 20, 60);
  doc.text(`Amount: ₹${invoice.amount}`, 20, 70);

  doc.save(`Invoice_${invoice.id || "new"}.pdf`);
};
