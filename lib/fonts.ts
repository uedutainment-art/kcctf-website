import { Noto_Serif_KR, Playfair_Display, Inter, Oswald } from 'next/font/google';

export const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-noto-serif-kr',
  display: 'swap',
});

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});
