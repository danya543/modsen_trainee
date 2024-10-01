import { useEffect, useState } from "react"

import { ArtsPerPage } from "~/api/constants"
import { fetchArts } from "~/api/fetchArts"
import { Arts } from "~/entities/Arts"

import { Card } from "../Card/Card"
import { CardsSkeletonLoader } from "../SkeletonLoaders/Cards/Cards"
import styles from './OtherWorks.module.scss'

export const OtherWorks = () => {
    const page = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000);
    const [works, setWorks] = useState<Arts[] | null>(null);
    useEffect(() => {
        fetchArts(ArtsPerPage.Others, page).then((data) => setWorks(data.data))
    }, [page])

    return (
        <section className={styles.container}>
            <div className={styles.title}>
                <p>Here some more</p>
                <h3>Other works for you</h3>
            </div>
            {works ? <div className={styles.works}>
                {works?.map((work) => { return <Card key={work.id} data={work} /> })}
            </div>
                : <CardsSkeletonLoader size={8} />}


        </section>
    )
}
