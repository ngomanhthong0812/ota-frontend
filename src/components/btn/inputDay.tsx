import React from "react";

const InputDay = () => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="datetime-local"
        id="check-in"
        className="focus:outline-none bg-white rounded"
        placeholder="Ngày giờ đặt phòng"
      />
      <span className="flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="14"
          width="14"
          viewBox="0 0 448 512"
        >
          <path
            fill="#18191b"
            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
          />
        </svg>
      </span>
      <input
        type="datetime-local"
        id="check-0ut"
        className="focus:outline-none bg-white rounded"
        placeholder="Ngày giờ đặt phòng"
      />
    </div>
  );
};

export default InputDay;
