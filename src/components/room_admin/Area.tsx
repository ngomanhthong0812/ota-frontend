import { NextPage } from "next";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { callApi } from "@/utils/api";
import AddAreaPopUp from "./AddAreaPopup";
import UpdateAreaPopUp from "./UpdateAreaPopup";

interface IProps {}

const AreaComponent: React.FC<IProps> = ({}) => {
  const [openAreaPopup, setOpenAreaPopup] = useState(false);
  const [floors, setFloors] = useState<
    | {
        id: number;
        name: string;
        level: number;
        note: string;
        room_count: number;
      }[]
    | null
  >(null);
  const [selectedFloorId, setSelectedFloorId] = useState<number | null>(null);
  const [popupType, setPopupType] = useState<"add" | "update" | null>(null); // State để xác định loại popup đang mở

  // Mở popup Add
  const handleOpenAreaPopup = () => {
    setPopupType("add");
    setOpenAreaPopup(true); // Mở AddAreaPopUp
  };

  // Mở popup Update và set ID của tầng
  const handleOpenAreaPopupUpdate = (floorId: number) => {
    setPopupType("update");
    setSelectedFloorId(floorId); // Set ID của tầng để truyền vào UpdateAreaPopUp
    setOpenAreaPopup(true); // Mở UpdateAreaPopUp
  };

  const handleCloseAreaPopup = () => {
    setOpenAreaPopup(false); // Đóng popup
    setPopupType(null); // Reset loại popup khi đóng
  };

  const getApiFloor = async () => {
    const response = await callApi<any>(
      "/api/floor/all", // Endpoint của API
      "GET"
    );
    setFloors(response.data.data); // Lưu dữ liệu tầng vào state
  };

  useEffect(() => {
    getApiFloor();
  }, []);
  const handleUpdateSuccess = () => {
    getApiFloor();
  };
  return (
    <div className="flex w-1/5 h-44 flex-col bg-white cash-fund_content border !border-[var(--ht-neutral-100-)] rounded-md p-3">
      <div className="flex justify-between items-center border-b">
        <span className="font-semibold">Khu vực</span>
        <button
          onClick={handleOpenAreaPopup}
          className="text-lg font-bold  hover:bg-slate-100 rounded-full flex justify-center items-center text-center"
        >
          <FaPlus className="fill-lime-700 m-2" size={15} />
        </button>
      </div>
      <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
        <ul>
          {floors && floors.length > 0 ? (
            floors.map((floor) => (
              <li
                key={floor.id}
                className="flex justify-between group border-b p-1"
              >
                <span>{floor.name}</span>
                <span
                  className="hidden group-hover:block"
                  onClick={() => handleOpenAreaPopupUpdate(floor.id)} // Khi nhấn vào bút, mở UpdateAreaPopUp và truyền ID
                >
                  <FaPencilAlt />
                </span>
              </li>
            ))
          ) : (
            <li>No floors available</li>
          )}
        </ul>
      </div>
      {popupType === "add" && (
        <AddAreaPopUp open={openAreaPopup} onClose={handleCloseAreaPopup} handleUpdateSuccess={handleUpdateSuccess} />
      )}
      {popupType === "update" && selectedFloorId && (
        <UpdateAreaPopUp
          open={openAreaPopup}
          onClose={handleCloseAreaPopup}
          idAre={selectedFloorId} // Truyền ID của tầng vào UpdateAreaPopUp
          handleUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default AreaComponent;
