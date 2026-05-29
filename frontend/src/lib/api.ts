
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

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
