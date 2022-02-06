import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 450,
    // backgroundColor: "#EEEEEE",
  },
}));

export default function ProfileDetail({ profiles }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem >
            <BusinessCenterIcon style={{marginRight: '20px', color: 'gray'}} />
        <ListItemText primary={profiles?.businessName} secondary="" />
      </ListItem>

      <ListItem >
        <LocationOnIcon style={{marginRight: '20px', color: 'gray'}} />
        <ListItemText primary={profiles?.contactAddress} secondary="" />
      </ListItem>

      <ListItem >
        <PhoneInTalkIcon style={{marginRight: '20px', color: 'gray'}} />
        <ListItemText primary={profiles?.phoneNumber} secondary="" />
      </ListItem>

      <ListItem >
        <AlternateEmailIcon style={{marginRight: '20px', color: 'gray'}} />
        <ListItemText primary={profiles?.email} secondary="" />
      </ListItem>

      <ListItem >
        <AccountBalanceWalletRoundedIcon style={{marginRight: '20px', color: 'gray'}} />
        <ListItemText primary={profiles?.paymentDetails} secondary="" />
      </ListItem>

    </List>
  );
}
