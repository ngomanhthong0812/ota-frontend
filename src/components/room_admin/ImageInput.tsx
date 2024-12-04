import { useState } from "react";

interface Props {}

const ImageInput: React.FC<Props> = ({}) => {
  const [image, setImage] = useState<string | null>(null); // Lưu URL hoặc ảnh

  // Xử lý khi người dùng upload ảnh
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string); // Hiển thị ảnh
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      {/* Ô hiển thị ảnh */}
      <div className="relative w-28 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 cursor-pointer group">
        {image ? (
          <>
            <img
              src={image}
              alt="Selected"
              className="object-cover w-full h-full"
            />
            {/* Nút xóa hiển thị khi hover */}
            <button
              className="absolute top-1 w-5 h-5 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={() => setImage(null)}
            >
              X
            </button>
          </>
        ) : (
          <label
            htmlFor="fileInput"
            className="text-gray-500 text-center flex flex-col items-center"
          >
            <p>Nhấn để thêm ảnh</p>
          </label>
        )}
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
};

export default ImageInput;
