import React from "react";
//import loader from "../../assets/images/loader.svg"

const CircularProgress = ({ className }) => <div className={`loader ${className}`}>
  <img src='../../assets/images/loader.svg' alt="loader" />
</div>;
export default CircularProgress;
