import moment from 'moment'

export default function (
   { name,
      address,
      phone,
      email,
      dueDate,
      date,
      id,
      notes,
      subTotal,
      type,
      vat,
      total,
      items,
      status,
      totalAmountReceived,
      balanceDue,
      company,
   }) {
    const today = new Date();
return `
<!DOCTYPE html>
<html>
<head>
<style>

.invoice-container {
    margin: 0;
    padding: 0;
    padding-top: 10px;
    font-family: 'Roboto', sans-serif;
    width: 530px;
    margin: 0px auto;
    }

table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td, table th {
  border: 1px solid rgb(247, 247, 247);
  padding: 10px;
}

table tr:nth-child(even){background-color: #f8f8f8;}

table tr:hover {background-color: rgb(243, 243, 243);}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #FFFFFF;
  color: rgb(78, 78, 78);
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5px;
    

}
.address {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0px 15px 0px;
    line-height: 10px;
    font-size: 12px;
    margin-top: -20px

}

.status {
    text-align: right;
}
.receipt-id {
    text-align: right;
}

.title {
    font-weight: 100px;
    text-transform: uppercase;
    color: gray;
    letter-spacing: 2px;
    font-size: 8px;
    line-height: 5px;
}

.summary {
    margin-top: 2px;
    margin-right: 0px;
    margin-left: 50%;
    margin-bottom: 15px;
}

img {
    width: 100px;
   
}

</style>
</head>
<body>
<div class="invoice-container">
<section  class="header">
        <div>
          ${company?.logo ? `<img src=${company?.logo} />` : `<h2>___</h2>`}
        </div>
        <div class="receipt-id" style="margin-top: -120px 0 40px 0">
            
        </div>
</section>
<section class="address">

      <div>
          <p class="title">From:</p>
          <h4 style="font-size: 9px; line-height: 5px">${company.businessName ? company.businessName : company.name}</h4>
          <p style="font-size: 9px; line-height: 5px">${company.email}</p>
          <p style="font-size: 9px; line-height: 5px">${company.phoneNumber}</p>
          <p style="font-size: 9px; line-height: 5px">${company.contactAddress}</p>
      </div>

      <div style="margin-bottom: 100px; margin-top: 20px">
      <p class="title">Bill to:</p>
        <h4 style="font-size: 9px; line-height: 5px">${name}</h4>
        <p style="font-size: 9px; line-height: 5px">${email}</p>
        <p style="font-size: 9px; line-height: 5px">${phone}</p>
        <p style="font-size: 9px; line-height: 5px">${address}</p>
      </div>

    <div class="status" style="margin-top: -280px">
        <h1 style="font-size: 12px">${Number(balanceDue) <= 0 ? 'Receipt' : type}</h1>
        <p style="font-size: 8px; margin-bottom: 10px">${id}</p>
        <p class="title" style="font-size: 8px">Status</p>
        <h3 style="font-size: 12px">${status}</h3>
        <p class="title" style="font-size: 8px">Date</p>
        <p  style="font-size: 9px" >${moment(date).format('ll')}</p>
        <p class="title"  style="font-size: 8px">Due Date</p>
        <p  style="font-size: 9px">${moment(dueDate).format('ll')}</p>
        <p class="title"  style="font-size: 8px">Amount</p>
        <h3 style="font-size: 12px">${total}</h3>
    </div>
</section>

<table>
  <tr>
    <th style="font-size: 9px">Item</th>
    <th style="font-size: 9px">Quantity</th>
    <th style="font-size: 9px">Price</th>
    <th style="font-size: 9px">Discount(%)</th>
    <th style="text-align: right; font-size: 9px">Amount</th>
  </tr>

  ${
   items.map((item) => (
 `  <tr>
    <td style="font-size: 9px">${item.itemName}</td>
    <td style="font-size: 9px">${item.quantity}</td>
    <td style="font-size: 9px">${item.unitPrice}</td>
    <td style="font-size: 9px">${item.discount}</td>
    <td style="text-align: right; font-size: 9px">${(item.quantity * item.unitPrice) - (item.quantity * item.unitPrice) * item.discount / 100}</td>
  </tr>`
   ))
  }


</table>

<section class="summary">
    <table>
        <tr>
          <th style="font-size: 9px">Invoice Summary</th>
          <th></th>
        </tr>
        <tr>
          <td style="font-size: 9px">Sub Total</td>
          <td style="text-align: right; font-size: 9px; font-weight: 700">${subTotal}</td>
        </tr>

        <tr>
            <td style="font-size: 10px">VAT</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">${vat}</td>
          </tr>

        <tr>
            <td style="font-size: 10px">Total</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">${total}</td>
          </tr>

        <tr>
            <td style="font-size: 10px" >Paid</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">${totalAmountReceived}</td>
          </tr>

          <tr>
          <td style="font-size: 9px">Balance Due</td>
          <td style="text-align: right; font-size: 9px; font-weight: 700">${balanceDue}</td>
        </tr>
        
      </table>
  </section>
  <div>
      <hr>
      <h4 style="font-size: 9px">Note</h4>
      <p style="font-size: 9px">${notes}</p>
  </div>
</div>
</body>
</html>`
;
};