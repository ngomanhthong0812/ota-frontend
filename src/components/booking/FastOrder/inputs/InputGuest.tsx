import { useState } from "react";
import { useFormContext } from "../BookingForm";


const InputGuest = () => {
  const {customer,setCustomer} = useFormContext();
  const {guestName, guestID, guestEmail, guestPhone, gender} = customer;
    

     // Hàm xử lý khi người dùng chọn tên khách
     const handleGuestNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (setCustomer) {
        setCustomer((prev) => ({ ...prev, guestName: event.target.value }));
      }
    };
    // Hàm xử lý khi người dùng chọn CCCD/Hộ chiếu
    const handleGuestIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (setCustomer) {
        setCustomer((prev) => ({ ...prev, guestID: event.target.value }));
      }
    };
      // Hàm xử lý khi người dùng chọn Email
    const handleGuestEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (setCustomer) {
        setCustomer((prev) => ({ ...prev, guestEmail: event.target.value }));
      }
    };
    // Hàm xử lý khi người dùng chọn số điện thoại
    const handleGuestPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (setCustomer) {
        setCustomer((prev) => ({ ...prev, guestPhone: (event.target.value) }));
      }
    };
     // Hàm xử lý khi người dùng chọn giới tính
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setCustomer) {
      setCustomer((prev) => ({ ...prev, gender: event.target.value as "male" | "female" | null }));
    }
  };


  return (
    <div>
        {/* Tên khách hàng */}
        <div className="flex gap-2 my-2">
          <div className="flex-1 relative">
            <input
              id="country"
              name="country"
              className="btn"
              placeholder="Guest Name"
              value={guestName}
              onChange={handleGuestNameChange}
            />
          </div>
            {/* Giới tính */}
          <div className="flex-1 flex rounded-md overflow-hidden bg-[var(--ht-neutral-100-)]">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              className="sr-only peer/male"
              checked={gender === "male"}
              onChange={handleGenderChange}
            />
            <label  
              htmlFor="male"
              className="w-1/2 text-center text-gray-500 flex items-center justify-center cursor-pointer transition-colors duration-300  peer-checked/male:rounded-md peer-checked/male:border peer-checked/male:border-[var(--room-empty-color-)] peer-checked/male:bg-white peer-checked/male:text-[var(--room-empty-color-)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-223.1L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6l29.7 0c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9 232 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128-16 0z"
                />
              </svg>
            </label>

            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              className="sr-only peer/female"
              checked={gender === "female"}
              onChange={handleGenderChange}
            />
            <label
              htmlFor="female"
              className="w-1/2 text-center text-gray-500 flex items-center justify-center cursor-pointer transition-colors duration-300 peer-checked/female:rounded-md peer-checked/female:border peer-checked/female:border-[var(--room-empty-color-)] peer-checked/female:bg-white peer-checked/female:text-[var(--room-empty-color-)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M160 0a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM88 384l-17.8 0c-10.9 0-18.6-10.7-15.2-21.1L93.3 248.1 59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l53.6-89.2c20.3-33.7 56.7-54.3 96-54.3l11.6 0c39.3 0 75.7 20.6 96 54.3l53.6 89.2c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9l-33.9-56.3L265 362.9c3.5 10.4-4.3 21.1-15.2 21.1L232 384l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96-16 0 0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96z"
                />
              </svg>
            </label>
          </div>
        </div>
        {/* Số CCCD */}
        <div className="flex gap-2 my-2">
          <div className="flex-1 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15"
              width="15"
              viewBox="0 0 448 512"
              className="absolute left-1 top-[50%] translate-y-[-50%] text-gray-400"
            >
              <path
                fill="#9ca3b1"
                d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM183 278.8c-27.9-13.2-48.4-39.4-53.7-70.8l39.1 0c1.6 30.4 7.7 53.8 14.6 70.8zm41.3 9.2l-.3 0-.3 0c-2.4-3.5-5.7-8.9-9.1-16.5c-6-13.6-12.4-34.3-14.2-63.5l47.1 0c-1.8 29.2-8.1 49.9-14.2 63.5c-3.4 7.6-6.7 13-9.1 16.5zm40.7-9.2c6.8-17.1 12.9-40.4 14.6-70.8l39.1 0c-5.3 31.4-25.8 57.6-53.7 70.8zM279.6 176c-1.6-30.4-7.7-53.8-14.6-70.8c27.9 13.2 48.4 39.4 53.7 70.8l-39.1 0zM223.7 96l.3 0 .3 0c2.4 3.5 5.7 8.9 9.1 16.5c6 13.6 12.4 34.3 14.2 63.5l-47.1 0c1.8-29.2 8.1-49.9 14.2-63.5c3.4-7.6 6.7-13 9.1-16.5zM183 105.2c-6.8 17.1-12.9 40.4-14.6 70.8l-39.1 0c5.3-31.4 25.8-57.6 53.7-70.8zM352 192A128 128 0 1 0 96 192a128 128 0 1 0 256 0zM112 384c-8.8 0-16 7.2-16 16s7.2 16 16 16l224 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-224 0z"
              />
            </svg>
            <input
              type="text"
              id="passport"
              name="passport"
              placeholder="Nhập số CCCD/Hộ chiếu"
              value={guestID}
              onChange={handleGuestIDChange}
              className="flex  w-full pl-6 pr-2 py-[8px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--room-empty-color-)] focus:border-[var(--room-empty-color-)]  "
            />
          </div>
          <div className="flex-1">
            <button
              type="button"
              className="text-[14px] w-[100%] px-3 py-2 border border-[var(--room-empty-color-)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--room-empty-color-)] text-[var(--room-empty-color-)] flex items-center text-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="12"
                width="12"
                viewBox="0 0 448 512"
                className="mr-2"
              >
                <path
                  fill="var(--room-empty-color-)"
                  d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80zM64 96l0 64 64 0 0-64L64 96zM0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zm64 16l0 64 64 0 0-64-64 0zM304 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm80 64l-64 0 0 64 64 0 0-64zM256 304c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16l0 96c0 8.8-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-160zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z"
                />
              </svg>
              Scann
            </button>
          </div>
        </div>
        {/* Email*/}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15"
              width="15"
              viewBox="0 0 512 512"
              className="absolute left-1 top-[50%] translate-y-[-50%] text-gray-400"
            >
              <path
                fill="#9ca3b1"
                d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
              />
            </svg>
            <input
              type="text"
              id="Email"
              name="Email"
              placeholder="Email"
              value={guestEmail}
              onChange={handleGuestEmailChange}
              className="flex w-full pl-6 pr-2 py-[8px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--room-empty-color-)] focus:border-[var(--room-empty-color-)] "
            />
          </div>
            {/* Số điện thoại */}
          <div className="flex-1 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="15"
              width="15"
              viewBox="0 0 512 512"
              className="absolute left-1 top-[50%] translate-y-[-50%] text-gray-400"
            >
              <path
                fill="#9ca3b1"
                d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
              />
            </svg>
            <input
              type="text"
              id="SĐT"
              name="SĐT"
              placeholder="SĐT"
              value={guestPhone ?? ''}
              onChange={handleGuestPhoneChange}
              className="flex w-full pl-6 pr-2 py-[8px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--room-empty-color-)] focus:border-[var(--room-empty-color-)] "
            />
          </div>
        </div>
    </div>
  )
}

export default InputGuest
