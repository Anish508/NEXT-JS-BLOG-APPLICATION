"use client";

import { DeletePostButtonProps } from "@/types";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { deletePost } from "@/actions/post-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const HandleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deletePost(postId);
      if (res.success) {
        toast(res.message);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast("An error occured while deleting the post! please try again...");
      console.log("Error:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Button
      variant="destructive"
      className="flex items-center"
      onClick={HandleDelete}
      disabled={isDeleting}
    >
      <Trash className="h-4 w-4 mr-2" />
      {isDeleting ? "Deleting...." : "Delete"}
    </Button>
  );
}
