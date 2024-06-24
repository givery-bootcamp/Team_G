import Image from "next/image";

interface IFileWithPreview extends File {
  preview: string;
}
interface DropAreaProps {
  imageUrl: string;
  files: IFileWithPreview[];
  getRootProps: () => { ref: React.RefObject<HTMLInputElement>; style: React.CSSProperties; onClick: () => void };
  getInputProps: () => { ref: React.RefObject<HTMLInputElement> };
  setFiles: React.Dispatch<React.SetStateAction<IFileWithPreview[]>>;
}

export const DropArea: React.FC<DropAreaProps> = ({ imageUrl, files, getRootProps, getInputProps, setFiles }) => {
  var removeFileName = "";
  const removeFile = (fileToRemove: IFileWithPreview) => {
    removeFileName = fileToRemove.name;
    setFiles(files.filter((file) => file.name !== fileToRemove.name));
    URL.revokeObjectURL(fileToRemove.preview);
  };
  if (imageUrl.length > 0 && removeFileName != imageUrl) {
    if (files.filter((file) => file.name == imageUrl).length == 0) {
      const file = new File([], imageUrl) as IFileWithPreview;
      file.preview = imageUrl;
      files.push(file);
    }
  }
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
        <input {...getInputProps()} id="dropzone-input" />
        <p>ここにファイルをドラッグ&ドロップ</p>
        <p className="p-2">または</p>
        <button
          className="rounded bg-primary px-4 py-2 font-bold text-white hover:bg-gray-300"
          onClick={() => document.getElementById("dropzone-input")!.click()}
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
