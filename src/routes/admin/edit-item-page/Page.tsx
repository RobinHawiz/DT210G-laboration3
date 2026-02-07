import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { itemFormQueryOptions } from "@hooks/queryOptions";
import EditForm from "@routes/admin/edit-item-page/components/EditForm";
import type { ToastMessages } from "@hooks/useToast";

const messages: ToastMessages = {
  pending: "Loading edit form...",
  error: "Couldn’t load the edit form",
  success: "Edit form ready",
};

export function ErrorBoundary() {
  useEffect(() => {
    toast.error("Failed to load edit form");
  }, []);

  return <></>;
}

export function Component() {
  const { id } = useParams<{ id: string }>();
  const {
    data: item,
    promise,
    isFetching,
    isRefetching,
  } = useQuery(itemFormQueryOptions(id!));

  if (isFetching && !isRefetching) {
    toast.promise(promise, {
      pending: messages.pending,
      error: messages.error,
      success: messages.success,
    });
  }

  return item ? (
    <EditForm
      id={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
      imageUrl={item.imageUrl}
      amount={item.amount}
    />
  ) : (
    <></>
  );
}
