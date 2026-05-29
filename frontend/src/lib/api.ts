// const API_URL = "http://localhost:4000/api";
const API_URL = `$ {import.meta.env.VITE_API_URL}/api`;

export async function getCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`);

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
