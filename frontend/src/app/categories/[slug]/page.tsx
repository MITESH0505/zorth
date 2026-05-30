/**
 * app/categories/[slug]/page.tsx
 *
 * Changes from original:
 *   1. Page stays a server component — data fetching is unchanged.
 *   2. Resource card rendering + search is delegated to `CategoryResourceList`
 *      (a new "use client" component in the same folder).
 *   3. The server pre-filters by slug exactly as before and passes the result
 *      down as a plain prop — no new API routes or DB calls.
 *   4. The `Link` import is removed because it is no longer used in this file.
 *
 * All existing card design, dark theme, and Tailwind classes are preserved.
 */

// CategoryResourceList handles "use client" + all search logic

import CategoryResourceList from "@/components/CategoryResourceList";
// ─── Data fetching ─────────────────────────────────────────────────────────────

async function getResources() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources`, {
    cache: "no-store",
  });

  return res.json();
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const response = await getResources();
  const resources = response;

  // Server-side slug filter — identical logic to the original page.tsx
  const filteredResources = resources.filter(
    (resource: any) => resource.category.slug === params.slug
  );

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      {/* ── Category header — unchanged from original ── */}
      <div className="mb-10">
        <p className="text-zinc-500 text-sm tracking-[0.25em] uppercase mb-2">
          Category
        </p>

        <h1
          className="
            text-5xl
            md:text-6xl
            font-black
            tracking-tight
            capitalize
            text-white
          "
        >
          {params.slug.replace(/-/g, " ")}
        </h1>

        <div className="mt-4 h-px w-24 bg-zinc-800" />
      </div>

      {/*
       * ── Search + resource list ──
       *
       * `CategoryResourceList` is a client component that receives the
       * already-fetched, already-slug-filtered resources as a prop.
       * It owns the search state, debounce, and Framer Motion animations.
       * No additional network requests happen on the client.
       */}
      <CategoryResourceList
        resources={filteredResources}
        slug={params.slug}
      />
    </main>
  );
}
