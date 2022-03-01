import React, { useEffect } from "react";
import "./headerStyle.module";
import logo from "../../image/logo.png";
import Image from "next/image";
import Link from "next/link";

import {
  ButtonProfileStyled,
  HeaderStyled,
  ImageLogoStyled,
} from "./headerStyle.module";
import { useSelector } from "react-redux";
import { useCheckUser } from "../../hooks";
import { useRouter } from "next/router";

export const Header = () => {
  const userType = useSelector(({ mainReducer }) => mainReducer.userType);
  const checkUser = useCheckUser();

  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, [router.route]);

  return (
    <HeaderStyled>
      <ImageLogoStyled>
        <Link href="/">
          <a>
            <Image  layout="intrinsic" src={logo} alt="logo" />
          </a>
        </Link>
      </ImageLogoStyled>
      <div>
        <ButtonProfileStyled className="buttonProfileStyled">
          {userType === "userInfo" ? "USER" : "GHOST"}
        </ButtonProfileStyled>
        <ButtonProfileStyled className="buttonProfileStyled">
          {userType === "userInfo" ? "Выйти" : "Войти"}
        </ButtonProfileStyled>
      </div>
    </HeaderStyled>
  );
};
