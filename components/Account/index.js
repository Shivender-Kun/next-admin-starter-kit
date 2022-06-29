import CommentsDisabledOutlinedIcon from "@mui/icons-material/CommentsDisabledOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Link from "next/link";

import {
  switchNavigation,
  genericUpdateState,
  fetchEntity,
} from "../../redux/actions";
import { SIDEBAR_ACTION } from "../../redux/actions/actionTypes";
import { navigationIndexer } from "../../constants";
import LoadingOverlay from "../LoadingOverlay";
import AccountHeader from "../AccountHeader";

import Dashboard from "../../pages/dashboard";
import styles from "./index.module.scss";

const NavigationOption = (name, Icon, optionActive) => {
  return (
    <Link href={`/${name.replace(" ", "").toLowerCase()}`}>
      <a
        className={`sidebar-item ${
          optionActive ===
          navigationIndexer[name.replace(" ", "").toLowerCase()]
            ? "item-active"
            : ""
        }`}
      >
        <Icon className="sidebar-icon" />
        {name}
      </a>
    </Link>
  );
};

const Account = (props) => {
  const { triggerUpdateState, active, sidebar, fetching } = props;

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) window.location = "/";

    if (window.innerWidth <= 800) {
      triggerUpdateState(SIDEBAR_ACTION, { value: true });
      const sec = document.getElementsByClassName("navbar-left")[0];
      sec.style.minWidth = "150px";
    }
  }, []);

  const sidebarHandler = () => {
    triggerUpdateState(SIDEBAR_ACTION, { value: !sidebar.value });
    const sec = document.getElementsByClassName("navbar-left")[0];
    sec.style.minWidth = sidebar.value ? "275px" : "150px";
    sec.style.justifyContent = sidebar.value ? "space-between" : "space-evenly";
  };

  return (
    <section className={styles["navigation"]}>
      {LoadingOverlay({ show: fetching })}

      <AccountHeader sidebarHandler={sidebarHandler} />
      <section
        className={styles["navigation-bottom"]}
        style={{ overflow: "hidden" }}
      >
        <section
          className={`${styles["navigation-sidebar"]} ${
            sidebar.value && styles["small-navigation-sidebar"]
          }`}
        >
          <div>
            <section className="sidebar">
              {NavigationOption("Dashboard", DashboardOutlinedIcon, active)}

              {NavigationOption("Activity", LocalActivityOutlinedIcon, active)}

              {NavigationOption("Users", PersonOutlinedIcon, active)}

              {NavigationOption("Posts", MessageOutlinedIcon, active)}

              {NavigationOption(
                "Reported Users",
                PersonOffOutlinedIcon,
                active
              )}

              {NavigationOption(
                "Reported Posts",
                CommentsDisabledOutlinedIcon,
                active
              )}

              {NavigationOption(
                "Notifications",
                NotificationsOutlinedIcon,
                active
              )}

              {NavigationOption("Settings", SettingsOutlinedIcon, active)}
            </section>
          </div>
        </section>

        <section
          className={styles["dynamicContainer"]}
          style={{ overflow: "auto" }}
        >
          <section className="content-container">
            {props.children || <Dashboard />}
          </section>
        </section>
      </section>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerFetchEntity: (endpoint, payload, page, limit) =>
      dispatch(fetchEntity({ endpoint, payload, page, limit })),
    triggerSwitchNavigation: (active) => dispatch(switchNavigation({ active })),
    triggerUpdateState: (type, value) =>
      dispatch(genericUpdateState({ type, value })),
  };
};

const mapStateToProps = (state) => {
  const {
    fetching,
    navigation: { active },
    sidebar,
  } = state;
  return { fetching, active, sidebar };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
