import { IMAGE_API_URL } from '@api/constants';
import { loadImage } from '@api/fetchImage';
import NoImage from '@assets/no-image.png';
import { Loader } from '@components/Loader/Loader';
import { Arts } from '@entities/Arts';
import { Bookmark } from '@utils/Bookmark';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CardSize } from '../constants';
import styles from './card.module.scss';

export const Card = ({
  data,
  type = CardSize.Small,
  id,
}: {
  data: Arts;
  type?: string;
  id?: string;
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const title =
    data.title.split(' ').length > 5
      ? data.title.split(' ').slice(0, 6).join(' ') + '...'
      : data.title;

  useEffect(() => {
    try {
      loadImage(`${IMAGE_API_URL}/${data.image_id}/full/843,/0/default.jpg`)
        .then(() => setIsLoading(false))
        .catch(() => {
          setIsLoading(false);
          setIsError(true);
        });
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [data.image_id]);

  return (
    <div
      id={id}
      className={`${styles.card} ${styles[type]}`}
      onClick={() => navigate(`/art/${data.id}`)}
    >
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
