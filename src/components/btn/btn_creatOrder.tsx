import React from "react";

const BtnCreatOrder = () => {
  return (
    <button className="w-full flex items-center justify-center  bg-[var(--navbar-color-)] text-white font-bold p-[10px] rounded-md hover:bg-[var(--room-empty-color-hover-)]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="15"
        width="15"
        viewBox="0 0 448 512"
        className="mr-2"
      >
        <path
          fill="#ffffff"
          d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
        />
      </svg>
      Đặt Phòng
    </button>
  );
};

export default BtnCreatOrder;
