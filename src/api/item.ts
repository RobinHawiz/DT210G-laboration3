import type { ItemEntity } from "@customTypes/item";
import request from "@api/request";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getItems() {
  return await request<Array<ItemEntity>>(`${API_BASE_URL}/items`);
}

export async function getItemById(id: string) {
  return await request<ItemEntity>(`${API_BASE_URL}/items/${id}`);
}
