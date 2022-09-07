import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      token?: string | null
    } & DefaultSession["user"]
  }

  interface User {
    token?: string | null
  } 
}