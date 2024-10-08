import { Autocomplete } from '@components/Autocomplete/Autocomplete';
import { Images } from '@components/constants';
import { useAutocomplete } from '@hooks/useAutocomplete';
import { useClickOutside } from '@hooks/useClickOutside';
import { useValidation } from '@hooks/useValidation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Search.module.scss';

export const SearchHeader = ({ query = '' }: { query?: string }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { Cross, Search } = Images;

  const {
    autocompleteTitles,
    isOpen,
    isLoading,
    handleSearchChange,
    setIsOpen,
  } = useAutocomplete(query);

  const { handleValidate } = useValidation();

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div className={styles.searchBlock}>
      <h3>
        let&apos;s find some <span>art</span> here!
      </h3>
      <Formik
        initialValues={{ search: query }}
        validate={handleValidate}
        validateOnChange={true}
        onSubmit={(values, { setSubmitting }) => {
          navigate(`/search-result/${values.search}`);
          setIsOpen(false);
          setSubmitting(false);
        }}>
        {({
          values,
          isSubmitting,
          setFieldValue,
          isValid,
          validateField,
          errors,
          touched,
        }) => (
          <Form ref={ref} className={styles.searchInput}>
            <Field
              type="text"
              name="search"
              placeholder="Search art, artist, work..."
              className={styles.searchField}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue('search', e.target.value);
                validateField('search');
                isValid && handleSearchChange(e.target.value);
              }}
            />
            {errors.search && touched.search && isOpen && (
              <ErrorMessage
                name="search"
                component="div"
                className={styles.error}
              />
            )}
            {values.search && (
              <button
                type="button"
                className={styles.clearInput}
                onClick={() => setFieldValue('search', '')}>
                <img src={Cross} alt="Clear search input" />
              </button>
            )}
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
