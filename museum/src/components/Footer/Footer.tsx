import Modsen from '../../assets/modsen_logo.svg'
import { Logo } from '../Logo/Logo'
import styles from './footer.module.scss'

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <Logo theme={'black'} />
            <img src={Modsen} alt="" />
        </div>
    )
}
