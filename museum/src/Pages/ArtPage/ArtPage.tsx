import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IMAGE_API_URL } from "~/api/constants";
import { loadImage } from "~/api/fetchImage";
import { fetchPoster } from "~/api/fetchPoster";
import NoImage from '~/assets/no-image.png'
import { Loader } from "~/components/Loader/Loader";
import { ArtPageSkeletonLoader } from "~/components/SkeletonLoaders/ArtPage/ArtPage";
import { Arts } from "~/entities/Arts";
import { Bookmark } from "~/utils/Bookmark";

import styles from './ArtPage.module.scss'

export const ArtPage = () => {
    const { id } = useParams<'id'>();
    const [data, setData] = useState<Arts | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchPoster(id).then((data) => setData(data.data));
        try {
            data?.image_id && loadImage(`${IMAGE_API_URL}/${data.image_id}/full/843,/0/default.jpg`, () => setIsLoading(false));
        } catch (err) {
            setIsError(true);
        }
    }, [id, data?.image_id])


    return data ? (
        <section className={styles.container}>
            <div className={styles.img_block}>
                {isLoading ?
                    <Loader type={'large'} /> :
                    isError ?
                        <img src={NoImage} alt="" className={styles.no_image} /> :
                        <img src={`${IMAGE_API_URL}/${data.image_id}/full/843,/0/default.jpg`} alt="Art Work" className={styles.poster} />}
                <Bookmark id={id as string} />
            </div>
            <div className={styles.info}>
                <div className={styles.title}>
                    <h1>{data.title}</h1>
                    <span>{data.artist_title || 'No info'}</span>
                    <p>{data.date_start}</p>
                </div>
                <div className={styles.overview}>
                    <h3>Overview</h3>
                    <p><span>Artist nacionality: </span>{data.place_of_origin}</p>
                    <p><span>Dimensions: </span>{data.dimensions.split(';')[0]}</p>
                    <p><span>Credit Line: </span>{data.credit_line}</p>
                    <p><span>Repository: </span>{data.publishing_verification_level}</p>
                </div>
            </div>
        </section>
    ) : (<ArtPageSkeletonLoader />)
}
