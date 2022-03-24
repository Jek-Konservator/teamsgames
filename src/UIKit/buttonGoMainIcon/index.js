import Link from "next/link";
import {CloseIconStyled} from "./buttonGoMainIconStyled.module";

export const ButtonGoMainIcon  = (props) =>{
    return(
        <Link href="/">
            <CloseIconStyled {...props}/>
        </Link>

    )
}