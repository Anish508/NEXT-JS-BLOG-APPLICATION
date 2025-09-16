import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { getPostsBySlug } from "@/actions/queries";
import Container from "@/components/layout/conatiner";
import PostForm from "@/components/post/post-form";

export default async function EditPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/");
  }

  const post = await getPostsBySlug(slug);

  if (!post) {
    notFound();
  }

  if (post.authorId !== session.user.id) {
    redirect("/");
  }

  return (
    <Container>
      <h1 className="max-w-2xl font-bold mb-6 mt-10 text-4xl text-center">
        Edit Post
      </h1>
      <PostForm
        isEditing
        post={{
          id: post.id,
          title: post.title,
          content: post.content,
          description: post.description,
          slug: post.slug,
        }}
      />
    </Container>
  );
}
