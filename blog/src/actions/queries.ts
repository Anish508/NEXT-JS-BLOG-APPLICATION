"use server";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function getAllPost(): Promise<Post[]> {
  try {
    const getAllPosts = await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
      with: {
        author: true,
      },
    });
    return getAllPosts ?? [];
  } catch (error) {
    console.log("Error while getting all posts:", error);
    return [];
  }
}
