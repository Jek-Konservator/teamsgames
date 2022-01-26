import React from "react";
import "./styled.css";
import logo from "../../image/logo.png";
export const Header = () => {
  return (
    <div className="headerStyled">
      <img className="imageLogoStyled" src={logo} />
      <button className="buttonProfileStyled">Пользователь</button>
    </div>
  );
};
