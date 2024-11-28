
const BookingHeader = () => {
  return (
    <div className="toolbar-top bg-white rounded-md p-2 flex justify-center text-xs border border-[var(--ht-neutral-100-)]">
    <div className="flex">
        <div className="toolbar-top-type bg-[var(--ht-body-bg-)] flex rounded-3xl p-1 font-[600]">
            <button className="toolbar-top-type_item active">
                Phòng trống
            </button>
            <button className="toolbar-top-type_item">
                Thông tin
            </button>
        </div>
    </div>
</div>
  )
}

export default BookingHeader;