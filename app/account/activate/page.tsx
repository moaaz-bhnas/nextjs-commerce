import Link from "next/link";
import { ActivateForm } from "./activate-form";

export default async function ActivatePage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const activationUrl =
    typeof searchParams?.activation_url === "string" ? searchParams.activation_url : "";

  if (!activationUrl) {
    return (
      <>
        <h1 className="mb-6 text-2xl font-semibold">Invalid activation link</h1>
        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          This activation link is invalid or has expired. Please contact support or try signing up again.
        </p>
        <Link
          href="/account/register"
          className="font-medium text-neutral-700 underline dark:text-neutral-300"
        >
          Sign up
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Activate your account</h1>
      <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
        Set a password to activate your account.
      </p>
      <ActivateForm activationUrl={activationUrl} />
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
