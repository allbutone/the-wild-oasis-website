import SelectCountry from "@/app/_components/SelectCountry";
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
      {/* <UpdateProfileForm guest={guest} > */}
      {/* 上行会出现问题: 修改 nationality 和 nationalID 并提交表单后
      界面 nationality 没有维持指定的值, 而是回退到 defaultValue */}
      {/* 添加 prop 'key' 如下即可解决问题, 但不知道为什么, 问了一圈 AI, 解释的没有一个满意的 */}
      <UpdateProfileForm guest={guest} key={guest.nationality}>
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
