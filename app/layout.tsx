import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta'
});

export const viewport: Viewport = {
  colorScheme: 'light',
};

export const metadata: Metadata = {
  title: 'Liqdx | Intent-Powered Cross-Chain Wallet',
  description:
    'Liqdx is an intelligent AI-driven cross-chain wallet for Ethereum, Solana, Base, Arbitrum, and Avalanche.',
  other: {
    'darkreader-lock': 'true'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.variable}>{children}</body>
    </html>
  );
}
