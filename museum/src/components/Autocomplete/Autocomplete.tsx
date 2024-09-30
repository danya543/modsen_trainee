import { useNavigate } from 'react-router-dom';

import { Results } from '~/entities/Arts'

import styles from './Autocomplete.module.scss'

export const Autocomplete = ({ data, isOpen }: {
    data: Results[] | null, isOpen: boolean
}) => {
    const navigate = useNavigate();

    const handleOpenLink = (id: number) => {
        navigate(`/art/${id}`)
    }

    return (data && isOpen &&
        <div className={styles.container} >
            <ul>
                {data.length > 0 ? data?.map((item) => { return <li key={item.id} onClick={() => handleOpenLink(item.id)}>{item.title}</li> }) : 'Nothing found'}
            </ul>
        </div>
    )
}
