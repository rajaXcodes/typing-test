"use client";
import { signIn, signOut } from "next-auth/react";

const AuthButtons = ({ session }: any) => {
  return session ? (
    <button
      onClick={() => signOut()}
      className="bg-red-500 text-white px-4 py-2 rounded mb-4"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => signIn("google")}
      className="bg-blue-600 text-white px-4 py-2 rounded mb-4 "
    >
      Login with Google
    </button>
  );
};

export default AuthButtons;
