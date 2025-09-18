import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
export default async function profilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <main className="py-10">
      <div className="max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Profile</h1>
          </div>
          <Button>
            <Link href="/post/create">
              <PlusCircle className="h-5 w-5 mr-2">Create Post</PlusCircle>
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your Profile Information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="font-medium">Name:</span>
              {session?.user.name}
            </div>
            <div className="space-y-2">
              <span className="font-medium">Email:</span>
              {session?.user.email}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
