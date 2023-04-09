/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { useDispatch, useSelector } from 'react-redux'
import { createClient, updateClient } from '../../actions/clientActions'
import { useSnackbar } from 'react-simple-snackbar'

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
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const AddClient = ({ setOpen, open, currentId, setCurrentId }) => {
  const location = useLocation()
  const [clientData, setClientData] = useState({ name: '', email: '', phone: '', address: '', userId: '' })
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const client = useSelector((state) => currentId ? state.clients.clients.find((c) => c._id === currentId) : null)
  // eslint-disable-next-line 
  const [openSnackbar, closeSnackbar] = useSnackbar()


  useEffect(() => {
    if (client) {
      setClientData(client)
    }
  }, [client])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
    // setClientData({...clientData, userId: user?.result?._id})
  }, [location])


  useEffect(() => {
    var checkId = user?.result?._id
    if (checkId !== undefined) {
      setClientData({ ...clientData, userId: [checkId] })
    } else {
      setClientData({ ...clientData, userId: [user?.result?.googleId] })
    }

  }, [location])


  const handleSubmitClient = (e) => {
    e.preventDefault()
    if (currentId) {
      dispatch(updateClient(currentId, clientData, openSnackbar))
    } else {
      dispatch(createClient(clientData, openSnackbar))
    }

    clear()
    handleClose()
  }

  const clear = () => {
    setCurrentId(null)
    setClientData({ name: '', email: '', phone: '', address: '', userId: [] })
  }

  const handleClose = () => {
    setOpen(false);
  };

  const inputStyle = {
    display: "block",
    padding: "1.4rem 0.75rem",
    width: "100%",
    fontSize: "0.8rem",
    lineHeight: 1.25,
    color: "#55595c",
    backgroundColor: "#fff",
    backgroundImage: "none",
    backgroundClip: "padding-box",
    borderTop: "0",
    borderRight: "0",
    borderBottom: "1px solid #eee",
    borderLeft: "0",
    borderRadius: "3px",
    transition: "all 0.25s cubic-bezier(0.4, 0, 1, 1)"
  }


  return (
    <div>
      <form >
        <Dialog
          onClose={(e, reason) => {
            if (reason !== 'backdropClick') {
              handleClose()
            }
          }}
          aria-labelledby="customized-dialog-title"
          open={open} fullWidth
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{ paddingLeft: '20px', color: 'white' }}>
            {currentId ? 'Edit Customer' : 'Add new Client'}
          </DialogTitle>
          <DialogContent dividers>


            <div className="customInputs">
              <input
                placeholder="Name"
                style={inputStyle}
                name='name'
                type='text'
                onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                value={clientData.name}
              />

              <input
                placeholder="Email"
                style={inputStyle}
                name='email'
                type='text'
                onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                value={clientData.email}
              />

              <input
                placeholder="Phone"
                style={inputStyle}
                name='phone'
                type='text'
                onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                value={clientData.phone}
              />

              <input
                placeholder="Address"
                style={inputStyle}
                name='address'
                type='text'
                onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
                value={clientData.address}
              />
            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmitClient} variant="contained" style={{ marginRight: '25px' }} >
              Save Customer
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}

export default AddClient