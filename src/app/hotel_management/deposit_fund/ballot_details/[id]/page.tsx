"use client";
import SelectUserUpdate from "@/components/room_admin/SelectUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { use, useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";

const cookies = parseCookies();
const token = cookies.access_token;

const ViewBallotDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  // Cập nhật các state để quản lý dữ liệu có thể sửa
  const [content, setContent] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<number>(Number(0));
  const [dateTime, setDateTime] = useState<{ CreatedAt: string }>({
    CreatedAt: "",
  });
  const [receiverAccount, setreceiverAccount] = useState<string>("");
  const [receiverName, setreceiverName] = useState<string>("");
  const { id } = use(params); // Lấy `id` từ `params`
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
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transaction/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  // Cập nhật trạng thái khi dữ liệu được tải về
  useEffect(() => {
    if (data) {
      setContent(data.data.Content);
      setNote(data.data.Note);
      setAmount(data.data.Amount);
      setreceiverAccount(data.data.ExtraDetails.receiverAccount);
      setreceiverName(data.data.ExtraDetails.receiverName);
      setSelectedUser(data.data.IdUser);
      // Kiểm tra xem CreatedAt có hợp lệ không
      const createdAt = data.data.CreatedAt;

      // Nếu CreatedAt hợp lệ thì mới chuyển đổi, nếu không thì không làm gì
      const date = new Date(createdAt);
      if (!isNaN(date.getTime())) {
        // Chuyển đổi ngày thành định dạng "YYYY-MM-DD"
        setDateTime({ CreatedAt: date.toISOString().split("T")[0] });
      } else {
        console.error("Invalid date format", createdAt);
      }
    }
  }, [data]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formatter = new Intl.NumberFormat("en-US");
  // Hàm xử lý khi form được submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngừng hành động mặc định của form
    console.log([content, note, amount, dateTime.CreatedAt, selectedUser]);
    // Lấy giờ hiện tại
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    // Ghép ngày từ state và giờ hiện tại
    const date = `${dateTime.CreatedAt}T${hours}:${minutes}:${seconds}`;
    try {
      // Gửi dữ liệu khi form được submit qua API
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transaction/${id}`,
        {
          content: content,
          note: note,
          amount: amount,
          receiverAccount,
          receiverName,
          created_at: date,
          user_id: selectedUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thay token vào đây
            "Content-Type": "application/json",
          },
        }
      );

      // Kiểm tra phản hồi từ API
      if (response.data.statusCode === 200 || response.status === 201) {
        console.log("Gửi update thành công");
        // Sau khi gửi thành công, điều hướng tới trang khác
        router.push("/hotel_management/deposit_fund");
      }
    } catch (error) {
      // In thông tin lỗi khi gặp sự cố
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Xóa dấu phẩy hoặc các ký tự không phải là số để chuyển về số hợp lệ
    const value = e.target.value.replace(/[^\d]/g, ""); // Xóa mọi ký tự không phải là số
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setAmount(numericValue); // Cập nhật giá trị dưới dạng số
    }
  };

  // Hàm xử lý khi người dùng thay đổi ngày
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value; // Value is "YYYY-MM-DD"
    setDateTime({ ...data, CreatedAt: newDate }); // Updating the state with the new date
  };
  // Handle change in the dropdown
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Chuyển đổi giá trị từ string sang number trước khi cập nhật state
    setSelectedUser(Number(e.target.value));
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="toolbar-top pb-2 flex items-center justify-between text-xs">
          <div className="flex items-center justify-between px-3 w-full rounded-md">
            <h1 className="text-base font-[600] flex items-center gap-1">
              {data.data.TransactionType === "income"
                ? "Phiếu thu tiền gửi"
                : "Phiếu chi tiền gửi"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="icon"
              >
                {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                <path d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm48 160l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zM96 336c0-8.8 7.2-16 16-16l352 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-352 0c-8.8 0-16-7.2-16-16zM376 160l80 0c13.3 0 24 10.7 24 24l0 48c0 13.3-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24l0-48c0-13.3 10.7-24 24-24z" />
              </svg>
            </h1>
            <button className="sbm group" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="icon !fill-[var(--room-empty-color-)] group-hover:!fill-white"
              >
                {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
              </svg>
              Lưu
            </button>
          </div>
        </div>
        {/* <!-- start Body Content --> */}
        <div className="bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
          <div className="flex items-center gap-1 pb-3">
            <input type="checkbox" />
            <span>Hiển thị phiếu trên biên bản bàn giao ca</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="icon cursor-pointer"
              fontStyle="width: 12px; height: 12px;"
            >
              {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </div>
          <div className="lg:flex md:block gap-2">
            <div className="flex-1 p-2 pb-5 border-x border-b border-[var(--ht-neutral-100-)] rounded-md">
              <h2 className="uppercase font-[500] text-[13px] border-b !border-[var(--ht-neutral-100-)] pb-2 mb-2">
                Thông tin chung
              </h2>
              <select className="custom-select btn mb-4">
                <option value="">Tìm kiếm khách hàng...</option>
                <option value="">Cristiano Ronado</option>
                <option value="">Nguyễn Văn A</option>
                <option value="">Lê Thi B</option>
                <option value="">Nguyễn Trần Duy Nhất</option>
              </select>
              <p className="text-[#b2b2b2] border-b border-dashed border-[var(--ht-neutral-100-)] py-1 mb-8 ml-3">
                Người nhận
              </p>
              <p className="text-[#b2b2b2] border-b border-dashed border-[var(--ht-neutral-100-)] py-1 mb-8 ml-3">
                Địa chị
              </p>
              <div className="flex items-center gap-3 mb-4">
                <span>
                  {" "}
                  {data.data.TransactionType === "income"
                    ? "Nội dung thu"
                    : "Nội dung chi"}
                </span>

                <div className="flex-1">
                  <input
                    type="text"
                    className="p-2 w-full border-b outline-none focus:!border-[var(--room-empty-color-)]"
                    placeholder="Nhập ghi chú"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div>Tài khoản ngân hàng</div>
                <input
                  type="text"
                  className="p-2 w-full border-b outline-none focus:!border-[var(--room-empty-color-)]"
                  placeholder="Nhập ghi chú"
                  value={receiverAccount}
                  onChange={(e) => setreceiverAccount(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 p-2 pb-5 border-x border-b border-[var(--ht-neutral-100-)] rounded-md lg:mt-0 md:mt-3">
              <h2 className="uppercase font-[500] text-[13px] border-b !border-[var(--ht-neutral-100-)] pb-2 mb-2">
                Chứng từ
              </h2>
              <p className="flex flex-col text-[#b2b2b2] border-b border-dashed border-[var(--ht-neutral-100-)] py-1 mb-4 ml-3">
                <span className="text-xs">
                  {data.data.TransactionType === "income"
                    ? "Số phiếu thu"
                    : "Số phiếu chi"}
                </span>
                <span>{data.data.Code}</span>
              </p>
              <div className="center !justify-between mb-4 ml-3">
                <label form="start-date">
                  {" "}
                  {data.data.TransactionType === "income"
                    ? "Ngày thu tiền"
                    : "Ngày chi tiền"}
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={dateTime.CreatedAt} // Hiển thị ngày đã chọn từ state
                  onChange={handleDateChange} // Cập nhật state khi người dùng thay đổi ngày
                  className="btn !w-auto ml-2"
                />
                {/* <!-- Lấy thời gian hiện tại làm mặt định qua js --> */}
              </div>
              <div className="center !justify-between mb-4 ml-3">
                <label>
                  {" "}
                  {data.data.TransactionType === "income"
                    ? "Phiếu thu tiền"
                    : "Phiếu chi tiền"}
                </label>
                <select className="btn !w-auto">
                  <option value="">Chi khác</option>
                </select>
              </div>

              <SelectUserUpdate
                value={selectedUser} // Giá trị đã chọn
                onChange={handleSelectChange} // Hàm xử lý thay đổi
                IdUser={data.data.IdUser}
                CreatedBy={data.data.CreatedBy}
              />
              <div className="flex items-center">
                <div>Tài khoản người nhận</div>
                <input
                  type="text"
                  className="p-2 w-full border-b outline-none focus:!border-[var(--room-empty-color-)]"
                  placeholder="Số tài khoản người nhận"
                  value={receiverName}
                  onChange={(e) => setreceiverName(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end Body Content --> */}

        {/* <!-- start Toolbar Top 2--> */}
        <div className="toolbar-top rounded-t-md pb-2 flex items-center justify-between text-xs mt-3">
          <div className="flex ">
            <div className="toolbar-top-room-detail flex rounded-3xl p-1 font-[600] bg-white">
              <button className="toolbar-top-type_item active">Chi tiết</button>
              <button className="toolbar-top-type_item">Chứng từ</button>
            </div>
          </div>
        </div>
        {/* <!-- end Toolbar Top 2 --> */}

        {/* <!-- start Body Content 2 --> */}
        <div className="bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
          <table className="w-full rounded-t-[3px] overflow-hidden">
            <thead className="relative border !border-[var(--ht-neutral-100-)] font-[500] text-[var(--color-menu-icon-)]">
              <tr className="bg-[var(--ht-neutral-100-)]">
                <td className="w-[80%] p-2">
                  <p className="whitespace-nowrap">Mô tả</p>
                </td>
                <td className="w-[20%] p-2 text-center">
                  <p className="whitespace-nowrap">Tổng tiền</p>
                </td>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              <tr className="group border-b !border-[var(--ht-neutral-100-)]">
                <td className="p-2 py-4">
                  <div className="flex gap-2">
                    <button className="btn !w-[40px] !flex items-center justify-center !bg-[var(--room-empty-color-)] !text-white border-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        fontStyle="margin-top: 2px;"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h14m-7 7V5"
                        ></path>
                      </svg>
                    </button>
                    <button className="btn !w-[40px] !flex items-center justify-center  !bg-[var(--room-out-of-service-color-)] !text-white border-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        fontStyle="margin-top: 2px;"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h14m-7 7V5"
                        ></path>
                      </svg>
                    </button>
                    <div className="flex-1">
                      <input
                        type="text"
                        className="p-2 w-full border-b outline-none focus:!border-[var(--room-empty-color-)]"
                        placeholder="Nhập ghi chú"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <select className="btn !w-auto">
                      <option value="">VND</option>
                    </select>
                    <div className="flex-1">
                      <input
                        type="text"
                        className="p-2 w-full border-b outline-none focus:!border-[var(--room-empty-color-)]"
                        placeholder="Nhập số tiền"
                        value={formatter.format(amount)}
                        onChange={handleAmountChange}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center justify-end py-3">
            <span className="py-1 px-2 rounded-md text-sm font-[500] bg-blue-500 !text-white">
              Tổng VND {formatter.format(amount)}
            </span>
          </div>
        </div>
        {/* <!-- end Body Content 2--> */}
      </form>
    </div>
  );
};
export default ViewBallotDetails;
