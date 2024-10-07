import LoaderIcon from '@assets/loader.svg';

import styles from './Loader.module.scss';
export const Loader = ({ type }: { type: string }) => {
  return (
    <div className={`${styles.loader} ${styles[type]}`}>
      <img src={LoaderIcon} alt="" />
    </div>
  );
};
