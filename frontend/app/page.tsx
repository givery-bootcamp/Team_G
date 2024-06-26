import { auth } from "@/auth";
import FeatureSection from "./_components/featureSection";
import HeroSection from "./_components/heroSection";
import ThreeDFBXViewer from "./_components/ThreeDFBXViewer";

const Home = async () => {
  const session = await auth();
  console.log("session", session);
  return (
    <main className="mx-auto min-h-screen max-w-xl p-1">
      <HeroSection />
      <ThreeDFBXViewer fbxFile="/test.fbx" />
      <FeatureSection />
    </main>
  );
};

export default Home;
