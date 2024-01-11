import { ChakraProvider } from "@chakra-ui/react";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import * as React from "react";
import { AuthProvider } from "./use-auth-client";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata = {
  title: "Lottereum",
  description: "Host your lotteries and join lotteries with us!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FFF7EC]">
        <AuthProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto py-8 px-8 xl:px-0">
            <ChakraProvider>{children}</ChakraProvider>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
