import type { Metadata } from "next";
import "./globals.sass";

const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Let's game!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export { metadata };
