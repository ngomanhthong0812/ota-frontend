import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"

interface IProps {
    isOpen: boolean;
    onClose: () => void; 
}
const AddServicesModal = (props: IProps) => {
    const {isOpen, onClose} = props;
    
    
    return (
        <Dialog 
            open={isOpen} onOpenChange={onClose}
        >
            <DialogContent
                className="max-w-4xl w-full h-auto p-6 bg-white rounded-lg shadow-lg"
            >
                <header className="flex items-center py-2 modal-header">
                    <div className="w-1/2">
                        <DialogTitle>Thêm dịch vụ</DialogTitle>
                    </div>

                    <div className="w-1/2">
                        <div className="flex items-center gap-2 p-1 border rounded-xl">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                            </svg>

                            <input type="text" className="w-full outline-none " placeholder="Tìm kiếm dịch vụ"/>
                        </div>
                    </div>
                </header>
                
                <div className="flex modal-body">
                    <div className="w-2/3"> 
                        <div className=" flex items-center py-2 gap-5 border-t border-b nav-tab text-black text-base">
                            <input type="radio" id="tab1" name="tab" className="hidden peer/tab1"/>
                            <label className="peer-checked/tab1:bg-white relative px-3 font-medium duration-200 hover:text-[var(--navbar-color-)]">
                                Minibar
                            </label>

                            <button className="relative px-3 font-medium duration-200 hover:text-[var(--navbar-color-)]">Giặt là</button>
                            <button className="relative px-3 font-medium duration-200 hover:text-[var(--navbar-color-)]">Đền bù</button>
                            <button className="relative px-3 font-medium duration-200 hover:text-[var(--navbar-color-)]">Dịch vụ mở rộng</button>
                        </div>

                        <div className="flex h-auto py-2 text-sm">
                            <div className="w-1/4 ">
                                <ul >
                                    <li className="flex items-center justify-between  px-4 py-3 bg-white w-full hover:bg-[var(--room-empty-color-)] hover:text-white duration-200 cursor-pointer">
                                        Đồ uống
                                        
                                        <svg className="w-[20px] h-[20px] bg-white] text-[var(--navbar-color-)] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                                        </svg>
        
                                    </li>

                                    <li className="flex items-center justify-between  px-4 py-3 bg-white w-full hover:bg-[var(--room-empty-color-)] hover:text-white duration-200 cursor-pointer">
                                        Đồ uống
                                        
                                        <svg className="w-[20px] h-[20px] bg-white] text-[var(--navbar-color-)] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                                        </svg>
        
                                    </li>

                                    <li className="flex items-center justify-between  px-4 py-3 bg-white w-full hover:bg-[var(--room-empty-color-)] hover:text-white duration-200 cursor-pointer">
                                        Đồ uống
                                        
                                        <svg className="w-[20px] h-[20px] bg-white] text-[var(--navbar-color-)] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                                        </svg>
        
                                    </li>
                                </ul>
                            </div>
                        
                            <div className="w-3/4 overflow-y-scroll border-l h-72 scrollbar-custom">
                                <ul className="">
                                    <li className="flex items-center justify-between px-4 py-3 border-b cursor-pointer">
                                        <p className="name-service">Pepsi</p>
                                        <input type="text" className="name-price p-2 outline-none border focus:border-green-400 rounded-md text-end" value="300"></input>    
                                    </li>
                                    
                                    <li className="flex items-center justify-between px-4 py-3 border-b cursor-pointer">
                                        <p className="name-service">Pepsi</p>
                                        
                                        <input type="text" className="name-price p-2 outline-none border focus:border-green-400 rounded-md text-end" value="300"></input>    
                                    </li>
                                    
                                    <li className="flex items-center justify-between px-4 py-3 border-b cursor-pointer">
                                        <p className="name-service">Pepsi</p>
                                        
                                        <input type="text" className="name-price p-2 outline-none border focus:border-green-400 rounded-md text-end" value="300"></input>    
                                    </li>
                                    
                                    <li className="flex items-center justify-between px-4 py-3 border-b cursor-pointer">
                                        <p className="name-service">Pepsi</p>
                                        
                                        <input type="text" className="name-price p-2 outline-none border focus:border-green-400 rounded-md text-end" value="300"></input>    
                                    </li>
                                    
                                    <li className="flex items-center justify-between px-4 py-3 border-b cursor-pointer">
                                        <p className="name-service">Pepsi</p>
                                        
                                        <input type="text" className="name-price p-2 outline-none border focus:border-green-400 rounded-md text-end" value="300"></input>    
                                    </li>
                                    

                                    <li className="flex items-center justify-between px-4 py-3 border-b cursor-pointer">
                                        <p className="name-service">Pepsi</p>
                                        
                                        <input type="text" className="name-price p-2 outline-none border focus:border-green-400 rounded-md text-end" value="300"></input>    
                                    </li>

                                    <li className="flex items-center justify-between px-4 py-3 border-b cursor-pointer">
                                        <p className="name-service">Pepsi</p>
                                        
                                        <input type="text" className="name-price p-2 outline-none border focus:border-green-400 rounded-md text-end" value="300"></input>    
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/3 border-t border-l">
                        <div className="px-3 py-2 font-medium text-black text-base border-b">
                            <p>Chi tiết hoá đơn</p>
                        </div>

                        <div className="h-72 px-3 py-2 text-sm">
                            {/* <div className="flex hidden h-full items-center justify-center">
                                <p>Chua co dich vu duoc them</p>
                            </div>  */}

                            <ul className=""> 
                                <li className="flex  font-medium items-center justify-between">
                                    <p>Room key/ The khoa phong</p>
                                    <div className="flex items-center border border-gray-300 rounded">
                                        <button className="bg-gray-200 text-gray-700 w-5 h-5 flex justify-center items-center focus:outline-none hover:bg-gray-300">
                                        -
                                        </button>
                                        <input type="text" value="1" className="w-8 text-center border-l border-r border-gray-300 focus:outline-none" />
                                        <button className="bg-gray-200 text-gray-700 w-5 h-5 flex justify-center items-center focus:outline-none hover:bg-gray-300">
                                        +
                                        </button>
                                    </div>
                                    <p>100.000</p>
                                </li>
                            </ul>
                        </div>

                        <div className="w-full px-3 ">
                            <div className="flex items-center justify-between mb-2 font-medium text-black">
                                <p>Tổng tiền</p>
                                
                                <p>0</p>
                            </div>

                            <div className="">
                                <button className="group flex items-center justify-center w-full gap-2 bg-white py-1 border border-[var(--navbar-color-)] text-[var(--navbar-color-)] font-semibold rounded-md hover:bg-[var(--navbar-color-)] hover:text-white duration-200">
                                    <svg className="w-[20px] h-[20px] text-[var(--navbar-color-)] group-hover:text-white duration-200 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                                    </svg>

                                    <p>Thêm vào phòng</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddServicesModal;