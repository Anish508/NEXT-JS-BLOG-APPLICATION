import { PostContentProps } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeletePostButton from "./delete-post";

export default function PostContent({ post, isAuthor }: PostContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          By {post.author.name} –{" "}
          {new Date(post.author.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-lg mb-6">{post.description}</p>
        <p className="text-muted-foreground text-2xl mb-6">{post.content}</p>
      </CardContent>
      {isAuthor && (
        <CardFooter>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link
                href={`/post/edit/${post.slug}`}
                className="flex items-center"
              >
                <Pencil className="h-4 w-4 mr-2" />
                <span>Edit</span>
              </Link>
            </Button>
            <DeletePostButton postId={post.id} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
