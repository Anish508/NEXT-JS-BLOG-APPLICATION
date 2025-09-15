// actions/queries.ts (or wherever getAllPost is)
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import type { Post } from "@/types";

export async function getAllPost(): Promise<Post[]> {
  try {
    const rows = await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
      with: { author: true },
    });

    return (rows ?? []).map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
      author: r.author
        ? {
            ...r.author,
            createdAt: r.author.createdAt.toISOString(),
            updatedAt: r.author.updatedAt.toISOString(),
          }
        : null,
    }));
  } catch (error) {
    console.error("Error while getting all posts:", error);
    return [];
  }
}

export async function getPostsBySlug(slug: string) {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
      with: {
        author: true,
      },
    });
    return post;
  } catch (error) {
    console.log("Error while fetching post detail:", error);
    return null;
  }
}
