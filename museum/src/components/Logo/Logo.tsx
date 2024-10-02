import { useNavigate } from "react-router-dom";

export const LogoThemes = {
    Black: 'black_logo',
    Light: 'logo'
} as const;

export const Logo = ({ theme }: { theme: typeof LogoThemes[keyof typeof LogoThemes] }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/')}>
            <img style={{ width: '100%' }} src={`/src/assets/${theme}.svg`} alt="Logo" />
        </div>
    );
};
