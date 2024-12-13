'use client'

import { use, useEffect, useState } from "react";
import AddServicesModal from "@/components/room/modals/add_services.modal";
import NavigationTabs from "@/components/layout/navigation_room_tabs";
import { parseCookies } from "nookies";
import useSWR, { mutate } from "swr";
import CheckOutModal from "@/components/room/modals/checkout.modal";
import CheckOutAndPayModal from "@/components/room/modals/checkout_and_pay.modal";
import RemoveServicesModal from "@/components/room/modals/remove_services.modal";
import { ReceiptAndExpense, RequestTransaction, ResponseInvoiceItem } from "@/types/backend";
import axios from "axios";
import useFormatDate from "@/hook/useFormatDate";
import useFormatPriceWithCommas from "@/hook/useFormatPriceWithCommas";
import { CURRENCY_TYPES, PAYMENT_METHODS, PAYMENT_OPTIONS_INVOICE_ROOM } from "@/constants/constants";
import { useAuth } from "@/context/auth.context";
import { toast } from "react-toastify";

interface Payments {
  id: number;
  payment_date: Date;
  amount: number;
  payment_method: string;
  note: string;
}

const cookies = parseCookies();
const token = cookies.access_token;
const RoomInvoicePage = ({ params }: { params: Promise<{ id: number }> }) => {

  const { formatDate } = useFormatDate();
  const { formatPrice } = useFormatPriceWithCommas();
  const { user } = useAuth();
  const { id } = use(params);

  const [activeTab, setActiveTab] = useState<string>("denHienTai");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [roomDetails, setRoomDetails] = useState<{ id: number, name: string; price: number }[]>([]);  // Mảng lưu tên và giá phòng
  const [roomPrice, setRoomPrice] = useState<number>(0);
  const [bookingId, setBookingId] = useState<number>(0);
  const [payments, setPayments] = useState<Payments[]>([]);
  const [remainingAmount, setRemainingAmount] = useState<number>(0);
  const [showModalCheckOut, setShowModalCheckOut] = useState<boolean>(false);
  const [showModalCheckOutAndPay, setShowModalCheckOutAndPay] = useState<boolean>(false);
  const [showModalRemoveServices, setShowModalRemoveServices] = useState<boolean>(false);
  const [services, setServices] = useState<ResponseInvoiceItem[]>([]);
  const [transactions, setTransactions] = useState<ReceiptAndExpense[]>([]);
  const [transactionRequest, setTransactionRequest] = useState<RequestTransaction>({
    paymentOption: PAYMENT_OPTIONS_INVOICE_ROOM.PAYMENT,
    paymentMethod: PAYMENT_METHODS.CASH,
    currencyType: CURRENCY_TYPES.VND,
    price: 0,
    note: '',
    invoice_id: Number(id),
    user_id: user?.id,
    hotel_id: user?.hotel_id,
  });

  useEffect(() => {
    setTransactionRequest(prev => ({
      ...prev,
      paymentOption: remainingAmount > 0 ? PAYMENT_OPTIONS_INVOICE_ROOM.PAYMENT : PAYMENT_OPTIONS_INVOICE_ROOM.REFUND,
      user_id: user?.id,
      hotel_id: user?.hotel_id,
    }))
  }, [user, remainingAmount]);

  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoicePayments/id/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: invoiceItemBooking } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoiceItems/invoiceItemBookingInvoiceId/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoicePayments/id/${id}`);
  }, [services])


  useEffect(() => {
    if (data && data.invoice) {
      setRoomPrice(data?.invoice?.invoice?.total)
      setBookingId(data?.invoice?.bookings.id)

      const roomDetailsList = data.invoice.rooms.map((room: any) => ({
        id: room.id,
        name: room.name,
        price: room.price,
      }));
      setRoomDetails(roomDetailsList);
      setPayments(data?.payments || []) // Cập nhật state với tên và giá phòng
    }
  }, [data])

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
  }, [isModalOpen]);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoicePayments/allReceiptAndExpenseByInvoiceId/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setTransactions(response?.data?.data);
        }
      } catch (error) {
        console.error("Failed to get services", error);
      }
    }

    fetchTransactions();
  }, [showModalCheckOut])

  function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    // Kết hợp thành định dạng YYYY-MM-DD HH:mm:ss.ssssss
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}000`;
  }

  //hàm tính toán sô ngày
  function calculateDaysBetween(startDate: string, endDate: string): number {
    const start = new Date(startDate); // Ngày bắt đầu
    const end = new Date(endDate); // Ngày kết thúc

    // Kiểm tra ngày hợp lệ
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid date format");
    }

    // Tính số ngày
    const diffTime = Math.abs(end.getTime() - start.getTime()); // Khoảng thời gian chênh lệch (milliseconds)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Đổi sang ngày

    return diffDays;
  }

  useEffect(() => {
    // Cập nhật số tiền còn lại sau khi trừ tổng amount payments
    const totalPaid = calculateTotalAmount(transactions);
    setRemainingAmount(roomPrice - totalPaid);
  }, [transactions, roomPrice]); // Chạy lại khi payments hoặc totalInvoice thay đổi

  const calculateTotalAmount = (transactions: ReceiptAndExpense[]): number => {
    const totalAmountTransactions = transactions.reduce((sum, transaction) => transaction.type === "expense" ? sum - (transaction.amount) : sum + (transaction.amount), 0);

    return totalAmountTransactions;
  };

  const handleShowModalCheckOut = () => {
    if (transactionRequest.price > 0) {
      setShowModalCheckOut(true);
    } else {
      toast("Vui lòng nhập số tiền lơn hơn 0");
    }
  }

  useEffect(() => {
    if (data) {
      const calculatePriceNow = (calculateDaysBetween(data?.invoice?.invoice?.booking_at, getCurrentDateTime()) * data.invoice.rooms[0].price);
      setRoomPrice(activeTab === "denHienTai" ? data?.invoice?.invoice?.total - (data?.invoice?.bookings?.total - calculatePriceNow) : data?.invoice?.invoice?.total)
    }
  }, [activeTab, data])


  if (isLoading) return "Loading...";
  if (error) return "An error has occurred.";


  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>

      <NavigationTabs id={id} />

      <div className="flex items-center justify-between gap-1 mb-3">
        <button
          className={`w-1/2 py-2 text-sm font-medium text-black bg-gray-200 rounded-md 
                                ${activeTab === "denHienTai"
              ? "bg-green-400 text-white"
              : "bg-gray-200"
            }`}
          onClick={() => setActiveTab("denHienTai")}
        >
          Đến hiện tại
        </button>
        <button
          className={`w-1/2 py-2 text-sm text-black bg-gray-200 rounded-md font-medium
                                ${activeTab === "denKhiTraPhong"
              ? "bg-green-400 text-white"
              : "bg-gray-200"
            }`}
          onClick={() => setActiveTab("denKhiTraPhong")}
        >
          Đến khi trả phòng
        </button>
      </div>

      <div className="flex flex-wrap bg-white p-3 rounded-md">
        <div className="basis-[100%] md:basis-[55%] pr-3">
          <div className="">
            <div className="flex items-center justify-between text-black text-xl font-bold py-3 border-b !border-[var(--ht-neutral-100-)]">
              <p>
                <span>Hoá đơn</span>
              </p>
              <p className="price">
                <span>{formatPrice(String(roomPrice))} VNĐ</span>
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
                  <span>Giá đêm
                    ({formatDate(data?.invoice?.invoice?.booking_at)} - {activeTab === "denHienTai" ? formatDate(getCurrentDateTime()) : formatDate(data?.invoice?.invoice?.check_out_at)})</span>
                  <div>{activeTab === "denHienTai" ? formatPrice(String(calculateDaysBetween(data?.invoice?.invoice?.booking_at, getCurrentDateTime()) * roomDetails[0]?.price)) : formatPrice(String(data?.invoice?.bookings?.total))}</div>
                </div>
                {/* <div className="flex justify-between py-1">
                  <span>Nhận phòng sớm (49 phút)</span>
                  <div>50,000demo</div>
                </div> */}
              </div>
            </div>

            <div className="text-left py-3 border-b !border-[var(--ht-neutral-100-)]">
              <div className="grid grid-cols-4">
                <div className="col-span-1 flex items-center gap-2 text-green-500">
                  <button
                    className="group border border-green-400 hover:bg-[var(--navbar-color-)] duration-200 rounded-full p-[1px]"
                    onClick={openModal}
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
                  Dịch vụ
                  <AddServicesModal
                    invoiceId={id}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                  />
                </div>
                <ul className="flex flex-col col-span-3">
                  {services?.map((item: ResponseInvoiceItem) => (
                    <li key={item.id} className="flex items-center justify-between pb-2">
                      <div>
                        <p>{formatDate(item.createdAt)}</p>
                        <p>{item.item_name}({item.quantity})</p>

                      </div>
                      <p>{formatPrice(String(item.total_price))}</p>
                    </li>
                  ))}
                </ul>
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
                      <span>{formatPrice(String(roomPrice))}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                    <p>
                      <span>Đã thanh toán</span>
                    </p>
                    <p>
                      <span>{formatPrice(String(roomPrice - remainingAmount))}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b !border-[var(--ht-neutral-100-)]">
                    <p>
                      <span>Còn lại</span>
                    </p>
                    <p>
                      <span>{remainingAmount >= 0 ? formatPrice(String(remainingAmount)) : '-' + formatPrice(String(remainingAmount))}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 md: col-span-2 border-l !border-[var(--ht-neutral-100-)] pl-3">
          <div className="flex justify-end border-b !border-[var(--ht-neutral-100-)] pb-2">

            <button className="btn-fn bg-[var(--room-not-arrived-color-100-)] text-[var(--room-not-arrived-color-)]"
              onClick={() => setShowModalCheckOutAndPay(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={18}
                height={18}
                style={{ fill: 'var(--room-not-arrived-color-)' }}
              >
                <path
                  d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
              </svg>
              <p>
                <span>Trả phòng</span>
              </p>
            </button>
          </div>

          <div className="flex items-center gap-6 py-2 font-medium text-black">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                checked={transactionRequest.paymentOption === PAYMENT_OPTIONS_INVOICE_ROOM.PAYMENT}
                value={PAYMENT_OPTIONS_INVOICE_ROOM.PAYMENT}
                onChange={e => setTransactionRequest(prev => ({ ...prev, paymentOption: e.target.value }))}
                name="payment-option" />
              <p>
                <span>{PAYMENT_OPTIONS_INVOICE_ROOM.PAYMENT}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                checked={transactionRequest.paymentOption === PAYMENT_OPTIONS_INVOICE_ROOM.REFUND}
                value={PAYMENT_OPTIONS_INVOICE_ROOM.REFUND}
                onChange={e => setTransactionRequest(prev => ({ ...prev, paymentOption: e.target.value }))}
                name="payment-option" />
              <p>
                <span>{PAYMENT_OPTIONS_INVOICE_ROOM.REFUND}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 py-2">
            <div className="flex flex-col col-span-1">
              <label htmlFor="" className="mb-1">
                Hình thức TT
              </label>

              <select
                onChange={e => setTransactionRequest(prev => ({ ...prev, paymentMethod: e.target.value }))}
                name="" id="" className="btn">
                <option>{PAYMENT_METHODS.CASH}</option>
                <option>{PAYMENT_METHODS.BANK_TRANSFER}</option>
                <option>{PAYMENT_METHODS.CREDIT_CARD}</option>
              </select>
            </div>

            <div className="flex flex-col col-span-1">
              <label htmlFor="" className="mb-1">
                Tiền tệ
              </label>

              <select
                onChange={e => setTransactionRequest(prev => ({ ...prev, currencyType: e.target.value }))}
                name="" id=""
                className="btn">
                <option value="">{CURRENCY_TYPES.VND}</option>
                <option value="">{CURRENCY_TYPES.USD}</option>
              </select>
            </div>

            <div className="flex flex-col col-span-1">
              <label htmlFor="" className="mb-1">
                Số tiền
              </label>

              <input
                type="number"
                name="soTien"
                className="btn"
                onChange={e => setTransactionRequest(prev => ({ ...prev, price: Number(e.target.value) }))}
                value={transactionRequest.price} />
            </div>
          </div>

          <div className="py-2">
            <textarea
              name="note"
              id="note"
              rows={5}
              cols={50}
              className="w-full btn px-2"
              placeholder="Note(bắt buộc)"
              onChange={e => setTransactionRequest(prev => ({ ...prev, note: e.target.value }))}
              value={transactionRequest.note}
            ></textarea>
          </div>

          <div className="flex justify-end border-b !border-[var(--ht-neutral-100-)] pb-2">
            <button className="btn-fn bg-blue-100 text-[#60a5fa]"
              onClick={handleShowModalCheckOut}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                color={"#1FADA4"}
                fill={"none"}
              >
                <path
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p>
                <span>Thanh toán</span>
              </p>
            </button>
          </div>

          <div className="py-2">
            <div>
              <span className="font-medium">Đã thanh toán</span>
            </div>
            {transactions?.map(item => (
              <div
                key={item.id + item.type}
                className="border-b !border-[var(--ht-neutral-100-)] py-2 checkout-detail flex items-center justify-between">
                <div className="flex flex-col">
                  <p>City view 102 ({
                    item.payment_method ?
                      item.payment_method === 'Cash' ? PAYMENT_METHODS.CASH : PAYMENT_METHODS.BANK_TRANSFER
                      : 'NaN'
                  })</p>
                  <p className="text-xs text-[#8a8a8a]">
                    {formatDate(item.createdAt)}
                  </p>
                  <p className="text-xs text-[#8a8a8a] max-w-[200px]">
                    {item.note}
                  </p>
                </div>
                <span className={`font-medium ${item.type === "expense" ? 'text-[#fa6060]' : 'text-[#60a5fa]'} price`}>
                  {item.type === "expense" ? '-' : '+'}{formatPrice(String(item.amount))} VND
                </span>
                <div className="gap-2 select hidden">
                  <button className="border border-red-500 rounded-full"
                    onClick={() => setShowModalRemoveServices(true)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-red-500">
                      <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CheckOutAndPayModal
        showModal={showModalCheckOutAndPay}
        closeModal={() => setShowModalCheckOutAndPay(false)}
        roomName={roomDetails[0]?.name}
        remainingAmount={remainingAmount}
        invoice_id={id}
        room_id={roomDetails[0]?.id}
        booking_id={bookingId}
      />

      <CheckOutModal
        showModal={showModalCheckOut}
        closeModal={() => setShowModalCheckOut(false)}
        transactionRequest={transactionRequest}
      />

      <RemoveServicesModal
        showModal={showModalRemoveServices}
        closeModal={() => setShowModalRemoveServices(false)}
      />
    </div >
  );
}

export default RoomInvoicePage;