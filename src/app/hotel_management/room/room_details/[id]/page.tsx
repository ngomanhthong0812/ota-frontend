"use client"

import NavigationTabs from "@/components/layout/navigation_room_tabs";
import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import RemoveServicesModal from "@/components/room/modals/remove_services.modal";
import { useParams } from "next/navigation"
import AddServicesModal from "@/components/room/modals/add_services.modal";
import { ResponseInvoiceItem } from "@/types/backend";
import useFormatDate from "@/hook/useFormatDate";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import RoomInfo from "@/components/room/RoomInfo";

const cookies = parseCookies();
const token = cookies.access_token;


const ViewDetailRoom = () => {

  const { formatDate } = useFormatDate();
  const { formatPrice } = useFormatPriceWithCommas();
  const [showModalRemoveServices, setShowModalRemoveServices] = useState<boolean>(false);
  const [showModalAddServices, setShowModalAddServices] = useState<boolean>(false);
  const [services, setServices] = useState<ResponseInvoiceItem[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoiceItems/invoiceItemsServiceInvoiceId/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setServices(response.data.data);
        }
      } catch (error) {
        console.error("Failed to get services", error);
      }
    }

    fetchServices();
  }, [showModalAddServices]);

  const countTotalServicesPrice = () => {
    let count: number = 0;
    services?.map((item: ResponseInvoiceItem) => {
      count += item.total_price
    })

    return count;
  }


  return (
    <div>

      <NavigationTabs id={id} />

      <div className="bg-white border !border-[var(--ht-neutral-100-)] rounded-md">
        <div className="h-full">
          <div className="flex justify-end p-2 border-b !border-[var(--ht-neutral-100-)]">
            <button className="group w-10 h-10 border p-[6px] center border-[var(--navbar-color-)] rounded-md hover:bg-[var(--navbar-color-)] duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="text-green-500 w-4 h-4 group-hover:text-white"
              >
                <path
                  d="M12 4V20M20 12H4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-3">

            <RoomInfo />

            <div className="border-r !border-[var(--ht-neutral-100-)]">
              <div className="p-3">
                <textarea
                  name="note"
                  id="note"
                  rows={5}
                  cols={50}
                  className="btn"
                  placeholder="Ghi chú"
                ></textarea>

                <div className="flex items-center justify-between py-2 gap-x-1">
                  <select className="btn" defaultValue="option2">
                    <option value="option1" className="cursor-pointer">
                      Công ty A
                    </option>
                    <option value="option2" className="cursor-pointer">
                      Công ty B
                    </option>
                    <option value="option3" className="cursor-pointer">
                      Công ty C
                    </option>
                  </select>

                  <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-green-500 w-4 h-4 group-hover:text-white"
                    >
                      <path
                        d="M12 4V20M20 12H4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-x-2 py-1">
                  <div className="flex items-center gap-x-1">

                    <select className="btn" defaultValue="option1">
                      <option value="option2" className="cursor-pointer">
                        Mạng xã hội
                      </option>
                      <option value="option3" className="cursor-pointer">
                        Youtube
                      </option>
                      <option value="option4" className="cursor-pointer">
                        Facebook
                      </option>
                    </select>

                    <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-green-500 w-4 h-4 group-hover:text-white"
                      >
                        <path
                          d="M12 4V20M20 12H4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-x-1">

                    <select className="btn" defaultValue="option2">
                      <option value="option2" className="cursor-pointer">
                        Việt Nam
                      </option>
                      <option value="option3" className="cursor-pointer">
                        Châu Á
                      </option>
                      <option value="option4" className="cursor-pointer">
                        Châu Âu
                      </option>
                    </select>

                    <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-green-500 w-4 h-4 group-hover:text-white"
                      >
                        <path
                          d="M12 4V20M20 12H4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end py-2">
                  <button className="py-1 px-8 border border-[var(--navbar-color-)] text-[var(--navbar-color-)] font-semibold rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200">
                    Lưu
                  </button>
                </div>
              </div>

              <div className="border-t !border-[var(--ht-neutral-100-)] py-2 px-4">
                <div>
                  <p className="flex items-center gap-2">Ăn sáng: 4/4 - 13/4</p>
                </div>
              </div>
            </div>

            <div className="p-3">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-black font-medium">
                    Dịch vụ -
                    <span className="text-gray-600 font-normal">
                      Tổng (VND): {formatPrice(String(countTotalServicesPrice()))}
                    </span>
                  </p>

                  <button className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]"
                    onClick={() => setShowModalAddServices(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-green-500 w-4 h-4 group-hover:text-white"
                    >
                      <path
                        d="M12 4V20M20 12H4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-5">
                  <ul>
                    {services?.map((item: ResponseInvoiceItem) => (
                      <li key={item.id} className="flex items-center justify-between pb-2">
                        <div>
                          <p>{formatDate(item.createdAt)}</p>
                          <p>{item.item_name}({item.quantity})</p>

                        </div>

                        <div className="flex items-center gap-2">
                          <p>{formatPrice(String(item.total_price))}</p>

                          <button className="border border-red-500 rounded-full "
                            onClick={() => setShowModalRemoveServices(true)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-red-500">
                              <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>

                        </div>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <RemoveServicesModal
        showModal={showModalRemoveServices}
        closeModal={() => setShowModalRemoveServices(false)}
      />

      <AddServicesModal
        isOpen={showModalAddServices}
        onClose={() => setShowModalAddServices(false)}
        invoiceId={Number(id)}
      />

    </div >
  );
};

export default ViewDetailRoom;