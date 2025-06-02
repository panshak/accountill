import React, { useContext } from 'react'
import styles from './Settings.module.css'
import Form from './Form/Form'
import { useHistory } from 'react-router-dom'
import { ThemeContext } from '../../context/ThemeContext'
import { FormControlLabel, Switch, Typography, Paper, Divider } from '@material-ui/core'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'

const Settings = () => {

    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('profile'))
    const { theme, toggleTheme } = useContext(ThemeContext)


    if(!user) {
        history.push('/login')
      }
    

    return (
        <div className={styles.pageContainer}>
           
        <section className={styles.hero}>
            <h1>Profile Settings</h1>
            <div className={styles.paragraph}>
                <p>Edit/ update your business profile</p>
            </div>
        </section>

        <section className={styles.stat}>
            <Paper className={styles.themeSection}>
                <Typography variant="h6" gutterBottom>
                    Appearance
                </Typography>
                <Divider style={{ marginBottom: '20px' }} />
                <div className={styles.themeToggle}>
                    <div className={styles.themeIcon}>
                        {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </div>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={theme === 'dark'}
                                onChange={toggleTheme}
                                name="themeToggle"
                                color="primary"
                            />
                        }
                        label={theme === 'dark' ? "Dark Mode" : "Light Mode"}
                    />
                </div>
            </Paper>
            
            <Form user={user} />
        </section>
       
    </div>
    )
}

export default Settings
