import React from "react";
import { Providers } from "./providers";
import Navbar from "@components/Navbar/Navbar";

export const metadata = {
  title: "Reddit",
  description: "Reddit",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
