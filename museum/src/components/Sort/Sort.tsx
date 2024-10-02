import classNames from 'classnames'

import styles from './Sort.module.scss'

export const Sort = ({ isIncrese, handleToggle }: { isIncrese: boolean; handleToggle: () => void }) => {
    return (
        <div className={styles.container}>
            <button onClick={handleToggle} className={classNames({ [styles.isActive]: isIncrese })}>A-z</button>
            <button onClick={handleToggle} className={classNames({ [styles.isActive]: !isIncrese })}>Z-a</button>
        </div>
    )
}
