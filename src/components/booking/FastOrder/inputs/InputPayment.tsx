import React, { useEffect, useState } from "react";
import { useFormContext } from "../BookingForm";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";



const InputPayment = () => {
  const {payment, setPayment,countNight, room} = useFormContext();
  const {totalAmount, taxFee, remainingAmount, paidAmount, subTotal, paymentMethod} = payment;
  const {defaultPrice} = room;
  const CountNights = countNight;
  
  
  const [isChecked, setIsChecked] = useState(false); // Kiểm tra checkbox
  const { formatPrice } = useFormatPriceWithCommas();
  

    

  useEffect(() => {
    if (defaultPrice && CountNights) {
      const tempSubTotal = defaultPrice * CountNights;
      const tempTax = isChecked ? tempSubTotal * 0.1 : 0; // Chỉ tính thuế/phí khi isChecked = true
      setPayment &&
        setPayment((prev: any) => ({
          ...prev,
          totalAmount: tempSubTotal + tempTax,
          taxFee: tempTax,
          subTotal: tempSubTotal,
        })); // Cập nhật các giá trị
    }
  }, [defaultPrice, CountNights, isChecked]);

  // Hàm xử lý khi người dùng thay đổi checkbox
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(event.target.checked); // Cập nhật trạng thái checkbox
    };

  useEffect(() => {
    return setPayment && setPayment((prev: any) => ({
      ...prev,
      remainingAmount: Math.max((totalAmount || 0) - (paidAmount || 0), 0) // Đảm bảo không có giá trị âm
    }));
  }, [totalAmount, paidAmount]);

  // Hàm xử lý khi người dùng nhập số tiền thanh toán
  const handlePaidAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value) || 0; // Nếu không nhập gì, mặc định là 0
    setPayment && setPayment((prev: any) => ({ ...prev, paidAmount: value }));
  };

    const handlePaymentMethodChange = (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setPayment && setPayment((prev: any) => ({ ...prev, paymentMethod: e.target.value })); // Cập nhật phương thức thanh toán
    };

  return (
    <div>
      {/* Thành tiền */}
      <div className="grid grid-cols-2 py-2 text-black font-medium">
        <div>
          <p className="text-xz">Thành tiền</p>
        </div>
        <div className="flex justify-end">
          <span className=" text-xz "> {formatPrice(String(subTotal))}</span>
        </div>
      </div>
      {/* Thuế/Phí */}
      <div className="grid grid-cols-2 py-2 text-black font-medium">
        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              readOnly
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="checkbox-thuephi"
            />
            <span className="text-xz">Thuế/Phí</span>
          </label>
        </div>
        <div>
          <span className="flex justify-end text-xz">
             {formatPrice(String(taxFee || 0))}
          </span>
        </div>
      </div>
      {/* Tổng tiền */}
      <div className="grid grid-cols-2 py-2 text-black font-medium">
        <div>
          <p className="text-xz">Tổng tiền</p>
        </div>
        <div>
          <span className="flex justify-end text-sm font-medium">
             {formatPrice(String(totalAmount || 0))}
          </span>
        </div>
      </div>

      <p className="text-xz text-black font-medium">Thanh toán</p>
      {/* Chọn loại tiền */}
      <div className="flex gap-2 ">
        <select id="VND" name="VND" className="btn !w-auto">
          <option value="FR">VNĐ</option>
          <option value="US">USD</option>
          <option value="JP">EUR</option>
        </select>
        {/* Chọn hình thức thanh toán */}
            <select
              id="a"
              name="a"
              className="btn !w-auto"
              value={String(paymentMethod) || ''} // Liên kết với state
              onChange={handlePaymentMethodChange} // Xử lý sự kiện khi thay đổi
            >
              <option value="Cash">Cash</option>
              <option value="Bank_transfer">Bank_transfer</option>
              <option value="Credit_card">Credit_card</option>
            </select>
        {/* nhập số tiền thanh toán */}
        <input
          type="text "
          id="paidAmount"
          name="paidAmount"
          value={paidAmount} 
          onChange={handlePaidAmountChange}
          className="flex flex-1 px-2 py-[8px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--room-empty-color-)] focus:border-[var(--room-empty-color-)]"
        />
      </div>
      {/* Số tiền sau khi thanh toán */}
      <div className="grid grid-cols-2 my-4  bottom-line">
        <div>
          <p className="text-xz text-black font-medium"> Còn lại</p>
        </div>
        <div>
          <span className="flex justify-end text-xz font-medium text-red-600 ">
             {formatPrice(String(remainingAmount || 0))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputPayment;
