"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
export default function AuthLayout() {
  const [aviveTabs, setActiveTabs] = useState("login");
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md p-5 bg-card rounded-lg shadow-sm border">
        <h1 className="font-bold text-2xl text-center mb-6">Welcome</h1>
        <Tabs
          value={aviveTabs}
          onValueChange={setActiveTabs}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-4 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm></LoginForm>
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm></RegisterForm>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
