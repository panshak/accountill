import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#1976d2',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(0),
  },
}));