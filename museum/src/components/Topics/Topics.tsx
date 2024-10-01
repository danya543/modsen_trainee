import { useEffect, useState } from 'react'

import { ArtsPerPage } from '~/api/constants'
import { fetchArts } from '~/api/fetchArts'
import { UserArtsResponse } from '~/entities/Arts'
import { SessionStorageKey } from '~/pages/constants/constants'

import { Card } from '../Card/Card'
import { Pagination } from '../Pagination/Pagination'
import { CardsSkeletonLoader } from '../SkeletonLoaders/Cards/Cards'
import styles from './topics.module.scss'

export const Topics = () => {
    const [topics, setTopics] = useState<UserArtsResponse | null>(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchArts(ArtsPerPage.Topics, page).then((data) => {
            setTopics(data)
            sessionStorage.setItem(SessionStorageKey.listId, JSON.stringify({ [page]: data.data }))
        })
    }, [page])

    return (
        <div className={styles.gallery}>
            <div className={styles.header}>
                <p>Topics for you</p>
                <h3>Our special gallery</h3>
            </div>
            {topics ? <div>
                <div className={styles.cards}>
                    {topics?.data.map((art) => { return <Card key={art.id} type={'large'} data={art} /> })}
                </div>
                <Pagination page={page} setPage={setPage} numberPage={topics?.pagination.total_pages} />
            </div> : <CardsSkeletonLoader type={'large'} />}
        </div>
    )
}
