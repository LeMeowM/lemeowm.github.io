// Blog posts are loaded automatically from src/blog/*.md at build time via
// Vite's import.meta.glob. To add a post, create a new .md file there with
// the frontmatter below — no other code changes are required.
//
// Required frontmatter:
//   ---
//   title: "Post title"
//   date: "YYYY-MM-DD"
//   description: "One-line summary shown in the blog listing"
//   tags: "comma, separated, tags"
//   ---
//
// To embed a hosted source file inside a post, use a code fence with a src= meta:
//   ```python src=/files/lakectf-2025/chall.py
//   ```
// The FileEmbed component in BlogPost.tsx will fetch and render it with a download link.

export type BlogPost = {
  id: number;
  /** Filename without extension, used as the URL/filesystem slug. */
  slug: string;
  title: string;
  /** ISO date string "YYYY-MM-DD", used for sorting (newest first). */
  date: string;
  description: string;
  tags: string[];
  /** Raw markdown body (everything after the closing ---). */
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
