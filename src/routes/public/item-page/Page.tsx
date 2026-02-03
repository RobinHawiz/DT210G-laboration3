import { useEffect } from "react";
import { useParams, type LoaderFunctionArgs } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryClient } from "@src/main";
import { itemQueryOptions } from "@hooks/queryOptions";
import useToast, { type ToastMessages } from "@hooks/useToast";
import Item from "@components/Item";

const initialMessages: ToastMessages = {
  pending: "Loading item...",
  error: "Could not load item",
  success: "Item successfully loaded",
};

const refetchMessages: ToastMessages = {
  pending: "Updating item...",
  error: "Could not update item",
  success: "Item updated successfully",
};

export function ErrorBoundary() {
  useEffect(() => {
    toast.error("Failed to load item");
  }, []);

  return <></>;
}

export function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  queryClient.ensureQueryData(itemQueryOptions(id!)).catch(() => {});
}

export function Component() {
  const { id } = useParams<{ id: string }>();
  const {
    data: item,
    promise,
    refetch,
    isRefetching,
    isFetching,
  } = useQuery(itemQueryOptions(id!));

  useToast(
    isFetching,
    isRefetching,
    promise,
    refetch,
    initialMessages,
    refetchMessages,
  );
  return (
    <>
      {(!isFetching || isRefetching) && (
        <Item
          name={item!.name}
          description={item!.description}
          price={item!.price}
          imageUrl={item!.imageUrl}
          amount={item!.amount}
        />
      )}
    </>
  );
}
