import Modsen_logo from '@assets/modsen_logo.svg';
import { Logo, LogoThemes } from '@components/Logo/Logo';

import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo theme={LogoThemes.Black} />
      <img src={Modsen_logo} alt="Modsen logo" />
    </footer>
  );
};
