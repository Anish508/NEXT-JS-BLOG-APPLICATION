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
      headers: await headers(),
    });

    if (!session || !session?.user) {
      return { success: false, message: "You must be logged in" };
    }

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
        message: "A post with the same title already exists",
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

export async function updatePost(formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to edit a post",
      };
    }

    const id = Number(formData.get("id"));
    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const content = (formData.get("content") as string)?.trim();

    if (!id || !title || !description || !content) {
      return { success: false, message: "Fill all the data properly" };
    }

    // fetch post
    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!existingPost) {
      return { success: false, message: "Post not found" };
    }

    if (existingPost.authorId !== session.user.id) {
      return { success: false, message: "Not authorized to edit this post" };
    }

    const slug = slugify(title);

    const [updatedPost] = await db
      .update(posts)
      .set({
        title,
        description,
        content,
        slug,
      })
      .where(eq(posts.id, id))
      .returning();

    if (!updatedPost) {
      return { success: false, message: "Post was not updated" };
    }

    // revalidate updated paths
    revalidatePath("/");
    revalidatePath(`/post/${slug}`);
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post updated successfully",
      slug,
      data: updatedPost,
    };
  } catch (error) {
    console.error("Error while updating post:", error);
    return { success: false, message: "Failed to update the post" };
  }
}

export async function deletePost(postId: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to delete a post",
      };
    }

    const postDelete = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
    });

    if (!postDelete) {
      return { success: false, message: "Post not found to delete" };
    }
    if (postDelete.authorId !== session.user.id) {
      return { success: false, message: "Not authorized to delete this post" };
    }

    await db.delete(posts).where(eq(posts.id, postId));

    revalidatePath("/");
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post deleted successfully",
    };
  } catch (error) {
    console.error("Error while deleting post:", error);
    return { success: false, message: "Failed to delete the post" };
  }
}
