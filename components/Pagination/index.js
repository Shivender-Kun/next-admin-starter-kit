/**
 * Resuable Pagination component
 * @author Sahil Siddiqui
 * @since 24th october 2020
 */
import React from "react";
import Button from "@mui/material/Button";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import styles from "./index.module.scss";

const Pagination = ({
  page,
  limit,
  total,
  length,
  nextHandler,
  previousHandler,
}) => (
  <React.Fragment>
    <div className={styles["pagination__view"]}>
      <span className={styles["pagination__location"]}>
        Viewing&nbsp;&nbsp;&nbsp;
      </span>
      {limit * (page - 1) + 1} - {limit * (page - 1) + length}
      <span className={styles["pagination__location"]}>
        &nbsp;{total && "of"}&nbsp;
      </span>
      {total}
    </div>

    <div className={styles["pagination__button"]}>
      {page !== 1 && (
        <Button
          onClick={previousHandler}
          className={styles["pagination__button-icon"]}
        >
          <ArrowLeftOutlinedIcon
            className={styles["pagination__button-icon-arrow"]}
          />
        </Button>
      )}
      {length === limit && limit * page !== total && (
        <Button
          onClick={nextHandler}
          className={styles["pagination__button-icon"]}
        >
          <ArrowRightOutlinedIcon
            className={styles["pagination__button-icon-arrow"]}
          />
        </Button>
      )}
    </div>
  </React.Fragment>
);

export default Pagination;
