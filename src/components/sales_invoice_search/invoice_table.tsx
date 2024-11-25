import useFormatDate from '@/hook/useFormatDate';
import useFormatPriceWithCommas from '@/hook/useFormatPriceWithCommas';
import { InvoiceReceipt } from '@/types/backend';
import Link from 'next/link';
import React from 'react';

interface IProps {
    data: InvoiceReceipt[],
}

const InvoiceTable: React.FC<IProps> = ({ data }) => {
    const { formatPrice } = useFormatPriceWithCommas();
    const { formatDate } = useFormatDate();
    return (
        <table className="w-full rounded-t-[3px] overflow-hidden mt-3">
            <thead className="relative border border-[var(--ht-neutral-100-)] font-[500] text-[var(--color-menu-icon-)]">
                <tr className="bg-[var(--ht-neutral-100-)]">
                    <td className="p-2 w-[15%]">Ngày</td>
                    <td className="p-2 w-[10%]">Số hoá đơn</td>
                    <td className="p-2 w-[10%]">Số tiền (VND)</td>
                    <td className="p-2 w-[10%] text-center">Khách hàng</td>
                    <td className="p-2 w-[15%] text-center">Người tạo</td>
                </tr>
            </thead>
            <tbody className="text-[14px]">
                {data?.map((item: InvoiceReceipt) => (
                    <tr key={item.id} className="group border-b !border-[var(--ht-neutral-100-)]">
                        <td className="p-2">{formatDate(item.createdAt)}</td>
                        <td className="p-2"><Link href={`sales_invoice_creation/invoice/${item.invoice_id}`} className="text-blue-500">{item.code}</Link></td>
                        <td className="p-2">{formatPrice(String(item.amount))}</td>
                        <td className="p-2 text-center">{item.customer_name}</td>
                        <td className="p-2 text-center">{item.created_by}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default InvoiceTable;
