import type { Metadata } from 'next';
import { Anton, Poppins } from 'next/font/google';
import '@/app/globals.css';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
    <html lang="en">
      <body
        className={`${anton.variable} ${poppins.className} font-display bg-secondary-300 overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
