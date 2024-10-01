import { Burger } from "../Burger/Burger";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { useBurgerMenu } from "../hooks/burgerHook";
import { Logo } from "../Logo/Logo"
import { Nav } from "../Nav/Nav";
import styles from './header.module.scss'

export const Header = () => {
    const { isOpen, closeMenu, toggleMenu, menuIcon } = useBurgerMenu();

    return (
        <header className={styles.header}>
            <Burger icon={menuIcon} handleToggle={toggleMenu} />
            <BurgerMenu isOpen={isOpen} handleClose={closeMenu} />
            <Logo />
            <Nav />
        </header>
    )
}
