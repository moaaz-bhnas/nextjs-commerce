import { ReactNode } from "react";

export const metadata = {
  title: "Account",
  description: "Manage your account.",
};

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-16">
      <div className="w-full rounded-lg border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        {children}
      </div>
    </div>
  );
}
