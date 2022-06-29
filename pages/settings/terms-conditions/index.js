import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
// import { Editor } from "../Simplemde/WYSIWYG";
import { settingsIndexer } from "../../constants";
import { connect } from "react-redux";
import React from "react";

const TermsConditions = (props) => {
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
            <ListAltOutlinedIcon fontSize="large" />
            &nbsp;Terms & Conditions
          </div>
          <div className="content-top-left"></div>
        </section>

        <section className="content-bottom">
          <div className="editor-container">
            <textarea
              id="body-editor"
              onChange={props.handleTermsConditionsContent}
              options={{
                initialValue: data ? data.termsAndConditions : "",
              }}
            />
            {/* <div className='editor-note'>
              Note: Terms & Conditions are for users.
            </div> */}
            <button
              onClick={() => {
                props.saveAppDetails(
                  settingsIndexer.termConditions,
                  props.termsConditionsContent
                );
              }}
              className="block-button btn"
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

export default connect(mapStateToProps)(TermsConditions);
