import { IFileWithPreview } from "@/types";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function useFileDrop() {
  const [files, setFiles] = useState<IFileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    setFiles((currentFiles) => [...currentFiles, ...mappedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return { files, getRootProps, getInputProps, setFiles };
}

export default useFileDrop;
