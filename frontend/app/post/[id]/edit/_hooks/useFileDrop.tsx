import { IFileWithPreview } from "@/types";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const useFileDrop = () => {
  const [file, setFile] = useState<IFileWithPreview>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    setFile(mappedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return { file, getRootProps, getInputProps, setFile };
};

export default useFileDrop;
