import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE || 'My Portfolio',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Developer Portfolio Website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
