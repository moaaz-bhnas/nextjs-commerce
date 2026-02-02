import { resetPassword } from "components/account/actions";
import Link from "next/link";
import { ResetPasswordForm } from "./reset-form";

export default async function ResetPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const resetUrl = typeof searchParams?.reset_url === "string" ? searchParams.reset_url : "";

  if (!resetUrl) {
    return (
      <>
        <h1 className="mb-6 text-2xl font-semibold">Invalid reset link</h1>
        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          This password reset link is invalid or has expired. Please request a new one.
        </p>
        <Link
          href="/account/recover"
          className="font-medium text-neutral-700 underline dark:text-neutral-300"
        >
          Request new reset link
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Set new password</h1>
      <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
        Enter your new password below.
      </p>
      <ResetPasswordForm resetUrl={resetUrl} />
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
