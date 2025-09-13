"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PostList({ posts }: { posts: any[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="hover:shadow-lg transition-shadow duration-200"
        >
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              <Link
                href={`/post/${post.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {post.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 line-clamp-3">
              {post.content || "No content available"}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              By {post.author?.name || "Unknown"} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
