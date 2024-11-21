'use client'

import { useEffect, useState } from "react";

interface IProps {
    handleChangeSearch: (key: string) => void,
}

const Search: React.FC<IProps> = ({ handleChangeSearch }) => {
    const [searchValue, setSearchValue] = useState<string>('');
    useEffect(() => {
        handleChangeSearch(searchValue);
    }, [searchValue])
    return (
        <div className="toolbar-top pb-2 flex items-center justify-between text-xs px-3">
            <h1 className="text-base font-[500] flex items-center gap-1">
                Danh sách dịch vụ
            </h1>
            <div className="relative">
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    placeholder="Dịch vụ"
                    className="w-full rounded-md px-6 py-[7px] text-xs text-black border outline-none"
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    className="absolute top-[50%] translate-y-[-45%] left-1 fill-[--ht-neutral-300-]">
                    <path
                        d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z">
                    </path>
                </svg>
            </div>
        </div>
    )
}
export default Search;