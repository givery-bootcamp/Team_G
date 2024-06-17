import { auth } from "@/auth";
import FeatureSection from "./_components/featureSection";
import HeroSection from "./_components/heroSection";
import { SignIn } from "./_components/signInButton";
import { SignOut } from "./_components/signOutButton";

const Home = async () => {
  const session = await auth();
  console.log("session", session);
  return (
    <main className="mx-auto min-h-screen max-w-xl p-1">
      <div className=" justify-end">
        <SignIn />
        <SignOut />
      </div>

      <HeroSection />

      <FeatureSection />
    </main>
  );
};

export default Home;
