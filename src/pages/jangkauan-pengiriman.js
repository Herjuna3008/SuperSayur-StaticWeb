import Head from "next/head";
import { LocalBusinessJsonLd } from 'next-seo';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function JangkauanPengiriman() {
  return (
    <>
      <Head>
        <title>Jangkauan Pengiriman | SuperSayur</title>
      </Head>
      <LocalBusinessJsonLd
        type="FoodService"
        id="https://www.supersayur.com/"
        name="SuperSayur"
        description="Supplier sayur, daging, seafood untuk restoran dan hotel di Tangerang"
        telephone="+62-812-9156-4078"
        address={{
          streetAddress: 'Jl. Mushola Babussalam, Pd. Kacang Tim., Kec. Pd. Aren',
          addressLocality: 'Kota Tangerang Selatan',
          addressRegion: 'Banten',
          postalCode: '14045',
          addressCountry: 'ID',
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-white py-16 animate-fadeIn">
        <section className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
            Jangkauan Pengiriman
          </h1>
          <p className="text-gray-700 leading-relaxed mb-6">
            SuperSayur melayani pengiriman bahan pangan segar ke berbagai area strategis di Jadetabek, terutama:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-6">
            <li>Jadetabek (Jakarta, Depok, Tangerang, Bekasi)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            Hubungi Admin SuperSayur untuk melakukan pengiriman diluar kota diatas.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
