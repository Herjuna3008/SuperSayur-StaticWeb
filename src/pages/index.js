import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const heroImages = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1563201515-adbe35c669c5?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const categories = [
  { name: "Sayur", icon: "https://cdn0.iconfinder.com/data/icons/goofy-international-food-color/96/Salad-512.png" },
  { name: "Daging", icon: "https://cdn0.iconfinder.com/data/icons/weight-loss-1/64/meat-protein-keto_diet-ketogenic_diet-beef-poultry-bacon-512.png" },
  { name: "Buah", icon: "https://cdn1.iconfinder.com/data/icons/international-day-of-yoga-bzzricon-color-omission/512/17_Healthy_Food-512.png" },
  { name: "Rempah", icon: "https://cdn2.iconfinder.com/data/icons/cooking-49/64/Grind-spice-seasoning-ingredient-mortar-1024.png" },
  { name: "Seafood", icon: "https://cdn1.iconfinder.com/data/icons/animal-kingdom-vol-2/512/catship_carp_fish_seafood-1024.png" }
];

const customers = [
  {
    name: "PT Astra International Tbk",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_Astra_International.svg/200px-Logo_Astra_International.svg.png"
    // Logo Astra diambil dari Wikimedia Commons :contentReference[oaicite:0]{index=0}
  },
  {
    name: "PT Telekomunikasi Indonesia (Persero) Tbk",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Telkom_Indonesia_2013.svg/200px-Telkom_Indonesia_2013.svg.png"
    // Logo Telkom Indonesia via Wikimedia Commons :contentReference[oaicite:1]{index=1}
  },
  {
    name: "PT Bank Rakyat Indonesia (Persero) Tbk",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg"
    // Logo BRI via Wikimedia Commons :contentReference[oaicite:2]{index=2}
  },
  {
    name: "PT Bank Mandiri (Persero) Tbk",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Mandiri.svg/200px-Mandiri.svg.png"
    // Logo Mandiri via Wikimedia Commons :contentReference[oaicite:3]{index=3}
  },
  {
    name: "PT Bank Central Asia Tbk",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/BCA_Logo.svg/200px-BCA_Logo.png"
    // Logo BCA via Wikimedia Commons :contentReference[oaicite:4]{index=4}
  },
  {
    name: "PT Pertamina (Persero)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Pertamina_Logo.svg/200px-Pertamina_Logo.svg.png"
    // Logo Pertamina via Wikimedia Commons :contentReference[oaicite:5]{index=5}
  },
  {
    name: "PT Unilever Indonesia Tbk",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Unilever_logo.png/200px-Unilever_logo.png"
    // Logo Unilever PNG via Wikimedia Commons 
  },
  {
    name: "PT Indofood Sukses Makmur Tbk",
    logo: "https://images.seeklogo.com/logo-png/29/1/indofood-logo-png_seeklogo-298884.png"
    // Logo Indofood via SeekLogo :contentReference[oaicite:7]{index=7}
  }
];

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const nextHero = () => setHeroIdx((heroIdx + 1) % heroImages.length);

  return (
    <>
      <Head>
        <title>SuperSayur - Supplier Sayur & Daging Segar</title>
      </Head>
      <Navbar />
    <div className="space-y-32">
      {/* HERO */}
      <section
        className="relative h-[80vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${heroImages[heroIdx]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.8s ease-in-out"
        }}
        onMouseEnter={nextHero}
      >
        <div>
          <h1 className="text-5xl font-extrabold mb-4">SuperSayur</h1>
          <p className="text-xl mb-6">Supplier Sayur & Daging Segar untuk Bisnis Anda</p>
          <Link href="/products" className="px-6 py-3 bg-green-600 rounded-full font-semibold hover:bg-green-700 transition">
            Belanja Sekarang
          </Link>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center mb-10 animate-fadeIn">Mengapa Memilih SuperSayur?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center hover:scale-105 transition">
              <div className="text-4xl mb-3">🥦</div>
              <div className="font-bold mb-1">Produk Segar</div>
              <p className="text-gray-600 text-sm text-center">
                Semua produk dikirim dalam keadaan segar, langsung dari petani dan distributor terpercaya.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center hover:scale-105 transition">
              <div className="text-4xl mb-3">🚚</div>
              <div className="font-bold mb-1">Pengiriman Cepat</div>
              <p className="text-gray-600 text-sm text-center">
                Jangkauan pengiriman luas, selalu tepat waktu dan aman sampai tujuan.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center hover:scale-105 transition">
              <div className="text-4xl mb-3">💰</div>
              <div className="font-bold mb-1">Harga Terjangkau</div>
              <p className="text-gray-600 text-sm text-center">
                Harga kompetitif, cocok untuk kebutuhan rumah tangga, UMKM, Restoran, maupun skala besar.
              </p>
            </div>
          </div>
      </section>

      {/* MENYEDIAKAN PRODUK */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Menyediakan Produk</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((c, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:scale-105 transition"
              >
                <img src={c.icon} alt={c.name} className="w-16 h-16 mb-4" />
                <span className="font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY PROFILE SINGKAT */}
      <section className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 py-16">
        <div className="md:w-1/2 text-center md:text-left space-y-4">
          <h2 className="text-3xl font-bold">Tentang SuperSayur</h2>
          <p className="text-gray-700">
            SuperSayur adalah pemasok sayur dan daging segar terpercaya sejak 2023, melayani kebutuhan restoran,
            hotel, dan bisnis skala besar dengan kualitas terjamin.
          </p>
          <Link href="/company-profile" className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
            Lebih Lanjut
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1562147529-1f05d6533ceb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Company Profile"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* PENGANTARAN SINGKAT */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1627019866926-b6030ff785fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Pengantaran"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold">Sistem Pengantaran Kami</h2>
            <p className="text-gray-700">
              Kami melayani Jabodetabek & Bandung, setiap hari pukul 08:00–20:00. Pesanan
              sebelum jam 17:00 dikirim hari yang sama.
            </p>
            <Link href="/jangkauan-pengiriman" className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
              Mengenai Pengantaran
            </Link>
          </div>
        </div>
      </section>

      {/* OUR CUSTOMER */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Customers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
          {customers.map((cus, i) => (
            <div key={i} className="flex justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <img src={cus.logo} alt={cus.name} className="max-h-16 object-contain" />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center space-y-2">
          <script src="https://static.elfsight.com/platform/platform.js" async></script>
          <div class="elfsight-app-df8b914e-733a-48bf-8072-89158bcb9670" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/*FAQ Section*/}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center mb-10 animate-fadeIn">Frequently Asked Questions</h2>
          <div className="text-center">Ada pertanyaan, kami punya jawabannya! Cari tahu lebih banyak tentang SuperSayur.</div>
          <div className="flex justify-center mt-10">
            <Link
              href="/faq"
              className="inline-block bg-gray-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-500 hover:scale-105 transition-transform"
            >
              Baca FAQ &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}