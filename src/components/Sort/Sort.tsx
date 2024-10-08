import { Button } from '@utils/Button';

import styles from './Sort.module.scss';

export const Sort = ({
  isIncrese,
  handleToggle,
}: {
  isIncrese: boolean;
  handleToggle: () => void;
}) => {
  return (
    <div className={styles.container}>
      <Button
        text={`A-z`}
        onClick={handleToggle}
        classname={`${isIncrese ? styles.isActive : ''}`}
      />
      <Button
        text={`Z-a`}
        onClick={handleToggle}
        classname={`${isIncrese ? '' : styles.isActive}`}
      />
    </div>
  );
};
