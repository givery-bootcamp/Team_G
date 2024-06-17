import { auth, signOut } from "@/auth";

export async function SignOut() {
  console.log("SignOut");
  const session = await auth();
  console.log("sessiona", session);
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="pl-3 text-lg font-bold">
        Sign Out
      </button>
    </form>
  );
}
