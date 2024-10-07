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
      <button
        onClick={handleToggle}
        className={`${isIncrese ? styles.isActive : ''}`}
      >
        A-z
      </button>
      <button
        onClick={handleToggle}
        className={`${isIncrese ? '' : styles.isActive}`}
      >
        Z-a
      </button>
    </div>
  );
};
