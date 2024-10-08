import { Burger } from '@components/Burger/Burger';
import { BurgerMenu } from '@components/BurgerMenu/BurgerMenu';
import { LogoThemes } from '@components/constants';
import { Logo } from '@components/Logo/Logo';
import { Nav } from '@components/Nav/Nav';
import { useBurgerMenu } from '@hooks/useBurgerMenu';

import styles from './Header.module.scss';

export const Header = () => {
  const { isOpen, closeMenu, toggleMenu, menuIcon } = useBurgerMenu();

  return (
    <header className={styles.header}>
      <Burger icon={menuIcon} handleToggle={toggleMenu} />
      <BurgerMenu isOpen={isOpen} handleClose={closeMenu} />
      <Logo theme={LogoThemes.Light} />
      <Nav />
    </header>
  );
};
