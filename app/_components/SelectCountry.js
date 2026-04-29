import { getCountries } from '@/app/_lib/data-service';

async function SelectCountry({ defaultValue, name, id, className }) {
  const countries = await getCountries();
  const flag =
    countries.find((country) => country.name === defaultValue)?.flag ?? '';

  console.log({ defaultValue, name, id, className });

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultValue}%${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
