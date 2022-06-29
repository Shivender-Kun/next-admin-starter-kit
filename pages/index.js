import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { toast, ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Image from "next/image";

import LoadingOverlay from "../components/LoadingOverlay";
import { userLogin } from "../redux/actions";
import styles from "./index.module.scss";
import { ASSETS } from "../constants";
import Logo from "../public/logo.png";

const LandingPage = (props) => {
  const [passVisibleStatus, setPassVisibleStatus] = useState(false);
  const [loginTimeStamp, setLoginTimeStamp] = useState("");
  const [shouldLogin, setShouldLogin] = useState(false);
  const [checkStatus, setcheckStatus] = useState(false);

  const { triggerLoginUser, fetching, login } = props;

  useEffect(() => {
    document.title = "Login";
    if (localStorage.getItem("accessToken")) window.location = "/dashboard";
    localStorage.getItem("user") && setcheckStatus(true);
  }, []);

  const onLogin = (e) => {
    e.preventDefault();

    if (
      !(
        document.getElementById("email").value &&
        document.getElementById("password").value
      )
    ) {
      return alert("Both fields mandatory!");
    }
    setShouldLogin(true);
    triggerLoginUser(
      document.getElementById("email").value,
      document.getElementById("password").value
    );
    setLoginTimeStamp(login?.timestamp);
  };

  const responseHandler = () => {
    if (shouldLogin && loginTimeStamp !== login.timestamp) {
      const {
        login: { code, message, data },
      } = props;
      // toast.dismiss();
      if (code === 100) {
        // toast.success(message);
        localStorage.setItem("accessToken", data?.accessToken);
        localStorage.setItem(
          "user",
          checkStatus ? document.getElementById("email").value : ""
        );
        window.location = "/dashboard";
      } else {
        // toast.error("Failed authentication.");
      }
      setShouldLogin(false);
    }
  };

  {
    login && responseHandler();
  }

  return (
    <section className={styles["loginPage"]} id="loginPage">
      {LoadingOverlay({ show: fetching })}
      <div className={styles["loginPageLeft"]}>
        <div className={styles["loginPageLeft-fill"]}>
          <div className={styles["loginPage-logo"]}>
            <h2></h2>
            <Image
              src={Logo}
              alt="logo"
              className={styles["loginPage-logoImg"]}
            />
          </div>
        </div>
      </div>

      <div className={styles["loginPageRight"]}>
        <section className={styles["form-container"]}>
          <div className={styles["text-center"]}>
            <div
              className={styles["logo-text"]}
              style={{ textAlign: "center" }}
            >
              Welcome Back
            </div>
            <div className={styles["sub-heading"]}>Login to your account</div>
          </div>
          <form
            className={styles["user-login"]}
            id="user-login"
            onSubmit={onLogin}
          >
            <div className={styles["input-field-text"]}>
              <div className={styles["input-login-containers"]}>
                <EmailOutlinedIcon className={styles["input-icon"]} />
                <input
                  id="email"
                  name="email"
                  className={`${styles["custom-field"]} ${styles["login-field"]}`}
                  autoFocus
                  autoComplete="email"
                  required
                  defaultValue={
                    typeof window !== "undefined" &&
                    localStorage.getItem("user")
                  }
                />
                <label htmlFor="email" className={styles["label-name"]}>
                  Email id
                </label>
              </div>
            </div>

            <div className={styles["input-field-password"]}>
              <div className={styles["input-login-containers"]}>
                <LockOutlinedIcon className={styles["input-icon"]} />
                <input
                  id="password"
                  name="password"
                  type={passVisibleStatus ? "text" : "password"}
                  className={`${styles["custom-field"]} ${styles["login-field"]}`}
                  autoFocus
                  autoComplete="current-password"
                  required
                />
                <label htmlFor="password" className={styles["label-name"]}>
                  Password
                </label>
                <div
                  className={styles["password-icon"]}
                  onClick={() => {
                    setPassVisibleStatus(!passVisibleStatus);
                  }}
                >
                  {passVisibleStatus ? (
                    <VisibilityOutlinedIcon className={styles["input-icon"]} />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      className={styles["input-icon"]}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className={styles["input-field-text"]}>
              <input
                onChange={() => {
                  setcheckStatus(!checkStatus);
                  typeof window !== "undefined" &&
                    localStorage.removeItem("user");
                }}
                id="loginPageCheckbox"
                type="checkbox"
                defaultChecked={
                  typeof window !== "undefined" && localStorage.user
                }
                className={styles["loginPageCheckbox"]}
              />
              <label htmlFor="contentCheckbox">
                <span className={styles["checkbox-text"]}>Remember me</span>
              </label>
            </div>

            <div className={styles["btn-container"]}>
              <button
                className={styles["login-btn"]}
                onClick={onLogin}
                type="submit"
                aria-label="login"
              >
                Login
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

// handles the outgoing dispatches
const mapDispatchToProps = (dispatch) => {
  return {
    triggerLoginUser: (email, password) =>
      dispatch(userLogin({ email, password })),
  };
};

// handles incoming state changes
const mapStateToProps = (state) => {
  const { fetching, login } = state;
  return { fetching, login };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
