import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
// import { toast, ToastContainer } from "react-toastify";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  switchNavigation,
  genericUpdateState,
  fetchEntity,
  genericApiHit,
  nullifyApiMessage,
} from "../../redux/actions";
import {
  navigationIndexer,
  APPLICATION_ROUTES,
  settingsIndexer,
} from "../../constants";
import { SETTINGS_STATE_ACTION } from "../../redux/actions/actionTypes";
import AppDetails from "../../components/AppDetails";
import Main from "../../components/Account";
import styles from "./index.module.scss";
import Faq from "../../components/Faq";

const SettingOption = (onClick, name, Icon, url, active) => (
  <button
    onClick={() => onClick(settingsIndexer[url])}
    className={`sidebar-item ${
      active.value === settingsIndexer[url] && "item-active"
    }`}
  >
    <Icon className="sidebar-icon" />
    {name}
  </button>
);

const Settings = (props) => {
  const {
    triggerNullifyApiMessage,
    triggerSwitchNavigation,
    triggerGenericApiHit,
    triggerFetchEntity,
    triggerUpdateState,
    settingsState,
    apiMessage,
    fetching,
    sidebar,
    appDetails: { aboutUs, termsAndConditions, privacyPolicy },
  } = props;

  useEffect(() => {
    document.title = "Settings";
    handleState(settingsIndexer.aboutUs);
    triggerFetchEntity(APPLICATION_ROUTES.APP_DETAILS);
    triggerSwitchNavigation(navigationIndexer.settings);
    triggerFetchEntity(APPLICATION_ROUTES.FAQ_LIST, {}, 1, 10);
  }, [triggerFetchEntity, triggerSwitchNavigation]);

  const handleState = (value = settingsIndexer.aboutUs) => {
    triggerUpdateState(SETTINGS_STATE_ACTION, { value });
  };

  const saveAppDetails = (identifier, editData) => {
    const data = {};
    if (identifier === "About Us") {
      data.aboutUs = editData;
    } else if (identifier === "Terms & Conditions") {
      data.termsAndConditions = editData;
    } else {
      data.privacyPolicy = editData;
    }
    triggerGenericApiHit(
      APPLICATION_ROUTES.EDIT_APP_DETAILS,
      data,
      APPLICATION_ROUTES.APP_DETAILS
    );
  };

  // if (apiMessage.message) {
  //   // eslint-disable-next-line no-unused-expressions
  //   toast.dismiss();
  //   if (apiMessage.code === 100) {
  //     toast.success(apiMessage.message);
  //   } else {
  //     toast.error(apiMessage.message);
  //   }
  //   triggerNullifyApiMessage();
  // }

  return (
    <Main>
      <section
        className={styles["settings-container"]}
        style={{ overflow: "hidden" }}
      >
        <div
          className={`${styles["sidebar-modify-container"]} ${
            sidebar.value && styles["small-sidebar-modify-container"]
          }`}
        >
          <section className={styles["sidebar-modify"]}>
            {SettingOption(
              handleState,
              "About Us",
              HelpOutlineOutlinedIcon,
              "aboutUs",
              settingsState
            )}

            {SettingOption(
              handleState,
              "FAQ's",
              QuestionAnswerOutlinedIcon,
              "faq",
              settingsState
            )}

            {SettingOption(
              handleState,
              "Terms & Conditions",
              ListAltOutlinedIcon,
              "termConditions",
              settingsState
            )}

            {SettingOption(
              handleState,
              "Privacy Policy",
              PolicyOutlinedIcon,
              "privacyPolicy",
              settingsState
            )}
          </section>
        </div>

        <div className="dynamicContainer" style={{ overflow: "auto" }}>
          {settingsState.value === settingsIndexer.faq && <Faq />}

          {settingsState.value === settingsIndexer.aboutUs && (
            <AppDetails
              name={"About Us"}
              Icon={HelpOutlineOutlinedIcon}
              content={aboutUs}
              saveAppDetails={saveAppDetails}
            />
          )}
          {settingsState.value === settingsIndexer.termConditions && (
            <AppDetails
              name={"Terms & Conditions"}
              Icon={ListAltOutlinedIcon}
              content={termsAndConditions}
              saveAppDetails={saveAppDetails}
            />
          )}
          {settingsState.value === settingsIndexer.privacyPolicy && (
            <AppDetails
              name={"Privacy Policy"}
              Icon={PolicyOutlinedIcon}
              content={privacyPolicy}
              saveAppDetails={saveAppDetails}
            />
          )}
        </div>
      </section>
    </Main>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerSwitchNavigation: (active) => dispatch(switchNavigation({ active })),
    triggerFetchEntity: (endpoint, payload, page, limit) =>
      dispatch(fetchEntity({ endpoint, payload, page, limit })),
    triggerUpdateState: (type, value) =>
      dispatch(genericUpdateState({ type, value })),
    triggerGenericApiHit: (endpoint, payload, listingEndpoint, page, limit) =>
      dispatch(
        genericApiHit({ endpoint, payload, listingEndpoint, page, limit })
      ),
    triggerNullifyApiMessage: () => dispatch(nullifyApiMessage()),
  };
};

const mapStateToProps = (state) => {
  const { fetching, settingsState, apiMessage, sidebar, appDetails } = state;
  return { fetching, settingsState, apiMessage, sidebar, appDetails };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
