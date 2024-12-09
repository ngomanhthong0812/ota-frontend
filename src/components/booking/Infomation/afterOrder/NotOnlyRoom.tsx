import React from "react";

const NotOnlyRoom = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-10 xl:grid-cols-10 2xl:grid-cols-10 gap-2">
        <section className="grid grid-cols-2 col-span-7 duration-300 border relative border-[var(--ht-neutral-100-)] bg-white rounded-md">
          <div className="px-3 border-r border-[var(--ht-neutral-100-)]">
            <h2 className="title-info">Thông tin đặt phòng</h2>

            <div className=" flex mt-3 relative gap-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                viewBox="0 0 640 512"
              >
                <path
                  fill="#279656"
                  d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"
                />
              </svg>
              <input
                type="text"
                id="SĐT"
                name="SĐT"
                placeholder="Mã hiển thị đoàn"
                className="btn"
              />
            </div>
            <div className="my-3">
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="btn min-h-[88px]"
                placeholder="Ghi chú "
              ></textarea>
            </div>
            <div className="flex items-center w-[100%] gap-1 ">
              <select
                id="country"
                name="country"
                className="btn appearance-none"
              >
                <option value="FR">Chọn công ty</option>
                <option value="US">Công ty A</option>
                <option value="JP">Công ty B</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="15"
                width="15"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#279656"
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                />
              </svg>
            </div>

            <div className="flex my-3 gap-1">
              <div className="flex w-1/2 items-center gap-1">
                <select
                  id="country"
                  name="country"
                  className="btn appearance-none"
                >
                  <option value="FR">Chọn Nguồn</option>
                  <option value="US">Trực tiếp</option>
                  <option value="JP">Liên hệ</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="15"
                  width="15"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#279656"
                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                  />
                </svg>
              </div>
              <div className=" flex w-1/2 items-center gap-1">
                <select id="room" name="room" className="btn appearance-none">
                  <option value="FR">Chọn thị trường</option>
                  <option value="US">Việt Nam</option>
                  <option value="JP">Nước Ngoài</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="15"
                  width="15"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#279656"
                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="px-3">
            <h2 className="title-info">Khách đại diện</h2>
            <div className="flex gap-1 my-3">
              <div className="w-[70%] relative">
                <input
                  id="country"
                  name="country"
                  className="btn"
                  placeholder="Tên khách"
                  value=""
                />
              </div>

              <div className="flex-1 flex rounded-md overflow-hidden bg-[var(--ht-neutral-100-)]">
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  className="sr-only peer/male"
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
                    ></path>
                  </svg>
                </label>

                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  className="sr-only peer/female"
                />
                <label
                  htmlFor="female"
                  className="w-1/2 text-center text-gray-500 flex items-center justify-center  cursor-pointer transition-colors duration-300 peer-checked/female:rounded-md peer-checked/female:border peer-checked/female:border-[var(--room-empty-color-)] peer-checked/female:bg-white peer-checked/female:text-[var(--room-empty-color-)]"
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
                    ></path>
                  </svg>
                </label>
              </div>
            </div>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="15"
                width="15"
                viewBox="0 0 448 512"
                className="absolute left-1 top-1/2 -translate-y-1/2"
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
                className="btn-border-info"
              />
            </div>
            <div className="flex gap-2 my-3">
              <div className="w-2/3 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="15"
                  width="15"
                  viewBox="0 0 512 512"
                  className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400"
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
                  className="btn-border-info"
                />
              </div>

              <div className="w-1/3 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="15"
                  width="15"
                  viewBox="0 0 512 512"
                  className="absolute left-1 top-1/2 -translate-y-1/2 "
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
                  className="btn-border-info"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-2/3 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="15"
                  width="15"
                  viewBox="0 0 448 512"
                  className="absolute left-1 top-1/2 -translate-y-1/2"
                >
                  <path
                    fill="#9ca3b1"
                    d="M86.4 5.5L61.8 47.6C58 54.1 56 61.6 56 69.2L56 72c0 22.1 17.9 40 40 40s40-17.9 40-40l0-2.8c0-7.6-2-15-5.8-21.6L105.6 5.5C103.6 2.1 100 0 96 0s-7.6 2.1-9.6 5.5zm128 0L189.8 47.6c-3.8 6.5-5.8 14-5.8 21.6l0 2.8c0 22.1 17.9 40 40 40s40-17.9 40-40l0-2.8c0-7.6-2-15-5.8-21.6L233.6 5.5C231.6 2.1 228 0 224 0s-7.6 2.1-9.6 5.5zM317.8 47.6c-3.8 6.5-5.8 14-5.8 21.6l0 2.8c0 22.1 17.9 40 40 40s40-17.9 40-40l0-2.8c0-7.6-2-15-5.8-21.6L361.6 5.5C359.6 2.1 356 0 352 0s-7.6 2.1-9.6 5.5L317.8 47.6zM128 176c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 48c-35.3 0-64 28.7-64 64l0 71c8.3 5.2 18.1 9 28.8 9c13.5 0 27.2-6.1 38.4-13.4c5.4-3.5 9.9-7.1 13-9.7c1.5-1.3 2.7-2.4 3.5-3.1c.4-.4 .7-.6 .8-.8l.1-.1s0 0 0 0s0 0 0 0s0 0 0 0s0 0 0 0c3.1-3.2 7.4-4.9 11.9-4.8s8.6 2.1 11.6 5.4c0 0 0 0 0 0s0 0 0 0l.1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c3-3.5 7.4-5.4 12-5.4s9 2 12 5.4l.1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c2.9-3.4 7.1-5.3 11.6-5.4s8.7 1.6 11.9 4.8c0 0 0 0 0 0s0 0 0 0s0 0 0 0l.1 .1c.2 .2 .4 .4 .8 .8c.8 .7 1.9 1.8 3.5 3.1c3.1 2.6 7.5 6.2 13 9.7c11.2 7.3 24.9 13.4 38.4 13.4c10.7 0 20.5-3.9 28.8-9l0-71c0-35.3-28.7-64-64-64l0-48c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 48-64 0 0-48c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 48-64 0 0-48zM448 394.6c-8.5 3.3-18.2 5.4-28.8 5.4c-22.5 0-42.4-9.9-55.8-18.6c-4.1-2.7-7.8-5.4-10.9-7.8c-2.8 2.4-6.1 5-9.8 7.5C329.8 390 310.6 400 288 400s-41.8-10-54.6-18.9c-3.5-2.4-6.7-4.9-9.4-7.2c-2.7 2.3-5.9 4.7-9.4 7.2C201.8 390 182.6 400 160 400s-41.8-10-54.6-18.9c-3.7-2.6-7-5.2-9.8-7.5c-3.1 2.4-6.8 5.1-10.9 7.8C71.2 390.1 51.3 400 28.8 400c-10.6 0-20.3-2.2-28.8-5.4L0 480c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32l0-85.4z"
                  />
                </svg>
                <input type="date" className="btn-border-info !py-[7px]" />
              </div>
              <div className="w-1/3 relative ">
                <select
                  id="country"
                  name="country"
                  className="btn appearance-none"
                >
                  <option value="FR">Viet Nam</option>
                  <option value="US">Nước Ngoài</option>
                  <option value="JP">Sao Hỏa</option>
                </select>
              </div>
            </div>
            start dia chi
            <div className="my-3 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-1 top-1/2 transform -translate-y-1/2 "
                height="14"
                width="15.75"
                viewBox="0 0 576 512"
              >
                <path
                  fill="#b0b5c1"
                  d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                />
              </svg>
              <input
                type="text"
                id="SĐT"
                name="SĐT"
                placeholder="Địa chỉ"
                className="btn-border-info"
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default NotOnlyRoom;
