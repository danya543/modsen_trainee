import styles from './ArtPage.module.scss';

export const ArtPageSkeletonLoader = () => {
  return (
    <section className={styles.container}>
      <div className={styles.img_block}></div>
      <div className={styles.info}>
        <div className={styles.title}>
          <h1></h1>
          <p></p>
          <p></p>
        </div>
        <div className={styles.overview}>
          <h3></h3>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </section>
  );
};
