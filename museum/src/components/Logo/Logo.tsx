import { useNavigate } from "react-router-dom";

import BlackLogoIcon from "../../assets/black_logo.svg";
import LogoIcon from "../../assets/logo.svg";

export const Logo = ({ theme }: { theme?: string }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/')}>
            <img src={theme === 'black' ? BlackLogoIcon : LogoIcon} alt="" />
        </div>
    )
}
