import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface IFileWithPreview extends File {
  preview: string;
}
interface DropAreaProps {
  imageUrls: string[];
  getRootProps: () => { ref: React.RefObject<HTMLInputElement>; style: React.CSSProperties; onClick: () => void };
  getInputProps: () => {
    ref: React.RefObject<HTMLInputElement>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  setFiles: React.Dispatch<React.SetStateAction<IFileWithPreview[]>>;
}

export const DropArea: React.FC<DropAreaProps> = ({ imageUrls, getRootProps, getInputProps }) => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState<IFileWithPreview[]>([]);

  const removeFile = (fileToRemove: IFileWithPreview) => {
    setFiles(files.filter((file) => file.name !== fileToRemove.name));
    URL.revokeObjectURL(fileToRemove.preview);
  };

  useEffect(() => {
    const newFiles = imageUrls.map((imageUrl) =>
      Object.assign(new File([""], imageUrl), {
        preview: imageUrl,
      }),
    );
    setFiles(newFiles);
  }, [imageUrls]);
  const previews = files.map((file: IFileWithPreview) => (
    <div key={file.name} className="relative">
      <img
        src={file.preview}
        alt={file.name}
        width={200}
        height={200}
        className="mb-2"
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <button
        onClick={() => removeFile(file)}
        className="absolute right-0 top-0 flex items-center justify-center rounded-full bg-red-500 p-1 text-xs text-white"
        style={{ width: "30px", height: "30px" }}
      >
        ×
      </button>
    </div>
  ));

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        {...getRootProps()}
        className="border-coral-400 w-50 h-38 mb-4 cursor-pointer items-center justify-center border p-4 text-center"
      >
        <input {...getInputProps()} ref={inputRef} />
        <p>ここにファイルをドラッグ&ドロップ</p>
        <p className="p-2">または</p>
        <button
          className="rounded bg-primary px-4 py-2 font-bold text-white hover:bg-gray-300"
          onClick={() => (inputRef.current as HTMLInputElement | null)?.click()}
        >
          ファイルを選択
        </button>
      </div>

      {files.length > 0 ? (
        <div className="w-50 mt-4">{previews}</div>
      ) : (
        <Image src="/images/noimage.png" alt="No Image Available" className="mb-4" width={400} height={400} />
      )}
    </div>
  );
};
