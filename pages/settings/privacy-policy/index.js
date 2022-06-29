import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
// import { Editor } from "../Simplemde/WYSIWYG";
import { connect } from "react-redux";
import React from "react";

import { settingsIndexer } from "../../constants";

const PrivacyPolicy = (props) => {
  const {
    appDetails: { data },
  } = props;

  return (
    <section className="content-container">
      <section className="content">
        <section className="content-top">
          <div
            className="content-heading"
            style={{ display: "flex", alignItems: "center" }}
          >
            <PolicyOutlinedIcon fontSize="large" />
            &nbsp;Privacy Policy
          </div>
          <div className="content-top-left"></div>
        </section>

        <section className="content-bottom">
          <div className="editor-container">
            <textarea
              id="body-editor"
              onChange={props.handlePolicyContent}
              options={{
                initialValue: data.privacyPolicy,
              }}
            />
            <button
              onClick={() => {
                props.saveAppDetails(
                  settingsIndexer.privacyPolicy,
                  props.policyContent
                );
              }}
              className="block-button btn"
              aria-label="save privacy policy content"
              style={{ marginTop: "55px", fontSize: "18px" }}
            >
              Save
            </button>
          </div>
        </section>
      </section>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { appDetails } = state;
  return { appDetails };
};

export default connect(mapStateToProps)(PrivacyPolicy);
