/**
 * This component represents a sample image component for application
 */
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import Image from "next/image";
import React from "react";

const CustomImage = ({ width = "100", height = "78", image }) => (
  <Image
    className={styles["litnite-image"]}
    src={image}
    alt="logo"
    width={width}
    height={height}
  />
);

CustomImage.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  radius: PropTypes.number,
};

export default CustomImage;
