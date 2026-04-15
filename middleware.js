import { NextResponse } from 'next/server';

export const config = {
  matcher: '/docs/:id*',
};

export default function middleware(req) {
  const url = req.nextUrl.clone();
  const userAgent = req.headers.get('user-agent') || '';
  
  // Deteksi bot sosial media
  const isBot = /WhatsApp|facebookexternalhit|Twitterbot|LinkedInBot|TelegramBot/i.test(userAgent);

  if (isBot) {
    const id = url.pathname.split('/').pop();
    // Rewrite diam-diam ke URL OG Blog yang sudah ada di backend Anda
    // Menggunakan domain backend yang sudah aktif
    return NextResponse.rewrite(`https://roi-web-portfolio.duckdns.org/og/blog/${id}`);
  }

  return NextResponse.next();
}
