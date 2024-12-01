import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"

interface IProps {
    showModal: boolean;
    closeModal: () => void;
    // roomDetails: { name: string; price: number }[];  // Thông tin phòng và giá
}
const UpdateCustomerInfoModal = (props: IProps) => {

    const { showModal, closeModal } = props;

    return (
        <Dialog open={showModal} onOpenChange={closeModal}>
            <DialogContent className="max-w-[1000px] overflow-auto p-0 bg-transparent border-none">

                <div className="rounded-xl">
                    <DialogTitle 
                        className="text-white font-medium text-base bg-[var(--room-empty-color-)] px-4 py-2 rounded-t-xl">
                        Sửa khách
                    </DialogTitle>

                    <div className="bg-white">
                        <div className="border-b">
                            <div className="grid grid-cols-3 p-3">
                                <div className="col-span-1 flex items-center gap-2 text-base">
                                    <svg className="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M4 9.05H3v2h1v-2Zm16 2h1v-2h-1v2ZM10 14a1 1 0 1 0 0 2v-2Zm4 2a1 1 0 1 0 0-2v2Zm-3 1a1 1 0 1 0 2 0h-2Zm2-4a1 1 0 1 0-2 0h2Zm-2-5.95a1 1 0 1 0 2 0h-2Zm2-3a1 1 0 1 0-2 0h2Zm-7 3a1 1 0 0 0 2 0H6Zm2-3a1 1 0 1 0-2 0h2Zm8 3a1 1 0 1 0 2 0h-2Zm2-3a1 1 0 1 0-2 0h2Zm-13 3h14v-2H5v2Zm14 0v12h2v-12h-2Zm0 12H5v2h14v-2Zm-14 0v-12H3v12h2Zm0 0H3a2 2 0 0 0 2 2v-2Zm14 0v2a2 2 0 0 0 2-2h-2Zm0-12h2a2 2 0 0 0-2-2v2Zm-14-2a2 2 0 0 0-2 2h2v-2Zm-1 6h16v-2H4v2ZM10 16h4v-2h-4v2Zm3 1v-4h-2v4h2Zm0-9.95v-3h-2v3h2Zm-5 0v-3H6v3h2Zm10 0v-3h-2v3h2Z"/>
                                    </svg>
                                    <p>Standard 402</p>
                                </div>

                                <div className="col-span-2 ">
                                    <div className="flex items-center gap-3">
                                        <div className="w-20 pl-2 border flex items-center rounded-md focus:border-green-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-black">
                                                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>

                                            <input type="number" className="w-full p-2 outline-none"/>
                                        </div>

                                        <div className="w-20 pl-2 border flex items-center rounded-md focus:border-green-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-black">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M14 5.73791C14 5.73791 12.8849 6.23808 12.1017 5.85651C11.1464 5.39118 10.1991 3.44619 12.0914 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.00897 9H8M16 9H15.991" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            <input type="number" className="w-full p-2 outline-none"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 p-3 gap-3">
                            <div className="col-span-1 ">
                                <div>
                                    <ul>
                                        <li className="flex items-center justify-between text-sm border hover:border-green-400 py-3 px-2 rounded-md">
                                            <div className="flex items-center gap-3">
                                                <p>Nguyễn Thị A</p>
                                            </div>

                                            <div className="flex items-center gap-1 ">
                                                

                                                <button className="bg-pink-100 rounded-full p-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-red-400">
                                                        <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>                              
                                                </button>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="mt-3">
                                        <button className="flex items-center text-sm text-green-400 font-medium gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-green-400">
                                                <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            
                                            <p>Thêm khách</p>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 ">
                                <div className="flex flex-col">
                                    <label className="text-black text-sm mb-1 font-medium">Tên khách</label>
                                    
                                    <div className="grid grid-cols-3 gap-5">
                                        <div className="col-span-2">
                                            <input type="text" id="userName" className="btn"/>
                                        </div>
                
                                        <div className="flex items-center gap-2">
                                            <button className="w-full text-white font-medium rounded-md p-2 border border-blue-500 bg-blue-500 hover:bg-white hover:text-blue-500 transition duration-200">Nam</button>
                                            <button className="w-full text-white font-medium rounded-md p-2 border border-pink-500 bg-pink-500 hover:bg-white hover:text-pink-500 transition duration-200">Nữ</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-5 mt-2">
                                    <div className="flex flex-col">
                                        <label className="text-black text-sm mb-1 font-medium">Di động</label>
                                        <input type="text" id="phone" className="btn"/>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-black text-sm mb-1 font-medium">Email</label>
                                        <input type="text" id="email" className="btn"/>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-black text-sm mb-1 font-medium">Ngày sinh</label>
                                        <input type="datetime-local" className="btn" id="date-of-birth"/>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <textarea name="note" id="note" rows={2} cols={50} className="w-full btn" placeholder="Ghi chú"></textarea>
                                </div>
                            </div>
                        </div>

                        <footer className="modal-footer p-3">
                            <div className="flex items-center justify-end gap-x-5 font-medium">
                                <button 
                                    className="w-20 p-2 text-white rounded-md bg-red-500 border hover:bg-white hover:text-red-500 hover:border-red-500 ">
                                    Đóng
                                </button>

                                <button 
                                    className="w-20 p-2 text-white rounded-md bg-blue-500">
                                    Lưu
                                </button>
                            </div>
                        </footer>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateCustomerInfoModal;