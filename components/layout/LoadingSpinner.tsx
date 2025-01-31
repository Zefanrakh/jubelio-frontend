import React from "react";
import styles from "@/styles/Spinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
