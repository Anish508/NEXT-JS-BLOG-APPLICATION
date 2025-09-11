"use server";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { posts } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(), // safer than await headers()
    });

    if (!session || !session?.user) {
      return { success: false, message: "You must be logged in" };
    }

    // extract + validate
    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const content = (formData.get("content") as string)?.trim();

    if (!title || !description || !content) {
      return { success: false, message: "Fill all the data properly" };
    }

    const slug = slugify(title);

    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (existingPost) {
      return {
        success: false,
        message: "A Post with same title already exists",
      };
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        title,
        description,
        content,
        slug,
        authorId: session.user.id,
      })
      .returning();

    if (!newPost) {
      return { success: false, message: "Post was not created" };
    }

    // revalidate cache
    revalidatePath("/");
    revalidatePath(`/post/${slug}`);
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post created successfully",
      slug,
      data: newPost,
    };
  } catch (error) {
    console.error("Error while creating a post:", error);
    return { success: false, message: "Failed to create a post" };
  }
}
