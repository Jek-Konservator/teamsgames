import React from "react";
import { MainContainerStyled } from "./mainContainerStyle.module";
import { useSelector } from "react-redux";
import {LoaderKit} from "../../UIKit/loader";

export const MainContainer = ({ children }) => {
  const userInfo = useSelector(({ mainReducer }) => mainReducer.userInfo);

  return (
    <MainContainerStyled>
      {userInfo._id ? children : <LoaderKit />}
    </MainContainerStyled>
  );
};
