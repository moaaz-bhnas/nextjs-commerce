"use client";

import { activate } from "components/account/actions";
import { useActionState } from "react";

const initialState = { error: undefined as string | undefined, success: undefined as string | undefined };

export function ActivateForm({ activationUrl }: { activationUrl: string }) {
  const [state, formAction, isPending] = useActionState(activate, initialState);

  return (
    <>
      {state?.error && (
        <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
          {state.error}
        </p>
      )}
      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="activation_url" value={activationUrl} readOnly />
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-neutral-900 px-4 py-2 font-medium text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
        >
          {isPending ? "Activating…" : "Activate account"}
        </button>
      </form>
    </>
  );
}
