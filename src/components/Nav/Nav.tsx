import { Images } from '@components/constants';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Nav.module.scss';

export const Nav = ({ isColumn = false }: { isColumn?: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { Home, BookmarkIcon } = Images;

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  return (
    <nav className={`${styles.navigation} ${isColumn ? styles.column : ''}`}>
      <div
        className={`${styles.navItem} ${location.pathname === '/' ? styles.none : ''}`}
        onClick={() => handleNavigate('/')}>
        <img src={Home} alt="" />
        <p>Home</p>
      </div>
      <div
        className={`${styles.navItem} ${location.pathname === '/favorites' ? styles.none : ''}`}
        onClick={() => handleNavigate('/favorites')}>
        <img src={BookmarkIcon} alt="" />
        <p>Your favorites</p>
      </div>
    </nav>
  );
};
