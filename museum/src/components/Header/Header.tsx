import { Logo } from "../Logo/Logo"
import { Nav } from "../Nav/Nav";
import styles from './header.module.scss'

export const Header = () => {

    return (
        <header className={styles.header}>
            <Logo />
            <Nav />
        </header>
    )
}
