import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';

import { fetchSearch } from '~/api/fetchSearch'
import Cross from '~/assets/cross.png'
import Search from '~/assets/search.svg'
import { Results } from '~/entities/Search'

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

const validationSchema = Yup.object({
    search: Yup.string()
        .min(2, 'Search query must be at least 2 characters long.')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Search input must contain only English letters, numbers, and spaces.')
        .required('Search input cannot be empty.')
});

export const SearchHeader = ({ query = '' }: { query?: string }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [autocompleteTitles, setAutocompleteTitles] = useState<Results[] | null>(null);
    const [isOpen, setIsOpen] = useState(!query);
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

    const handleSearchChange = (value: string) => {
        if (value) {
            debouncedFetchSearch(value);
            setIsOpen(true);
        } else {
            setAutocompleteTitles(null);
            setIsOpen(false);
        }
    };

    return (
        <div className={styles.searchBlock}>
            <h3>let's find some <span>art</span> here!</h3>
            <Formik
                initialValues={{ search: query }}
                validationSchema={validationSchema}
                validateOnChange={true}
                validateOnBlur={false}
                onSubmit={(values, { setSubmitting }) => {
                    /search-result\//.test(location.pathname)
                        ? navigate(`/search-result/${values.search}`) : navigate(`search-result/${values.search}`);
                    setIsOpen(false);
                    setSubmitting(false);
                }}
            >
                {({ values, isSubmitting, setFieldValue, isValid }) => (
                    <Form ref={ref} className={styles.searchInput}>
                        <Field
                            type="text"
                            name="search"
                            placeholder="Search art, artist, work..."
                            className={styles.searchField}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setFieldValue('search', e.target.value);
                                isValid && handleSearchChange(e.target.value);
                            }}
                        />
                        {isOpen && <ErrorMessage
                            name="search"
                            component="div"
                            //@ts-ignore
                            style={{ color: 'red' }} />}

                        <button
                            type="button"
                            className={styles.clearInput}
                            onClick={() => setFieldValue('search', '')}
                            style={!values.search ? { display: 'none' } : { display: 'block' }}
                        >
                            <img src={Cross} alt="Clear search input" />
                        </button>

                        <button type="submit" disabled={isSubmitting}>
                            <img src={Search} alt="Search icon" />
                        </button>

                        <Autocomplete data={autocompleteTitles} isOpen={isOpen} isLoading={isLoading} />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
