'use client'

import { FaPrint } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import { MdOutlineAttachMoney } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import CheckOutModal from "@/components/modals/checkout.modal";
import CheckOutAndPayModal from "@/components/modals/checkout_and_pay.modal";

const RoomCheckOutPage = () => {

    const [activeTab, setActiveTab] = useState<string>("denHienTai");
    
    return (
      <div>
        

        <div className="flex items-center justify-between gap-1 mb-3">
          <button
            className={`w-1/2 py-2 text-sm font-medium text-black bg-gray-200 rounded-md 
                                ${
                                  activeTab === "denHienTai"
                                    ? "bg-green-400 text-white"
                                    : "bg-gray-200"
                                }`}
            onClick={() => setActiveTab("denHienTai")}
          >
            Đến hiện tại
          </button>
          <button
            className={`w-1/2 py-2 text-sm text-black bg-gray-200 rounded-md font-medium
                                ${
                                  activeTab === "denKhiTraPhong"
                                    ? "bg-green-400 text-white"
                                    : "bg-gray-200"
                                }`}
            onClick={() => setActiveTab("denKhiTraPhong")}
          >
            Đến khi trả phòng
          </button>
        </div>

        {activeTab === "denHienTai" && (
          <>
            <div className="flex flex-wrap bg-white p-3 rounded-md">
              <div className="basis-[100%] md:basis-[55%] pr-3">
                <div className="">
                  <div className="flex items-center justify-between text-black text-xl font-bold py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <p>
                      <span>Hoá đơn</span>
                    </p>
                    <p className="price">
                      <span>1,800,350 VND</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-4 py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <div className="col-span-1">
                      <p>
                        <span>Tiền phòng</span>
                      </p>
                    </div>
                    <div className="flex flex-col col-span-3">
                      <div className="flex justify-between py-1">
                        <span>Giá đêm (03/04 21:00 - 04/04 12:00)</span>
                        <div>300,000</div>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Giá đêm (03/04 21:00 - 04/04 12:00)</span>
                        <div>300,000</div>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Nhận phòng sớm (49 phút)</span>
                        <div>50,000</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-left py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <div className="flex items-center gap-2 text-green-500">
                      <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="text-green-500 w-4 h-4 group-hover:text-white">
                          <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      Dịch vụ
                    </div>
                  </div>

                  <div className="grid grid-cols-4 py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <div className="col-span-1 font-medium text-green-400">
                      <p>
                        <span>Giảm giá</span>
                      </p>
                    </div>
                    <div className="flex flex-col col-span-2">
                      <p>
                        <span>0</span>
                      </p>
                    </div>
                    <div className="col-span-1 text-right">
                      <p>
                        <span>0</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-left py-3 border-b !border-[var(--ht-neutral-100-)]">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <p>
                        <span>Thuế/Phí</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 pb-3">
                    <div className="col-span-1"></div>
                    <div className="flex flex-col col-span-3 font-medium text-black">
                      <div>
                        <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                          <p>
                            <span>Cần thanh toán</span>
                          </p>
                          <p>
                            <span>0</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                          <p>
                            <span>Đã thanh toán</span>
                          </p>
                          <p>
                            <span>0</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                          <p>
                            <span>Còn lại</span>
                          </p>
                          <p>
                            <span>0</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 md: col-span-2 border-l !border-[var(--ht-neutral-100-)] pl-3">
                <div className="flex justify-end border-b !border-[var(--ht-neutral-100-)] pb-2">
                  <div className="btn-fn bg-[var(--room-not-arrived-color-100-)] text-[var(--room-not-arrived-color-)]">
                    <RxExit />
                    <CheckOutAndPayModal />
                  </div>
                </div>

                <div className="flex items-center gap-6 py-2 font-medium text-black">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="payment-option" value="payment" />
                    <p>
                      <span>Thanh toán</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="radio" name="payment-option" />
                    <p>
                      <span>Hoàn tiền</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-5 py-2">
                  <div className="flex flex-col col-span-1">
                    <label htmlFor="" className="mb-1">
                      Hình thức TT
                    </label>

                    <select name="" id="" className="btn">
                      <option value="">Tiền mặt</option>
                      <option value="">Thẻ tín dụng</option>
                      <option value="">Chuyển khoản NH</option>
                      <option value="">Công nợ</option>
                    </select>
                  </div>

                  <div className="flex flex-col col-span-1">
                    <label htmlFor="" className="mb-1">
                      Tiền tệ
                    </label>

                    <select name="" id="" className="btn">
                      <option value="">VND</option>
                      <option value="">USD</option>
                    </select>
                  </div>

                  <div className="flex flex-col col-span-1">
                    <label htmlFor="" className="mb-1">
                      Số tiền
                    </label>

                    <input type="number" name="soTien" className="btn" />
                  </div>
                </div>

                <div className="py-2">
                  <textarea
                    name="note"
                    id="note"
                    rows={5}
                    cols={50}
                    className="w-full btn px-2"
                    placeholder="Note"
                  ></textarea>
                </div>

                <div className="flex justify-end border-b !border-[var(--ht-neutral-100-)] pb-2">
                  <div className="btn-fn bg-blue-100 text-[#60a5fa]">
                    <MdOutlineAttachMoney />
                    <CheckOutModal/>
                  </div>
                </div>

                <div className="py-2">
                  <div>
                    <span className="font-medium">Đã thanh toán</span>
                  </div>

                  <div className="border-b !border-[var(--ht-neutral-100-)] py-2 checkout-detail">
                    <div className="flex items-center justify-between">
                      <p>City view 102 (Tiền mặt)</p>
                      <span className="font-medium text-[#fa6060] price">
                        -100,000 VND
                      </span>
                      <div className="gap-2 select hidden">
                        <FaPrint />
                        <button className="bg-[var(--room-dirty-color-100-)] border-none rounded-full p-[1px]">
                          <CiCircleRemove />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#8a8a8a]">
                      16:36-07-04-2022-Test
                    </p>
                    <p className="text-xs text-[#8a8a8a]">
                      Khach tim duoc the phong
                    </p>
                  </div>

                  <div className="border-b !border-[var(--ht-neutral-100-)] py-2 checkout-detail">
                    <div className="flex items-center justify-between">
                      <p>City view 102 (Tiền mặt)</p>
                      <span className="font-medium text-[#60a5fa] price">
                        +2,750,000 VND
                      </span>
                      <div className="gap-2 select hidden">
                        <FaPrint />
                        <button className="bg-[var(--room-dirty-color-100-)] border-none rounded-full p-[1px]">
                          <CiCircleRemove />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#8a8a8a]">
                      16:36-07-04-2022-Test
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'denKhiTraPhong' && (
            <>
                <div className="flex flex-wrap bg-white p-3 rounded-md">
                <div className="basis-[100%] md:basis-[55%] pr-3">
                    <div className="">
                    <div className="flex items-center justify-between text-black text-xl font-bold py-3 border-b !border-[var(--ht-neutral-100-)]">
                        <p>
                        <span>Hoá đơn</span>
                        </p>
                        <p className="price">
                        <span>1,800,350 VND</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-4 py-3 border-b !border-[var(--ht-neutral-100-)]">
                        <div className="col-span-1">
                        <p>
                            <span>Tiền phòng</span>
                        </p>
                        </div>
                        <div className="flex flex-col col-span-3">
                        <div className="flex justify-between py-1">
                            <span>Giá đêm (03/04 21:00 - 04/04 12:00)</span>
                            <div>300,000</div>
                        </div>
                        <div className="flex justify-between py-1">
                            <span>Giá đêm (03/04 21:00 - 04/04 12:00)</span>
                            <div>300,000</div>
                        </div>
                        <div className="flex justify-between py-1">
                            <span>Nhận phòng sớm (49 phút)</span>
                            <div>50,000</div>
                        </div>
                        </div>
                    </div>

                    <div className="text-left py-3 border-b !border-[var(--ht-neutral-100-)]">
                        <div>
                        <button className="flex gap-1 items-center font-medium text-green-400 js-service-btn">
                            <FaPlus />
                            <p>
                            <span>Dịch vụ</span>
                            </p>
                        </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 py-3 border-b !border-[var(--ht-neutral-100-)]">
                        <div className="col-span-1 font-medium text-green-400">
                        <p>
                            <span>Giảm giá</span>
                        </p>
                        </div>
                        <div className="flex flex-col col-span-2">
                        <p>
                            <span>0</span>
                        </p>
                        </div>
                        <div className="col-span-1 text-right">
                        <p>
                            <span>0</span>
                        </p>
                        </div>
                    </div>

                    <div className="text-left py-3 border-b !border-[var(--ht-neutral-100-)]">
                        <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <p>
                            <span>Thuế/Phí</span>
                        </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 pb-3">
                        <div className="col-span-1"></div>
                        <div className="flex flex-col col-span-3 font-medium text-black">
                        <div>
                            <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                            <p>
                                <span>Cần thanh toán</span>
                            </p>
                            <p>
                                <span>0</span>
                            </p>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                            <p>
                                <span>Đã thanh toán</span>
                            </p>
                            <p>
                                <span>0</span>
                            </p>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                            <p>
                                <span>Còn lại</span>
                            </p>
                            <p>
                                <span>0</span>
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="flex-1 md: col-span-2 border-l !border-[var(--ht-neutral-100-)] pl-3">
                    <div className="flex justify-end border-b !border-[var(--ht-neutral-100-)] pb-2">
                    <button className="btn-fn bg-[var(--room-not-arrived-color-100-)] text-[var(--room-not-arrived-color-)]">
                        <RxExit />
                        <p>
                        <span>Trả phòng</span>
                        </p>
                    </button>
                    </div>

                    <div className="flex items-center gap-6 py-2 font-medium text-black">
                    <div className="flex items-center gap-2">
                        <input type="radio" name="payment-option" value="payment" />
                        <p>
                        <span>Thanh toán</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="radio" name="payment-option" />
                        <p>
                        <span>Hoàn tiền</span>
                        </p>
                    </div>
                    </div>

                    <div className="grid grid-cols-3 gap-5 py-2">
                    <div className="flex flex-col col-span-1">
                        <label htmlFor="" className="mb-1">
                        Hình thức TT
                        </label>

                        <select name="" id="" className="btn">
                        <option value="">Tiền mặt</option>
                        <option value="">Thẻ tín dụng</option>
                        <option value="">Chuyển khoản NH</option>
                        <option value="">Công nợ</option>
                        </select>
                    </div>

                    <div className="flex flex-col col-span-1">
                        <label htmlFor="" className="mb-1">
                        Tiền tệ
                        </label>

                        <select name="" id="" className="btn">
                        <option value="">VND</option>
                        <option value="">USD</option>
                        </select>
                    </div>

                    <div className="flex flex-col col-span-1">
                        <label htmlFor="" className="mb-1">
                        Số tiền
                        </label>

                        <input type="number" name="soTien" className="btn" />
                    </div>
                    </div>

                    <div className="py-2">
                    <textarea
                        name="note"
                        id="note"
                        rows={5}
                        cols={50}
                        className="w-full btn px-2"
                        placeholder="Note"
                    ></textarea>
                    </div>

                    <div className="flex justify-end border-b !border-[var(--ht-neutral-100-)] pb-2">
                    <button className="btn-fn bg-blue-100 text-[#60a5fa]">
                        <MdOutlineAttachMoney />
                        <p>
                        <span>Thanh toán</span>
                        </p>
                    </button>
                    </div>

                    <div className="py-2">
                    <div>
                        <span className="font-medium">Đã thanh toán</span>
                    </div>

                    <div className="border-b !border-[var(--ht-neutral-100-)] py-2 checkout-detail">
                        <div className="flex items-center justify-between">
                        <p>City view 102 (Tiền mặt)</p>
                        <span className="font-medium text-[#fa6060] price">
                            -100,000 VND
                        </span>
                        <div className="gap-2 select hidden">
                            <FaPrint />
                            <button className="bg-[var(--room-dirty-color-100-)] border-none rounded-full p-[1px]">
                            <CiCircleRemove />
                            </button>
                        </div>
                        </div>
                        <p className="text-xs text-[#8a8a8a]">16:36-07-04-2022-Test</p>
                        <p className="text-xs text-[#8a8a8a]">
                        Khach tim duoc the phong
                        </p>
                    </div>

                    <div className="border-b !border-[var(--ht-neutral-100-)] py-2 checkout-detail">
                        <div className="flex items-center justify-between">
                        <p>City view 102 (Tiền mặt)</p>
                        <span className="font-medium text-[#60a5fa] price">
                            +2,750,000 VND
                        </span>
                        <div className="gap-2 select hidden">
                            <FaPrint />
                            <button className="bg-[var(--room-dirty-color-100-)] border-none rounded-full p-[1px]">
                            <CiCircleRemove />
                            </button>
                        </div>
                        </div>
                        <p className="text-xs text-[#8a8a8a]">16:36-07-04-2022-Test</p>
                    </div>
                    </div>
                </div>
                </div>
            </>
        )}
      </div>
    );
}

export default RoomCheckOutPage;