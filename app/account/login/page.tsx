import { LoginForm } from "./login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="animate-pulse rounded-md bg-neutral-200 h-10 w-full dark:bg-neutral-800" />}>
      <LoginForm />
    </Suspense>
  );
}
