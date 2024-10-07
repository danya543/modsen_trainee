import { Burger } from '@components/Burger/Burger';
import { BurgerMenu } from '@components/BurgerMenu/BurgerMenu';
import { useBurgerMenu } from '@components/hooks/burgerHook';
import { Logo, LogoThemes } from '@components/Logo/Logo';
import { Nav } from '@components/Nav/Nav';

import styles from './header.module.scss';

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
