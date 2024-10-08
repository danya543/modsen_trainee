import { Images, SessionStorageKey } from '@components/constants';
import { useState } from 'react';

import { SessionStorageManager } from './SessionStorageManager';
import styles from './utils.module.scss';

export const Bookmark = ({ id }: { id: string }) => {
  const { Book, Booked } = Images;
  const storageManager = new SessionStorageManager();

  const favArts = storageManager.getItem<string[]>(SessionStorageKey.book);
  const favorites = favArts ? favArts : [];

  const initialState = favorites.includes(id) ? true : false;

  const [isBooked, setIsBooked] = useState(initialState);

  const handleToggleBookmark = () => {
    setIsBooked(prev => !prev);
    const favArts = storageManager.getItem<string[]>(SessionStorageKey.book);
    const favorites = favArts ? favArts : [];
    if (!favorites.includes(id)) {
      favorites.push(id);
      storageManager.setItem(SessionStorageKey.book, favorites);
    } else {
      favorites.splice(favorites.indexOf(id), 1);
      storageManager.setItem(SessionStorageKey.book, favorites);
      document.getElementById(id)?.remove();
    }
  };

  return (
    <button className={styles.bookmark} onClick={handleToggleBookmark}>
      <img src={isBooked ? Booked : Book} />
    </button>
  );
};
