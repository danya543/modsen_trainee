import styles from './Pagination.module.scss';

export const PaginationSkeletonLoader = () => {
  return (
    <div className={styles.container}>
      <button></button>
      <button></button>
      <button></button>
      <button></button>
      <button></button>
    </div>
  );
};
