import { Images, LogoThemes } from '@components/constants';
import { Logo } from '@components/Logo/Logo';

import styles from './Footer.module.scss';

export const Footer = () => {
  const { ModsenLogo } = Images;
  return (
    <footer className={styles.footer}>
      <Logo theme={LogoThemes.Black} />
      <img src={ModsenLogo} alt="Modsen logo" />
    </footer>
  );
};
