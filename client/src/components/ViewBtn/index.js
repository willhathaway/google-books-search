import React from "react";
import "./style.css";

function ViewBtn(props) {
  return (
    <span className="view-btn" {...props} role="button" tabIndex="0">
      view
    </span>
  );
}

export default ViewBtn;
