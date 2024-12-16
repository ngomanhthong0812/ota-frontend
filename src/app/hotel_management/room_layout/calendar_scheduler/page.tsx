"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import "@bitnoi.se/react-scheduler/dist/style.css";
import { callApi } from "@/utils/api";
import { useAuth } from "@/context/auth.context";
import enDayjsTranslations from "dayjs/locale/en";
import InusedRoomPopup from "@/components/room/inused_room_popup";

dayjs.extend(isBetween); // Kích hoạt plugin isBetween

interface Props {}

// Định nghĩa interface cho sự kiện trong lịch
interface Event {
  id: string;
  room_id: number;
  booking_id: number;
  invoice_id: number;
  startDate: Date;
  endDate: Date;
  occupancy: number;
  title: string;
  subtitle: string;
  description: string;
  bgColor: string;
  status: string;
}

// Định nghĩa interface cho dữ liệu của Scheduler
interface SchedulerData {
  id: string;
  label: {
    icon: string;
    title: string;
    subtitle: string;
    category: string;
  };
  data: Event[];
}

type LocaleType = {
  id: string;
  lang: {
    feelingEmpty: string;
    free: string;
    loadNext: string;
    loadPrevious: string;
    over: string;
    taken: string;
    topbar: {
      filters: string;
      next: string;
      prev: string;
      today: string;
      view: string;
    };
    search: string;
    week: string;
  };
  translateCode: string;
  dayjsTranslations: any;
};

const langs: LocaleType[] = [
  {
    id: "vi",
    lang: {
      feelingEmpty: "Tôi không tìm thấy dữ liệu của bạn...",
      free: "Miễn phí",
      loadNext: "Tiếp theo",
      loadPrevious: "Trước",
      over: "quá",
      taken: "Đã đặt",
      topbar: {
        filters: "Lọc",
        next: "tiếp theo",
        prev: "trước",
        today: "Hôm nay",
        view: "Xem",
      },
      search: "tìm kiếm",
      week: "tuần",
    },
    translateCode: "vi-VN",
    dayjsTranslations: dayjs.locale("vi"), // Đảm bảo Day.js sử dụng tiếng Việt
  },
];

const CalendarSchedulerPage: NextPage<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<SchedulerData[]>([]); // State để lưu trữ dữ liệu đã lọc

  const { user } = useAuth();
  const hotelId = user?.hotel_id;

  // Đọc API
  useEffect(() => {
    const callApiData = async () => {
      try {
        const response = await callApi<any>(
          `/api/room/calendar/roombookings/${hotelId}`,
          "GET"
        );
        if (response.data?.statusCode === 200) {
          console.log("data gọi api canlendar:", response.data?.data);

          setResponseData(response.data?.data || []);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (hotelId) {
      callApiData();
    }
  }, [hotelId]);

  return (
    <div className="relative h-[90vh] w-full">
      <Scheduler
        isLoading={isLoading}
        data={responseData}
        onItemClick={(clickedItem) =>
          alert(`Đặt phòng nhanh ${clickedItem.id}`)
        }
        onTileClick={(clickedResource) => {
          const resource = clickedResource as Event;
          alert(`Invoice ID: ${resource.invoice_id}`);
        }}
        config={{
          zoom: 1,
          maxRecordsPerPage: 20,
          filterButtonState: -1,
          lang: "vi",
          translations: langs,
        }}
      />
    </div>
  );
};

export default CalendarSchedulerPage;
