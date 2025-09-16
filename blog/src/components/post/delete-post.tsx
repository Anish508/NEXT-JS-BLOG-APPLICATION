"use client";

import { DeletePostButtonProps } from "@/types";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  return (
    <Button variant="destructive" className="flex items-center">
      <Trash className="h-4 w-4 mr-2" />
      <span>Delete</span>
    </Button>
  );
}
