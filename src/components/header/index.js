import React from "react";
import "./headerStyle.module";
import logo from "../../image/logo.png";
import Image from "next/image";

import {
  ButtonProfileStyled,
  HeaderStyled,
  ImageLogoStyled,
} from "./headerStyle.module";
export const Header = () => {
  return (
    <HeaderStyled>
      <ImageLogoStyled>
        <Image layout="intrinsic" src={logo} alt="logo" />
      </ImageLogoStyled>

      <div>
        <ButtonProfileStyled className="buttonProfileStyled">
          User
        </ButtonProfileStyled>
        <ButtonProfileStyled className="buttonProfileStyled">
          Войти
        </ButtonProfileStyled>
      </div>
    </HeaderStyled>
  );
};
