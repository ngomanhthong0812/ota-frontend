import React from "react";
import BtnCreatOrder from "../btn/btn_creatOrder";
import InputDay from "../btn/inputDay";

const creatOrderTable = () => {
  return (
    <div className="">
      <section className="col-span-3 duration-300">
                            {/* <!-- start dat phong- nhan phong --> */}
                            <BtnCreatOrder />
                            {/* <!-- end dat phong- nhan phong --> */}

                            <div className="px-3 rounded-md bg-white border border-[var(--ht-neutral-100-)] mt-2">
                                <div className="grid grid-cols-12 text-sm border-b border-[var(--ht-neutral-100-)] text-black font-medium py-2">
                                    <div className="flex gap-2 col-span-10">
                                    08/12/2004 14:00 - 11/12/2004 14:00
                                    </div>
                                    <div className="flex col-span-2 justify-end items-center">
                                        <p className="flex items-center">3 đêm</p>
                                    </div>

                                </div>

                                <div className="flex justify-between mt-3">
                                    <div className="center gap-2">
                                        <p className="text-black font-medium flex items-cente">Standard</p>
                                        <select id="room" name="room" className="btn text-black font-normal">
                                            <option value="FR">403</option>
                                            <option value="US">404</option>
                                            <option value="JP">405</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-end items-center text-black font-medium">
                                        <p>800,000</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 border-b border-[var(--ht-neutral-100-)] py-3 pb-28">

                                    <div className="flex gap-2">

                                        <div className="relative w-[90px]">
                                            {/* <!-- Icon người dùng phía trước --> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2 top-1/2 transform -translate-y-1/2" height="13" width="13" viewBox="0 0 448 515">
                                                <path fill="#a0a2a7"
                                                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z">
                                                </path>
                                            </svg>
                                            <input type="number" min="0" value="2" name="country" className="btn-soluong" />
                                        </div>

                                        <div className="relative w-[90px]">
                                            {/* <!-- Icon SVG mới phía trước --> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" className="absolute left-2 top-1/2 transform -translate-y-1/2" viewBox="0 0 448 512">
                                                <path fill="#a0a2a7"
                                                    d="M152 88a72 72 0 1 1 144 0A72 72 0 1 1 152 88zM39.7 144.5c13-17.9 38-21.8 55.9-8.8L131.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25l0 36.3-192 0 0-36.3c-15.2-6.7-29.7-15.1-43.3-25L48.5 200.3c-17.9-13-21.8-38-8.8-55.9zm89.8 184.8l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C70 438.6 68.1 417 79.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L284 419.4l-26-37.2z">
                                                </path>
                                            </svg>

                                            <input type="number" min="0" value="0" name="country" className="btn-soluong" />
                                        </div>

                                    </div>

                                </div>

                                <div className="flex py-2 justify-between pb-3">
                                    <div className="flex gap-2">
                                        <div className="flex items-center gap-1 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="13" width="13" viewBox="0 0 448 512">
                                                <path fill="#a0a2a7"
                                                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                                            </svg>
                                            <span className="text-black font-medium">2</span>
                                        </div>
                                        <div className="flex items-center gap-1 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 448 512">
                                                <path fill="#a0a2a7"
                                                    d="M152 88a72 72 0 1 1 144 0A72 72 0 1 1 152 88zM39.7 144.5c13-17.9 38-21.8 55.9-8.8L131.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25l0 36.3-192 0 0-36.3c-15.2-6.7-29.7-15.1-43.3-25L48.5 200.3c-17.9-13-21.8-38-8.8-55.9zm89.8 184.8l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C70 438.6 68.1 417 79.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L284 419.4l-26-37.2z">
                                                </path>
                                            </svg>
                                            <span className="text-black font-medium">0</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-end ">
                                        <span className="text-black font-medium">1 Phòng</span>
                                    </div>

                                </div>

                                {/* <!-- THành-tiền --> */}
                                <div className="grid grid-cols-2 py-2 text-black font-medium">
                                    <div>
                                        <p className="text-xz">Thành tiền</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <span className=" text-xz ">1,200,000</span>
                                    </div>
                                </div>

                                {/* <!-- End-thành-tiền --> */}

                                {/* <!--THuế-phí --> */}
                                <div className="grid grid-cols-2 py-2 text-black font-medium">
                                    <div className="flex items-center">
                                        <label className="flex items-center">
                                            <input type="checkbox" id="subscribe" checked name="subscribe"
                                                className="checkbox-thuephi" />
                                            <span className="text-xz">Thuế/Phí</span>
                                        </label>
                                    </div>
                                    <div>
                                        <span className="flex justify-end text-xz">120,000</span>
                                    </div>
                                </div>
                                {/* <!-- end- thue phi --> */}

                                {/* <!-- Tổng-tiền --> */}
                                <div className="grid grid-cols-2 py-2 text-black font-medium">
                                    <div>

                                        <p className="text-xz">Tổng tiền</p>
                                    </div>
                                    <div>
                                        <span className="flex justify-end text-xz">1,200,000</span>
                                    </div>
                                </div>
                                {/* <!-- End-Tổng-tiền--> */}

                                <div className=" py-2 text-black font-medium">
                                    <p className="text-xz">Thanh toán</p>
                                </div>

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

                                    <input type="text" id="passport" name="passport" value="0" className="btn" />
                                </div>
                                {/* <!-- End-thanh-toan --> */}

                                {/* <!-- Còn-lại --> */}
                                <div className="grid grid-cols-2 py-4">
                                    <div>
                                        <p className="text-black font-medium">Còn lại</p>
                                    </div>
                                    <div>
                                        <span className="flex justify-end text-red-500 font-semibold text-xz ">1,300,000</span>
                                    </div>
                                </div>
                            </div>

                        </section>
    </div>
  );
};

export default creatOrderTable;
