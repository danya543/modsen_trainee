import { ArtsPerPage } from '@api/constants';
import { fetchArts } from '@api/fetchArts';
import { SessionStorageKey } from '@components/constants';
import { UserArtsResponse } from '@src/types/Arts';
import { SessionStorageManager } from '@utils/SessionStorageManager';
import { useEffect, useState } from 'react';

export const useTopics = () => {
  const [topics, setTopics] = useState<UserArtsResponse | null>(null);
  const [page, setPage] = useState(1);
  const [isSortIncrease, setIsSortIncrease] = useState(true);
  const storageManager = new SessionStorageManager();

  const sortData = (data: UserArtsResponse['data']) => {
    return [...data].sort((a, b) =>
      isSortIncrease
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title),
    );
  };

  useEffect(() => {
    fetchArts(ArtsPerPage.Topics, page).then(data => {
      const sortedData = sortData(data.data);
      setTopics({ ...data, data: sortedData });
      storageManager.setItem(SessionStorageKey.listId, { [page]: data.data });
    });
  }, [page]);

  useEffect(() => {
    if (topics) {
      const sortedData = sortData(topics.data);
      setTopics({ ...topics, data: sortedData });
    }
  }, [isSortIncrease]);

  const clearTopics = () => setTopics(null);

  return {
    topics,
    clearTopics,
    page,
    setPage,
    isSortIncrease,
    setIsSortIncrease,
  };
};
