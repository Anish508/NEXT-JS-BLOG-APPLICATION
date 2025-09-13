import { getAllPost } from "@/actions/queries";
import PostList from "@/components/post/post-list";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next-Js Blog Application",
  description: "Next-Js Blog Application",
};

export default async function Home() {
  const posts = await getAllPost();

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Blog</h1>
        {posts.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-medium">No post created yet</h2>
            <Link
              href="/post/create"
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              Create a new post
            </Link>
          </div>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </main>
  );
}
