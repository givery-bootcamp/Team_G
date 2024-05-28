import FeatureSection from "./_components/FeatureSection";
import HeroSection from "./_components/HeroSection";

const Home = () => {
  return (
    <main className="mx-auto min-h-screen max-w-xl p-1">
      <HeroSection />
      <FeatureSection />
    </main>
  );
};

export default Home;
