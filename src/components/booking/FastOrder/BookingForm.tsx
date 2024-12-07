import React, { LegacyRef, useRef } from 'react'

interface IProps {
    handleCloseBookingForm: () => void; // Accept the function as a prop
}

const BookingForm: React.FC<IProps> = ({handleCloseBookingForm}) => {
  return (
    <div className="fixed inset-0 bg-[#00000080] z-[100] flex justify-end" >
    <div className="absolute max-w-[440px] text-[14px] h-full px-3 text-[var(--color-menu-icon-)] bg-white">
    <div className="absolute top-2 left-[-25px] ">
        <button onClick={handleCloseBookingForm}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"
                viewBox="0 0 512 512">
                <path fill="#ffffff" stroke="white" stroke-width="10"
                    d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
            </svg>
        </button>
    </div>
    <h2 className="uppercase bottom-line font-[500] !py-3 text-xz">đặt phòng nhanh</h2>
    
    <div className="flex my-2 justify-between">
        <div>
            <h2 className="text-xz font-[500]">Thông tin phòng</h2>
        </div>

        <div className="flex items-center justify-center">
            
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 512 512">
                    
                    <path fill="var(--navbar-color-)" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                    <path
                        d="M184 232h144c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                </svg>
            </button>
            <p className="text-[var(--room-empty-color-)] px-2">3 đêm</p>
             
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 512 512">
                    
                    <path fill="var(--navbar-color-)" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                    <path
                        d="M232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
            </button>

        </div>
    </div>
     

    
    <div className="text-md gap-2 flex">
        <input type="datetime-local" id="check-in" className="date-time" placeholder="Ngày giờ đặt phòng" />
        <input type="datetime-local" id="check-out" className="date-time" placeholder="Ngày giờ đặt phòng" />
    </div>
    

     
    <div className="flex my-2 gap-2">

        <div className="w-1/2">
            <select id="country" name="country" className="btn">
                <option value="St">Standard room(phong tieu chuan)</option>
                <option value="Ci">City view(phong view thanh pho)</option>
                <option value="Se">Sea view(phong view bien)</option>
                <option value="Fa">Family(phong gia dinh)</option>
            </select>
        </div>
        <div className="w-1/2">
            <select id="room" name="room" className="btn">
                <option value="FR">403</option>
                <option value="US">404</option>
                <option value="JP">405</option>
            </select>
        </div>



    </div>
     

     
    <div className="flex my-2 gap-2">
        <div className="w-1/2">
            <select id="country" name="country" className="btn">
                <option value="FR">Giá mặc định</option>
                <option value="US">Giá được giảm</option>
                <option value="JP">Giá niêm yết</option>
            </select>
        </div>
        <div className="w-1/2 flex justify-end items-center text-center">
            <p className=" text-xz ">Tổng 1,200,000</p>
        </div>
    </div>
    

   
    <div className="flex my-2 gap-2 bottom-line">
        <div className="flex-1">
            <select id="country" name="country" className="btn">
                <option value="FR">Chọn nguồn</option>
                <option value="US">Trái</option>
                <option value="JP">Phải</option>
            </select>
        </div>

        <div className="flex gap-2 flex-1">

            <div className="relative">
               
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2 top-1/2 transform -translate-y-1/2" height="13" width="13" viewBox="0 0 448 515">
                    <path fill="#a0a2a7"
                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
                <input type="number" min="0" value="2" name="country" className="btn !p-2 !pl-6" />
            </div>

            <div className="relative">
                 
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" className="absolute left-2 top-1/2 transform -translate-y-1/2" viewBox="0 0 448 512">
                    <path fill="#a0a2a7"
                        d="M152 88a72 72 0 1 1 144 0A72 72 0 1 1 152 88zM39.7 144.5c13-17.9 38-21.8 55.9-8.8L131.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25l0 36.3-192 0 0-36.3c-15.2-6.7-29.7-15.1-43.3-25L48.5 200.3c-17.9-13-21.8-38-8.8-55.9zm89.8 184.8l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C70 438.6 68.1 417 79.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L284 419.4l-26-37.2z" />
                </svg>

                <input type="number" min="0" value="0" name="country" className="btn !p-2 !pl-6" />
            </div>

        </div>
    </div>
    

   
    <h2 className="my-2 text-sm  font-medium">Khách đại diện</h2>
    

     
    <div className="flex gap-2 my-2">
        <div className="flex-1 relative">
            <input id="country" name="country" className="btn" placeholder="Tên khách" value="Guest" />
        </div>

        <div className="flex-1 flex rounded-md overflow-hidden bg-[var(--ht-neutral-100-)]">
            
            <input type="radio" name="gender" id="male" value="male" className="sr-only peer/male" checked />
            <label htmlFor="male" className="w-1/2 text-center text-gray-500 flex items-center justify-center cursor-pointer transition-colors duration-300  peer-checked/male:rounded-md peer-checked/male:border peer-checked/male:border-[var(--room-empty-color-)] peer-checked/male:bg-white peer-checked/male:text-[var(--room-empty-color-)]">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 320 512">
                    <path fill="currentColor"
                        d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-223.1L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6l29.7 0c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9 232 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128-16 0z" />
                </svg>
            </label>

           
            <input type="radio" name="gender" id="female" value="female" className="sr-only peer/female" />
            <label htmlFor="female" className="w-1/2 text-center text-gray-500 flex items-center justify-center cursor-pointer transition-colors duration-300 peer-checked/female:rounded-md peer-checked/female:border peer-checked/female:border-[var(--room-empty-color-)] peer-checked/female:bg-white peer-checked/female:text-[var(--room-empty-color-)]">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 320 512">
                    <path fill="currentColor"
                        d="M160 0a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM88 384l-17.8 0c-10.9 0-18.6-10.7-15.2-21.1L93.3 248.1 59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l53.6-89.2c20.3-33.7 56.7-54.3 96-54.3l11.6 0c39.3 0 75.7 20.6 96 54.3l53.6 89.2c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9l-33.9-56.3L265 362.9c3.5 10.4-4.3 21.1-15.2 21.1L232 384l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96-16 0 0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96z" />
                </svg>
            </label>
        </div>




    </div>
     

     
    <div className="flex gap-2 my-2">
        <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 448 512" className="absolute left-1 top-[50%] translate-y-[-50%] text-gray-400">
                <path fill="#9ca3b1"
                    d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM183 278.8c-27.9-13.2-48.4-39.4-53.7-70.8l39.1 0c1.6 30.4 7.7 53.8 14.6 70.8zm41.3 9.2l-.3 0-.3 0c-2.4-3.5-5.7-8.9-9.1-16.5c-6-13.6-12.4-34.3-14.2-63.5l47.1 0c-1.8 29.2-8.1 49.9-14.2 63.5c-3.4 7.6-6.7 13-9.1 16.5zm40.7-9.2c6.8-17.1 12.9-40.4 14.6-70.8l39.1 0c-5.3 31.4-25.8 57.6-53.7 70.8zM279.6 176c-1.6-30.4-7.7-53.8-14.6-70.8c27.9 13.2 48.4 39.4 53.7 70.8l-39.1 0zM223.7 96l.3 0 .3 0c2.4 3.5 5.7 8.9 9.1 16.5c6 13.6 12.4 34.3 14.2 63.5l-47.1 0c1.8-29.2 8.1-49.9 14.2-63.5c3.4-7.6 6.7-13 9.1-16.5zM183 105.2c-6.8 17.1-12.9 40.4-14.6 70.8l-39.1 0c5.3-31.4 25.8-57.6 53.7-70.8zM352 192A128 128 0 1 0 96 192a128 128 0 1 0 256 0zM112 384c-8.8 0-16 7.2-16 16s7.2 16 16 16l224 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-224 0z" />
            </svg>
            <input type="text" id="passport" name="passport" placeholder="Nhập số CCCD/Hộ chiếu" className="flex  w-full pl-6 pr-2 py-[8px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--room-empty-color-)] focus:border-[var(--room-empty-color-)]  " />
        </div>
        <div className="flex-1">
            <button type="button" className="text-[14px] w-[100%] px-3 py-2 border border-[var(--room-empty-color-)] rounded-md shadow-sm focus:outline-none focus:ring-[var(--room-empty-color-)] text-[var(--room-empty-color-)] flex items-center text-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 448 512"
                    className="mr-2">
                    <path fill="var(--room-empty-color-)"
                        d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80zM64 96l0 64 64 0 0-64L64 96zM0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zm64 16l0 64 64 0 0-64-64 0zM304 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm80 64l-64 0 0 64 64 0 0-64zM256 304c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16l0 96c0 8.8-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-160zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z" />
                </svg>
                Scann
            </button>
        </div>
    </div>
   

     
    <div className="flex gap-2">
        <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 512 512" className="absolute left-1 top-[50%] translate-y-[-50%] text-gray-400">
                <path fill="#9ca3b1"
                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
            <input type="text" id="Email" name="Email" placeholder="Email" className="flex w-full pl-6 pr-2 py-[8px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--room-empty-color-)] focus:border-[var(--room-empty-color-)] " />
        </div>

        <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 512 512" className="absolute left-1 top-[50%] translate-y-[-50%] text-gray-400">
                <path fill="#9ca3b1"
                    d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
            <input type="text" id="SĐT" name="SĐT" placeholder="SĐT" className="flex w-full pl-6 pr-2 py-[8px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--room-empty-color-)] focus:border-[var(--room-empty-color-)] " />
        </div>
    </div>
    

    
    <div className="grid grid-cols-2 py-2 text-black font-medium">
        <div>
            <p className="text-xz">Thành tiền</p>
        </div>
        <div className="flex justify-end">
            <span className=" text-xz ">1,200,000</span>
        </div>
    </div>

     

    THuế-phí 
    <div className="grid grid-cols-2 py-2 text-black font-medium">
        <div className="flex items-center">
            <label className="flex items-center">
                <input type="checkbox" id="subscribe" name="subscribe" checked className="checkbox-thuephi" />
                <span className="text-xz">Thuế/Phí</span>
            </label>
        </div>
        <div>
            <span className="flex justify-end text-xz">120,000</span>
        </div>
    </div>
     

     
    <div className="grid grid-cols-2 py-2 text-black font-medium">
        <div>
            <p className="text-xz">Tổng tiền</p>
        </div>
        <div>
            <span className="flex justify-end text-sm font-medium">1,200,000</span>
        </div>
    </div>
    

     
    <p className="text-xz text-black font-medium">Thanh toán</p>

    <div className="flex gap-2">
        <select id="VND" name="VND" className="btn !w-auto">
            <option value="FR">VNĐ</option>
            <option value="US">USD</option>
            <option value="JP">EUR</option>
        </select>

        <select id="a" name="a" className="btn !w-auto">
            <option value="FR">Tiền mặt</option>
            <option value="US">Chuyển khoản</option>
        </select>

        <input type="text" id="passport" name="passport" value="0" className="flex flex-1 px-2 py-[8px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--room-empty-color-)] focus:border-[var(--room-empty-color-)]" />
    </div>


   

     
    <div className="grid grid-cols-2 my-4  bottom-line">
        <div>
            <p className="text-xz text-black font-medium"> Còn lại</p>
        </div>
        <div>
            <span className="flex justify-end text-xz font-medium text-red-600 ">1,300,000</span>
        </div>
    </div>
    
     
    <div className="flex justify-end gap-3">
        <button className="flex items-center justify-center bg-[var(--room-empty-color-)] text-white font-bold py-2 px-4 rounded hover:bg-[var(--room-empty-color-hover-)]">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 448 512" className="mr-2">
                <path fill="#ffffff"
                    d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </svg>
           
        </button>

        <button className="flex items-center justify-center bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 640 512"
                className="mr-2">
                <path
                    d="M32 32c17.7 0 32 14.3 32 32l0 256 224 0 0-160c0-17.7 14.3-32 32-32l224 0c53 0 96 43 96 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32-224 0-32 0L64 416l0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z">
                </path>
            </svg>
            Nhận Phòng
        </button>
    </div>
     </div>
</div>

  )
}

export default BookingForm