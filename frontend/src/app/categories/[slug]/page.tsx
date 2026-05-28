import Link from "next/link";

async function getResources() {
  const res = await fetch("http://localhost:4000/api/resources", {
    cache: "no-store",
  });

  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const response = await getResources();
  const resources = response;

  console.log(response)

  const filteredResources = resources.filter(
    (resource: any) => resource.category.slug === params.slug
  );

  console.log(resources)
  console.log(filteredResources)

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
     <div className="mb-10">
  <p className="text-zinc-500 text-sm tracking-[0.25em] uppercase mb-2">
    Category
  </p>

  <h1 className="
    text-5xl
    md:text-6xl
    font-black
    tracking-tight
    capitalize
    text-white
  ">
    {params.slug}
  </h1>

  <div className="mt-4 h-px w-24 bg-zinc-800" />
</div>

      <div className="space-y-4">
        {filteredResources.map((resource: any) => (
          <a
            key={resource._id}
            href={resource.url}
            target="_blank"
            className="block border border-zinc-800 rounded-xl p-5 hover:border-indigo-500 transition"
          >
            <h2 className="text-2xl font-semibold">
              {resource.title}
            </h2>

            <div className="flex items-center gap-2 mt-2">
              <div className="text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>
                    {index + 1 <= Math.floor(resource.rating)
                      ? "★"
                      : "☆"}
                  </span>
                ))}
              </div>

              <span className="text-zinc-400 text-sm">
                {resource.rating}/5
              </span>
            </div>

            <p className="text-zinc-400 mt-2">
              {resource.description}
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">
              {resource.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="
px-3 py-1
rounded-full
bg-zinc-800/80
text-zinc-400
text-sm
font-medium
tracking-tight
border border-zinc-700/50
transition-colors duration-200
hover:bg-zinc-700/70
hover:text-zinc-100
hover:border-zinc-500
font-sans
"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}