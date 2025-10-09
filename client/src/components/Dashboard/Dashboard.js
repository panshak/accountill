import React, { useEffect, useState } from 'react' // <--- ADDED: useState
import { toCommas } from '../../utils/utils'
import styles from './Dashboard.module.css'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getInvoicesByUser } from '../../actions/invoiceActions'
import Empty from '../svgIcons/Empty'
import Chart from './Chart'
// import Donut from './Donut'
import moment from 'moment'
import { Check, Pie, Card, Clock, Frown } from './Icons'
import Spinner from '../Spinner/Spinner'
import KPIHeader from '../KPIHeader'
import { getDashboardKPIs } from '../../actions/dashboard' // <--- ASSUMED: Import new action

const Dashboard = () => {

    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    
    // --- EDITED: Accessing the existing invoices state and the NEW dashboard state ---
    const { invoices, isLoading } = useSelector((state) => state?.invoices)
    const dashboardState = useSelector((state) => state?.dashboard) // <--- ADDED: Access new dashboard state

    // --- ADDED: State to manage the sticky header ---
    const [isSticky, setSticky] = useState(false);
    // ----------------------------------------------------

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
        // --- ADDED: Dispatch new action to fetch dashboard KPIs ---
        dispatch(getDashboardKPIs()); // Assuming this action exists and is correctly structured
        // ----------------------------------------------------------------
        
        // --- ADDED: Scroll listener for sticky header ---
        const handleScroll = () => {
            // Set sticky true when scrolled down past a certain threshold (e.g., 60px)
            setSticky(window.scrollY > 60); 
        };

        window.addEventListener('scroll', handleScroll);
        
        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // ----------------------------------------------------------------

        // eslint-disable-next-line
    }, [location, dispatch]);
    

    const unpaidInvoice = invoices?.filter((invoice) => invoice.status === 'Unpaid')
    const paid = invoices?.filter((invoice) => invoice.status === 'Paid')
    const partial = invoices?.filter((invoice) => invoice.status === 'Partial')
    
    if(!user) {
        history.push('/login')
      }


    // --- EDITED: Adjusted isLoading check to include new dashboard state loading ---
    // Combined loading checks for a unified spinner
    if(isLoading || dashboardState?.loading) {
        return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
            <Spinner />
        </div>
      }
    // ---------------------------------------------------------------------------------

    // --- EDITED: Consider existing data for the new header structure ---
    const kpiHeaderData = {
        totalRevenue: totalPaid, // This is your existing "Payment Received"
        totalExpenses: 0, // Placeholder, you'd fetch this from the server
        totalProfit: totalPaid, // Placeholder (Revenue - Expenses)
        // You can use the new data fetched via Redux here: dashboardState.kpis.summary
    };
    // ---------------------------------------------------------------------------------

    if(invoices.length === 0) {
        return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
            {/* <Spinner /> */}
          <Empty />
        <p style={{padding: '40px', color: 'gray'}}>Nothing to display. Click the plus icon to start creating</p>
        </div>
      }

    
    return (
        <div className={styles.pageContainer}>
            
            {/* --- ADDED: The new Sticky KPI Header Component --- */}
            <KPIHeader 
                data={kpiHeaderData} 
                isSticky={isSticky} 
            />
            {/* -------------------------------------------------- */}

            {/* --- ADDED: Spacer div to prevent content jump when sticky is active --- */}
            <div className={`${styles.spacer} ${isSticky ? styles.stickySpacerActive : ''}`}></div>
            {/* ----------------------------------------------------------------------- */}


            {/* --- EDITED: Moved the original KPI cards JSX to the old section --- */}
            {/* The original KPI section is commented out/removed as it's replaced by KPIHeader */}
            {/* The list of all your invoice count metrics can be placed below the sticky header. */}

            <section className={styles.stat} style={{ paddingTop: '20px' }}> {/* <-- Added padding to differentiate */}
                <ul className={styles.autoGrid}>
                        {/* Original KPI card for Payment Received removed/replaced by sticky header */}
                        {/* Original KPI card for Pending Amount removed/replaced by sticky header */}
                        {/* Original KPI card for Total Amount removed/replaced by sticky header */}
                        {/* Original KPI card for Total Invoices moved below */}
                        
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
            {/* --------------------------------------------------------------------- */}


            {paymentHistory.length !== 0 && (
            <section>
                <Chart paymentHistory={paymentHistory} />
            </section>
            )}

                <section>
                <h1 style={{textAlign: 'center', padding: '30px' }}>{paymentHistory.length ? 'Recent Payments' : 'No payment received yet'}</h1>
                    <div>
                    <div className={styles.table}>
                        
                        <table>
                            <tbody>
                            {paymentHistory.length !== 0 && (
                                <tr>
                                <th style={{padding: '15px'}}></th>
                                <th style={{padding: '15px'}}>Paid By</th>
                                <th style={{padding: '15px'}}>Date Paid</th>
                                <th style={{padding: '15px'}}>Amount Paid</th>
                                <th style={{padding: '15px'}}>Payment Method</th>
                                <th style={{padding: '15px'}}>Note</th>
                            </tr>
                            )}
                            
                            {sortHistoryByDate.slice(-10).map((record) => (
                            <tr  className={styles.tableRow} key={record._id}>
                                <td><button>{record?.paidBy?.charAt(0)}</button></td>
                                <td>{record.paidBy}</td>
                                <td>{moment(record.datePaid).format('MMMM Do YYYY')}</td>
                                <td><h3 style={{color: '#00A86B', fontSize: '14px'}} >{toCommas(record.amountPaid)}</h3></td>
                                <td>{record.paymentMethod}</td>
                                <td>{record.note}</td>
                            </tr>

                            ))}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </section>
            
        </div>
    )
}

export default Dashboard