import "@/styles/globals.css";
import Head from "next/head";
import { DefaultSeo, BreadcrumbJsonLd } from 'next-seo';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import LoadingOverlay from "@/components/LoadingSpinner";
import SEO from '@/lib/next-seo.config';

// Kalau kamu ingin Navbar & Footer tampil di seluruh halaman, import di sini (bisa juga khusus page)
export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="description" content="Supplier Sayur & Daging Segar | SuperSayur" />
        <meta name="apple-mobile-web-app-title" content="Super Sayur" />
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="icon" type="image/png" href="/icon1.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/icon0.svg" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <DefaultSeo {...SEO} />
      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: 'Home', item: 'https://www.supersayur.com' },
          { position: 2, name: 'Produk', item: 'https://www.supersayur.com/product' },
          { position: 3, name: 'Kontak', item: `https://www.supersayur.com/contact` },
        ]} />
      <LoadingOverlay show={loading}>
        <div className="min-h-screen flex flex-col bg-green-50">
          <Component {...pageProps} />
          <FloatingWhatsapp />
        </div>
      </LoadingOverlay>
    </>
  );
}
