import { auth, signIn } from "@/auth";

export const SignInButton = async () => {
  const session = await auth();
  console.log("session", session);
  if (session) {
    return (
      <div>
        <div>{"email : " + session.user?.email}</div>
        <div>{"name : " + session.user?.name}</div>
        ログイン中
      </div>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/post" });
      }}
    >
      <div className="flex items-center justify-center">
        <button type="submit" className="flex items-center pl-3 text-lg font-bold">
          <img src="/images/github-icon.png" alt="github" width="30" height="30" className="mr-2" />
          Sign in with GitHub
        </button>
      </div>
    </form>
  );
};
