import React, { useEffect, useState } from 'react'
import { toCommas } from '../../utils/utils'
import styles from './Dashboard.module.css'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getInvoicesByUser } from '../../actions/invoiceActions'
import Empty from '../svgIcons/Empty'
import Chart from './Chart'
import Donut from './Donut'
import moment from 'moment'
import { Check, Pie, Bag, Card, Clock, Frown } from './Icons'
import Spinner from '../Spinner/Spinner'


const Dashboard = () => {

    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const { invoices, isLoading } = useSelector((state) => state?.invoices)
    // const unpaid = invoices?.filter((invoice) => (invoice.status === 'Unpaid') || (invoice.status === 'Partial'))
    const overDue = invoices?.filter((invoice) => invoice.dueDate <= new Date().toISOString())


    let paymentHistory = []
    for(let i = 0; i < invoices.length; i++) {
        let history = []
        if(invoices[i].paymentRecords !== undefined) {
            history = [...paymentHistory, invoices[i].paymentRecords]
            paymentHistory = [].concat.apply([], history);
        }
        
    }


    //sort payment history by date
   const sortHistoryByDate =  paymentHistory.sort(function(a, b) {
        var c = new Date(a.datePaid);
        var d = new Date(b.datePaid);
        return d-c;
    });
    
    
    let totalPaid = 0
    for(let i = 0; i < invoices.length; i++) {
        if(invoices[i].totalAmountReceived !== undefined) {
            totalPaid += invoices[i].totalAmountReceived
        }
        
    }

    let totalAmount = 0
    for(let i = 0; i < invoices.length; i++) {
        totalAmount += invoices[i].total
    }
   
    
    useEffect(() => {
        dispatch(getInvoicesByUser({search: user?.result._id || user?.result?.googleId}));
        // eslint-disable-next-line
    }, [location, dispatch]);
   

    const unpaidInvoice = invoices?.filter((invoice) => invoice.status === 'Unpaid')
    const paid = invoices?.filter((invoice) => invoice.status === 'Paid')
    const partial = invoices?.filter((invoice) => invoice.status === 'Partial')
    
    if(!user) {
        history.push('/login')
      }


      if(isLoading) {
        return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
            <Spinner />
        </div>
      }

      if(invoices.length === 0) {
        return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
            {/* <Spinner /> */}
          <Empty />
        <p style={{padding: '40px', color: 'gray'}}>Nothing to display. Click the plus icon to start creating</p>
        </div>
      }

      
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/login');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.topBar}>
                <div className={styles.userMenu}>
                    <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>
                            {user?.result?.name?.charAt(0)}
                        </div>
                        <span className={styles.userName}>{user?.result?.name}</span>
                        <div className={styles.userDropdown}>
                            <button onClick={() => history.push('/settings')} className={styles.userMenuItem}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                                    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                                </svg>
                                Edit Profile
                            </button>
                            <button onClick={logout} className={styles.userMenuItem}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <section className={styles.stat}>
            <ul className={styles.autoGrid}>
                        <li className={styles.listItem} style={{backgroundColor: '#1976d2', color: 'white'}}>
                            <div>
                                <p>{toCommas(totalPaid)}</p>
                                <h2 style={{color: 'white'}}>Payment Received</h2>
                            </div>
                            <div>
                                <Check />
                            </div>
                        </li>

                        <li className={styles.listItem} >
                            <div>
                                <p>{toCommas(totalAmount - totalPaid)}</p>
                                <h2>Pending Amount</h2>
                            </div>
                            <div>
                                <Pie />
                            </div>
                        </li>

                        <li className={styles.listItem} >
                            <div>
                                <p>{toCommas(totalAmount)}</p>
                                <h2>Total Amount</h2>
                            </div>
                            <div>
                                <Bag />
                            </div>
                        </li>

                        <li className={styles.listItem} >
                            <div>
                                <p>{invoices.length}</p>
                                <h2>Total Invoices</h2>
                            </div>
                            <div>
                                <Card />
                            </div>
                        </li>


                        <li className={styles.listItem} style={{backgroundColor: '#206841', color: 'white'}}>
                            <div>
                                <p>{paid.length}</p>
                                <h2 style={{color: 'white'}}>Paid Invoices</h2>
                            </div>
                            <div>
                                <Check />
                            </div>
                        </li>

                        <li className={styles.listItem} >
                            <div>
                                <p>{partial.length}</p>
                                <h2>Partially Paid Invoices</h2>
                            </div>
                            <div>
                                <Pie />
                            </div>
                        </li>

                        <li className={styles.listItem} >
                            <div>
                                <p>{unpaidInvoice.length}</p>
                                <h2>Unpaid Invoices</h2>
                            </div>
                            <div>
                                <Frown />
                            </div>
                        </li>

                        <li className={styles.listItem} >
                            <div>
                                <p>{overDue.length}</p>
                                <h2>Overdue</h2>
                            </div>
                            <div>
                                <Clock />
                            </div>
                        </li>
                        
                 
                </ul>

            </section>

            <div className={styles.chartsContainer}>
                <section className={styles.chartSection}>
                    {paymentHistory.length !== 0 && <Chart paymentHistory={paymentHistory} />}
                </section>
                <section className={styles.donutSection}>
                    <Donut paid={paid.length} unpaid={unpaidInvoice.length} partial={partial.length} />
                </section>
            </div>

            <section className={styles.quickActions}>
                <h2>Quick Actions</h2>
                <div className={styles.actionButtons}>
                    <button onClick={() => history.push('/invoice')} className={styles.actionButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="12" y1="18" x2="12" y2="12"></line>
                            <line x1="9" y1="15" x2="15" y2="15"></line>
                        </svg>
                        Create Invoice
                    </button>
                    <button onClick={() => history.push('/customers')} className={styles.actionButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                        Add Customer
                    </button>
                    <button onClick={() => history.push('/settings')} className={styles.actionButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                        Settings
                    </button>
                </div>
            </section>

            <section className={styles.recentPaymentsSection}>
                <h2>{paymentHistory.length ? 'Recent Payments' : 'No payment received yet'}</h2>
                <div className={styles.table}>
                    <table>
                        <thead>
                            {paymentHistory.length !== 0 && (
                                <tr>
                                    <th></th>
                                    <th>Paid By</th>
                                    <th>Date Paid</th>
                                    <th>Amount Paid</th>
                                    <th>Payment Method</th>
                                    <th>Note</th>
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {sortHistoryByDate.slice(-10).map((record) => (
                                <tr className={styles.tableRow} key={record._id}>
                                    <td>
                                        <div className={styles.avatar}>
                                            {record?.paidBy?.charAt(0)}
                                        </div>
                                    </td>
                                    <td>{record.paidBy}</td>
                                    <td>{moment(record.datePaid).format('MMM D, YYYY')}</td>
                                    <td>
                                        <span className={styles.amount}>
                                            {toCommas(record.amountPaid)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.paymentMethod} ${styles[record.paymentMethod.toLowerCase()]}`}>
                                            {record.paymentMethod}
                                        </span>
                                    </td>
                                    <td>{record.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
           
        </div>
    )
}

export default Dashboard
