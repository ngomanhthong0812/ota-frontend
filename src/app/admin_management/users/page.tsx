'use client'
import UserDetail from "@/components/user/user_detail";
import UserInfo from "@/components/user/user_info";

import { useAuth } from "@/context/auth.context";
import { UserAdmin } from "@/types/backend";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { IoMdAdd } from "react-icons/io";
import { BiMenuAltLeft, BiChevronDown } from "react-icons/bi";
import { CgTrash } from "react-icons/cg";
import { toast } from "react-toastify";
import axios from "axios";
import ModalConfirm from "@/components/modal_confirm";
import { STATUS_USER } from "@/constants/constants";
import ModalAddAndUpdateUser from "@/components/user/modals/modal_add_update_user";
import PaginationGlobal from "@/components/pagination_global";

const fetcher = (url: string, token: string | null) =>
  fetch(url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
const Users = () => {
  const [itemActive, setItemActive] = useState<number | null>(null);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState<boolean>(false);
  const [showModalAddUser, setShowModalAddUser] = useState<boolean>(false);
  const [showModalConfirmDeletes, setShowModalConfirmDeletes] = useState<boolean>(false);

  const [userList, setUserList] = useState<UserAdmin[]>([]);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('active');
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 15;

  const { user, token } = useAuth();

  const { data, error, isLoading, mutate } = useSWR(
    user?.hotel_id
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/getUsersByHotelIdNotRoleAdmin` +
      `?hotel_id=${user.hotel_id}` +
      `&currentPage=${currentPage}` +
      `&pageSize=${pageSize}`
      : null,
    (url: string) => fetcher(url, token),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const { data: roles } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/roles/getRolesNotAdmin` : null,
    (url: string) => fetcher(url, token),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  useEffect(() => {
    setUserList(data?.data?.users);
  }, []);

  const refreshData = async () => {
    await mutate(); // Re-fetch lại dữ liệu
  };

  useEffect(() => {
    if (userList?.length > 0) {
      if (userList?.length === checkedItems.length) {
        setCheckedAll(true);
      } else {
        setCheckedAll(false);
      }
    }
  }, [checkedItems, userList])

  useEffect(() => {
    setItemActive(null);
    setCheckedItems([]);
    let newData: UserAdmin[] = data?.data?.users || [];
    if (newData?.length > 0) {
      if (search) {
        // lọc theo key Search
        newData = newData?.filter((user: UserAdmin) =>
          user.user_name.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
          user.code.toLowerCase().trim().includes(search.toLowerCase().trim())
        );
      }
      if (search === "") {
        setUserList(data?.data?.users);
      }

      // lọc theo trạng thái
      if (status !== "all") newData = newData.filter(user => status === user.status);

      setUserList(newData);
    }
  }, [search, status, data?.data?.users])

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
      userList.map(item => {
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
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/deleteUsers`,
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
        <section className="mb-4 bg-white p-3 pb-4 rounded-md flex flex-col gap-3 text-[13px] shadow-sm shadow-[#d6d6d6]">
          <h3 className="text-black font-[600]">Tìm kiếm</h3>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            className="outline-none border-b border-[#9d9d9d] w-[230px] py-2 focus:border-[var(--room-empty-color-)] focus:border-b-2"
            placeholder="Theo tên đăng nhập, mã nhân viên" />
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
                checked={status === 'active'}
                type="radio"
                name="userStatus"
                value="active"
              />
              {STATUS_USER.ACTIVE}</li>
            <li className="flex items-center gap-1">
              <input
                onChange={e => setStatus(e.target.value)}
                checked={status === 'inactive'}
                type="radio"
                name="userStatus"
                value="inactive"
              />
              {STATUS_USER.INACTIVE}</li>
          </ul>
        </section>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="font-[600] text-2xl text-[#323232]">Tài khoản</p>
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
              onClick={() => setShowModalAddUser(true)}
              className="flex gap-2 border-none py-[6px] px-4 text-white bg-[#4bac4d] hover:bg-[#419543] rounded-sm duration-200">
              <IoMdAdd size={20} />  Tài khoản
            </button>
          </div>
        </div>
        <table className="w-full bg-white mt-3 text-[13px]">
          <thead className="bg-[#E6F4FB] border border-[#E6F4FB]">
            <tr className="text-black font-[600]">
              <td className="p-2 w-[5%]" onClick={() => handleSetCheckedAll(!checkedAll)}>
                <input type="checkbox" onChange={() => { }} checked={checkedAll} />
              </td>
              <td className="p-2 w-[20%]">Tên đăng nhập</td>
              <td className="p-2 w-[20%]">Số điện thoại</td>
              <td className="p-2 w-[35%]">Ghi chú</td>
              <td className="p-2 w-[20%]">Trạng thái</td>
            </tr>
          </thead>
          <tbody>
            {userList?.map((item: UserAdmin, index: number) => (
              <React.Fragment key={item.id}>
                <UserInfo
                  data={item}
                  index={index}
                  itemActive={itemActive}
                  setItemActive={setItemActive}
                  checkedItems={checkedItems}
                  setCheckedItems={handleSetCheckedItem}
                />
                <UserDetail
                  data={item}
                  itemActive={itemActive}
                  setShowModalUpdateUser={setShowModalUpdateUser}
                  refreshData={refreshData}
                />
              </React.Fragment>
            ))}
            {userList?.length === 0 &&
              <tr><td colSpan={6} className="p-2">Không tìm thấy nhân viên...</td></tr>
            }
          </tbody>
        </table>
        <PaginationGlobal
          countPage={data?.data?.count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} />
      </div >
      <ModalAddAndUpdateUser
        data={data?.data?.users?.find((item: UserAdmin) => item.id === itemActive)}
        showModalAddAndUpdateUser={showModalUpdateUser}
        setShowModalAddAndUpdateUser={setShowModalUpdateUser}
        refreshData={refreshData}
      />
      <ModalAddAndUpdateUser
        showModalAddAndUpdateUser={showModalAddUser}
        setShowModalAddAndUpdateUser={setShowModalAddUser}
        refreshData={refreshData}
        roleList={roles?.data} />
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

export default Users;
