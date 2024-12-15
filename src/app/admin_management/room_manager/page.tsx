"use client";

import { useState } from "react";
import RoomCategoryPage from "./room_category/page";
import { Button } from "@mui/material";
import RoomsPage from "./rooms/page";
import AddRoomModel from "@/components/room_admin/AddRoomModel"; // Kiểm tra tên file
import RoomManagerDialog from "@/components/room_admin/AddRoomrCategoryModal ";

interface IProps {}
interface Page {
  title: string;
  component: React.ReactNode;
}

// const pages: Page[] = [
//   { title: "Hạng phòng", component: <RoomCategoryPage /> },
//   { title: "Phòng", component: <RoomsPage /> },
// ];

const RoomManagerPage: React.FC<IProps> = () => {
  const [activePage, setActivePage] = useState<string>("Hạng phòng");
  const [isRoomCategoryDialogOpen, setRoomCategoryDialogOpen] = useState(false);
  const [isRoomDialogOpen, setRoomDialogOpen] = useState(false);
  const [reloadRooms, setReloadRooms] = useState(0); // State reload RoomsPage
  const [reloadRoomTypes, setReloadRoomTypes] = useState(0); // State reload RoomCategoryPage

  // Callback khi thêm thành công
  const handleAddRoomSuccess = () => {
    setReloadRooms((prev) => prev + 1);
  };

  const handleAddRoomCategorySuccess = () => {
    setReloadRoomTypes((prev) => prev + 1);
  };

  return (
    <div>
      {/* Toolbar Top */}
      <div className="toolbar-top rounded-t-md pb-2 flex items-center justify-between text-xs">
        <div className="flex items-center justify-between w-full">
          <div className="toolbar-top-room-detail flex rounded-3xl p-1 font-[600] bg-white">
            {["Hạng phòng", "Phòng"].map((pageTitle) => (
              <div
                key={pageTitle}
                onClick={() => setActivePage(pageTitle)}
                className={`toolbar-top-type_item ${
                  activePage === pageTitle ? "active" : ""
                }`}
              >
                {pageTitle}
              </div>
            ))}
          </div>
          <div className="flex gap-5">
            {activePage === "Hạng phòng" ? (
              <Button
                variant="contained"
                className="!bg-[var(--room-empty-color-)]"
                onClick={() => setRoomCategoryDialogOpen(true)}
              >
                Thêm hạng phòng
              </Button>
            ) : (
              <Button
                variant="contained"
                className="!bg-[var(--room-empty-color-)]"
                onClick={() => setRoomDialogOpen(true)}
              >
                Thêm phòng
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Nội dung thay đổi dựa trên activePage */}
      <div>
        {activePage === "Hạng phòng" ? (
          <RoomCategoryPage reloadTrigger={reloadRoomTypes} />
        ) : (
          <RoomsPage reloadTrigger={reloadRooms} />
        )}
      </div>

      {/* Modal cho Hạng phòng */}
      <RoomManagerDialog
        open={isRoomCategoryDialogOpen}
        onClose={() => setRoomCategoryDialogOpen(false)}
        onAddSuccess={handleAddRoomCategorySuccess}
      />

      {/* Modal cho Phòng */}
      <AddRoomModel
        open={isRoomDialogOpen}
        onClose={() => setRoomDialogOpen(false)}
        onAddSuccess={handleAddRoomSuccess}
      />
    </div>
  );
};

export default RoomManagerPage;
