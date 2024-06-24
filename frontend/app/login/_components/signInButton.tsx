import { auth, signIn } from "@/auth";
import Image from "next/image";

export async function SignIn() {
  const session = await auth();
  console.log("session", session);
  if (session) {
    return (
      <div>
        <div>{session.user?.email}</div>
        あなたはログインしています
      </div>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        var a = await signIn("github", { re: "/post" });
        console.log("signed in", a);
      }}
    >
      <div className="flex">
        <Image src="/images/github-icon.png" alt={"github"} width={30} height={30} />
        <button type="submit" className="pl-3 text-lg font-bold">
          Sign in with GitHub
        </button>
      </div>
    </form>
  );
}
