// Virtual filesystem: assembly and traversal.
//
// The tree itself is a resource — see content/tree.ts. This module grafts the
// generated blog entries onto it and provides the path helpers that cd, ls,
// cat, find and the prompt all share.

import { staticTree } from "@content/tree";
import { FSDir, FSFile } from "@content/types";
import { blogPosts } from "./blog";

export type { FSDir, FSFile };

/** content/tree.ts declares blog/ with only its README; posts are added here. */
const withBlogPosts = (tree: FSDir): FSDir => {
  const blog = tree.children.blog;
  if (!blog || blog.type !== "dir") return tree;

  return {
    ...tree,
    children: {
      ...tree.children,
      blog: {
        type: "dir",
        children: {
          ...blog.children,
          ...Object.fromEntries(
            blogPosts.map(post => [
              `${post.slug}.md`,
              { type: "file", content: `blog-post:${post.slug}` } as FSFile,
            ])
          ),
        },
      },
    },
  };
};

export const filesystem: FSDir = withBlogPosts(staticTree);

/**
 * Build a raw path array from a user-supplied string, relative to cwd.
 * Absolute paths (starting with "/") are anchored at root "~".
 * Relative paths are appended to cwd.
 * Does NOT normalize — pass the result to getNodeAtPath or normalizePath.
 */
export const buildPath = (cwd: string[], input: string): string[] =>
  input.startsWith("/")
    ? ["~", ...input.slice(1).split("/")]
    : [...cwd, ...input.split("/")];

/**
 * Normalize a path array by collapsing "." (stay) and ".." (parent) segments.
 * The first element is always "~" (root) and can never be popped.
 * Examples:
 *   ["~", "blog", ".."]          → ["~"]
 *   ["~", "blog", "..", "files"] → ["~", "files"]
 *   ["~", ".."]                  → ["~"]
 */
export const normalizePath = (path: string[]): string[] => {
  const result: string[] = [];
  for (const seg of path) {
    if (seg === "" || seg === ".") continue;
    if (seg === "..") {
      if (result.length > 1) result.pop(); // never pop past "~"
    } else {
      result.push(seg);
    }
  }
  return result.length > 0 ? result : ["~"];
};

/**
 * Walk a path array (e.g. ["~", "blog", "post.md"]) and return the node,
 * or null if any segment is missing or a file is traversed as a directory.
 * Index 0 is always "~" (the root) and is skipped.
 * Normalizes ".." and "." segments before walking.
 */
export const getNodeAtPath = (
  path: string[],
  fs: FSDir
): FSFile | FSDir | null => {
  const normalized = normalizePath(path);
  let current: FSFile | FSDir = fs;
  for (let i = 1; i < normalized.length; i++) {
    if (current.type !== "dir") return null;
    const child: FSFile | FSDir | undefined = (current as FSDir).children[
      normalized[i]
    ];
    if (!child) return null;
    current = child;
  }
  return current;
};

/**
 * Resolve a `cd` target relative to `cwd`.
 * Supports absolute paths (/blog), relative paths (files), and ".." / ".".
 * Returns the new normalized path array, or null if the target is not a directory.
 */
export const resolvePath = (
  cwd: string[],
  target: string | undefined,
  fs: FSDir
): string[] | null => {
  if (!target || target === "~") return ["~"];

  const normalized = normalizePath(buildPath(cwd, target));
  const node = getNodeAtPath(normalized, fs);
  if (!node || node.type !== "dir") return null;
  return normalized;
};

/** Format a path array as a display string, e.g. ["~","blog"] → "~/blog". */
export const pathToString = (path: string[]): string => {
  if (path.length <= 1) return "~";
  return "~/" + path.slice(1).join("/");
};

/**
 * List the immediate children of a directory.
 * @param filter - if provided, return only "dir" or "file" entries.
 */
export const getDirChildren = (
  cwd: string[],
  fs: FSDir,
  filter?: "dir" | "file"
): Array<{ name: string; type: "dir" | "file" }> => {
  const node = getNodeAtPath(cwd, fs);
  if (!node || node.type !== "dir") return [];
  const entries: [string, FSFile | FSDir][] = Object.entries(
    (node as FSDir).children
  );
  return entries
    .filter(([, child]) => !filter || child.type === filter)
    .map(([name, child]) => ({ name, type: child.type as "dir" | "file" }));
};
