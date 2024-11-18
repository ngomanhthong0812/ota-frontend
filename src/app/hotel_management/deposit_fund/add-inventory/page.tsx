import { NextPage } from "next";

interface Props {}

const AddInventoryPage: NextPage<Props> = ({}) => {
  return (
    <div>
      {/* <!-- start Toolbar Top --> */}
      <div className="toolbar-top pb-2 flex items-center justify-between text-xs">
        <div className="flex items-center justify-between px-3 w-full rounded-md">
          <h1 className="text-base font-[600] flex items-center gap-1">
            Phiếu kiểm kê
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="icon"
            >
              {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
              <path d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm48 160l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zM96 336c0-8.8 7.2-16 16-16l352 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-352 0c-8.8 0-16-7.2-16-16zM376 160l80 0c13.3 0 24 10.7 24 24l0 48c0 13.3-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24l0-48c0-13.3 10.7-24 24-24z" />
            </svg>
          </h1>
          <button className="sbm group">
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
      {/* <!-- end Toolbar Top --> */}

      {/* <!-- start Body Content --> */}
      <div className="bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
        <div className="lg:flex md:block gap-2">
          <div className="flex-1 p-2 pb-5 border-x border-b border-[var(--ht-neutral-100-)] rounded-md">
            <h2 className="uppercase font-[500] text-[13px] border-b !border-[var(--ht-neutral-100-)] pb-2 mb-2">
              Thông tin chung
            </h2>
            <input
              type="text"
              className="p-2 w-full border-b outline-none focus:!border-[var(--room-empty-color-)] mb-4"
              placeholder="Nhập lý do"
            />
            <div className="flex items-center gap-3">
              <p className="text-[#b2b2b2] border-b border-dashed border-[var(--ht-neutral-100-)] py-1 mb-8 ml-3 flex-1">
                Hoá đơn tham chiếu
              </p>
              <div className="center !justify-between mb-4 ml-3">
                <label form="start-date">Kiểm kê đến ngày</label>
                <input
                  type="datetime-local"
                  id="start-date"
                  className="btn !w-auto ml-2"
                />
                {/* <!-- Lấy thời gian hiện tại làm mặt định qua js --> */}
              </div>
            </div>
          </div>
          <div className="flex-1 p-2 pb-5 border-x border-b border-[var(--ht-neutral-100-)] rounded-md lg:mt-0 md:mt-3">
            <h2 className="uppercase font-[500] text-[13px] border-b !border-[var(--ht-neutral-100-)] pb-2 mb-2">
              Chứng từ
            </h2>
            <p className="flex flex-col text-[#b2b2b2] border-b border-dashed border-[var(--ht-neutral-100-)] py-1 mb-4 ml-3">
              <span className="text-xs">Số phiếu chi</span>
              <span>KK001</span>
            </p>
            <div className="center !justify-between mb-4 ml-3">
              <label form="start-date">Ngày kiểm kê</label>
              <input
                type="datetime-local"
                id="start-date"
                className="btn !w-auto ml-2"
              />
              {/* <!-- Lấy thời gian hiện tại làm mặt định qua js --> */}
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
            <button className="toolbar-top-type_item">
              Thành viên tham gia
            </button>
          </div>
        </div>
      </div>
      {/* <!-- end Toolbar Top 2 --> */}

      {/* <!-- start Body Content 2 --> */}
      <div className="bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
        <table className="w-full rounded-t-[3px] overflow-hidden">
          <thead className="border !border-[var(--ht-neutral-100-)] font-[500] text-[var(--color-menu-icon-)]">
            <tr className="bg-[var(--ht-neutral-100-)]">
              <td className="w-[10%] p-2">
                <p className="whitespace-nowrap">STT</p>
              </td>
              <td className="w-[20%] p-2 text-center">
                <p className="whitespace-nowrap">Giá</p>
              </td>
              <td className="w-[20%] p-2 text-center">
                <p className="whitespace-nowrap">Tổng tiền</p>
              </td>
              <td className="w-[50%] p-2">
                <p className="whitespace-nowrap">Mô tả</p>
              </td>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            <tr className="group border-b !border-[var(--ht-neutral-100-)]">
              <td className="p-2">I</td>
              <td className="p-2">Số dư theo số quỹ tiền mặt (VND)</td>
              <td className="p-2 text-center">81,330,000</td>
              <td className="p-2"></td>
            </tr>
            <tr className="group border-b !border-[var(--ht-neutral-100-)]">
              <td className="p-2">II</td>
              <td className="p-2 py-4">Số kiểm kê thực tế tiền (VND)</td>
              <td className="p-2 py-4 text-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    className="p-2 w-full border-b outline-none focus:!border-[var(--room-empty-color-)] text-center"
                    placeholder="Nhập số tiền"
                  />
                </div>
              </td>
              <td className="p-2 py-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    className="p-2 w-full border-b outline-none focus:!border-[var(--room-empty-color-)]"
                    placeholder="Nhập mô tả"
                  />
                </div>
              </td>
            </tr>
            <tr className="group border-b !border-[var(--ht-neutral-100-)]">
              <td className="p-2">III</td>
              <td className="p-2">Chênh lệch</td>
              <td className="p-2 text-center font-[500]">VND 81,330,000</td>
              <td className="p-2"></td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-end py-3">
          <span className="py-1 px-2 rounded-md text-sm font-[500] bg-blue-500 !text-white">
            Tổng VND -81,330,000
          </span>
        </div>
      </div>
      {/* <!-- end Body Content 2--> */}
    </div>
  );
};

export default AddInventoryPage;
