import { IMAGE_API_URL } from '@api/constants';
import { CardSize, Images } from '@components/constants';
import { Loader } from '@components/Loader/Loader';
import { useCard } from '@hooks/useCard';
import { Arts } from '@src/types/Arts';
import { Bookmark } from '@utils/Bookmark';

import styles from './Card.module.scss';

export const Card = ({
  data,
  type = CardSize.Small,
  id,
}: {
  data: Arts;
  type?: string;
  id?: string;
}) => {
  const { title, isLoading, isError, handleOpen } = useCard(data);
  const { NoImage } = Images;

  return (
    <div
      id={id}
      className={`${styles.card} ${styles[type]}`}
      onClick={handleOpen}>
      {isLoading ? (
        <Loader type={type} />
      ) : isError ? (
        <img src={NoImage} alt="" className={styles.no_image} />
      ) : (
        <img
          src={`${IMAGE_API_URL}/${data.image_id}/full/843,/0/default.jpg`}
          alt="Art Work"
          className={styles.poster}
        />
      )}
      <div className={styles.info}>
        <div className={styles.user}>
          <h3>{title}</h3>
          <span>{data.artist_title || 'No info'}</span>
          <p>{data.is_public_domain ? 'Public' : 'Private'}</p>
        </div>
        <Bookmark id={`${data.id}`} />
      </div>
    </div>
  );
};
