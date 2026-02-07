import { mutationOptions, queryOptions } from "@tanstack/react-query";
import {
  addItemById,
  deleteItemById,
  getItemById,
  getItems,
  updateItemById,
} from "@src/api/item";
import { queryClient } from "@src/queryClient";

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
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", id.toString()] });
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
