import Modsen from '../../assets/modsen_logo.svg'
import { Logo } from '../Logo/Logo'
import styles from './footer.module.scss'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Logo theme={'black'} />
            <img src={Modsen} alt="" />
        </footer>
    )
}
