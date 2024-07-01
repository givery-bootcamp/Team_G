"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface PostImageProps {
  imageUrl: string;
}

const PostImage: React.FC<PostImageProps> = ({ imageUrl }) => {
  const [imageSrc, setImageSrc] = useState<string>(imageUrl || "/images/noimage.png");

  useEffect(() => {
    setImageSrc(imageUrl || "/images/noimage.png");
  }, [imageUrl]);

  const handleError = () => {
    setImageSrc("/images/noimage.png");
  };

  return (
    <Image
      src={imageSrc}
      alt="Image Thumbnail"
      className="h-48 w-full object-contain"
      width={400}
      height={400}
      onError={handleError}
    />
  );
};

export default PostImage;
