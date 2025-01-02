import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Firebase({
      clientId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_SECRET,
    }),
  ],
});
