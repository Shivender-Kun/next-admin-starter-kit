/**
 * The application loading component
 * @author gaurav sharma
 * @since 9th january 2018
 */
import React from "react";
import styles from "./index.module.css";

const LoadingOverlay = ({ show = false, key = Math.random() * 1000 }) => {
  return (
    <section
      style={{ display: show ? "block" : "none" }}
      className={styles["loader-container"]}
    >
      <div className={styles["lds-roller"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default LoadingOverlay;
