"use client";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { createPost } from "@/actions/post-actions";
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

type postFormValues = z.infer<typeof postSchema>;

function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onFormSubmit = async (data: postFormValues) => {
    console.log("Form data:", data);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("content", data.content);

        const res = await createPost(formData);

        console.log("Result:", res);

        if (!res.success) {
          // Show error feedback to user
          alert(res.message);
        } else {
          // Redirect or show success message
          alert("✅ Post created successfully!");
        }
      } catch (error) {
        console.error("Error while sending form:", error);
        alert("Something went wrong while submitting the form.");
      }
    });
  };
  return (
    <form action="" className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter your title"
          {...register("title")}
          disabled={isPending}
        ></Input>
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
        ></Textarea>
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
        ></Textarea>
        {errors?.content && (
          <p className="text-sm text-red-700">{errors.content.message}</p>
        )}
      </div>
      <Button type="submit" className="mt-5 w-full" disabled={isPending}>
        {isPending ? "Saving Post..." : "Create Post"}
      </Button>
    </form>
  );
}
export default PostForm;
