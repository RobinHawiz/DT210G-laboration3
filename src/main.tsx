import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "@src/main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PublicLayout from "@routes/public/Layout";
import ItemsPageLayout from "@routes/public/items-page/Layout";
import ItemPageLayout from "@routes/public/item-page/Layout";
import EditItemPageLayout from "@routes/admin/edit-item-page/Layout";
import LoginPage from "@routes/public/login-page/Page";
import NotFoundPage from "@routes/public/not-found-page/Page";
import { AuthProvider } from "@src/contexts/AuthProvider";
import ProtectedRoute from "@components/ProtectedRoute";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
      staleTime: 15000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="items" replace></Navigate>,
      },
      {
        path: "items",
        element: <ItemsPageLayout />,
        children: [
          {
            index: true,
            lazy: () => import("@routes/public/items-page/Page"),
            hydrateFallbackElement: <></>,
          },
        ],
      },
      {
        path: "items/:id",
        element: <ItemPageLayout />,
        children: [
          {
            index: true,
            lazy: () => import("@routes/public/item-page/Page"),
            hydrateFallbackElement: <></>,
          },
        ],
      },
      {
        path: "items/:id/edit",
        element: (
          <ProtectedRoute>
            <EditItemPageLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            lazy: () => import("@routes/admin/edit-item-page/Page"),
            hydrateFallbackElement: <></>,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </QueryClientProvider>
  </AuthProvider>,
);
