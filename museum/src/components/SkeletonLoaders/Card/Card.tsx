import classNames from "classnames"

import styles from './Card.module.scss'

export const CardSkeletonLoader = ({ type = 'small' }: { type?: string }) => {
    return (
        <section className={classNames({
            [styles.container]: true,
            [styles[type]]: true
        })}>
            <div className={styles.img}></div>
            <div className={styles.info}>
                <div className={styles.user}>
                    <h3></h3>
                    <p></p>
                    <p></p>
                </div>
            </div>
        </section>
    )
}
