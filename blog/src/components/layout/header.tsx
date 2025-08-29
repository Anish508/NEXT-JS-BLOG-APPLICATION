"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Menu, X, Search, Sun, Moon } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Create", href: "/post/create" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-background/70 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-1xl font-extrabold tracking-tight text-orange-500"
        >
          Blogger
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search (desktop) */}
          <div className="hidden sm:flex items-center relative">
            <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-3 py-1 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors"
            />
          </div>

          {/* Search toggle (mobile) */}
          <div className="sm:hidden">
            {isSearchOpen ? (
              <div className="flex items-center relative">
                <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  className="pl-8 pr-3 py-1 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors"
                  onBlur={() => setIsSearchOpen(false)}
                />
              </div>
            ) : (
              <button
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Theme toggle */}
          <button
            aria-label="Toggle theme"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Sun className="h-5 w-5 hidden dark:block" />
            <Moon className="h-5 w-5 block dark:hidden" />
          </button>

          {/* Auth Button */}
          <Button
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => router.push("/auth")}
          >
            Sign In
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-3 space-y-3 animate-in fade-in slide-in-from-top">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button
            className="w-full"
            onClick={() => {
              setIsMenuOpen(false);
              router.push("/auth");
            }}
          >
            Sign In
          </Button>
        </div>
      )}
    </header>
  );
}

export default Header;
