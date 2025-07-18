"use client";

import { GoogleOAuthProvider } from '@react-oauth/google';
import { Roboto } from "next/font/google";
import { EmotionProvider } from '../utils/emotion/provider';
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",  
});
<head>
  <script
    src="https://accounts.google.com/gsi/client"
    async
    defer
  ></script>
</head>

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <EmotionProvider>{children}</EmotionProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
