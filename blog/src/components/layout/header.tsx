"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Header() {
  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Create",
      href: "/post/create",
    },
  ];
  return (
    <div className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl text-orange-500 font-extrabold">
            Blogger
          </Link>
          {navItems.map((navItem) => (
            <nav
              key={navItem.href}
              className="hidden md:flex items-center gap-6"
            >
              <Link
                href={navItem.href}
                className={cn(
                  "text-sm font-bold transition-colors hover:text-primary"
                )}
              >
                {navItem.label}
              </Link>
            </nav>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Header;
