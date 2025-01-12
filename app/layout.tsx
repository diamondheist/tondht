'use client'

import "./globals.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>TON Connect Demo</title>
      </head>
      <body>
        <TonConnectUIProvider manifestUrl="https://moccasin-implicit-eel-888.mypinata.cloud/ipfs/bafkreiay7dqpdv7ca4ss5lhwtixa7rhl4kji74aqyr3y6kfwrpikd63bva">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}