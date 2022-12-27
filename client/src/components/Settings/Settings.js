import React from "react";
import styles from "./Settings.module.css";
import Form from "./Form/Form";
import { useHistory } from "react-router-dom";
import { unicodeToChar } from "../../utils/utils";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("profile"));

  if (!user) {
    history.push("/login");
  }

  return (
    <div className={styles.pageContainer}>
      <section className={styles.hero}>
        <h1>{unicodeToChar(t("settings.profile_settings"))}</h1>
        <div className={styles.paragraph}>
          <p>{unicodeToChar(t("settings.edit_update"))}</p>
        </div>
      </section>
      <section className={styles.stat}>
        <Form user={user} />
      </section>
    </div>
  );
};

export default Settings;
