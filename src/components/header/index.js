import React from "react";
import "./styled.css";
import logo from "../../image/logo.png";
export const Header = () => {
  return (
    <div className="headerStyled">
      <img className="imageLogoStyled" src={logo} alt="logo"/>
      <button className="buttonProfileStyled">User 344243</button>
    </div>
  );
};
