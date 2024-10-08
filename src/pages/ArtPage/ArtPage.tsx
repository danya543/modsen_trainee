import { IMAGE_API_URL } from '@api/constants';
import { CardSize, Images } from '@components/constants';
import { Loader } from '@components/Loader/Loader';
import { ArtPageSkeletonLoader } from '@components/SkeletonLoaders/ArtPage/ArtPage';
import { useArtPage } from '@hooks/useArtPage';
import { Bookmark } from '@utils/Bookmark';
import { useParams } from 'react-router-dom';

import styles from './ArtPage.module.scss';
const ObjectInfo = {
  no_info: 'no info',
};

export const ArtPage = () => {
  const { NoImage } = Images;
  const { id } = useParams<'id'>();
  const { data, isLoading, isError } = useArtPage(id);

  return data ? (
    <section className={styles.container}>
      <div className={styles.img_block}>
        {isLoading ? (
          <Loader type={CardSize.Large} />
        ) : isError ? (
          <img src={NoImage} className={styles.no_image} />
        ) : (
          <img
            src={`${IMAGE_API_URL}/${data.image_id}/full/843,/0/default.jpg`}
            alt="Art Work"
            className={styles.poster}
          />
        )}
        <Bookmark id={id as string} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          <h1>{data.title}</h1>
          <span>{data.artist_title || ObjectInfo.no_info}</span>
          <p>{data.date_start || ObjectInfo.no_info}</p>
        </div>
        <div className={styles.overview}>
          <h3>Overview</h3>
          <p>
            <span>Artist nationality: </span>
            {data.place_of_origin || ObjectInfo.no_info}
          </p>
          <p>
            <span>Dimensions: </span>
            {data.dimensions ? data.dimensions.split(';')[0] : 'no info'}
          </p>
          <p>
            <span>Credit Line: </span>
            {data.credit_line || ObjectInfo.no_info}
          </p>
          <p>
            <span>Repository: </span>
            {data.publishing_verification_level || ObjectInfo.no_info}
          </p>
        </div>
      </div>
    </section>
  ) : (
    <ArtPageSkeletonLoader />
  );
};
