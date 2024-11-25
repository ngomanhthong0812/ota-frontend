import { usePathname } from "next/navigation";
import Link from "next/link";

const NavigationTabs = ({ id }: { id: number }) => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  const handleClick = (link: string) => {
    // Nếu người dùng đang ở trang đã bấm thì không điều hướng lại
    if (pathname === link) {
      // Nếu đang ở trang chi tiết phòng và bấm vào "Phòng" thì không điều hướng
      // Nếu đang ở trang thanh toán và bấm vào "Thanh toán" thì không điều hướng
      return;
    }
  };

  return (
    <div className="toolbar-top rounded-t-md pb-2 flex items-center justify-between text-xs">
      <div className="flex flex-col gap-3">
        <div className="flex toolbar-top-room-detail">
          <div className="flex rounded-3xl p-1 font-[600] bg-white">
            <Link
              className={`toolbar-top-type_item ${pathname.includes(`/hotel_management/room/room_details/${id}`) ? 'active' : ''}`}
              href={`/hotel_management/room/room_details/${id}`}
              onClick={() => handleClick(`/hotel_management/room/room_details/${id}`)} // Đảm bảo không điều hướng lại khi đang ở trang chi tiết phòng
            >
              Phòng
            </Link>

            <Link
              className={`toolbar-top-type_item ${pathname.includes(`/hotel_management/room/room_invoice/${id}`) ? 'active' : ''}`}
              href={`/hotel_management/room/room_invoice/${id}`}
              onClick={() => handleClick(`/hotel_management/room/room_invoice/${id}`)} // Đảm bảo không điều hướng lại khi đang ở trang thanh toán
            >
              Thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;