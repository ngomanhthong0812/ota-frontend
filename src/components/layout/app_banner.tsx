const AppBanner = () => {
    return (
        <>
            <div className="bg-[#deedfa]">
                <div className="w-full flex layout-container gap-6">
                    <div className="w-[55%] py-20 mt-10">
                        <span className="text-[#114a9f] text-[36px] font-[600] leading-9">
                            Nền tảng quản trị khách sạn
                            <br />
                            thị phần số 1 Việt Nam
                        </span>
                        <p className="mt-3">Ota là công ty Việt Nam đầu tiên cung cấp giải
                            pháp phần mềm quản lý khách sạn ra nước ngoài
                            với sự có mặt ở 80 tỉnh thành phố và 5 quốc gia trên thế giới.
                        </p>
                        <button className="mt-3 border bg-[#0070f4] text-white text-[18px] duration-200 font-[500] px-4 py-[6px] rounded-full">Đăng kí dùng thử</button>
                    </div>
                    <div className="w-[45%] py-20">
                        <img src="/ezcloudhotel-da-man-hinh.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppBanner