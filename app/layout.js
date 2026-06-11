import { Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomTabBar } from '@/components/BottomTabBar';

const hanken = Hanken_Grotesk({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Merkato Store',
  description: 'Your premium gateway to global commerce — serving Africa and the Middle East.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${hanken.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background">
        <Header />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <BottomTabBar />
      </body>
    </html>
  );
}
