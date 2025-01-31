import React from "react";
import styles from "@/styles/Spinner.module.scss";
import LoadingSpinner from "./LoadingSpinner";

const LoadingSpinnerContainer = () => {
  /* ----------------------------- RENDER -------------------------------- */

  return (
    <div className={styles["spinner-container"]}>
      <LoadingSpinner />
    </div>
  );
};

export default LoadingSpinnerContainer;
