/* eslint-disable no-magic-numbers -- test */
/* eslint-disable camelcase -- to follow next-auth naming convention */
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import type { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id_token?: string;
    access_token?: string;
    expires_at?: number;
    refresh_token?: string;
    error?: "RefreshAccessTokenError";
  }
}
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    id?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          id: account.providerAccountId,
          accessToken: account.access_token,
          id_token: account.id_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at ? account.expires_at * 1000 : undefined,
        };
      }

      if (typeof token.expires_at === "number" && Date.now() > token.expires_at) return await refresh(token);

      return token;
    },
    async session({ session, token }) {
      if (token.id_token) {
        session.sessionToken = token.id_token;
      }

      if (typeof token.accessToken === "string" && typeof token.id === "string") {
        session.accessToken = token.accessToken;
        session.id = token.id;
      }

      return session;
    },
  },
});

const refresh = async (token: JWT): Promise<JWT> => {
  try {
    if (!token.refresh_token) {
      throw new Error();
    }

    const url = `https://oauth2.googleapis.com/token`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: token.refresh_token,
        grant_type: "refresh_token",
      }),
    });
    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      id_token: refreshedTokens.id_token,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      expires_at: Date.now() + refreshedTokens.expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};
