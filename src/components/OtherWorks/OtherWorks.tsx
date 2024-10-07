import { ArtsPerPage, OtherWorksPage } from '@api/constants';
import { fetchArts } from '@api/fetchArts';
import { Card } from '@components/Card/Card';
import { CardsSkeletonLoader } from '@components/SkeletonLoaders/Cards/Cards';
import { Arts } from '@entities/Arts';
import { useEffect, useState } from 'react';

import styles from './OtherWorks.module.scss';

export const OtherWorks = () => {
  const [works, setWorks] = useState<Arts[] | null>(null);
  useEffect(() => {
    fetchArts(ArtsPerPage.Others, OtherWorksPage).then(data =>
      setWorks(data.data),
    );
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <p>Here some more</p>
        <h3>Other works for you</h3>
      </div>
      {works ? (
        <div className={styles.works}>
          {works?.map(work => {
            return <Card key={work.id} data={work} />;
          })}
        </div>
      ) : (
        <CardsSkeletonLoader size={8} />
      )}
    </section>
  );
};
