import SelectCountry from "@/app/_components/SelectCountry.js";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm.js";
import { getGuest } from "@/app/_lib/data-service.js";
import { auth } from "@/auth.js";

export const metadata = {
  title: "profile page",
};
export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      {/* client component UpdateProfileForm */}
      <UpdateProfileForm guest={guest} >
        {/* server component `SelectCountry` */}
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
