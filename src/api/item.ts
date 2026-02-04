import type { ItemEntity } from "@customTypes/item";
import request from "@api/request";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getItems() {
  return await request<Array<ItemEntity>>(`${API_BASE_URL}/items`);
}

export async function getItemById(id: string) {
  return await request<ItemEntity>(`${API_BASE_URL}/items/${id}`);
}

export async function loginUser(username: string, password: string) {
  return await request<{ token: string }>(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}

export async function validateToken(token: string) {
  return await request<{ token: string }>(`${API_BASE_URL}/auth`, {
    headers: { Authorization: "Bearer " + token },
  });
}
