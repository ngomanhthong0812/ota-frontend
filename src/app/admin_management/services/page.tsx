'use client'
import { useAuth } from "@/context/auth.context";
import { Category, Services, UserAdmin } from "@/types/backend";
import { STATUS_SERVICE } from "@/constants/constants";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";

import { IoMdAdd } from "react-icons/io";
import { BiMenuAltLeft, BiChevronDown } from "react-icons/bi";
import { CgTrash } from "react-icons/cg";
import { toast } from "react-toastify";
import { LuPencil } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";

import ServiceDetail from "@/components/service/admin/service_detail";
import ServiceInfo from "@/components/service/admin/service_info";
import ModalConfirm from "@/components/modal_confirm";
import ModalAddAndUpdateService from "@/components/service/admin/modals/modal_add_update_service";
import PaginationGlobal from "@/components/pagination_global";

const fetcher = (url: string, token: string | null) =>
  fetch(url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
const ServicesAdmin = () => {
  const [itemActive, setItemActive] = useState<number | null>(null);
  const [showModalUpdateService, setShowModalUpdateService] = useState<boolean>(false);
  const [showModalAddService, setShowModalAddService] = useState<boolean>(false);
  const [showModalConfirmDeletes, setShowModalConfirmDeletes] = useState<boolean>(false);

  const [serviceList, setServiceList] = useState<Services[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');
  const [searchCategories, setSearchCategories] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<string>('in_business');
  const [category, setCategory] = useState<string>('all');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;

  const { user, token } = useAuth();
  const { data, error, mutate } = useSWR(
    user?.hotel_id
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/getServicesByHotelIdAdmin` +
      `?hotel_id=${user.hotel_id}` +
      `&currentPage=${currentPage}` +
      `&pageSize=${pageSize}` +
      `&status=${status}` +
      `&search=${searchQuery}` +
      `&name_category=${category}`
      : null,
    (url: string) => fetcher(url, token),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const { data: catetories } = useSWR(
    user?.hotel_id
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/getCategoriesByHotelIdAdmin` +
      `?hotel_id=${user.hotel_id}` +
      `&search=${searchCategories}`
      : null,
    (url: string) => fetcher(url, token),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  useEffect(() => {
    setServiceList(data?.data?.services);
  }, [data?.data]);

  useEffect(() => {
    setItemActive(null);
    setCheckedItems([]);
    if (!search) {
      setSearchQuery('');
    }
  }, [search, status])

  const refreshData = async () => {
    await mutate(); // Re-fetch lại dữ liệu
  };

  useEffect(() => {
    if (serviceList?.length > 0) {
      if (serviceList?.length === checkedItems.length) {
        setCheckedAll(true);
      } else {
        setCheckedAll(false);
      }
    }
  }, [checkedItems, serviceList])

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
      serviceList.map(item => {
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
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/deleteServices`,
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

  const handleSearch = () => {
    setSearchQuery(search);
  };

  if (error) return "An error has occurred.";

  return (
    <div className="flex gap-5">
      <div className="min-w-[234px]">
        <section className="mb-4 bg-white p-3 pb-4 rounded-md flex flex-col gap-3 text-[13px] shadow-sm shadow-[#d6d6d6]">
          <h3 className="text-black font-[600]">Tìm kiếm</h3>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            type="text"
            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[var(--room-empty-color-)] focus:border-b-2"
            placeholder="Theo tên dịch vụ" />
        </section>
        <section className="mb-4 bg-white p-3 pb-4 rounded-md flex flex-col gap-3 text-[13px] shadow-sm shadow-[#d6d6d6]">
          <h3 className="text-black font-[600]">Loại hàng</h3>
          <div className="relative">
            <input
              value={searchCategories}
              onChange={e => setSearchCategories(e.target.value)}
              type="text"
              className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 pl-5 focus:border-[var(--room-empty-color-)] focus:border-b-2"
              placeholder="Tìm kiếm loại hàng" />
            <IoIosSearch size={19} className="absolute top-1/2 left-0 -translate-y-1/2 fill-[#9d9d9d]" />
          </div>
          {catetories?.data?.length > 0 ? (
            <div className="flex flex-col">
              {!searchCategories
                && (
                  <button
                    className={`group flex items-center justify-between px-2 py-1 duration-50 
              ${category === "all" && 'text-black font-[600]'}`}
                    onClick={() => setCategory('all')}
                  >
                    Tất cả
                    <span className="invisible p-1 w-[25px] h-[25px]">
                    </span>
                  </button>
                )}
              {catetories?.data?.map((item: Category) => (
                <button
                  key={item.id}
                  className={`group flex items-center justify-between hover:bg-[#f9f9f9] px-2 py-1 duration-50 
                ${category === item.name && 'text-black font-[600]'}`}
                  onClick={() => setCategory(item.name)}
                >
                  {item.name}
                  <span className="invisible group-hover:visible hover:bg-[#ebebeb] duration-50 rounded-full p-1 w-[25px] h-[25px] flex items-center justify-center">
                    <LuPencil size={15} />
                  </span>
                </button>
              ))}
            </div>
          ) : 'Không tìm thấy kết quả...'}
        </section>
        <section className="mb-4 bg-white p-3 pb-4 rounded-md flex flex-col gap-3 text-[13px] shadow-sm shadow-[#d6d6d6]">
          <h3 className="text-black font-[600]">Trạng thái</h3>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-1">
              <input
                onChange={e => setStatus(e.target.value)}
                checked={status === 'all'}
                type="radio"
                name="userStatus"
                value={'all'}
              />
              Tất cả</li>
            <li className="flex items-center gap-1">
              <input
                onChange={e => setStatus(e.target.value)}
                checked={status === 'in_business'}
                type="radio"
                name="userStatus"
                value="in_business"
              />
              {STATUS_SERVICE.IN_BUSINESS}</li>
            <li className="flex items-center gap-1">
              <input
                onChange={e => setStatus(e.target.value)}
                checked={status === 'out_of_business'}
                type="radio"
                name="userStatus"
                value="out_of_business"
              />
              {STATUS_SERVICE.OUT_OF_BUSINESS}</li>
          </ul>
        </section>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="font-[600] text-2xl text-[#323232]">Dịch vụ</p>
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
              onClick={() => setShowModalAddService(true)}
              className="flex gap-2 border-none py-[6px] px-4 text-white bg-[#4bac4d] hover:bg-[#419543] rounded-sm duration-200">
              <IoMdAdd size={20} />  Thêm mới
            </button>
          </div>
        </div>
        <table className="w-full bg-white mt-3 text-[13px]">
          <thead className="bg-[#E6F4FB] border border-[#E6F4FB]">
            <tr className="text-black font-[600]">
              <td className="p-2 w-[5%]" onClick={() => handleSetCheckedAll(!checkedAll)}>
                <input type="checkbox" onChange={() => { }} checked={checkedAll} />
              </td>
              <td className="p-2 w-[15%]">Mã dịch vụ</td>
              <td className="p-2 w-[20%]">Tên dịch vụ</td>
              <td className="p-2 w-[15%]">Giá bán</td>
              <td className="p-2 w-[25%]">Mô tả</td>
              <td className="p-2 w-[20%]">Trạng thái</td>
            </tr>
          </thead>
          <tbody>
            {serviceList?.map((item: Services, index: number) => (
              <React.Fragment key={item.id}>
                <ServiceInfo
                  data={item}
                  index={index}
                  itemActive={itemActive}
                  setItemActive={setItemActive}
                  checkedItems={checkedItems}
                  setCheckedItems={handleSetCheckedItem}
                />
                <ServiceDetail
                  data={item}
                  itemActive={itemActive}
                  setShowModalUpdateService={setShowModalUpdateService}
                  refreshData={refreshData}
                />
              </React.Fragment>
            ))}
            {serviceList?.length === 0 &&
              <tr><td colSpan={6} className="p-2">Không tìm thấy dịch vụ...</td></tr>
            }
          </tbody>
        </table>
        <PaginationGlobal
          countPage={data?.data?.count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} />
      </div >
      <ModalAddAndUpdateService
        data={data?.data?.services?.find((item: UserAdmin) => item.id === itemActive)}
        showModalAddAndUpdateService={showModalUpdateService}
        setShowModalAddAndUpdateService={setShowModalUpdateService}
        refreshData={refreshData}
        serviceList={catetories?.data}
      />
      <ModalAddAndUpdateService
        showModalAddAndUpdateService={showModalAddService}
        setShowModalAddAndUpdateService={setShowModalAddService}
        refreshData={refreshData}
        serviceList={catetories?.data} />
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

export default ServicesAdmin;
