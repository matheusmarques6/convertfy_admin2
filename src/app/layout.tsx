import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Convertfy Admin",
  description: "Sistema administrativo da Convertfy",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
