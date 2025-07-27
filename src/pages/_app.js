import "@/styles/globals.css";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import LoadingOverlay from "@/components/LoadingSpinner";

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
        <link rel="icon" href="/favicon.ico" sizes="any"/>
      </Head>
      {/* Untuk efek transisi halaman, bisa tambah animasi di container */}
      <LoadingOverlay show={loading}>
        <div className="min-h-screen flex flex-col bg-green-50">
          <Component {...pageProps} />
          <FloatingWhatsapp />
        </div>
      </LoadingOverlay>
    </>
  );
}
