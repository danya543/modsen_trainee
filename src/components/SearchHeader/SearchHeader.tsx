import { fetchSearch } from '@api/fetchSearch';
import Cross from '@assets/cross.png';
import Search from '@assets/search.svg';
import { Autocomplete } from '@components/Autocomplete/Autocomplete';
import { Results } from '@entities/Search';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import styles from './search.module.scss';

function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): void => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const validationSchema = z.object({
  search: z
    .string()
    .min(2, 'Search query must be at least 2 characters long.')
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      'Search input must contain only English letters, numbers, and spaces.',
    )
    .nonempty('Search input cannot be empty.'),
});

export const SearchHeader = ({ query = '' }: { query?: string }) => {
  const navigate = useNavigate();
  const [autocompleteTitles, setAutocompleteTitles] = useState<
    Results[] | null
  >(null);
  const [isOpen, setIsOpen] = useState(!query);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', ({ target }) => {
      //@ts-expect-error --contains error
      if (ref.current && !ref.current.contains(target)) {
        setIsOpen(false);
      }
    });
  }, []);

  const debouncedFetchSearch = useCallback(
    debounce((searchQuery: string) => {
      fetchSearch({ query: searchQuery, page: 1 }).then(data => {
        setAutocompleteTitles(data.data);
        setIsLoading(false);
      });
    }, 500),
    [],
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
      <h3>
        let&apos;s find some <span>art</span> here!
      </h3>
      <Formik
        initialValues={{ search: query }}
        validate={values => {
          const errors: Record<string, string> = {};
          const validationResult = validationSchema.safeParse(values);

          if (!validationResult.success) {
            validationResult.error.errors.forEach(error => {
              errors[error.path[0]] = error.message;
            });
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          navigate(`/search-result/${values.search}`);
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
            {isOpen && (
              <ErrorMessage
                name="search"
                component="div"
                //@ts-expect-error --inline style
                style={{ color: 'red' }}
              />
            )}
            <button
              type="button"
              className={styles.clearInput}
              onClick={() => setFieldValue('search', '')}
              style={
                !values.search ? { display: 'none' } : { display: 'block' }
              }
            >
              <img src={Cross} alt="Clear search input" />
            </button>

            <button type="submit" disabled={isSubmitting}>
              <img src={Search} alt="Search icon" />
            </button>

            <Autocomplete
              data={autocompleteTitles}
              isOpen={isOpen}
              isLoading={isLoading}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
