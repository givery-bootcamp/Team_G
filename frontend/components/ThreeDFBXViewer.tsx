"use client";

import { OrbitControls, useFBX } from "@react-three/drei";
import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import { useRef } from "react";

interface ThreeDFBXViewerProps {
  fbxFile: string;
}

const FBXModel = ({ file }: { file: string }) => {
  const fbx = useFBX(file);
  const ref = useRef<ThreeElements["primitive"]>();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.025; // Adjust the rotation speed as needed
    }
  });

  return <primitive ref={ref} object={fbx} scale={20} />;
};

const ThreeDFBXViewer: React.FC<ThreeDFBXViewerProps> = ({ fbxFile }) => {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas camera={{ position: [0, 50, 60], fov: 50 }}>
        <ambientLight intensity={5.0} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <FBXModel file={fbxFile} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export { ThreeDFBXViewer };
