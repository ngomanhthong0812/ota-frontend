'use client'
import { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { IoBan } from "react-icons/io5";
import { ClipLoader } from "react-spinners";


interface IProps {
    title: string;
    content: string;
    showModalConfirm: boolean;
    setShowModalConfirm: (b: boolean) => void;
    handleSubmit: () => void;
}

const ModalConfirm: React.FC<IProps> = ({ title, content, showModalConfirm, setShowModalConfirm, handleSubmit }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (showModalConfirm) window.scrollTo(0, 0);
        if (!showModalConfirm) setIsLoading(false);
    }, [showModalConfirm])


    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Ngừng sự kiện lan truyền khi click vào các phần tử con của modal
    };

    const submit = () => {
        setIsLoading(true);
        handleSubmit();
    }

    return (
        <div>
            {showModalConfirm && (
                <div
                    className={`absolute w-full top-0 left-0 min-h-[100%] bg-black bg-opacity-50 flex justify-center items-start z-50 duration-200`}
                    onClick={() => setShowModalConfirm(false)}
                >
                    <div
                        onClick={handleModalClick}
                        className="flex flex-col rounded-md w-auto bg-white mt-[50px] relative p-5">
                        <div className="flex flex-col">
                            <h1 className="mb-5">
                                <span className="text-black text-[15px] font-[600]">{title}</span>
                            </h1>
                            <p
                                className="text-[#313131] max-w-[440px] leading-6"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                        <footer className="modal-footer mt-10 text-[13px]">
                            <div className="flex items-center justify-end gap-3 font-[500]">
                                <button
                                    onClick={submit}
                                    className="flex gap-2 border-none py-[6px] px-4 text-white bg-[#4bac4d] hover:bg-[#419543] rounded-sm duration-200">
                                    <BiSave size={20} /> Đồng ý
                                </button>
                                <button
                                    onClick={() => setShowModalConfirm(false)}
                                    className="flex gap-2 border-none py-[6px] px-4 text-white bg-[#898c8d] hover:bg-[#787b7d] rounded-sm duration-200">
                                    <IoBan size={20} /> Bỏ qua
                                </button>
                            </div>
                        </footer>
                    </div>
                </div >
            )}
            {isLoading
                && <div className="fixed z-[999] bg-black bg-opacity-45 top-0 left-0 w-full h-full flex items-center justify-center">
                    <ClipLoader size={50} color="fffff" />
                </div>
            }
        </div >
    )
}

export default ModalConfirm;