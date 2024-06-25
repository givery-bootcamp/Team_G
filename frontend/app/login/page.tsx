import { NextPage } from "next";
import { SignInButton } from "./_components/signInButton";
import { SignOutButton } from "./_components/signOutButton";

const LoginPage: NextPage = async () => {
  return (
    <main className="mx-auto min-h-screen max-w-xl  pt-4">
      <div className=" mx-auto max-w-xl justify-center  text-center">
        <h1 className="mb-2 text-2xl font-bold">ログイン</h1>
        <SignInButton />
        <SignOutButton />
      </div>
    </main>
  );
};

export default LoginPage;
