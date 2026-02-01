import delay from "@utils/delay";

async function request<T = void>(url: string, options: RequestInit = {}) {
  // Simulate network delay
  await delay(700);
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Failed request");
  }

  if (response.status === 200) {
    return (await response.json()) as T;
  }

  if (response.status === 201) {
    return response.headers.get("Location") as T;
  }

  return undefined;
}

export default request;
