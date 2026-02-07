import { mutationOptions, queryOptions } from "@tanstack/react-query";
import {
  addItemById,
  deleteItemById,
  getItemById,
  getItems,
  updateItemById,
} from "@src/api/item";
import { queryClient } from "@src/queryClient";
import type { ItemEntity } from "@customTypes/item";

export function itemAddMutationOptions() {
  return mutationOptions({
    mutationFn: addItemById,
    onSuccess: (location, item) => {
      const id = location!.replace(/[\D]/g, "");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.setQueryData(["item", id], { id: parseInt(id), ...item });
    },
  });
}

export function itemUpdateMutationOptions() {
  return mutationOptions({
    mutationFn: updateItemById,
    onSuccess: (_data, item) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", item.id.toString()] });
    },
  });
}

export function itemDeleteMutationOptions() {
  return mutationOptions({
    mutationFn: deleteItemById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
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
    initialData: () => {
      // Use an item from the 'items' query as the initial data for this item query
      return queryClient
        .getQueryData<Array<ItemEntity>>(["items"])
        ?.find((item) => item.id.toString() === id);
    },
  });
}

export function itemFormQueryOptions(id: string) {
  return queryOptions({
    queryKey: ["item", id],
    queryFn: ({ queryKey }) => getItemById(queryKey[1]),
  });
}
