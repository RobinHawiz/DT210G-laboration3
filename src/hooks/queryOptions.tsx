import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { getItemById, getItems, updateItemById } from "@src/api/item";
import { queryClient } from "@src/queryClient";

export function itemUpdateMutationOptions() {
  return mutationOptions({
    mutationFn: updateItemById,
    onSuccess: (_data, item) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", item.id.toString()] });
    },
  });
}

export function itemListQueryOptions() {
  return queryOptions({
    queryKey: ["items"],
    queryFn: getItems,
    throwOnError: true,
  });
}

export function itemQueryOptions(id: string) {
  return queryOptions({
    queryKey: ["item", id],
    queryFn: ({ queryKey }) => getItemById(queryKey[1]),
    throwOnError: true,
  });
}

export function itemFormQueryOptions(id: string) {
  return queryOptions({
    queryKey: ["item", id],
    queryFn: ({ queryKey }) => getItemById(queryKey[1]),
    enabled: false,
  });
}
