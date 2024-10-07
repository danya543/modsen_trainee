import { Nav } from '@components/Nav/Nav';
import { useEffect, useRef } from 'react';

import styles from './BurgerMenu.module.scss';

export const BurgerMenu = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', ({ target }) => {
      //@ts-expect-error --contains error
      if (ref.current && !ref.current.contains(target)) {
        handleClose();
      }
    });
  }, []);

  return (
    <div
      className={`${styles.container} ${isOpen ? styles.isOpen : ''}`}
      onClick={handleClose}
      ref={ref}
    >
      <div className={styles.menu}>
        <Nav isColumn={true} />
      </div>
    </div>
  );
};
