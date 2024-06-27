"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useActionState, useRef } from "react";

const uploadFile = async (prevState: string | null, formData: FormData) => {
  console.log({formData});
  if (!formData.get("file")) {
    return prevState;
  }

  try {
    const response = await fetch("/api/thumbnail/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);

    return data.imageUrl;
  } catch (error) {
    console.error(error);
  }
};

const Form = () => {
  const [imagePath, upload, isPending] = useActionState(uploadFile, null);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <form action={upload} className="flex flex-col space-y-4">
      <Input type="file" name="file" ref={fileRef} />
      <Button type="submit" disabled={isPending}>
        Upload
      </Button>
      {imagePath && <Image src={imagePath} alt="thumbnail" width={100} height={100} />}
    </form>
  );
};

export default Form;
