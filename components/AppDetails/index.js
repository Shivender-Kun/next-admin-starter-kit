import { settingsIndexer } from "../../constants";
import React from "react";

const AppDetails = (props) => {
  const { name, Icon, content, saveAppDetails } = props;

  return (
    <section className="content-container">
      <section className="content">
        <section className="content-top">
          <div
            className="content-heading"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Icon fontSize="large" />
            &nbsp;{name}
          </div>
          <div className="content-top-left"></div>
        </section>
        <section className="content-bottom">
          <div className="editor-container">
            <textarea id="body-editor" defaultValue={content || ""} />
            <button
              onClick={() =>
                saveAppDetails(
                  name,
                  document.getElementById("body-editor").value
                )
              }
              className="block-button btn"
              aria-label="save app detail content"
              style={{ marginTop: "55px" }}
            >
              Save
            </button>
          </div>
        </section>
      </section>
    </section>
  );
};

export default AppDetails;
