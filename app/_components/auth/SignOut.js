import { signOut } from "@/auth.js";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut("google");
      }}
    >
      <button
        type="submit"
        className="bg-accent-700 px-5 py-3 rounded-2xl text-accent-100 hover:cursor-pointer active:bg-accent-800 active:text-accent-200"
      >
        Signout with Google
      </button>
    </form>
  );
}
