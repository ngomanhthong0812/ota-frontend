import { NextPage } from "next";

interface Props {}

const ComparePage: NextPage<Props> = ({}) => {
  return (
    <div className="bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
      <div className="flex justify-between">
        <div className="flex items-center gap-8">
          <div className="center">
            <label>Tài khoản ngân hàng</label>
            <select className="btn !py-1 !px-2 !w-auto ml-2">
              <option>Tất cả</option>
              <option>MB - NGO MANH THONG(483920584311111)</option>
            </select>
          </div>
          <select className="btn !py-1 !px-2 !w-auto">
            <option>Chưa đối chiếu</option>
            <option>Đã đối chiếu</option>
          </select>
          <button className="sbm group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fontStyle="fill: var(--room-empty-color-); width: 20px; height: 20px;"
              className="group-hover:!fill-white"
            >
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
          </button>
        </div>
      </div>
      <table className="w-full rounded-t-[3px] overflow-hidden mt-3">
        <thead className="relative border border-[var(--ht-neutral-100-)] font-[500] text-[var(--color-menu-icon-)]">
          <tr className="bg-[var(--ht-neutral-100-)]">
            <td className="p-2 w-[5%]">STT</td>
            <td className="p-2 w-[15%]">Ngày</td>
            <td className="p-2 w-[10%]">Số phiếu thu</td>
            <td className="p-2 w-[25%]">Tài khoản</td>
            <td className="p-2 w-[30%]">Lý do</td>
            <td className="p-2 w-[10%] text-center">Mục thu (VND)</td>
            <td className="p-2 w-[5%] text-center"></td>
          </tr>
        </thead>
        <tbody className="text-[14px]">
          <tr className="group border-b !border-[var(--ht-neutral-100-)]">
            <td className="p-2">1</td>
            <td className="p-2">08/04/2024 08:29:10</td>
            <td className="p-2 text-[var(--room-empty-color-)]">PCTG01</td>
            <td className="p-2">MB - NGO MANH THONG(483920584311111)</td>
            <td className="p-2">
              thonngo@123 nhận đặt cọc VND 5,000,000(Chuyển khoản NH) cho phòng
              103
            </td>
            <td className="p-2 text-center">500,000</td>
            <td>
              <button className="sbm btn-confirm-comparison !p-[6px] w-[50px] bg-[var(--room-empty-color-)] !text-white hover:bg-[var(--room-empty-color-hover-)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="icon !fill-white !m-0"
                >
                  {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </button>
            </td>
          </tr>
          <tr className="group border-b !border-[var(--ht-neutral-100-)]">
            <td className="p-2">2</td>
            <td className="p-2">08/04/2024 08:29:10</td>
            <td className="p-2 text-[var(--room-empty-color-)]">PCTG01</td>
            <td className="p-2">MB - NGO MANH THONG(483920584311111)</td>
            <td className="p-2">
              thonngo@123 nhận đặt cọc VND 5,000,000(Chuyển khoản NH) cho phòng
              103
            </td>
            <td className="p-2 text-center">5,00,000</td>
            <td>
              <button className="sbm btn-confirm-comparison !p-[6px] w-[50px] bg-[var(--room-empty-color-)] !text-white hover:bg-[var(--room-empty-color-hover-)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="icon !fill-white !m-0"
                >
                  {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="pagination center !justify-end p-4 gap-3">
        <span>1-10 trên 15</span>
        <div className="group center border p-[7px] rounded-[3px] cursor-pointer duration-75 hover:bg-[var(--room-empty-color-)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            fontStyle="fill: var(--ht-neutral-200-);"
            className="group-hover:!fill-white"
          >
            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </div>
        <div className="group center border p-[7px] rounded-[3px] cursor-pointer duration-75 hover:bg-[var(--room-empty-color-)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="group-hover:!fill-white"
          >
            {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
