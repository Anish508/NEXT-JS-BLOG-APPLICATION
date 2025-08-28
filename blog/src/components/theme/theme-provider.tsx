"use client";
import Header from "../layout/header";
import Footer from "../layout/footer";
import {
  ThemeProvider as NextThemeProvider,
  ThemeProviderProps,
} from "next-themes";
import { cn } from "@/lib/utils";

interface ExtendedThemeProviderProps extends ThemeProviderProps {
  containerClassName?: string;
}
export default function ThemeProvider({
  children,
  containerClassName,
  ...props
}: ExtendedThemeProviderProps) {
  return (
    <NextThemeProvider {...props}>
      <Header></Header>
      <main className={cn("container mx-auto px-4", containerClassName)}>
        {children}
      </main>
      <Footer></Footer>
    </NextThemeProvider>
  );
}
