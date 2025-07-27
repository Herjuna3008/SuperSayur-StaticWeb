import { NextSeo } from 'next-seo';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <>
      <NextSeo
        title="Syarat & Ketentuan"
        canonical="https://www.supersayur.com/terms"
        description="Ketentuan berbelanja dan menggunakan layanan SuperSayur."
      />
      <Navbar />
      <main className="min-h-screen bg-white py-16 animate-fadeIn">
        <section className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
            Syarat &amp; Ketentuan
          </h1>
          <div className="space-y-4 text-gray-700">
            <p>
              Dengan menggunakan layanan <span className="font-semibold text-green-700">SuperSayur</span>, Anda setuju dengan ketentuan berikut:
            </p>
            <ul className="list-decimal pl-6 space-y-1">
              <li>Harga produk dapat berubah sewaktu-waktu mengikuti harga pasar.</li>
              <li>Stok produk dapat berubah tanpa pemberitahuan sebelumnya.</li>
              <li>Proses pengiriman dilakukan setelah melakukan Pre-Order pada hari kerja dan menyesuaikan lokasi pengiriman.</li>
              <li>Segala keluhan terkait produk atau layanan dapat disampaikan melalui kontak resmi kami.</li>
              <li>Update list harga dan stok terbaru akan kami kirimkan secara berkala, jika anda sudah berlangganan kepada kami.</li>
              <li>Opsi pemabayran dapat dilakukan dengan tempo dan cash, hubungi admin kami untuk melakukan pemabayran.</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
