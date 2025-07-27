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
              Jl. Mushola Babussalam, Pd. Kacang Tim., Kec. Pd. Aren, Kota Tangerang Selatan, Banten 14045
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
              <a href="mailto:supersayur5@gmail.com" className="text-green-700 hover:underline">
                supersayur5@gmail.com
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
          <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d991.5065850588983!2d106.70038904120617!3d-6.260260639171955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTUnMzcuMCJTIDEwNsKwNDInMDIuOCJF!5e0!3m2!1sid!2sid!4v1753624296453!5m2!1sid!2sid"
        className="w-full h-[500px] border-0 py-5"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
        </section>
      </main>
      <Footer />
    </>
  );
}
