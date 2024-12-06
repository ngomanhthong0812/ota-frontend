'use client'
import EmployeeDetail from "@/components/staff/employee_detail";
import EmployeeInfo from "@/components/staff/employee_info";
import ModalUpdateEmployee from "@/components/staff/modals/modal_update_employee";
import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import ModalAddEmployee from "@/components/staff/modals/modal_add_employee";
import useSWR from "swr";
import { useAuth } from "@/context/auth.context";
import { Employee } from "@/types/backend";
import ModalConfirm from "@/components/staff/modals/modal_confirm";

interface IProps { }
const fetcher = (url: string, token: string | null) =>
  fetch(url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
const Staff: React.FC<IProps> = () => {
  const [itemActive, setItemActive] = useState<number | null>(null);
  const [showModalUpdateEmployee, setShowModalUpdateEmployee] = useState<boolean>(false);
  const [showModalAddEmployee, setShowModalAddEmployee] = useState<boolean>(false);

  const { user, token } = useAuth();
  const { data, error, isLoading, mutate } = useSWR(
    user?.hotel_id ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employees/${user?.hotel_id}` : null,
    (url: string) => fetcher(url, token),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  const refreshData = async () => {
    await mutate(); // Re-fetch lại dữ liệu
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred.";

  return (
    <div className="flex gap-5">
      <div className="min-w-[234px]">
        <h1 className="text-[18px] font-[600] text-[#3f3f3f] mt-2">Nhân viên</h1>
        <p className="mt-1 text-[13px]">Đã sử dụng <span>1</span> nhân viên.</p>
        <section className="mt-2 bg-white p-3 pb-4 rounded-md flex flex-col gap-3 text-[13px] shadow-sm shadow-[#d6d6d6]">
          <h3 className="text-black font-[600]">Trạng thái nhân viên</h3>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-1"><input type="checkbox" />Đang làm việc</li>
            <li className="flex items-center gap-1"><input type="checkbox" />Đã nghỉ </li>
          </ul>
        </section>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="relative flex-1 max-w-[400px]">
            <input type="text" placeholder="Tìm theo mã, tên nhân viên" className="w-full rounded-lg px-6 py-[6px] text-[13px] text-black border outline-none" />
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              className="absolute top-[50%] translate-y-[-45%] left-1 fill-[--ht-neutral-300-]">
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z">
              </path>
            </svg>
          </div>
          <button
            onClick={() => setShowModalAddEmployee(true)}
            className="group duration-100 flex gap-2 py-[6px] px-4 border border-[#0090da] hover:bg-[#00abda] hover:text-white rounded-sm">
            <FaUserPlus size={18} className="fill-[#0090da] group-hover:fill-white" /> Thêm nhân viên
          </button>
        </div>
        <table className="w-full bg-white mt-3 text-[13px]">
          <thead className="bg-[#E6F4FB] border border-[#E6F4FB]">
            <tr className="text-black font-[600]">
              <td className="p-2 w-[10%]"><input type="checkbox" /></td>
              <td className="p-2 w-[15%]">Mã nhân viên</td>
              <td className="p-2 w-[20%]">Tên nhân viên</td>
              <td className="p-2 w-[15%]">Số điện thoại</td>
              <td className="p-2 w-[25%]">Số CMND/CCCD</td>
              <td className="p-2 w-[15%]">Ghi chú</td>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: Employee, index: number) => (
              <React.Fragment key={item.id}>
                <EmployeeInfo
                  data={item}
                  index={index}
                  itemActive={itemActive}
                  setItemActive={setItemActive}
                />
                <EmployeeDetail
                  data={item}
                  itemActive={itemActive}
                  setShowModalUpdateEmployee={setShowModalUpdateEmployee}
                  refreshData={refreshData}
                />
              </React.Fragment>
            ))}
            {data?.data?.length === 0 &&
              <tr><td colSpan={6} className="p-2">Chưa có nhân viên...</td></tr>
            }
          </tbody>
        </table>
      </div>
      <ModalUpdateEmployee
        data={data?.data?.find((item: Employee) => item.id === itemActive)}
        showModalUpdateEmployee={showModalUpdateEmployee}
        setShowModalUpdateEmployee={setShowModalUpdateEmployee}
      />
      <ModalAddEmployee
        showModalAddEmployee={showModalAddEmployee}
        setShowModalAddEmployee={setShowModalAddEmployee}
        refreshData={refreshData} />
    </div>
  );
};

export default Staff;
