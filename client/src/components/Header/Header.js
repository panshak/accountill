import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import styles from './Header.module.css'

const Header = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const history = useHistory()
    const location = useLocation()


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])


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



    if(!user) return (
        <div className={styles.header2}>
         <img style={{width: '160px', cursor: 'pointer'}} onClick={()=> history.push('/')} src="https://i.postimg.cc/C5fxh51H/Arc-Invoice-Logo2.png" alt="arc-invoice" />
        <button onClick={()=> history.push('/login')} className={styles.login}>Get started</button>
        </div>
    )
    return (
        <div className={styles.header}>
            <button onClick={()=> logout()} className={styles.login}>Logout</button>
        </div>
    )
}

export default Header
