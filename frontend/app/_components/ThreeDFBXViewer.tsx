"use client";

import { OrbitControls, useFBX } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

interface ThreeDFBXViewerProps {
  fbxFile: string;
}

const FBXModel = ({ file }: { file: string }) => {
  const fbx = useFBX(file);
  return <primitive object={fbx} scale={10.0} />;
};
const ThreeDFBXViewer: React.FC<ThreeDFBXViewerProps> = ({ fbxFile }) => {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 100], fov: 50 }}>
        <ambientLight intensity={5.0} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <FBXModel file={fbxFile} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ThreeDFBXViewer;
