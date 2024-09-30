import { useEffect, useState } from "react";

import { fetchPosters } from "~/api/fetchPosters";
import { Card } from "~/components/Card/Card"
import { UserArtResponse } from "~/entities/Arts";
import { SessionStorageKey } from "~/Pages/constants/constants"

import styles from './FavoritiesPage.module.scss'

export const FavoritesPage = () => {
    const [posts, setPosts] = useState<UserArtResponse[] | null>(null);

    const favArts = sessionStorage.getItem(SessionStorageKey.book);
    const favorities: string[] = favArts ? JSON.parse(favArts) : [];
    useEffect(() => {
        fetchPosters(favorities).then((data) => setPosts(data));
    }, [])

    return (favorities.length > 0 ?
        <section className={styles.container}>
            <h1>Here are your<br /><span>favorites</span></h1>
            <div className={styles.wrapper}>
                <p>Saved by you</p>
                <h3>Your favorites list</h3>
                <div className={styles.posts_container}>
                    {posts?.map((post) => {
                        return <Card key={post.data.id} data={post.data} />
                    })}
                </div>
            </div>
        </section >
        : <div>No favorities</div>
    )
}
