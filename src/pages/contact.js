import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Kontak | SuperSayur</title>
      </Head>
      <Navbar />
      <main className="min-h-screen bg-white py-16 animate-fadeIn">
        <section className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">Kontak Kami</h1>
          <div className="mb-6 space-y-2">
            <div>
              <span className="font-bold">Alamat: </span>
              Jl. Sehat Selalu No. 8, Tangerang, Banten
            </div>
            <div>
              <span className="font-bold">Telepon/WhatsApp: </span>
              <a href="https://wa.me/6281291564078" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
              +6281291564078
              </a>
              <a> & </a>
              <a href="https://wa.me/6287855233489" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
              +6287855233489
              </a>
            </div>
            <div>
              <span className="font-bold">Email: </span>
              <a href="mailto:info@pasarsegarsupplier.com" className="text-green-700 hover:underline">
                info@SuperSayur.com
              </a>
            </div>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://wa.me/6281291564078"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-7 py-3 rounded-full font-semibold shadow hover:bg-green-700 hover:scale-105 transition-transform text-lg mt-6"
            >
              Admin 1
            </a>
            <a
              href="https://wa.me/6287855233489"
              target="_blank"
              rel="noopener noreferrer"
              className=" inline-block bg-green-600 text-white px-7 py-3 rounded-full font-semibold shadow hover:bg-green-700 hover:scale-105 transition-transform text-lg mt-6"
            >
              Admin 2
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
