import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchSearch } from "~/api/fetchSearch";
import { SearchHeader } from "~/components/SearchHeader/SearchHeader";
import { Pagination, Results } from "~/entities/Arts";

import styles from './SearchPage.module.scss'

export const SearchPage = () => {
    const navigate = useNavigate();
    const { query } = useParams<'query'>();
    const [search, setSearch] = useState(query)
    const [result, setResult] = useState<Results[] | null>(null);
    const [pagination, setPagination] = useState<Pagination | null>(null)
    const [page, setPage] = useState(1);
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        fetchSearch({ query: query || '', page: page })
            .then((data) => {
                (query === search) ?
                    (result ?
                        setResult([...result, ...data.data]) : setResult(data.data))
                    : (setSearch(query), setResult(data.data));
                setPagination(data.pagination);
                setIsloading(false);
            })
    }, [page, query])

    return (
        <section className={styles.container}>
            <SearchHeader query={query} />
            {result ? (<div className={styles.results_container}><div className={styles.results}>{result?.map((item) => {
                return <p key={item.id} title={item.thumbnail?.alt_text} onClick={() => { navigate(`/art/${item.id}`) }}>{item.title}</p>
            })} </div>
                <button className={styles.more} onClick={() => { setPage(page + 1); setIsloading(true) }} disabled={!(page < (pagination?.total_pages as number))}>
                    {isLoading ? 'Loading...' : (page < (pagination?.total_pages as number)) ? 'Show more' : 'No more'}
                </button>
            </div>) : isLoading ? <div>loading</div> : <div>No info</div>}</section >
    )
}
