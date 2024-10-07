import BlackLogo from '@assets/black_logo.svg';
import LightLogo from '@assets/logo.svg';
import { useNavigate } from 'react-router-dom';

export const LogoThemes = {
  Black: 'black_logo',
  Light: 'ligt_logo',
} as const;

export const Logo = ({
  theme,
}: {
  theme: (typeof LogoThemes)[keyof typeof LogoThemes];
}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate('/')}>
      <img
        style={{ width: '100%' }}
        src={theme === LogoThemes.Black ? BlackLogo : LightLogo}
        alt="Logo"
      />
    </div>
  );
};
