import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useAuth } from "@/context/auth.context";
import axios from "axios";
import { toast } from "react-toastify";

interface IProps {
    showModal: boolean;
    closeModal: () => void;
    serviceItem_id: number;
    onServiceDeleted: (id: number) => void;
}
const RemoveServicesModal = (props: IProps) => {

    const { token } = useAuth();

    const {showModal, closeModal, serviceItem_id, onServiceDeleted} = props;

    const handleDeleteService = async () => {

        if (!serviceItem_id) {
            toast.error("Không tìm thấy ID của dịch vụ cần xóa.");
            return;
        }

        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoiceItems/deleteServiceForRoom/${serviceItem_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Xóa dịch vụ thành công");
                onServiceDeleted(serviceItem_id);
            } else {
                toast.error(`Xóa dịch vụ thất bại: ${response.data?.message || "Lỗi không xác định."}`);
            }
        } catch(error) {
            console.error("Failed to create payment:", error);
            alert("Đã xảy ra lỗi khi thực hiện xoá dịch vụ.");
        } finally {
            closeModal();
        }
    }; 

    return (
        <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent
                className="rounded-xl overflow-auto p-0 bg-transparent border-none">

                <div className="rounded-xl">
                    <DialogTitle className="text-white font-[500] text-base bg-[var(--room-empty-color-)] px-4 py-2 rounded-t-xl">
                        Xoá dịch vụ
                    </DialogTitle>
                    
                    <div className="bg-white p-3">

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
                                    onClick={handleDeleteService}
                                    >
                                    Thực hiện
                                </button>
                            </div>
                        </footer>
                
                    </div>
                </div>    
            </DialogContent>
        </Dialog>
    )
}

export default RemoveServicesModal;