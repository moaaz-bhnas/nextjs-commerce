"use server";

import {
  CUSTOMER_ACCESS_TOKEN_COOKIE,
  customerAccessTokenCreate,
  customerActivateByUrl,
  customerCreate,
  customerRecover,
  customerResetByUrl,
} from "lib/shopify";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AccountFormState = {
  error?: string;
  success?: string;
};

const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60;

async function setCustomerAccessTokenCookie(accessToken: string, expiresAt: string) {
  const expiresMs = new Date(expiresAt).getTime() - Date.now();
  const maxAge = expiresMs > 0 ? Math.floor(expiresMs / 1000) : THIRTY_DAYS_SECONDS;
  (await cookies()).set(CUSTOMER_ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export async function signUp(
  _prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const { customerId, customerUserErrors } = await customerCreate({
    email,
    password,
  });

  if (customerUserErrors.length > 0) {
    const message = customerUserErrors.map((e) => e.message).join("; ");
    const isDisabled = customerUserErrors.some((e) => e.code === "CUSTOMER_DISABLED");
    if (isDisabled) {
      return { success: "An account with this email already exists. Check your email to activate your account." };
    }
    return { error: message };
  }

  if (customerId) {
    const { customerAccessToken, customerUserErrors: tokenErrors } =
      await customerAccessTokenCreate({ email, password });
    if (tokenErrors.length === 0 && customerAccessToken) {
      await setCustomerAccessTokenCookie(
        customerAccessToken.accessToken,
        customerAccessToken.expiresAt
      );
      redirect("/account");
    }
  }

  return { success: "Check your email to activate your account." };
}

export async function signIn(
  _prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const { customerAccessToken, customerUserErrors } =
    await customerAccessTokenCreate({ email, password });

  if (customerUserErrors.length > 0) {
    return {
      error: customerUserErrors.map((e) => e.message).join("; ") || "Invalid email or password.",
    };
  }

  if (!customerAccessToken) {
    return { error: "Invalid email or password." };
  }

  await setCustomerAccessTokenCookie(
    customerAccessToken.accessToken,
    customerAccessToken.expiresAt
  );
  redirect("/account");
}

export async function signOut() {
  (await cookies()).delete(CUSTOMER_ACCESS_TOKEN_COOKIE);
  redirect("/account/login");
}

export async function activate(
  _prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const activationUrl = formData.get("activation_url") as string;
  const password = formData.get("password") as string;

  if (!activationUrl || !password) {
    return { error: "Invalid activation link or missing password." };
  }

  const { customerId, customerUserErrors } = await customerActivateByUrl(
    activationUrl,
    password
  );

  if (customerUserErrors.length > 0) {
    return {
      error: customerUserErrors.map((e) => e.message).join("; "),
    };
  }

  if (customerId) {
    redirect("/account/login?activated=1");
  }

  return { error: "Activation failed. The link may have expired." };
}

export async function recoverPassword(
  _prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const email = (formData.get("email") as string)?.trim();

  if (!email) {
    return { error: "Email is required." };
  }

  await customerRecover(email);

  return {
    success:
      "If an account exists with this email, we've sent a link to reset your password.",
  };
}

export async function resetPassword(
  _prevState: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const resetUrl = formData.get("reset_url") as string;
  const password = formData.get("password") as string;

  if (!resetUrl || !password) {
    return { error: "Invalid reset link or missing password." };
  }

  const { customerId, customerUserErrors } = await customerResetByUrl(
    resetUrl,
    password
  );

  if (customerUserErrors.length > 0) {
    return {
      error: customerUserErrors.map((e) => e.message).join("; "),
    };
  }

  if (customerId) {
    redirect("/account/login?reset=1");
  }

  return { error: "Password reset failed. The link may have expired." };
}
