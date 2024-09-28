import classNames from 'classnames';
import { useLocation, useNavigate } from "react-router-dom";

import Bookmark from "../../assets/bookmark.svg";
import Home from "../../assets/home.svg";
import styles from './nav.module.scss'

export const Nav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className={styles.navigation}>
            <div className={classNames({
                [styles.navItem]: true,
                [styles.none]: location.pathname === '/'
            })} onClick={() => navigate('/')}>
                <img src={Home} alt="" />
                <p>Home</p>
            </div>
            <div className={classNames({
                [styles.navItem]: true,
                [styles.none]: location.pathname === '/favorites'
            })} onClick={() => navigate('/favorites')}>
                <img src={Bookmark} alt="" />
                <p>Your favorites</p>
            </div>
        </nav>
    )
}
