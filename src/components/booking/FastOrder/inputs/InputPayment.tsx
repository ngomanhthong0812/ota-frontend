import React, { useEffect, useState } from "react";

interface IPutPayment {
  defaultPrice?: number;
  CountNights?: number;
  setCountNights?: (value: number) => void;
  totalAmount?: number;
  taxFee?: number;
  paidAmount?: number;
  remainingAmount?: number;
  setTotalAmount?: (value: number) => void;
  setTaxFee?: (value: number) => void;
  setPaidAmount ?: (value: number) => void;
  setRemainingAmount?: (value: number) => void;
}

const InputPayment: React.FC<IPutPayment> = ({ defaultPrice, CountNights,totalAmount,taxFee,paidAmount,remainingAmount,setTotalAmount,setCountNights,setPaidAmount,setRemainingAmount,setTaxFee }) => {
  
  
  const [paymentMethod, setPaymentMethod] = useState(""); // Hình thức thanh toán (VNĐ, thẻ,...)
  const [isChecked, setIsChecked] = useState(false); // Kiểm tra checkbox

  useEffect(() => {
    if (defaultPrice && CountNights) {
      const tempTotal = defaultPrice * CountNights;
      const tempTax = tempTotal * 0.1; // 10% thuế/phí
      setTotalAmount && setTotalAmount(tempTotal + tempTax); // Tổng tiền = thành tiền + thuế/phí
      setTaxFee && setTaxFee(tempTax); // Cập nhật thuế/phí
    }
  }, [defaultPrice, CountNights]);

  // Hàm xử lý khi người dùng chọn thuế/phí
  const handleTaxFeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTaxFee && setTaxFee(parseFloat(event.target.value) || 0);
  };

  // Cập nhật số tiền còn lại khi số tiền thanh toán hoặc tổng tiền thay đổi
  useEffect(() => {
    setRemainingAmount && setRemainingAmount((totalAmount || 0) - (paidAmount || 0));
  }, [totalAmount, paidAmount]);

  // Hàm xử lý khi người dùng nhập số tiền thanh toán
  const handlePaidAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value) || 0; // Nếu không nhập gì, mặc định là 0
    setPaidAmount && setPaidAmount(value);
  };

  // Hàm xử lý khi người dùng chọn hình thức thanh toán
  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div>
      {/* Thành tiền */}
      <div className="grid grid-cols-2 py-2 text-black font-medium">
        <div>
          <p className="text-xz">Thành tiền</p>
        </div>
        <div className="flex justify-end">
          <span className=" text-xz ">{totalAmount} $</span>
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
              checked={true}
              readOnly
              onChange={(e) => setIsChecked(e.target.checked)}
              className="checkbox-thuephi"
            />
            <span className="text-xz">Thuế/Phí</span>
          </label>
        </div>
        <div>
          <span className="flex justify-end text-xz">
            {(taxFee || 0).toLocaleString()} $
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
            {(totalAmount || 0).toLocaleString()} $
          </span>
        </div>
      </div>

      <p className="text-xz text-black font-medium py-3">Thanh toán</p>
      {/* Chọn loại tiền */}
      <div className="flex gap-2">
        <select id="VND" name="VND" className="btn !w-auto">
          <option value="FR">VNĐ</option>
          <option value="US">USD</option>
          <option value="JP">EUR</option>
        </select>
        {/* Chọn hình thức thanh toán */}
        <select id="a" name="a" className="btn !w-auto">
          <option value="FR">Tiền mặt</option>
          <option value="US">Chuyển khoản</option>
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
            {(remainingAmount || 0).toLocaleString()} $
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputPayment;
