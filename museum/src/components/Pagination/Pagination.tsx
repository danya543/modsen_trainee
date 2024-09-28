import Next from '~/assets/next.svg'
import Prev from '~/assets/prev.svg'

import styles from './pagination.module.scss';

export const Pagination = ({
    page,
    setPage,
    numberPage = 0
}: {
    page: number;
    setPage: (page: number) => void;
    numberPage: number | undefined;
}) => {
    return (
        <div className={styles.container}>
            <button
                onClick={() => {
                    setPage(page - 1);
                }}
                style={page < 3 ? { display: 'none' } : { display: 'block' }}
            ><img src={Prev} alt="" /></button>
            <button
                onClick={() => {
                    setPage(1);
                }}
                style={page === 1 ? { display: 'none' } : { display: 'block' }}
            >1</button>
            <span>{numberPage !== 0 && page}</span>
            <button
                onClick={() => {
                    setPage(page + 1);
                }}
                style={
                    page === numberPage || numberPage === 0
                        ? { display: 'none' }
                        : { display: 'block' }
                }
            >{page + 1}</button>
            <button
                onClick={() => {
                    setPage(page + 2);
                }}
                style={
                    page === numberPage || numberPage === 0
                        ? { display: 'none' }
                        : { display: 'block' }
                }
            >{page + 2}</button>
            <button
                onClick={() => {
                    setPage(page + 3);
                }}
                style={
                    page === numberPage || numberPage === 0
                        ? { display: 'none' }
                        : { display: 'block' }
                }
            >{page + 3}</button>
            <button
                onClick={() => {
                    setPage(page + 1);
                }}
                style={
                    page === numberPage || numberPage === 0
                        ? { display: 'none' }
                        : { display: 'block' }
                }
            ><img src={Next} alt="" /></button>
        </div>
    );
};
