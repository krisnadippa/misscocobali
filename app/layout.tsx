import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Zestó — Sparkling Refreshment",
  description:
    "Crisp, all-natural sparkling refreshment for picnics, road trips, beach days & everything in between.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Oswald:wght@600;700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800;900&family=Shrikhand&display=swap"
          rel="stylesheet"
        />
        {/* External Tailwind CSS CDN */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        {/* Tailwind Configuration for Both Storefront & Admin */}
        <script
          data-purpose="tailwind-config"
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      'zesto-lime': '#C7F800',
                      'zesto-lime-hover': '#b4e000',
                      'zesto-dark': '#13231B',
                      'zesto-green': '#195B30',
                      zesto: {
                        forest: '#0a3321',
                        'forest-hover': '#072417',
                        lime: '#b5e800',
                        'lime-glow': '#ccff00',
                        mint: '#e6f3eb',
                        'mint-subtle': '#f4f8f4',
                        gray: {
                          50: '#fafcfa',
                          100: '#f0f4f1',
                          200: '#e1e7e2',
                          300: '#d0d9d2',
                          400: '#94a397',
                          500: '#647467',
                          600: '#48564b',
                          700: '#2c372e',
                          900: '#131a15',
                        }
                      }
                    },
                    fontFamily: {
                      sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
                      display: ['"Outfit"', 'sans-serif'],
                      script: ['"Caveat"', 'cursive'],
                      condensed: ['"Oswald"', 'sans-serif'],
                      bubble: ['"Shrikhand"', 'cursive'],
                      admin: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
                    },
                    boxShadow: {
                      'card': '0 1px 3px 0 rgba(10, 51, 33, 0.04), 0 1px 2px -1px rgba(10, 51, 33, 0.04)',
                      'elevated': '0 10px 25px -5px rgba(10, 51, 33, 0.08), 0 8px 10px -6px rgba(10, 51, 33, 0.04)',
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="bg-[#24422E] text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-zesto-lime selection:text-black">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
