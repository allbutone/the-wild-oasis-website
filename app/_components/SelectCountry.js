import { getCountries } from "@/app/_lib/data-service";

async function SelectCountry({ defaultValue, name, id, className }) {
  const countries = await getCountries();
  const flag =
    countries.find((country) => country.name === defaultValue)?.flag ?? "";

  console.log({ defaultValue, name, id, className });

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value
      // Then we split them up again later in the server action
      defaultValue={`${defaultValue}%${flag}`}
      // react 对 select 有特殊处理:
      // - 在 mount 时: react 会使用 defaultValue 重置 select
      // - 在 rerender 时: react 会忽略 select 的 defaultValue, 也就不会根据 latest defaultValue 重置 select
      //
      // 为此, 需要额外为 select 添加 prop 'key' (值和 defaultValue 相同), 这样:
      // 只要 defaultValue 变化, key 也跟着变, react 会再次 mount select, 此时 react 会使用 latest defaultValue 重置 select
      key={`${defaultValue}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
