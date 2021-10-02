 /* eslint-disable */
import React, { useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField, Grid } from '@material-ui/core';
import DatePicker from './DatePicker'
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useDispatch } from 'react-redux'
import { updateInvoice } from '../../actions/invoiceActions';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: '#1976D2',
    marginLeft: 0,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: 'white',
  },
});


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Modal = ({ setOpen, open, invoice }) => {

    const dispatch = useDispatch()
    //Create a state to add new payment record
    const [payment, setPayment] = useState({
        amountPaid: 0,
        datePaid: new Date(),
        paymentMethod: '',
        note: '',
        paidBy: ''
    })

    //Material ui datepicker
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  //Crate a state to handle the payment records
    const [paymentRecords, setPaymentRecords] = useState([])
    const [method, setMethod] = useState({})
    const [totalAmountReceived, setTotalAmountReceived] = useState(0)
    const [updatedInvoice, setUpdatedInvoice] = useState({})


    useEffect(() => {
      setPayment({...payment, paymentMethod: method?.title})
    },[method])

    useEffect(() => {
      setPayment({...payment, datePaid: selectedDate})
    },[selectedDate])

    useEffect(() => {
      if(invoice) {
        setPayment({...payment, amountPaid: Number(invoice.total) - Number(invoice.totalAmountReceived), paidBy: invoice?.client?.name})
      }
    },[invoice])
    
    useEffect(() => {
        if(invoice?.paymentRecords) {
            setPaymentRecords(invoice?.paymentRecords)
           
        }
    }, [invoice])

    //Get the total amount paid
    useEffect(() => {
      let totalReceived = 0
      for(var i = 0; i < invoice?.paymentRecords?.length; i++) {
        totalReceived += Number(invoice?.paymentRecords[i]?.amountPaid)
        setTotalAmountReceived(totalReceived)
    }
    }, [invoice, payment] )



    useEffect(() => {
      setUpdatedInvoice({...invoice, status: (Number(totalAmountReceived) + Number(payment.amountPaid)) 
        >= 
        invoice?.total ? 'Paid' : 'Partial', 
        paymentRecords: [...paymentRecords, payment], 
        totalAmountReceived:  Number(totalAmountReceived) + Number(payment.amountPaid)
      })
    },[payment, paymentRecords, totalAmountReceived, invoice] )


    const handleSubmitPayment =(e)=> {
        e.preventDefault()
          dispatch(updateInvoice(invoice._id, updatedInvoice))
          .then(() => {
            handleClose()
            window.location.reload()
          })
          // clear()
    }

  const clear =() => {
  }
    
  const handleClose = () => {
    setOpen(false);
  };


  const paymentMethods = [
    { title: 'Bank Transfer'},
    { title: 'Cash'},
    { title: 'Credit Card'},
    { title: 'PayPal'},
    { title: 'Others'},
  ]

  return (
    <div>
        <form >
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth >
            <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{paddingLeft: '20px', color: 'white'}}>
           Record Payment
            </DialogTitle>
            <DialogContent dividers>

            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

            <TextField 
                type="number" 
                name="amountPaid" 
                label="Amount Paid" 
                fullWidth 
                style={{padding: 10}} 
                variant="outlined" 
                onChange={(e) => setPayment({...payment, amountPaid: e.target.value})}
                value={payment.amountPaid}
            />

            <Grid item fullWidth>
              <Autocomplete
                id="combo-box-demo"
                options={paymentMethods}
                getOptionLabel={(option) => option.title || ''}
                style={{ width: '96%', marginLeft: '10px'}}
                renderInput={(params) => <TextField {...params} label="Payment Method" variant="outlined" />}
                value={method}
                onChange={(event, value) => setMethod(value)}
              />
            </Grid>

            <TextField 
                type="text" 
                name="note" 
                label="Note" 
                fullWidth 
                style={{padding: 10}} 
                variant="outlined" 
                onChange={(e) => setPayment({...payment, note: e.target.value})}
                value={payment.note}
            />

            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleSubmitPayment} variant="contained" style={{marginRight: '25px'}} >
                Save Record
            </Button>
            </DialogActions>
      </Dialog>
        </form>
    </div>
  );
}

export default Modal