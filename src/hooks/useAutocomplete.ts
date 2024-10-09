import { initialPageNum } from '@api/constants';
import { fetchSearch } from '@api/fetchSearch';
import { debounce } from '@components/utils';
import { Results } from '@src/types/Search';
import { useCallback, useState } from 'react';

import { debounceDelay } from './constants';

export const useAutocomplete = (initialQuery = '') => {
  const [autocompleteTitles, setAutocompleteTitles] = useState<
    Results[] | null
  >(null);
  const [isOpen, setIsOpen] = useState<boolean>(!initialQuery);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debouncedFetchSearch = useCallback(
    debounce((searchQuery: string) => {
      setIsLoading(true);
      fetchSearch({ query: searchQuery, page: initialPageNum })
        .then(data => {
          setAutocompleteTitles(data.data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }, debounceDelay),
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

  return {
    autocompleteTitles,
    isOpen,
    isLoading,
    handleSearchChange,
    setIsOpen,
  };
};
