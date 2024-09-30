import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchSearch } from "~/api/fetchSearch";
import { SearchHeader } from "~/components/SearchHeader/SearchHeader";
import { Results } from "~/entities/Arts";

export const SearchPage = () => {
    const { query } = useParams<'query'>();
    const [result, setResult] = useState<Results[] | null>(null);
    useEffect(() => {
        fetchSearch({ query: query || '' }).then((data) => setResult(data.data))
    }, [query])

    return (
        <div>
            <SearchHeader query={query} />
            {result?.map((item) => { return <p key={item.id}>{item.title}</p> })}
        </div>
    )
}
