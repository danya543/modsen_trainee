import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import { IMAGE_API_URL } from '~/api/constants'
import { Arts } from '~/entities/Arts'
import { Bookmark } from '~/utils/Bookmark'

import styles from './card.module.scss'

export const Card = ({ data, size = 'small' }: { data: Arts, size?: string }) => {
    const navigate = useNavigate();

    return (
        <div className={classNames({
            [styles.card]: true,
            [styles[size]]: true
        })}>
            <img src={`${IMAGE_API_URL}/${data.image_id}/full/843,/0/default.jpg`} alt="Request limit" className={styles.poster} />
            <div className={styles.info}>
                <div className={styles.user}>
                    <h3 onClick={() => navigate(`/art/${data.id}`)}>{data.title}</h3>
                    <span>{data.artist_title}</span>
                    <p>{data.is_public_domain ? 'Public' : 'Private'}</p>
                </div>
                <Bookmark id={`${data.id}`} />
            </div>
        </div>
    )
}

