import { Images } from '@components/constants';

import styles from './Loader.module.scss';

export const Loader = ({ type }: { type: string }) => {
  const { LoaderIcon } = Images;
  return (
    <div className={`${styles.loader} ${styles[type]}`}>
      <img src={LoaderIcon} alt="" />
    </div>
  );
};
