import { queryOptions } from "@tanstack/react-query";
import { getItemById, getItems } from "@src/api/item";

export function itemListQueryOptions() {
  return queryOptions({
    queryKey: ["items"],
    queryFn: getItems,
  });
}

export function itemQueryOptions(id: string) {
  return queryOptions({
    queryKey: ["item", id],
    queryFn: ({ queryKey }) => getItemById(queryKey[1]),
  });
}
