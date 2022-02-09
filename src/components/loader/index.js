import React from "react";
import loader from "./loader.gif"
export const Loader =() =>{
    return(
        <div>
            <img alt={"Loader"} className="loaderStyled" src={loader}/>
        </div>
    )
}