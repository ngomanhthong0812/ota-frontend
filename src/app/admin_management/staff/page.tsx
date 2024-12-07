'use client'
import EmployeeDetail from "@/components/staff/employee_detail";
import EmployeeInfo from "@/components/staff/employee_info";
import ModalUpdateEmployee from "@/components/staff/modals/modal_update_employee";
import ModalAddEmployee from "@/components/staff/modals/modal_add_employee";

import { useAuth } from "@/context/auth.context";
import { Employee } from "@/types/backend";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { FaUserPlus } from "react-icons/fa6";
import { BiMenuAltLeft, BiChevronDown } from "react-icons/bi";
import { CgTrash } from "react-icons/cg";
import { toast } from "react-toastify";
import axios from "axios";
import ModalConfirm from "@/components/staff/modals/modal_confirm";

const fetcher = (url: string, token: string | null) =>
  fetch(url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
const Staff = () => {
  const [itemActive, setItemActive] = useState<number | null>(null);
  const [showModalUpdateEmployee, setShowModalUpdateEmployee] = useState<boolean>(false);
  const [showModalAddEmployee, setShowModalAddEmployee] = useState<boolean>(false);
  const [showModalConfirmDeletes, setShowModalConfirmDeletes] = useState<boolean>(false);

  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string[]>(['Working', 'Resigned']);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);

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
  useEffect(() => {
    setEmployeeList(data?.data);
  }, [data]);

  const refreshData = async () => {
    await mutate(); // Re-fetch lại dữ liệu
  };

  useEffect(() => {
    setItemActive(null);
    setCheckedItems([]);
    let newData: Employee[] = data?.data || [];
    if (newData?.length > 0) {
      if (search) {
        // lọc theo key Search
        newData = newData?.filter((employee: Employee) =>
          employee.name.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
          employee.code.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
          employee.phoneNumber.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
          employee.idCard.toLowerCase().trim().includes(search.toLowerCase().trim())
        );
      }
      if (search === "") {
        setEmployeeList(data?.data);
      }

      // lọc theo trạng thái
      if (status?.length > 0) {
        newData = newData.filter(employee => status.includes(employee.status));
      }

      setEmployeeList(newData);
    }
  }, [search, status]);

  useEffect(() => {
    if (employeeList?.length > 0) {
      if (employeeList?.length === checkedItems.length) {
        setCheckedAll(true);
      } else {
        setCheckedAll(false);
      }
    }
  }, [checkedItems])

  const handleChangerStatus = (value: string) => {
    setStatus(prevStatus => {
      if (prevStatus.includes(value)) {
        return prevStatus.filter(status => status !== value);
      } else {
        return [...prevStatus, value];
      }
    });
  }
  const handleSetCheckedItem = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setCheckedItems(prevId => {
      if (prevId.includes(id)) {
        return prevId.filter(item => item !== id);
      } else {
        return [...prevId, id];
      }
    });
  }

  const handleSetCheckedAll = (b: boolean) => {
    setCheckedAll(b);
    if (b) {
      const items: number[] = [];
      employeeList.map(item => {
        items.push(item.id);
      });
      setCheckedItems(items);
    } else {
      setCheckedItems([]);
    }
  }

  const handleDeletes = async () => {
    if (checkedItems.length > 0) {
      try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employees/deleteEmployees`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            data: { id: checkedItems }
          }
        );

        // Kiểm tra phản hồi từ API
        if (response.data.statusCode === 200) {
          console.log("Gửi thành công");
          setShowModalConfirmDeletes(false);
          toast(`Xoá nhân viên thành công`);
          refreshData();
          setCheckedItems([]);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        // In thông tin lỗi khi gặp sự cố
        console.log("Lỗi khi gửi dữ liệu:", error);
      }
    }

  }

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
            <li className="flex items-center gap-1">
              <input
                checked={status.includes("Working")}
                value='Working'
                onChange={e => handleChangerStatus(e.target.value)}
                type="checkbox"
              />
              Đang làm việc</li>
            <li className="flex items-center gap-1">
              <input
                checked={status.includes("Resigned")}
                value='Resigned'
                onChange={e => handleChangerStatus(e.target.value)}
                type="checkbox"
              />
              Đã nghỉ</li>
          </ul>
        </section>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="relative flex-1 max-w-[400px]">
            <input type="text"
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm theo mã, tên nhân viên" className="w-full rounded-lg px-6 py-[6px] text-[13px] text-black border outline-none" />
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              className="absolute top-[50%] translate-y-[-45%] left-1 fill-[--ht-neutral-300-]">
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z">
              </path>
            </svg>
          </div>
          <div className="flex gap-2">
            {checkedItems.length > 0 &&
              <button
                className="relative group flex gap-2 border-none py-[6px] px-4 text-white bg-[#4bac4d] hover:bg-[#419543] rounded-sm duration-200">
                <BiMenuAltLeft size={20} />  Thao tác <BiChevronDown size={20} />
                <div className="absolute left-0 top-8 min-w-[230px] py-2 rounded-md text-[#565656] bg-white invisible group-hover:visible">
                  <p className="py-2 px-5 hover:bg-slate-50 flex gap-1"
                    onClick={() => setShowModalConfirmDeletes(true)}><CgTrash size={20} />Xoá</p>
                </div>
              </button>
            }
            <button
              onClick={() => setShowModalAddEmployee(true)}
              className="flex gap-2 border-none py-[6px] px-4 text-white bg-[#4bac4d] hover:bg-[#419543] rounded-sm duration-200">
              <FaUserPlus size={18} />  Thêm nhân viên
            </button>
          </div>
        </div>
        <table className="w-full bg-white mt-3 text-[13px]">
          <thead className="bg-[#E6F4FB] border border-[#E6F4FB]">
            <tr className="text-black font-[600]">
              <td className="p-2 w-[10%]" onClick={() => handleSetCheckedAll(!checkedAll)}>
                <input type="checkbox" onChange={() => { }} checked={checkedAll} />
              </td>
              <td className="p-2 w-[15%]">Mã nhân viên</td>
              <td className="p-2 w-[20%]">Tên nhân viên</td>
              <td className="p-2 w-[15%]">Số điện thoại</td>
              <td className="p-2 w-[25%]">Số CMND/CCCD</td>
              <td className="p-2 w-[15%]">Ghi chú</td>
            </tr>
          </thead>
          <tbody>
            {employeeList?.map((item: Employee, index: number) => (
              <React.Fragment key={item.id}>
                <EmployeeInfo
                  data={item}
                  index={index}
                  itemActive={itemActive}
                  setItemActive={setItemActive}
                  checkedItems={checkedItems}
                  setCheckedItems={handleSetCheckedItem}
                />
                <EmployeeDetail
                  data={item}
                  itemActive={itemActive}
                  setShowModalUpdateEmployee={setShowModalUpdateEmployee}
                  refreshData={refreshData}
                />
              </React.Fragment>
            ))}
            {employeeList?.length === 0 &&
              <tr><td colSpan={6} className="p-2">Không tìm thấy nhân viên...</td></tr>
            }
          </tbody>
        </table>
      </div >
      <ModalUpdateEmployee
        data={data?.data?.find((item: Employee) => item.id === itemActive)}
        showModalUpdateEmployee={showModalUpdateEmployee}
        setShowModalUpdateEmployee={setShowModalUpdateEmployee}
        refreshData={refreshData}
      />
      <ModalAddEmployee
        showModalAddEmployee={showModalAddEmployee}
        setShowModalAddEmployee={setShowModalAddEmployee}
        refreshData={refreshData} />
      <ModalConfirm
        showModalConfirm={showModalConfirmDeletes}
        setShowModalConfirm={setShowModalConfirmDeletes}
        title={'Xoá nhân viên'}
        content={'Hệ thống sẽ <b>xóa hoàn toàn</b> nhân viên này nhưng vẫn giữ các dữ liệu chấm công và các phiếu lương nếu có. Bạn có chắc chắn muốn xóa?'}
        handleSubmit={handleDeletes}
      />
    </div >
  );
};

export default Staff;
