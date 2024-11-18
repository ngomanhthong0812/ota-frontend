import { ActiveEmail } from "@/app/register/page"
import {
    Dialog,
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog"
import React from "react"
import { toast } from "sonner"

interface IProps {
    resData: any,
    showModalActive: boolean,
    handleSetUnModalActive: () => void,
}

const DialogActive: React.FC<IProps> = ({ resData, showModalActive, handleSetUnModalActive }) => {
    const goToLogin = () => {
        handleSetUnModalActive();
        toast("Xác thực thành công, vui lòng đăng nhập lại");
    }
    return (
        <Dialog open={showModalActive} onOpenChange={(open) => {
            if (!open) {
                handleSetUnModalActive();
            }
        }}>
            <DialogContent>
                <DialogTitle>Thông báo kích hoạt email</DialogTitle>
                <div>
                    <ActiveEmail resData={resData}
                        goToLogin={goToLogin} />
                </div>
            </DialogContent>
        </Dialog >
    )
}
export default DialogActive;
