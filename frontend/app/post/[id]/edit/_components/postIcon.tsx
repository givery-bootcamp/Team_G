"use client";
import { PostData } from "@/gen/post_pb";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PostImageProps {
  post: PostData;
}

const PostImage: React.FC<PostImageProps> = ({ post }) => {
  const [imageSrc, setImageSrc] = useState<string>(post.imageUrl || "/images/noimage.png");

  useEffect(() => {
    setImageSrc(post.imageUrl || "/images/noimage.png");
  }, [post.imageUrl]);

  const handleError = () => {
    setImageSrc("/images/noimage.png");
  };

  return <Image src={imageSrc} alt={post.title} width={400} height={400} onError={handleError} />;
};

export default PostImage;
