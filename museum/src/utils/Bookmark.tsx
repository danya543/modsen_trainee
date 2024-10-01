import { useState } from 'react'

import Book from '~/assets/book.svg'
import Booked from '~/assets/booked.svg'
import { SessionStorageKey } from '~/Pages/constants/constants'

import styles from './utils.module.scss'

export const Bookmark = ({ id }: {
    id: string,
}) => {
    const booked = sessionStorage.getItem(SessionStorageKey.book);
    const favorites: string[] = booked ? JSON.parse(booked) : [];

    const initialState = favorites.includes(id) ? true : false;

    const [isBooked, setIsBooked] = useState(initialState);

    const handleToggleBookmark = () => {
        setIsBooked(prev => !prev);
        const booked = sessionStorage.getItem(SessionStorageKey.book);
        const favorites: string[] = booked ? JSON.parse(booked) : [];
        if (!favorites.includes(id)) {
            favorites.push(id);
            sessionStorage.setItem(SessionStorageKey.book, JSON.stringify(favorites));
        } else {

            favorites.splice(favorites.indexOf(id), 1)
            sessionStorage.setItem(SessionStorageKey.book, JSON.stringify(favorites));
            document.getElementById(id)?.remove()
        }
    }

    return (
        <button className={styles.bookmark} onClick={handleToggleBookmark}>
            <img src={isBooked ? Booked : Book} alt="" />
        </button>
    )
}
