import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
const CheckInModal = () => {
    return (
        <Dialog>
            <DialogTrigger>Trả phòng</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nhận Phòng</DialogTitle>
                </DialogHeader>

                <div>
                    <div className="flex items-center mt-3 gap-2">
                        Gửi mail cho khách

                        <input 
                            type="checkbox"
                        />
                    </div>
                </div>

                
                <DialogFooter>
                    <div className="flex items-center justify-end gap-x-10 py-3 font-medium">
                        <div className="flex items-center justify-end gap-x-5 py-3 font-semibold">
                            <button 
                                className="text-[#d147a3] w-28 py-1 rounded-md border border-[#d147a3] hover:bg-[#d147a3] hover:text-white duration-200">
                                Bỏ qua
                            </button>
                            <button 
                                className="w-28 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200">
                                Nhận Phòng
                            </button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CheckInModal;