export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  body: string;
};

const modules = import.meta.glob("../blog/*.md", {
  as: "raw",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): {
  meta: Record<string, string>;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line
      .slice(colonIdx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    meta[key] = val;
  }
  return { meta, body: match[2] };
}

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, content]) => {
    const slug = path.replace(/^.*\//, "").replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(content);
    return {
      id: 0,
      slug,
      title: meta.title ?? slug,
      date: meta.date ?? "",
      description: meta.description ?? "",
      tags: meta.tags ? meta.tags.split(",").map(t => t.trim()) : [],
      body,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((post, idx) => ({ ...post, id: idx + 1 }));
