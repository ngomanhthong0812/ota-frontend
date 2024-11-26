import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"

interface IProps {
    showModal: boolean;
    closeModal: () => void;
}
const RemoveServicesModal = (props: IProps) => {

    const {showModal, closeModal} = props;

    const handleSubmit = () => {
        closeModal();
    }

    return (
        <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent>
                <DialogTitle>Xoá dịch vụ</DialogTitle>

                <div className="flex modal-body mt-3">
                    <textarea name="note" id="note" rows={3} cols={50} className="btn" placeholder="Lý do (bắt buộc)"></textarea>
                </div>

                <footer className="modal-footer">
                    <div className="flex items-center justify-end gap-x-5 py-3 font-semibold">
                        <button 
                            className="text-[#d147a3] w-28 py-1 rounded-md border border-[#d147a3] hover:bg-[#d147a3] hover:text-white duration-200"
                            onClick={closeModal}
                            >
                            Bỏ qua
                        </button>
                        <button 
                            className="w-28 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200"
                            onClick={() => handleSubmit()}
                            >
                            Thực hiện
                        </button>
                    </div>
                </footer>
            </DialogContent>
        </Dialog>
    )
}

export default RemoveServicesModal;