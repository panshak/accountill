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



const Settings = () => {

  const user = JSON.parse(localStorage.getItem('profile'))
  const initialState = { 
  name: '', 
  email: '',
  phoneNumber: '',
  businessName: '',
  contactAddress: '', 
  logo: ''
};

  const [form, setForm] = useState(initialState);
  const location = useLocation()
  const dispatch = useDispatch();
  const classes = useStyles();
  const { profiles } = useSelector((state) => state.profiles)
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(updateProfile(profiles?._id, form, openSnackbar));
      setSwitchEdit(0)

  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
     {switchEdit === 0 && (
       <Container component="main" maxWidth="sm">
       <Paper className={classes.paper} elevation={2} >
       <Avatar style={{width: '100px', height: '100px', margin: '30px'}} src={profiles?.logo} alt="" className={classes.avatar}>
         </Avatar>
         <p>{profiles?.businessName}</p>
         <p>{profiles?.contactAddress}</p>
         <p>{profiles?.phoneNumber}</p>
         <p>{profiles?.email}</p>
         <Button variant="outlined" style={{margin: '30px', padding: '15px 30px'}} onClick={() => setSwitchEdit(1)}>Edit Profile</Button>
       </Paper>
       </Container>
     )}

    {switchEdit === 1 && (
      <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={1} >
      <Avatar style={{width: '100px', height: '100px'}} src={profiles?.logo} alt="" className={classes.avatar}>
         </Avatar>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Uploader form={form} setForm={setForm} />
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" half value={form?.email} />
            <Input name="phoneNumber" label="Phone Number" handleChange={handleChange} type="text" half value={form?.phoneNumber}/>
            <Input name="businessName" label="Business Name" handleChange={handleChange} type="text" value={form?.businessName}/>
            <Input name="contactAddress" label="Contact Address" handleChange={handleChange} type="text" value={form?.contactAddress} />
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
