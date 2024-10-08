import { Images, LogoThemes } from '@components/constants';
import { useNavigate } from 'react-router-dom';

import styles from './Logo.module.scss';

export const Logo = ({
  theme,
}: {
  theme: (typeof LogoThemes)[keyof typeof LogoThemes];
}) => {
  const navigate = useNavigate();
  const { BlackLogo, LightLogo } = Images;

  return (
    <div className={styles.container} onClick={() => navigate('/')}>
      <img
        src={theme === LogoThemes.Black ? BlackLogo : LightLogo}
        alt="Logo"
      />
    </div>
  );
};
