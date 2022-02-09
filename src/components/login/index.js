import React, { useState } from "react";
import "./styled.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export const Login = () => {
  const [loginUser, setLoginUser] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { visibleLoginModal } = useSelector(({ mainReducer }) => mainReducer);

  const newUser = () => {
    axios
      .post("/app/newUser", { login, password })
      .then(({ data }) => {
        if (data.message === "loginUsed") {
          console.log(data.message);
        } else {
          setLoginUser(true);
        }
      })
      .catch(({ data }) => console.log(data));
  };
  const userLogin = () => {
    axios
      .get(`/app/checkUser?login=${login}&password=${password}`)
      .then(({ data }) => {
        if (data.message === "userAccepted") {
          dispatch({
            type: "userLogIn",
            data: {
              login: data.userInfo.login,
              userRoom: data.userInfo.userRoom,
            },
          });
        } else {
          console.log(data.message);
        }
      })
      .catch(({ data }) => console.log(data));
  };

  return (
    <>
      {visibleLoginModal && (
        <div className="loginStyled">
          <div className="loginModalStyled">
            <div className="loginModalStyled">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="inputLoginStyled"
                placeholder="Логин"
              />

              <input
                onChange={(e) => {
                  setLogin(e.target.value);
                }}
                className="inputPasswordStyled"
                placeholder="Пороль"
              />
              {loginUser ? (
                <button
                  onClick={() => userLogin()}
                  className="loginButtonStyled"
                >
                  Войти
                </button>
              ) : (
                <button onClick={() => newUser()} className="loginButtonStyled">
                  Зарегистрироваться
                </button>
              )}
            </div>
            {loginUser ? (
              <button
                onClick={() => {
                  setLoginUser(false);
                }}
                className="loginButtonStyled"
              >
                Зарегистрироваться
              </button>
            ) : (
              <button
                onClick={() => {
                  setLoginUser(true);
                }}
                className="loginButtonStyled"
              >
                Войти
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
