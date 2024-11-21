import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

const CheckOutModal = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>Thanh toán</AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắc chắn muốn thanh toán mới !</AlertDialogTitle>

                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel 
                        className="text-[#d147a3] w-28 py-1 rounded-md border border-[#d147a3] hover:bg-[#d147a3] hover:text-white duration-200">
                        Bỏ qua
                    </AlertDialogCancel>

                    <AlertDialogAction 
                        className="w-28 py-1 bg-white border border-[var(--navbar-color-)] text-[var(--navbar-color-)]  rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200">
                        Đồng ý
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>

    )
}

export default CheckOutModal;