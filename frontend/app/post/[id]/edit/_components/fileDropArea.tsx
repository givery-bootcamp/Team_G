import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";

interface IFileWithPreview extends File {
  preview: string;
}

interface DropAreaProps {
  file: IFileWithPreview | undefined;
  getRootProps: () => { ref: React.RefObject<HTMLInputElement>; style: React.CSSProperties; onClick: () => void };
  getInputProps: () => {
    ref: React.RefObject<HTMLInputElement>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  setFile: (file: IFileWithPreview | undefined) => void;
}

export const DropArea: React.FC<DropAreaProps> = ({ file, getRootProps, getInputProps, setFile }) => {
  const inputRef = useRef(null);

  const removeFile = (fileToRemove: IFileWithPreview) => {
    setFile(undefined);
    URL.revokeObjectURL(fileToRemove.preview);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const fileWithPreview = Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile),
      }) as IFileWithPreview;
      setFile(fileWithPreview);
    }
  };

  const preview = (file: IFileWithPreview) => (
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
      <Button
        onClick={() => removeFile(file)}
        className="absolute right-0 top-0 flex items-center justify-center rounded-full bg-red-500 p-1 text-xs text-white"
        style={{ width: "30px", height: "30px" }}
      >
        ×
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        {...getRootProps()}
        className="border-coral-400 w-50 h-38 mb-4 cursor-pointer items-center justify-center border p-4 text-center"
      >
        <input {...getInputProps()} ref={inputRef} onChange={handleFileChange} /> {/* onChange を追加 */}
        <p>ここにファイルをドラッグ&ドロップ</p>
        <p className="p-2">または</p>
        <button
          className="rounded bg-primary px-4 py-2 font-bold text-white hover:bg-gray-300"
          onClick={() => (inputRef.current as HTMLInputElement | null)?.click()}
        >
          ファイルを選択
        </button>
      </div>

      {file != null ? (
        preview(file)
      ) : (
        <Image src="/images/noimage.png" alt="No Image Available" className="mb-4" width={400} height={400} />
      )}
    </div>
  );
};
