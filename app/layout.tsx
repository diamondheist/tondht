'use client'

import "./globals.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import ClientNav from "./components/ClientNav";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className="antialiased min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.jpg')" }}>
       <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        <TonConnectUIProvider manifestUrl="https://moccasin-implicit-eel-888.mypinata.cloud/ipfs/bafkreiay7dqpdv7ca4ss5lhwtixa7rhl4kji74aqyr3y6kfwrpikd63bva">
        <div className="flex flex-col min-h-screen">
            {/* Main content */}
            <div className="flex-grow overflow-y-auto pb-20">
              {children}
            </div>
            {/* Fixed Navbar */}
            <ClientNav />
          </div>
        </TonConnectUIProvider>
      </body>
    </html>
  );
}