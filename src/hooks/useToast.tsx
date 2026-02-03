import { toast } from "react-toastify";
import { useEffect } from "react";

export type ToastMessages = {
  pending: string;
  error: string;
  success: string;
};

/**
 * Shows a toast.promise during query fetch/refetch.
 * Intended for use with `@tanstack/react-query` useQuery().
 */
function useToast(
  isFetching: boolean,
  isRefetching: boolean,
  initialPromise: Promise<unknown>,
  refetchPromise: () => Promise<unknown>,
  initialMessages: ToastMessages,
  refetchMessages: ToastMessages,
) {
  useEffect(() => {
    if (isFetching) {
      const messages = isRefetching ? refetchMessages : initialMessages;
      const promise = isRefetching ? refetchPromise : initialPromise;
      toast.promise(promise, {
        pending: messages.pending,
        error: messages.error,
        success: messages.success,
      });
    }
  }, [isFetching]);
}

export default useToast;
