import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import React from "react";

import Logo from "../../public/logo.png";
import ImageLogo from "../../components/Image";
import { ASSETS } from "../../constants";
import styles from "./index.module.scss";

const AccountHeader = (props) => {
  const handleLogout = (e) => {
    localStorage.removeItem("accessToken");
    window.location = "/";
  };

  return (
    <section className={styles["navigation-navbar"]}>
      <section className={`${styles["navbar-left"]} navbar-left`}>
        <MenuOutlinedIcon
          onClick={props.sidebarHandler}
          style={{ margin: "10px", fontSize: "50px", color: "#463dd5" }}
        />
        <ImageLogo image={ASSETS.APP_LOGO} />
      </section>
      <section className={styles["navbar-right"]}>
        <button onClick={handleLogout} className={styles["navbar-button"]}>
          <ExitToAppOutlinedIcon
            style={{ marginRight: "5px" }}
            fontSize="large"
          />
          Logout
        </button>
      </section>
    </section>
  );
};

export default AccountHeader;
