import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";

// 在 route '/cabins' 对应的 Page 内可以通过 prop 'searchParams' 读取 search param 'capacityType' 的值
// 但无法直接在 CabinList 内读取, 因为 CabinList 没有预置的 prop 'searchParams' 可以使用
export default async function CabinList({ capacityType }) {
  const cabins = await getCabins();
  let filteredCabins;
  switch (capacityType) {
    case "all":
      filteredCabins = cabins;
      break;
    case "small":
      filteredCabins = cabins.filter(
        (c) => c.maxCapacity >= 1 && c.maxCapacity <= 3,
      );
      break;
    case "medium":
      filteredCabins = cabins.filter(
        (c) => c.maxCapacity >= 4 && c.maxCapacity <= 8,
      );
      break;
    case "large":
      filteredCabins = cabins.filter(
        (c) => c.maxCapacity >= 9 && c.maxCapacity <= 12,
      );
      break;
    default:
      filteredCabins = cabins;
  }
  return (
    cabins.length > 0 && (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {filteredCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    )
  );
}
