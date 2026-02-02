"use client";

import { recoverPassword } from "components/account/actions";
import Link from "next/link";
import { useActionState } from "react";

const initialState = { error: undefined as string | undefined, success: undefined as string | undefined };

export default function RecoverPage() {
  const [state, formAction, isPending] = useActionState(recoverPassword, initialState);

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Reset password</h1>
      <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>
      {state?.success && (
        <p className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
          {state.success}
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
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-neutral-900 px-4 py-2 font-medium text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
        >
          {isPending ? "Sending…" : "Send reset link"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        <Link
          href="/account/login"
          className="text-neutral-500 underline hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
        >
          Back to sign in
        </Link>
      </p>
    </>
  );
}
