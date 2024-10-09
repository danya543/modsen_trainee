import { initialPageNum } from '@api/constants';
import { fetchSearch } from '@api/fetchSearch';
import { SearchHeader } from '@components/SearchHeader/SearchHeader';
import { Pagination } from '@src/types/Arts';
import { Results } from '@src/types/Search';
import { Button } from '@utils/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './SearchPage.module.scss';

export const SearchPage = () => {
  const navigate = useNavigate();
  const { query } = useParams<'query'>();
  const [search, setSearch] = useState(query);
  const [result, setResult] = useState<Results[] | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(initialPageNum);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    fetchSearch({ query: query || '', page: page }).then(data => {
      query === search
        ? result
          ? setResult([...result, ...data.data])
          : setResult(data.data)
        : (setSearch(query), setResult(data.data));
      setPagination(data.pagination);
      setIsloading(false);
    });
  }, [page, query]);

  const handleNavigate = (id: number) => {
    navigate(`/art/${id}`);
  };

  const handleSetPage = (page: number) => {
    setPage(page + 1);
    setIsloading(true);
  };

  return (
    <section className={styles.container}>
      <SearchHeader query={query} />
      {result ? (
        <div className={styles.results_container}>
          <div className={styles.results}>
            {result?.map(item => {
              return (
                <p
                  key={item.id}
                  title={item.thumbnail?.alt_text}
                  onClick={() => {
                    handleNavigate(item.id);
                  }}>
                  {item.title}
                </p>
              );
            })}
          </div>
          <Button
            text={
              isLoading
                ? 'Loading...'
                : page < (pagination?.total_pages as number)
                  ? 'Show more'
                  : 'No more'
            }
            classname={styles.more}
            onClick={() => {
              handleSetPage(page);
            }}
            disabled={!(page < (pagination?.total_pages as number))}
          />
        </div>
      ) : isLoading ? (
        <div>loading</div>
      ) : (
        <div>No info</div>
      )}
    </section>
  );
};
