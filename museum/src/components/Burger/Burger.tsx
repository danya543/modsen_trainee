import styles from './Burger.module.scss'

export const Burger = ({ icon, handleToggle }: { icon: string; handleToggle: () => void }) => {

    return (
        <div className={styles.container} onClick={handleToggle}><img src={icon} /></div>
    )
}
