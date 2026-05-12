import { auth } from "@/auth.js";

export const metadata = {
  title: "account",
};
async function AccountHome() {
  const session = await auth();
  const firstName = session.user.name.split(" ").at(0);
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
}
export default async function Page() {
  return <AccountHome />;
}
