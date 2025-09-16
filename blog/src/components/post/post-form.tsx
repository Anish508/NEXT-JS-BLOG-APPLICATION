"use client";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { createPost, updatePost } from "@/actions/post-actions"; // ✅ Add updatePost
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(255, "Title must be less than 255 characters"),

  description: z
    .string()
    .min(3, "Description must be at least 3 characters long")
    .max(255, "Description must be less than 255 characters"),

  content: z
    .string()
    .min(10, "Content must be at least 10 characters long")
    .max(600, "Content must be less than 600 characters"),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostFormProps {
  isEditing?: boolean;
  post?: {
    id: number;
    title: string;
    content: string;
    description: string;
    slug: string;
  };
}

function PostForm({ isEditing, post }: PostFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues:
      isEditing && post
        ? {
            title: post.title,
            description: post.description,
            content: post.content,
          }
        : {},
  });

  const [isPending, startTransition] = useTransition();

  const onFormSubmit = async (data: PostFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("content", data.content);

        let res;
        if (isEditing && post) {
          formData.append("id", String(post.id));
          res = await updatePost(formData);
        } else {
          res = await createPost(formData);
        }

        if (!res.success) {
          toast(res.message);
        } else {
          toast(
            isEditing
              ? "✅ Post updated successfully!"
              : "✅ Post created successfully!"
          );
          router.refresh();
          router.push("/");
        }
      } catch (error) {
        console.error("Error while submitting form:", error);
        toast("❌ Something went wrong.");
      }
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter your title"
          {...register("title")}
          disabled={isPending}
        />
        {errors?.title && (
          <p className="text-sm text-red-700">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="desc">Description</Label>
        <Textarea
          id="desc"
          placeholder="Enter your post description"
          className="resize-none"
          {...register("description")}
          disabled={isPending}
        />
        {errors?.description && (
          <p className="text-sm text-red-700">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Enter your post content"
          className="min-h-[250px] resize-none"
          {...register("content")}
          disabled={isPending}
        />
        {errors?.content && (
          <p className="text-sm text-red-700">{errors.content.message}</p>
        )}
      </div>

      <Button type="submit" className="mt-5 w-full" disabled={isPending}>
        {isPending
          ? isEditing
            ? "Updating Post..."
            : "Saving Post..."
          : isEditing
            ? "Update Post"
            : "Create Post"}
      </Button>
    </form>
  );
}

export default PostForm;
