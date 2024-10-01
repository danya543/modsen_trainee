import { useEffect, useMemo, useState } from "react";

import { fetchPosters } from "~/api/fetchPosters";
import { Card } from "~/components/Card/Card"
import { CardsSkeletonLoader } from "~/components/SkeletonLoaders/Cards/Cards";
import { UserArtResponse } from "~/entities/Arts";
import { SessionStorageKey } from "~/pages/constants/constants"

import styles from './FavoritiesPage.module.scss'

export const FavoritesPage = () => {
    const [posts, setPosts] = useState<UserArtResponse[] | null>(null);

    const favArts = sessionStorage.getItem(SessionStorageKey.book);
    const favoritIds = useMemo(() => {
        return favArts ? JSON.parse(favArts) : []
    }, [favArts]);
    const favorites = favoritIds;

    useEffect(() => {
        fetchPosters(favorites).then((data) => setPosts(data));
    }, [favorites])

    return (
        <section className={styles.container}>
            <h1>Here are your<br /><span>favorites</span></h1>
            <div className={styles.wrapper}>
                <p>Saved by you</p>
                <h3>Your favorites list</h3>
                {favorites.length > 0 ? (posts ? <div className={styles.posts_container}>
                    {posts?.map((post) => {
                        return <Card key={post.data.id} data={post.data} id={String(post.data.id)} />
                    })}
                </div> : <CardsSkeletonLoader size={favorites.length} />)
                    : <div className={styles.no_favorites}>Add new favorites</div>}
            </div>
        </section >

    )
}
