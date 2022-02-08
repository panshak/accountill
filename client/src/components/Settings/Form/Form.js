 /* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useSnackbar } from 'react-simple-snackbar'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Container } from '@material-ui/core';
import Uploader from './Uploader';
import { getProfilesByUser, updateProfile } from '../../../actions/profile';
import useStyles from './styles';
import Input from './Input';
import ProfileDetail from './Profile';




const Settings = () => {

  const user = JSON.parse(localStorage.getItem('profile'))
  const initialState = { 
  name: '', 
  email: '',
  phoneNumber: '',
  businessName: '',
  contactAddress: '', 
  logo: '',
  paymentDetails: ''
};

  const [form, setForm] = useState(initialState);
  const location = useLocation()
  const dispatch = useDispatch();
  const classes = useStyles();
  const { profiles } = useSelector((state) => state.profiles)
  console.log(profiles)
 const [switchEdit, setSwitchEdit] = useState(0)

  // eslint-disable-next-line 
  const [openSnackbar, closeSnackbar] = useSnackbar()


  useEffect(() => {
    if(switchEdit === 1) {
      setForm(profiles)
    }
  },[switchEdit])

  useEffect(() => {
    dispatch(getProfilesByUser({ search: user?.result?._id || user?.result.googleId}))
  },[location, switchEdit])


      localStorage.setItem('profileDetail', JSON.stringify({...profiles}))
  
  const handleSubmit = async(e) => {
    e.preventDefault();
      await dispatch(updateProfile(profiles?._id, form, openSnackbar));
      setSwitchEdit(0)

  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>

      {switchEdit === 0 && (
        <Container component="main" maxWidth="sm">
        <Paper className={classes.paper} elevation={0} >
        <ProfileDetail  profiles={profiles} />
        <Button variant="outlined" style={{margin: '30px', padding: '15px 30px'}} onClick={() => setSwitchEdit(1)}>Edit Profile</Button>
       </Paper>
       </Container>
      )}

    {switchEdit === 1 && (
      <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={1} >
      <div style={{display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderBottom: 'solid 1px #dddddd',
        paddingBottom: '20px'
        }}>
        <Avatar style={{width: '100px', height: '100px'}} src={profiles?.logo} alt="" className={classes.avatar} />
      </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Uploader form={form} setForm={setForm} />
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" half value={form?.email} />
            <Input name="phoneNumber" label="Phone Number" handleChange={handleChange} type="text" half value={form?.phoneNumber}/>
            <Input name="businessName" label="Business Name" handleChange={handleChange} type="text" value={form?.businessName}/>
            <Input name="contactAddress" label="Contact Address" handleChange={handleChange} type="text" value={form?.contactAddress} />
            <Input name="paymentDetails" label="Payment Details/Notes" handleChange={handleChange} type="text" multiline rows="4" value={form?.paymentDetails} />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
           Update Settings
          </Button>
          <Grid container justifyContent="flex-end">
          </Grid>
        </form>
      </Paper>
    </Container>
    )}
    </div>
  );
};

export default Settings;
