"use client";

import { useState } from "react";
import RoomCategoryPage from "./room_category/page";
import { Button } from "@mui/material";
import RoomsPage from "./rooms/page";
import AddRoomModel from "@/components/AddRoomModel"; // Kiểm tra tên file
import RoomManagerDialog from "@/components/AddRoomrCategoryModal ";

interface IProps {}
interface Page {
  title: string;
  component: React.ReactNode;
}

const pages: Page[] = [
  { title: "Hạng phòng", component: <RoomCategoryPage /> },
  { title: "Phòng", component: <RoomsPage /> },
];

const RoomManagerPage: React.FC<IProps> = () => {
  // State để theo dõi nội dung trang đang được hiển thị
  const [activePage, setActivePage] = useState<string>("Hạng phòng");

  // State cho từng modal
  const [isRoomCategoryDialogOpen, setRoomCategoryDialogOpen] = useState(false);
  const [isRoomDialogOpen, setRoomDialogOpen] = useState(false);

  // Xử lý mở/đóng modal
  const handleRoomCategoryDialogOpen = () => setRoomCategoryDialogOpen(true);
  const handleRoomCategoryDialogClose = () => setRoomCategoryDialogOpen(false);

  const handleRoomDialogOpen = () => setRoomDialogOpen(true);
  const handleRoomDialogClose = () => setRoomDialogOpen(false);

  // Hàm để thay đổi nội dung khi click vào các tab
  const handlePageChange = (pageTitle: string) => {
    setActivePage(pageTitle);
  };

  return (
    <div>
      {/* Toolbar Top */}
      <div className="toolbar-top rounded-t-md pb-2 flex items-center justify-between text-xs">
        <div className="flex items-center justify-between w-full">
          <div className="toolbar-top-room-detail flex rounded-3xl p-1 font-[600] bg-white">
            {pages.map((page) => (
              <div
                key={page.title}
                onClick={() => handlePageChange(page.title)}
                className={`toolbar-top-type_item ${
                  activePage === page.title ? "active" : ""
                }`}
              >
                {page.title}
              </div>
            ))}
          </div>
          <div className="flex gap-5">
            {activePage === "Hạng phòng" ? (
              <Button
                variant="contained"
                className="!bg-[var(--room-empty-color-)]"
                onClick={handleRoomCategoryDialogOpen}
              >
                Thêm hạng phòng
              </Button>
            ) : (
              <Button
                variant="contained"
                className="!bg-[var(--room-empty-color-)]"
                onClick={handleRoomDialogOpen}
              >
                Thêm phòng
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Nội dung thay đổi dựa trên activePage */}
      <div>{pages.find((page) => page.title === activePage)?.component}</div>

      {/* Modal cho Hạng phòng */}
      <RoomManagerDialog
        open={isRoomCategoryDialogOpen}
        onClose={handleRoomCategoryDialogClose}
      />

      {/* Modal cho Phòng */}
      <AddRoomModel open={isRoomDialogOpen} onClose={handleRoomDialogClose} />
    </div>
  );
};

export default RoomManagerPage;
