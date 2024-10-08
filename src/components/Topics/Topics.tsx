import { Card } from '@components/Card/Card';
import { CardSize } from '@components/constants';
import { Pagination } from '@components/Pagination/Pagination';
import { CardsSkeletonLoader } from '@components/SkeletonLoaders/Cards/Cards';
import { Sort } from '@components/Sort/Sort';
import { useTopics } from '@hooks/useTopics';

import styles from './Topics.module.scss';

export const Topics = () => {
  const {
    topics,
    clearTopics,
    page,
    setPage,
    isSortIncrease,
    setIsSortIncrease,
  } = useTopics();

  const handlePagination = (page: number) => {
    setPage(page);
    clearTopics();
    window.scrollTo({
      top: 500,
      behavior: 'smooth',
    });
  };

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
            setPage={handlePagination}
            numberPage={topics.pagination.total_pages}
          />
        </div>
      ) : (
        <CardsSkeletonLoader type={CardSize.Large} />
      )}
    </div>
  );
};
