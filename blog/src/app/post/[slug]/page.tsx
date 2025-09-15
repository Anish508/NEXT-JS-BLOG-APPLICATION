import { getPostsBySlug } from "@/actions/queries";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import PostContent from "@/components/post/post-content";

export default async function PostDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params; // no await needed

  const post = await getPostsBySlug(slug);

  const session = await auth.api.getSession({
    headers: await headers(), // headers() is already sync
  });

  if (!post) {
    notFound();
  }

  const isAuthor = session?.user?.id === post.authorId;

  return (
    <main className="py-10">
      <div className="max-w-4xl mx-auto">
        <PostContent post={post} isAuthor={isAuthor} />
      </div>
    </main>
  );
}
