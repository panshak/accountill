import React from 'react'
import styles from './Home.module.css'

const Home = () => {
   
    return (
        <div className={styles.pageContainer}>
            
            <section className={styles.hero}>
                <h1>Easiest invoicing for freelancers and small businesses</h1>
                <div className={styles.paragraph}>
                   
                    <p>Free and Open Source Invoicing application made with MongoDB, Express, React & Nodejs</p>
                </div>
                <div className={styles.imgContainer}>
                    <img src="https://res.cloudinary.com/almpo/image/upload/v1637241441/special/banner_izy4xm.png" alt="invoicing-app"/>
                </div>
            </section>
        </div>
    )
}

export default Home
