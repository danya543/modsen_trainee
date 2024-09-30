import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IMAGE_API_URL } from "~/api/constants";
import { fetchPoster } from "~/api/fetchPoster";
import { Arts } from "~/entities/Arts";
import { Bookmark } from "~/utils/Bookmark";

import styles from './ArtPage.module.scss'

export const ArtPage = () => {
    const { id } = useParams<'id'>();
    const [data, setData] = useState<Arts | null>(null);
    useEffect(() => {
        fetchPoster(id).then((data) => setData(data.data))
    }, [id])
    return data ? (
        <section className={styles.container}>
            <div className={styles.img_block}>
                <img src={`${IMAGE_API_URL}/${data.image_id}/full/843,/0/default.jpg`} alt="" className={styles.poster} />
                <Bookmark id={id as string} />
            </div>
            <div className={styles.info}>
                <div className={styles.title}>
                    <h1>{data.title}</h1>
                    <span>{data.artist_title}</span>
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
    ) : (<div>load</div>)
}
