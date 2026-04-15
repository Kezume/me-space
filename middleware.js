// Middleware menggunakan standard Web API (tanpa next/server)
export default async function middleware(req) {
  const userAgent = req.headers.get('user-agent') || '';
  const url = new URL(req.url);

  // Hanya proses jika di path /docs/:id
  if (url.pathname.startsWith('/docs/')) {
    const isBot = /WhatsApp|facebookexternalhit|Twitterbot|LinkedInBot|TelegramBot|Discordbot/i.test(userAgent);

    if (isBot) {
      const id = url.pathname.split('/').filter(Boolean).pop();
      if (id && id !== 'docs') {
        const target = `https://roi-web-portfolio.duckdns.org/og/blog/${id}`;
        
        try {
          // Ambil konten dari backend secara langsung (proxy manual)
          const res = await fetch(target);
          const html = await res.text();
          
          return new Response(html, {
            headers: { 'content-type': 'text/html; charset=utf-8' },
          });
        } catch (e) {
          // Jika gagal, biarkan lanjut ke SPA
          return;
        }
      }
    }
  }

  // Jika bukan bot atau bukan path /docs, biarkan Vercel lanjut ke file index.html (SPA)
  return;
}
