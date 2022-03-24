import React from "react";
import loader from "./loader.gif";

import { LoaderContainerStyled } from "./loaderStyle.module";
import Image from "next/image";

export const LoaderKit = (props) => {
  return (
    <LoaderContainerStyled>
      <Image {...props} width="150" height="150" alt={"Loader"} src={loader} />
    </LoaderContainerStyled>
  );
};
