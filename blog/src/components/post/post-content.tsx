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

export default function PostContent({ post, isAuthor }: PostContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          By {post.author.name}-{" "}
          {new Date().toLocaleDateString(post.author.createdAt)}
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
              <Link href={`/post/edit/${post.slug}`}>
                <Pencil className="h-4 w-4 mr-2">Edit</Pencil>
              </Link>
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
