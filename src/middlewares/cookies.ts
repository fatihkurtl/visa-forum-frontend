"use server";
import { IToken } from "@/interfaces/member";
import { cookies } from "next/headers";

const cookieStore = cookies();

export const setMemberCookies = async (data: IToken) => {
  const authData = JSON.stringify({
    token: data.token,
    expires_at: data.expires_at,
  });

  cookieStore.set("authData", authData, {
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
};

export const removeMemberCookies = async () => {
  cookieStore.delete("authData");
};

export const getMemberCookies = async () => {
  try {
    const authData = await cookieStore.get("authData");
    if (!authData) return null;
    const data = JSON.parse(authData?.value || "{}");
    const { token, expires_at } = data;
    if (authData && token && expires_at) {
      if (new Date() < new Date(expires_at)) {
        return token;
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
};

export const isMemberAuthenticated = async () => {
  const authData = await cookieStore.get("authData");
  const data = JSON.parse(authData?.value || "{}");
  const memberCookie = await getMemberCookies();
  if (data.token && data.expires_at && memberCookie) {
    return true;
  } else {
    return false;
  }
};
