import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

import { settingsIndexer } from "../../../constants";
import { connect } from "react-redux";
import React from "react";
import SettingsContainer from "../index";

const AboutUs = (props) => {
  const {
    appDetails: { data },
  } = props;

  return (
    <SettingsContainer>
      <section className="content-container">
        <section className="content">
          <section className="content-top">
            <div
              className="content-heading"
              style={{ display: "flex", alignItems: "center" }}
            >
              <HelpOutlineOutlinedIcon fontSize="large" />
              &nbsp;About Us
            </div>
            <div className="content-top-left"></div>
          </section>
          <section className="content-bottom">
            <div className="editor-container">
              <textarea
                id="body-editor"
                onChange={props.handleAboutUsChange}
                options={{
                  initialValue: data ? data.aboutUs : "",
                }}
              />
              <button
                onClick={() => {
                  props.saveAppDetails(
                    settingsIndexer.aboutUs,
                    props.aboutUsContent
                  );
                }}
                className="block-button btn"
                aria-label="save about us content"
                style={{ marginTop: "55px", fontSize: "18px" }}
              >
                Save
              </button>
            </div>
          </section>
        </section>
      </section>
    </SettingsContainer>
  );
};

const mapStateToProps = (state) => {
  const { appDetails } = state;
  return { appDetails };
};

export default connect(mapStateToProps)(AboutUs);
