import { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

export const metadata: Metadata = {
  title: 'The Maze Game',
  description: 'A fun little maze game with levels of different difficulty.',
  metadataBase: new URL('https://maze.furkandmrblk.com/'),
  alternates: {
    languages: {
      'en-US': '/',
    },
  },
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
};

const cabinetGrotesk = localFont({
  src: '../../public/fonts/CabinetGrotesk-Variable.ttf',
  variable: '--font-cabinet-grotesk',
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cabinetGrotesk.variable} font-sans`}>{children}</body>
    </html>
  );
}
