import React from 'react'
import moment from 'moment'
import { toCommas } from '../../utils/utils'
import styles from './InvoiceDetails.module.css'


const PaymentHistory = ({ paymentRecords}) => {

  
    return (
  <div className="tabs">
    <div className="tab">
      <input type="checkbox" id="chck1" />
      <label className="tab-label" htmlFor="chck1">Payment History <span className={styles.totalUnpaid}>{paymentRecords?.length}</span><span className={styles.space}></span></label>
      <div className="tab-content">
       <div>
         <table>
           <tbody>
         <tr>
          <th>Date Paid</th>
          <th>Amount Paid</th>
          <th>Payment Method</th>
        </tr>
         {paymentRecords?.map((record) => (
           <tr key={record._id}>
            <td>{moment(record.datePaid).format('MMMM Do YYYY')}</td>
            <td>{toCommas(record.amountPaid)}</td>
            <td>{record.paymentMethod}</td>
          </tr>

         ))}
         </tbody>
         </table>
       </div>
      </div>
    </div>
  </div>

    )
}

export default PaymentHistory
