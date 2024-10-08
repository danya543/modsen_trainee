import { Nav } from '@components/Nav/Nav';
import { useClickOutside } from '@hooks/useClickOutside';
import { useRef } from 'react';

import styles from './BurgerMenu.module.scss';

export const BurgerMenu = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const ref = useRef(null);

  useClickOutside(ref, handleClose);

  return (
    <div
      className={`${styles.container} ${isOpen ? styles.isOpen : ''}`}
      onClick={handleClose}
      ref={ref}>
      <div className={styles.menu}>
        <Nav isColumn={true} />
      </div>
    </div>
  );
};
