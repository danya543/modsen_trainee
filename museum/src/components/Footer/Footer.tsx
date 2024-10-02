import { Logo, LogoThemes } from '~/components/Logo/Logo'

import styles from './footer.module.scss'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Logo theme={LogoThemes.Black} />
            <img src={`/src/assets/modsen_logo.svg`} alt="Modsen logo" />
        </footer>
    )
}
