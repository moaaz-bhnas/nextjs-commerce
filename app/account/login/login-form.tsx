"use client";

import { signIn } from "components/account/actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

const initialState = { error: undefined as string | undefined, success: undefined as string | undefined };

export function LoginForm() {
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(signIn, initialState);
  const activated = searchParams.get("activated") === "1";
  const reset = searchParams.get("reset") === "1";
  const successMessage = activated
    ? "Your account has been activated. Sign in below."
    : reset
      ? "Your password has been reset. Sign in below."
      : state?.success;

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Sign in</h1>
      {successMessage && (
        <p className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
          {successMessage}
        </p>
      )}
      {state?.error && (
        <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
          {state.error}
        </p>
      )}
      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-neutral-900 px-4 py-2 font-medium text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
        >
          {isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        <Link
          href="/account/recover"
          className="text-neutral-500 underline hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
        >
          Forgot password?
        </Link>
      </p>
      <p className="mt-2 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/account/register"
          className="font-medium text-neutral-700 underline dark:text-neutral-300"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
