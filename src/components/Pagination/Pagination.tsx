import { Images } from '@components/constants';
import { Button } from '@utils/Button';

import styles from './Pagination.module.scss';

export const Pagination = ({
  page,
  setPage,
  numberPage = 0,
}: {
  page: number;
  setPage: (page: number) => void;
  numberPage: number | undefined;
}) => {
  const { Prev, Next } = Images;
  const handleSetPage = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <div className={styles.container}>
      {page > 2 && (
        <Button
          onClick={() => {
            handleSetPage(page - 1);
          }}
          icon={Prev}
        />
      )}
      {page != 1 && (
        <Button
          onClick={() => {
            handleSetPage(1);
          }}
          text={`1`}
        />
      )}
      <span>{numberPage !== 0 && page}</span>
      {(page + 1 <= numberPage || numberPage != 0) && (
        <Button
          onClick={() => {
            handleSetPage(page + 1);
          }}
          text={`${page + 1}`}
        />
      )}
      {(page + 2 <= numberPage || numberPage != 0) && (
        <Button
          onClick={() => {
            handleSetPage(page + 2);
          }}
          text={`${page + 2}`}
        />
      )}
      {(page + 3 <= numberPage || numberPage != 0) && (
        <Button
          onClick={() => {
            handleSetPage(page + 3);
          }}
          text={`${page + 3}`}
        />
      )}
      {(page + 1 <= numberPage || numberPage != 0) && (
        <Button
          onClick={() => {
            handleSetPage(page + 1);
          }}
          icon={Next}
        />
      )}
    </div>
  );
};
