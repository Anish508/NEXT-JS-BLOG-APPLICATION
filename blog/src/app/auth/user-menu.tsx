import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "better-auth";

interface UserMenuProps {
  user: User;
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isLoading, setIsLoading] = useState(false);
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .filter((n) => n.length > 0) // remove empty strings
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="relaive h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {getInitials(user?.name) || "User"}{" "}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-8">
        <div className=""></div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
