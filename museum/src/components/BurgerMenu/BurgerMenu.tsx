import classNames from "classnames";

import { Nav } from "~/components/Nav/Nav"

import styles from './BurgerMenu.module.scss'

export const BurgerMenu = ({ isOpen, handleClose }: { isOpen: boolean; handleClose: () => void }) => {
    return (
        <div className={classNames({ [styles.container]: true, [styles.isOpen]: isOpen })}
            onClick={handleClose}
            data-testid="burger-menu-container"
        >
            <div className={styles.menu}>
                <Nav isColumn={true} />
            </div>
        </div>
    )
}
