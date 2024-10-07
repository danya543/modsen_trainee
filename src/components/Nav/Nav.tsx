import Bookmark from '@assets/bookmark.svg';
import Home from '@assets/home.svg';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './nav.module.scss';

export const Nav = ({ isColumn = false }: { isColumn?: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={`${styles.navigation} ${isColumn ? styles.column : ''}`}>
      <div
        className={`${styles.navItem} ${location.pathname === '/' ? styles.none : ''}`}
        onClick={() => navigate('/')}
      >
        <img src={Home} alt="" />
        <p>Home</p>
      </div>
      <div
        className={`${styles.navItem} ${location.pathname === '/favorites' ? styles.none : ''}`}
        onClick={() => navigate('/favorites')}
      >
        <img src={Bookmark} alt="" />
        <p>Your favorites</p>
      </div>
    </nav>
  );
};
