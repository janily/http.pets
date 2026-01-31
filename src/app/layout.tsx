import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HTTP Pets',
  description: 'Interactive HTTP method playground with cute pets',
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