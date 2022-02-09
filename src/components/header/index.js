import React from "react";
import "./styled.css";
import logo from "../../image/logo.png";
import { useDispatch } from "react-redux";
export const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="headerStyled">
      <img
        onClick={() => dispatch({ type: "closeModals" })}
        className="imageLogoStyled"
        src={logo}
        alt="logo"
      />

      <div>
        <button className="buttonProfileStyled">User</button>
        <button
          onClick={() => {
            dispatch({ type: "openModal", data: "visibleLoginModal" });
          }}
          className="buttonProfileStyled"
        >
          Войти
        </button>
      </div>
    </div>
  );
};
