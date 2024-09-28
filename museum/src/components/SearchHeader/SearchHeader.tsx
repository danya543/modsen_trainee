
import Search from '../../assets/search.svg'
import { Input } from '../../constants/Input'
import styles from './search.module.scss'

export const SearchHeader = () => {
    return (
        <div className={styles.searchBlock}>
            <h3>let's find some <span>art</span> here!</h3>
            <Input placeholder={'Search art, artist, work...'} classname={styles.searchInput} image={Search} />
        </div>
    )
}
