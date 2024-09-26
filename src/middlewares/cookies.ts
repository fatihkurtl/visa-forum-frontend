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
  const authData = await cookieStore.get("authData");
  return { authData };
};
