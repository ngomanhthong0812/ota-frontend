import { useCallback } from 'react';

const useFormatPriceWithCommas = () => {
    // Hàm format giá trị với dấu phẩy
    const formatPrice = useCallback((value: string): string => {
        // Loại bỏ tất cả ký tự không phải số
        const cleanValue = value.replace(/[^\d]/g, '');

        // Thêm dấu phẩy vào số, chia thành các nhóm 3 chữ số
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }, []);

    return { formatPrice };
};

export default useFormatPriceWithCommas;
