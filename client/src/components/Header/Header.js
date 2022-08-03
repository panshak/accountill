import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import styles from './Header.module.css'

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));



const Header = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const history = useHistory()
    const location = useLocation()


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

    
    //GET REPO INFO FROM GITHUB
    // useEffect(() => {
    //   getMetaData()
    // },[])


    // const getMetaData = async() => {
    //   const response = await axios.get('https://api.github.com/repos/panshak/arc')
    //       // console.log(response.data);
    // }

    const logout =() => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
        setUser(null)
    }  


    useEffect(()=> {
        const token = user?.token
        // setUser(JSON.parse(localStorage.getItem('profile')))
        //If token expires, logout the user
        if(token) {
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        // eslint-disable-next-line
    }, [location, user]) //when location changes, set the user





  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event ) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };


  const openLink =(link) => {
      history.push(`/${link}`)
      setOpen(false);
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);




    if(!user) return (
        <div className={styles.header2}>
         <img style={{width: '50px', cursor: 'pointer'}} onClick={()=> history.push('/')} src="https://i.postimg.cc/hGZKzdkS/logo.png" alt="arc-invoice" />
        <button onClick={()=> history.push('/login')} className={styles.login}>Get started</button>
        </div>
    )
    return (
        <div className={styles.header}>
            <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar style={{backgroundColor: '#1976D2'}}>{user?.result?.name?.charAt(0)}</Avatar>
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper elevation={3}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >
                    <MenuItem onClick={() => openLink('settings') }>{(user?.result?.name).split(" ")[0]}</MenuItem>
                    <MenuItem onClick={()=> logout()} >Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>


        </div>
    )
}

export default Header
