import { CardSkeletonLoader } from '~/components/SkeletonLoaders/Card/Card'

import { PaginationSkeletonLoader } from '../Pagination/Pagination'
import styles from './Cards.module.scss'

export const CardsSkeletonLoader = ({ type = 'small', size = 3 }: { type?: string, size?: number }) => {

    return (
        <section className={styles.container}>
            {Array.from({ length: size }, (_, index) => (
                <CardSkeletonLoader key={index} type={type} />
            ))}
            {type === 'large' && <PaginationSkeletonLoader />}
        </section>
    )
}
