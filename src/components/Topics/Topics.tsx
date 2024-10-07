import { ArtsPerPage } from '@api/constants';
import { fetchArts } from '@api/fetchArts';
import { Card } from '@components/Card/Card';
import { CardSize } from '@components/constants';
import { Pagination } from '@components/Pagination/Pagination';
import { CardsSkeletonLoader } from '@components/SkeletonLoaders/Cards/Cards';
import { Sort } from '@components/Sort/Sort';
import { UserArtsResponse } from '@entities/Arts';
import { SessionStorageKey } from '@pages/constants/constants';
import { useEffect, useState } from 'react';

import styles from './topics.module.scss';

export const Topics = () => {
  const [topics, setTopics] = useState<UserArtsResponse | null>(null);
  const [page, setPage] = useState(1);
  const [isSortIncrease, setIsSortIncrease] = useState(true);

  useEffect(() => {
    fetchArts(ArtsPerPage.Topics, page).then(data => {
      //const sortedData = [...data.data].sort((a, b) => isSortIncrease ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
      setTopics(data); //{ ...data, data: sortedData })
      sessionStorage.setItem(
        SessionStorageKey.listId,
        JSON.stringify({ [page]: data.data }),
      );
    });
  }, [page]);

  useEffect(() => {
    if (topics) {
      const sortedData = [...topics.data].sort((a, b) =>
        isSortIncrease
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title),
      );
      setTopics({ ...topics, data: sortedData });
    }
  }, [isSortIncrease]);

  return (
    <div className={styles.gallery}>
      <div className={styles.header}>
        <p>Topics for you</p>
        <h3>Our special gallery</h3>
      </div>
      <Sort
        isIncrese={isSortIncrease}
        handleToggle={() => setIsSortIncrease(prev => !prev)}
      />
      {topics ? (
        <div>
          <div className={styles.cards}>
            {topics.data.map(art => {
              return <Card key={art.id} type={CardSize.Large} data={art} />;
            })}
          </div>
          <Pagination
            page={page}
            setPage={setPage}
            numberPage={topics.pagination.total_pages}
          />
        </div>
      ) : (
        <CardsSkeletonLoader type={CardSize.Large} />
      )}
    </div>
  );
};
