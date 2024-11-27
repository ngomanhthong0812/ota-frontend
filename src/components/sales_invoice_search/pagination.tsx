import React, { useEffect, useState } from 'react';
interface IProps {
    totalData: number,
    pageSize: number,
    setCurrentPage: (page: number) => void,
}
const Pagination: React.FC<IProps> = ({ totalData, pageSize, setCurrentPage }) => {
    const [page, setPage] = useState<number>(1);
    const totalPage = Math.ceil(totalData / pageSize);

    const handleNextPage = () => {
        if (page < totalPage) {
            setPage(prev => prev + 1)
        }
    }
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prev => prev - 1)
        }
    }

    useEffect(() => {
        setCurrentPage(page)
    }, [page])

    useEffect(() => { setPage(1) }, [totalData])
    return (
        <div className="pagination center !justify-end p-4 gap-3">
            <span>{page} trên {totalPage}</span>
            <div
                onClick={handlePrevPage}
                className={`group center border p-[7px] rounded-[3px] duration-75 ${page > 1 && 'hover:bg-[var(--room-empty-color-)] cursor-pointer'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
                    className={`${page > 1 ? 'group-hover:!fill-white' : '!fill-[var(--ht-neutral-200-)]'}`}>
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
            </div>
            <div
                onClick={handleNextPage}
                className={`group center border p-[7px] rounded-[3px] duration-75 ${page < totalPage && 'hover:bg-[var(--room-empty-color-)] cursor-pointer'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
                    className={`${page < totalPage ? 'group-hover:!fill-white' : '!fill-[var(--ht-neutral-200-)]'}`}>
                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </svg>
            </div>
        </div>
    );
}

export default Pagination;
