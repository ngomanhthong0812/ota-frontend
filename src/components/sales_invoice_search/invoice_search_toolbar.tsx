import React from 'react';

const InvoiceSearchToolbar: React.FC = () => {
    return (
        <div className="toolbar-top pb-2 flex items-center justify-between text-xs">
            <div className="flex items-center justify-between px-3 w-full rounded-md">
                <h1 className="text-base font-[500] flex items-center gap-1">
                    Tìm kiếm hoá đơn
                </h1>
            </div>
        </div>
    );
}

export default InvoiceSearchToolbar;
