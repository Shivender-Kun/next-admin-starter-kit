import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Button from "@mui/material/Button";
import React from "react";
import styles from "./index.module.scss";

const Searchbar = ({ setSearchInput, searchInput }) => {
  return (
    <div
      className={`${styles["dropdown__container"]} ${styles["dropdown__modify-container"]}`}
    >
      <SearchOutlinedIcon style={{ marginLeft: "10px", marginRight: "5px" }} />
      <input
        onKeyPress={(e) => e.key == "Enter" && setSearchInput(e.target.value)}
        className={styles["search__input"]}
        placeholder="Search here"
        id="searchQueryInput"
      />
      {searchInput && (
        <ClearOutlinedIcon
          onClick={() => {
            setSearchInput("");
            document.getElementById("searchQueryInput").value = "";
          }}
        />
      )}
      <Button
        onClick={() =>
          setSearchInput(document.getElementById("searchQueryInput").value)
        }
        className={styles["search__go"]}
      >
        Go
      </Button>
    </div>
  );
};

export default Searchbar;
