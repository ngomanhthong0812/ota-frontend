import React from 'react';

const Pagination: React.FC = () => {
    return (
        <div className="pagination center !justify-end p-4 gap-3">
            <span>1-10 trên 15</span>
            <div className="group center border p-[7px] rounded-[3px] cursor-pointer duration-75 hover:bg-[var(--room-empty-color-)]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="group-hover:!fill-white !fill-[var(--ht-neutral-200-)]">
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
            </div>
            <div className="group center border p-[7px] rounded-[3px] cursor-pointer duration-75 hover:bg-[var(--room-empty-color-)]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="group-hover:!fill-white">
                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </svg>
            </div>
        </div>
    );
}

export default Pagination;
