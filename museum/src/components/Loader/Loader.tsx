import classNames from 'classnames'

import LoaderIcon from '~/assets/loader.svg'

import styles from './Loader.module.scss'
export const Loader = ({ type }: { type: string }) => {
    return (
        <div className={classNames({ [styles.loader]: true, [styles[type]]: true })}>
            <img src={LoaderIcon} alt="" />
        </div>
    )
}
