import React from "react";
import styles from "./Home.module.css";
import { unicodeToChar } from "../../utils/utils";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.pageContainer}>
      <section className={styles.hero}>
        <h1>{unicodeToChar(t("intro"))}</h1>
        <div className={styles.paragraph}>
          <p>{unicodeToChar(t("intro.para"))}</p>
        </div>
        <div className={styles.imgContainer}>
          <img
            src="https://res.cloudinary.com/almpo/image/upload/v1637241441/special/banner_izy4xm.png"
            alt="invoicing-app"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
