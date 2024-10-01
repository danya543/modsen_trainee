import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { fetchSearch } from '~/api/fetchSearch'
import Cross from '~/assets/cross.png'
import Search from '~/assets/search.svg'
import { Results } from '~/entities/Arts'

import { Autocomplete } from '../Autocomplete/Autocomplete'
import styles from './search.module.scss'


function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>): void => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export const SearchHeader = ({ query = '' }: { query?: string }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState(query);
    const [autocompleteTitles, setAutocompleteTitles] = useState<Results[] | null>(null);
    const [isOpen, setIsOpen] = useState(!search);
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', ({ target }) => {
            //@ts-ignore
            if (ref.current && !ref.current.contains(target)) {
                setIsOpen(false)
            }
        })
    }, [])

    const debouncedFetchSearch = useCallback(
        debounce((searchQuery: string) => {
            fetchSearch({ query: searchQuery, page: 1 }).then((data) => {
                setAutocompleteTitles(data.data);
                setIsLoading(false)
            });
        }, 500),
        []
    );

    useEffect(() => {
        if (search) {
            debouncedFetchSearch(search);
        } else {
            setAutocompleteTitles(null);
            setIsOpen(false);
        }
    }, [search, debouncedFetchSearch]);

    const handleClear = () => {
        setSearch('')
    }

    return (
        <div className={styles.searchBlock}>
            <h3>let's find some <span>art</span> here!</h3>
            <form ref={ref} className={styles.searchInput} onSubmit={(e) => {
                e.preventDefault();
                setIsOpen(false)
                navigate(`/search-result/${search}`)
            }}>
                <input
                    type="text"
                    placeholder={'Search art, artist, work...'}
                    value={search}
                    onChange={({ target: { value } }) => { setSearch(value); setIsOpen(true); setIsLoading(true) }} />
                <button type='button'
                    className={styles.clearInput}
                    onClick={handleClear}
                    style={!search ? { display: 'none' } : { display: 'block' }}
                >
                    <img src={Cross} alt="" />
                </button>
                <button type="submit"><img src={Search} /></button>
                <Autocomplete data={autocompleteTitles} isOpen={isOpen} isLoading={isLoading} />
            </form>
        </div>
    )
}
