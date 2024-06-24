import { NextPage } from "next";
import React from "react";
import { SignIn } from "./_components/signInButton";
import { SignOut } from "./_components/signOutButton";

const LoginPage: NextPage = async () => {
  return (
    <main className="mx-auto min-h-screen max-w-xl p-1 pt-4">
      <div className="flex flex-col items-center">
        <div className=" justify-end">
          <SignIn />
          <SignOut />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
