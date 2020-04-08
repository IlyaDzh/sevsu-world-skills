import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Block.scss";

const Block = ({ children, className }) => (
    <div className={classNames("block", className)}>{children}</div>
);

Block.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default Block;
