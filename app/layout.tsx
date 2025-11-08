import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amit Kinha - Full Stack Developer',
  description: 'Professional portfolio of Amit Kinha - Full Stack Developer specializing in React, Node.js, and modern web technologies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
