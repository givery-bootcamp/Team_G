import FeatureSection from "./_components/featureSection";
import HeroSection from "./_components/heroSection";

const Home = () => {
  return (
    <main className="mx-auto min-h-screen max-w-xl p-1">
      <HeroSection />
      <FeatureSection />
    </main>
  );
};

export default Home;
