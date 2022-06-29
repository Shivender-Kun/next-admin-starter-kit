import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
// import { toast, ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Link from "next/link";

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
import TermConditions from "./terms-Conditions";
import PrivacyPolicy from "./privacy-policy";
import AboutUs from "./about-us";
import Faq from "./faq";
import Main from "../../components/Account";
import styles from "./index.module.scss";

// const PrivacyPolicy = loadable(() => import("../PrivacyPolicy"));
// const TermConditions = loadable(() => import("../TermConditions"));
// const AboutUs = loadable(() => import("../AboutUs"));

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

const NavigationOption = (name, Icon, optionActive) => {
  return (
    <Link href={`/${name.replace(" ", "-").toLowerCase()}`}>
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

const Settings = (props) => {
  const [termsConditionsContent, setTermsConditionsContent] = useState("");
  const [aboutUsContent, setAboutUsContent] = useState("");
  const [policyContent, setPolicyContent] = useState("");

  const {
    triggerNullifyApiMessage,
    triggerSwitchNavigation,
    triggerGenericApiHit,
    triggerFetchEntity,
    triggerUpdateState,
    settingsState,
    apiMessage,
    sidebar,
  } = props;

  const handleTermsConditionsContent = (e) => setTermsConditionsContent(e);
  const handleAboutUsChange = (e) => setAboutUsContent(e);
  const handlePolicyContent = (e) => setPolicyContent(e);

  useEffect(() => {
    document.title = "Settings";
    handleState(settingsIndexer.aboutUs);
    triggerFetchEntity(APPLICATION_ROUTES.APP_DETAILS);
    triggerSwitchNavigation(navigationIndexer.settings);
    triggerFetchEntity(APPLICATION_ROUTES.FAQ_LIST, {}, 1, 10);
  }, []);

  const handleState = (value = settingsIndexer.aboutUs) => {
    triggerUpdateState(SETTINGS_STATE_ACTION, { value });
  };

  const saveAppDetails = (identifier, editData) => {
    const data = {};
    if (identifier === settingsIndexer.aboutUs) {
      data.aboutUs = editData;
    } else if (identifier === settingsIndexer.termConditions) {
      data.termsAndConditions = editData;
    } else if (identifier === settingsIndexer.youtube) {
      data.youtube = editData;
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
            {NavigationOption(
              "About Us",
              HelpOutlineOutlinedIcon,
              settingsState
            )}

            {NavigationOption("FAQ", QuestionAnswerOutlinedIcon, settingsState)}

            {NavigationOption(
              "Terms & Conditions",
              ListAltOutlinedIcon,
              settingsState
            )}

            {NavigationOption(
              "Privacy Policy",
              PolicyOutlinedIcon,
              settingsState
            )}
          </section>
        </div>
        <div
          className={styles["dynamic-setting-content"]}
          style={{ overflow: "auto" }}
        >
          {settingsState.value === settingsIndexer.aboutUs && (
            <AboutUs
              handleAboutUsChange={handleAboutUsChange}
              aboutUsContent={aboutUsContent}
              saveAppDetails={saveAppDetails}
            />
          )}
          {settingsState.value === settingsIndexer.faq && <Faq />}
          {settingsState.value === settingsIndexer.termConditions && (
            <TermConditions
              handleTermsConditionsContent={handleTermsConditionsContent}
              termsConditionsContent={termsConditionsContent}
              saveAppDetails={saveAppDetails}
            />
          )}
          {settingsState.value === settingsIndexer.privacyPolicy && (
            <PrivacyPolicy
              handlePolicyContent={handlePolicyContent}
              policyContent={policyContent}
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
  const { fetching, settingsState, apiMessage, sidebar } = state;
  return { fetching, settingsState, apiMessage, sidebar };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
