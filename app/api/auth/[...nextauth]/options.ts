import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import queryString from "query-string";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Your Email",
          type: "email",
          placeholder: "jhondoe@gmail.com",
        },

        password: {
          label: "Your Password",
          type: "password",
          placeholder: "********",
        },
      },
      authorize: async (credentials: any): Promise<any> => {
        const { email, password } = queryString.parse(credentials.callbackUrl);

        if (email && password) {
          const user = await prisma.user.findFirst({
            where: {
              email: email as string,
            },
          });

          if (user) {
            if (user?.password && password) {
              const isPasswordsMatch = bcrypt.compareSync(
                password as string,
                user?.password as string
              );

              if (isPasswordsMatch) {
                return user;
              } else {
                return null;
              }
            } else {
              return null;
            }
          } else {
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      console.log(user, token);
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          image: user.image,
        };
      }
      return token;
    },
    async session({ session, trigger, token }) {
      console.log(session);
      if (token.image) {
        session.user.image = token.image;
      }
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};
