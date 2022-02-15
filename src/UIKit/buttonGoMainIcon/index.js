import Link from "next/link";
import {CancelIconStyled} from "./buttonGoMainIcon.module";

export const ButtonGoMainIcon  = () =>{
    return(
        <Link href="/">
            <CancelIconStyled/>
        </Link>

    )
}