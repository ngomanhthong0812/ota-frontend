'use client'
import InvoiceSearchFilters from "@/components/sales_invoice_search/invoice_search_filters";
import InvoiceSearchToolbar from "@/components/sales_invoice_search/invoice_search_toolbar";
import InvoiceTable from "@/components/sales_invoice_search/invoice_table";
import Pagination from "@/components/sales_invoice_search/pagination";
import { InvoiceReceipt } from "@/types/backend";
import { useState } from "react";

interface IProps { }
const SalesInvoiceSearchPage: React.FC<IProps> = () => {
    const [data, setData] = useState<InvoiceReceipt[]>([]);
    const [totalData, setTotalData] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleFilterData = (data: InvoiceReceipt[]) => {
        setData(data);
    }

    return (
        <div>
            <InvoiceSearchToolbar />
            <div className="bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
                <InvoiceSearchFilters
                    handleFilterData={handleFilterData}
                    setTotalData={setTotalData}
                    setPageSize={setPageSize}
                    currentPage={currentPage} />
                <InvoiceTable data={data} />
                <Pagination
                    totalData={totalData}
                    pageSize={pageSize}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default SalesInvoiceSearchPage