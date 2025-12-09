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
    <html lang="en" data-theme="behind-the-web">
      <body
        className={`${anton.variable} ${poppins.className} font-display antialiased`}
      >
        {/* <div className="bg-contains bg-top-center pointer-events-none absolute top-0 left-0 z-20 h-[1000vw] min-w-screen bg-[url('/assets/images/Texture.png')]" /> */}
        {children}
      </body>
    </html>
  );
}
