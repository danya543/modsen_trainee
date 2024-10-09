import { Card } from '@components/Card/Card';
import { postersTypes } from '@components/constants';
import { Pagination } from '@components/Pagination/Pagination';
import { CardsSkeletonLoader } from '@components/SkeletonLoaders/Cards/Cards';
import { Sort } from '@components/Sort/Sort';
import { useTopics } from '@hooks/useTopics';

import styles from './Topics.module.scss';

export const Topics = ({
  type,
}: {
  type: (typeof postersTypes)[keyof typeof postersTypes];
}) => {
  const {
    topics,
    clearTopics,
    page,
    setPage,
    isSortIncrease,
    setIsSortIncrease,
  } = useTopics(type.perPage, type.initialPage);

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
        <p>{type.p}</p>
        <h3>{type.title}</h3>
      </div>
      {type.isSort && (
        <Sort
          isIncrese={isSortIncrease}
          handleToggle={() => setIsSortIncrease(prev => !prev)}
        />
      )}
      {topics ? (
        <div>
          <div className={styles.cards}>
            {topics.data.map(art => {
              return <Card key={art.id} type={type.size} data={art} />;
            })}
          </div>
          {type.isPagination && (
            <Pagination
              page={page}
              setPage={handlePagination}
              numberPage={topics.pagination.total_pages}
            />
          )}
        </div>
      ) : (
        <CardsSkeletonLoader type={type.size} size={type.perPage} />
      )}
    </div>
  );
};
