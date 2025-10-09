<TextField
  label="Company"
  name="company"
  value={invoice.company || ''}
  onChange={(e) => setInvoice({ ...invoice, company: e.target.value })}
/>
