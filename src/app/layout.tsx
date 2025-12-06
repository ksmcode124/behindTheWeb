import type { Metadata } from 'next';
import { Anton } from 'next/font/google';
import '@/app/globals.css';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
});

export const metadata: Metadata = {
  title: 'Code124',
  description: 'Behind The Web',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="behind-the-web">
      <body className={`${anton.variable} antialiased`}>{children}</body>
    </html>
  );
}
