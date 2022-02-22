import Link from "next/link";
import {CloseIconStyled} from "./buttonGoMainIconStyled.module";

export const ButtonGoMainIcon  = () =>{
    return(
        <Link href="/">
            <CloseIconStyled/>
        </Link>

    )
}