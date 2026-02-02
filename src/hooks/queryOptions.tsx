import { queryOptions } from "@tanstack/react-query";
import { getItems } from "@src/api/item";

export function itemListQueryOptions() {
  return queryOptions({
    queryKey: ["items"],
    queryFn: getItems,
  });
}
