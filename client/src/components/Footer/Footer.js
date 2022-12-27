import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Footer.module.css";
import FabButton from "../Fab/Fab";
import { unicodeToChar } from "../../utils/utils";
import i18n from "../../i18nextConf";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    setLanguage(
      localStorage.getItem("i18nextLng")
        ? localStorage.getItem("i18nextLng")
        : "en"
    );
  }, [location]);

  return (
    <footer>
      <div className={styles.footerText}>
        <select
          className={styles.select}
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            i18n.changeLanguage(e.target.value);
            // window.location.reload();
          }}
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="de">German</option>
          <option value="el">Greek</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="hi">Hindi</option>
          <option value="id">Indonesian</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="tr">Turkish</option>
          <option value="ur">Urdu</option>
          <option value="vi">Vietnamese</option>
          <option value="zh">Chinese</option>
        </select>
        <span className={styles.text}>
          ©Panshak Solomon | {unicodeToChar(t("footer.note"))}{" "}
          <span>
            <a
              href="https://github.com/Panshak/accountill"
              target="_blank"
              rel="noopener noreferrer"
            >
              [{unicodeToChar(t("footer.download_note"))}]
            </a>
          </span>
        </span>
      </div>
      {user && <FabButton />}
    </footer>
  );
};

export default Footer;
