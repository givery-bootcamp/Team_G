"use client";

import useSound from "use-sound";
import { ThreeDFBXViewer } from "./ThreeDFBXViewer";
import { useEffect } from "react";

const tracks = [{ name: "neko-meme-1", url: "/sounds/musics/neko-meme-1.mp3" }];
const models = [
  {
    name: "aoi-1",
    url: "https://dena-training-2024-team7.s3.ap-northeast-1.amazonaws.com/test.fbx",
  },
];

const CommandEffect = () => {
  const [play, { stop }] = useSound(tracks[0].url, { loop: true });

  useEffect(() => {
    play();

    return () => {
      stop();
    };
  }, [play, stop]);

  return <ThreeDFBXViewer fbxFile={models[0].url} />;
};

export { CommandEffect };
