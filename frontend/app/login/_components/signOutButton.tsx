import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export async function SignOut() {
  console.log("SignOut");
  const session = await auth();
  if (!session) {
    return;
  }

  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button type="submit" className="items-center p-4 pl-3 text-lg font-bold">
        サインアウトする
      </Button>
    </form>
  );
}
