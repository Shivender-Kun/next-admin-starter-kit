import { toast } from "react-toastify";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import Image from "next/image";

import {
  genericUpdateState,
  nullifyApiMessage,
  switchNavigation,
  genericApiHit,
  fetchEntity,
} from "../../redux/actions";
import {
  APPLICATION_ROUTES,
  navigationIndexer,
  NOTIFICATION_LIST,
  IMAGE_PREFIXES,
} from "../../constants";
import { SWITCH_NOTIFICATION_LIST } from "../../redux/actions/actionTypes";
import PlaceHolderIMG from "../../public/profile.png";
import SearchBar from "../../components/SearchBar";
import Main from "../../components/Account";
import styles from "./index.module.scss";

const User = (user, index, selectOne) => {
  const imageLoader = (src) => {
    if (src.src != PlaceHolderIMG.src) {
      return `${IMAGE_PREFIXES.IMAGE_SMALL}${src.src}`;
    }
    return src.src;
  };

  return (
    <div className={styles["user-selection-element"]} key={user._id + index}>
      <input
        id={`checkbox-${index}`}
        type="checkbox"
        className={styles["checkbox"]}
        defaultChecked={selectedUsers.includes(user._id)}
        onChange={() => {
          selectOne(user._id);
        }}
      />

      <Image
        loader={imageLoader}
        src={user.picture || PlaceHolderIMG}
        onError={(e) => {
          e.target.src = PlaceHolderIMG.src;
          e.target.srcset = PlaceHolderIMG.src;
        }}
        alt={user.name || "user"}
        width="40px"
        height="40px"
        className={styles["user-selection-img"]}
      />
      <div className={styles["user-selection-info"]}>
        <div className={styles["user-selection-name"]}>
          {user.name || user.firstName}
        </div>
        <div className={styles["user-selection-email"]}>{user.email}</div>
      </div>
    </div>
  );
};

let selectedUsers = [];

const Notifications = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [newUserList, setnewUserList] = useState([]);

  const {
    users: { list },
    apiMessage,
    triggerSwitchNavigation,
    triggerUpdateState,
    triggerFetchEntity,
    switchNotificationsState: { value },
  } = props;

  useEffect(() => {
    triggerSwitchNavigation(navigationIndexer.notifications);
    triggerFetchEntity(
      APPLICATION_ROUTES.USERS,
      {
        text: searchInput || "",
        notificationList: true,
      },
      1,
      100000000
    );
  }, [searchInput, triggerFetchEntity, triggerSwitchNavigation]);

  useMemo(() => {
    if (list.length) {
      const allUsers = list.filter((user) => {
        return user.blocked !== true;
      });
      setnewUserList(allUsers);
    }
  }, [list]);

  const handleActiveState = (value = NOTIFICATION_LIST.NONE) => {
    triggerUpdateState(SWITCH_NOTIFICATION_LIST, { value });
  };

  const selectOne = (id) => {
    if (selectedUsers.indexOf(id) > -1) {
      selectedUsers.splice(selectedUsers.indexOf(id), 1);
    } else {
      selectedUsers.push(id);
    }

    if (selectedUsers.length === newUserList.length) {
      handleActiveState(NOTIFICATION_LIST.ALL);
    } else handleActiveState(NOTIFICATION_LIST.SELECTED);
  };

  const selectAll = () => {
    const checkboxes = document.querySelectorAll(`input.${styles["checkbox"]}`);
    if (selectedUsers.length === newUserList.length) {
      unselectAll(checkboxes);
    } else {
      for (let index = 0; index < newUserList.length; index++) {
        if (selectedUsers.indexOf(newUserList[index]._id) === -1) {
          selectedUsers.push(newUserList[index]._id);
        }
      }
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
      handleActiveState(NOTIFICATION_LIST.ALL);
    }
  };

  const unselectAll = (checkboxes) => {
    selectedUsers = [];
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    handleActiveState(NOTIFICATION_LIST.NONE);
  };

  const sendNotifications = () => {
    if (!selectedUsers.length) {
      toast.dismiss();
      return toast.warn("Please select some users to send notifications to!");
    }
    if (!document.getElementById("notificationText").value) {
      toast.dismiss();
      return toast.warn("Notification message cannot be empty!");
    }
    props.triggerGenericApiHit(APPLICATION_ROUTES.NOTIFICATION_BROADCAST, {
      userIds: selectedUsers,
      message: document.getElementById("notificationText").value,
    });
    document
      .getElementsByClassName(`${styles["user-selection-list"]}`)[0]
      .scrollTo(0, 0);
    handleActiveState(NOTIFICATION_LIST.NONE);
  };

  if (apiMessage.message) {
    if (apiMessage.code === 100) {
      selectedUsers = [];
      const checkboxes = document.querySelectorAll(
        `input.${styles["checkbox"]}`
      );
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      document.getElementById("notificationText").value = "";
    }
  }

  return (
    <Main>
      <Head>
        <title>Notifications</title>
      </Head>
      <section className="content">
        <section className="content-top">
          <div className="content-heading">Notifications</div>
          <div className={styles["notifications-main-div"]}>
            <div className={styles["notifications-message-div"]}>
              <div className={styles["notifications-message-heading"]}>
                Message
              </div>
              <textarea
                id="notificationText"
                className={styles["notifications-textarea"]}
              />
              <div className={styles["notifications-message-heading"]}>
                Note: Select users from right pane who you want to send the
                notification.
              </div>
              <button
                onClick={sendNotifications}
                className={styles["notifications-send-btn"]}
                aria-label="send notifications"
              >
                Send
              </button>
            </div>
            <div className={styles["user-selection-main-div"]}>
              <div className={styles["user-selection-header"]}>
                <div className={styles["user-selection-left"]}>Users</div>

                <div
                  onClick={selectAll}
                  className={styles["user-selection-right"]}
                >
                  {value != 0 ? "Select All" : "Unselect All"}
                </div>
              </div>

              <div className={styles["user-selection-header"]}>
                <SearchBar
                  setSearchInput={setSearchInput}
                  searchInput={searchInput}
                />
              </div>

              <div className={styles["user-selection-list"]}>
                {newUserList &&
                  newUserList.map((user, index) =>
                    User(user, index, selectOne)
                  )}
              </div>
            </div>
          </div>
        </section>
      </section>
    </Main>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerSwitchNavigation: (active) => dispatch(switchNavigation({ active })),
    triggerFetchEntity: (endpoint, payload, page, limit) =>
      dispatch(fetchEntity({ endpoint, payload, page, limit })),
    triggerGenericApiHit: (endpoint, payload, page, limit) =>
      dispatch(genericApiHit({ endpoint, payload, page, limit })),
    triggerUpdateState: (type, value) =>
      dispatch(genericUpdateState({ type, value })),
  };
};
const mapStateToProps = (state) => {
  const {
    fetching,
    users,
    apiMessage,
    switchNotificationsState,
    serviceProviders,
  } = state;
  return {
    users,
    fetching,
    apiMessage,
    switchNotificationsState,
    serviceProviders,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
