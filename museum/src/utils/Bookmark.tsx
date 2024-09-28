import classNames from 'classnames'
import { useState } from 'react'

import BookmarkIcon from '~/assets/bookmark.svg'
import { SessionStorageKey } from '~/Pages/constants/constants'

import styles from './utils.module.scss'

export const Bookmark = ({ id }: {
    id: string,

}) => {
    let initialState = false;
    const booked = sessionStorage.getItem(SessionStorageKey.book);
    const favorities: string[] = booked ? JSON.parse(booked) : [];
    if (favorities.includes(id)) {
        initialState = (true)
    }

    const [isBooked, setIsBooked] = useState(initialState);
    const toggleBooked = () => {
        setIsBooked(prev => !prev);
    }

    const handleToggleBookmark = () => {
        const booked = sessionStorage.getItem(SessionStorageKey.book);
        const favorities: string[] = booked ? JSON.parse(booked) : [];
        if (favorities.includes(id)) {
            sessionStorage.setItem(SessionStorageKey.book, JSON.stringify(favorities.filter(el => el != id)));
            toggleBooked
        } else {
            sessionStorage.setItem(SessionStorageKey.book, JSON.stringify([...favorities, id]));
            setIsBooked(prev => !prev);
        }
    }
    return (
        <button className={classNames({
            [styles.bookmark]: true,
            [styles.booked]: isBooked,
        })} onClick={handleToggleBookmark}>
            <img src={BookmarkIcon} alt="" />
        </button>
    )
}
