import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"

  interface IProps {
    showModal: boolean;
    closeModal: () => void;

}
const CheckOutModal = (props: IProps) => {

    const {showModal, closeModal} = props;

    const handleCheckOut = () => {
        closeModal();
    }
    return (
        <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent>
                <DialogTitle>Bạn có chắc chắn muốn thanh toán mới !</DialogTitle>
                <footer className="modal-footer">
                    <div className="flex items-center justify-end gap-x-5 py-3 font-semibold">
                        <button 
                            className="text-[#d147a3] w-24 py-1 rounded-md border border-[#d147a3] hover:bg-[#d147a3] hover:text-white duration-200"
                            onClick={handleCheckOut}
                        >
                            Đóng
                        </button>
                        <button 
                            className="w-24 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200"
                            onClick={handleCheckOut}
                        >
                            Lưu
                        </button>
                    </div>
                </footer>
            </DialogContent>
        </Dialog>
    )
}

export default CheckOutModal;