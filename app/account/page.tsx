import { signOut } from "components/account/actions";
import { getCustomer } from "lib/shopify";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const customer = await getCustomer();

  if (!customer) {
    redirect("/account/login");
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Account</h1>
      <div className="mb-6 space-y-2 text-sm">
        {customer.firstName || customer.lastName ? (
          <p>
            <span className="font-medium">Name:</span>{" "}
            {[customer.firstName, customer.lastName].filter(Boolean).join(" ") || "—"}
          </p>
        ) : null}
        {customer.email && (
          <p>
            <span className="font-medium">Email:</span> {customer.email}
          </p>
        )}
        {customer.phone && (
          <p>
            <span className="font-medium">Phone:</span> {customer.phone}
          </p>
        )}
      </div>
      <form action={signOut}>
        <button
          type="submit"
          className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Sign out
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        <Link
          href="/"
          className="text-neutral-500 underline hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
        >
          Continue shopping
        </Link>
      </p>
    </>
  );
}
