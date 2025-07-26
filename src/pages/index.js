import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomerCarousel from "@/components/CustomerCarousel";
import TiltImage from "@/components/TiltImage";
import ReviewCarousel from "@/components/ReviewCarousel";
import AnimatedSection from "@/components/AnimatedSection";

const heroImages = [
  "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563201515-adbe35c669c5?q=80&w=1174&auto=format&fit=crop"
];

const categories = [
  { name: "Sayur", icon: "https://cdn0.iconfinder.com/data/icons/goofy-international-food-color/96/Salad-512.png" },
  { name: "Daging Ayam", icon: "https://cdn0.iconfinder.com/data/icons/weight-loss-1/64/meat-protein-keto_diet-ketogenic_diet-beef-poultry-bacon-512.png" },
  { name: "Seafood", icon: "https://cdn1.iconfinder.com/data/icons/animal-kingdom-vol-2/512/catship_carp_fish_seafood-1024.png" }
];

const customers = [
  {
    name: "McDonald's",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.png"
  },
  {
    name: "Sambel Bakar Iben",
    logo: "https://static.wixstatic.com/media/92f9ae_76ab3002b73c453b9e43f25d7a44250c~mv2.png"
  },
  {
    name: "Bebek Carok",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQudpnW9RrcG_BRV4sckcpTzvUXHauLsCTD2g&s"
  },
  {
    name: "Waroeng Steak & Shake",
    logo: "https://i.pinimg.com/736x/8a/3a/34/8a3a346a9325b36641115e1bd0ea1a7a.jpg"
  },
  {
    name: "Janji Jiwa",
    logo: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/105f3f2b-06d2-4d6d-907f-ff30fdcf2216_brand-logo_1698896753190.jpg"
  },
  {
    name: "PT Indofood Sukses Makmur Tbk",
    logo: "https://images.seeklogo.com/logo-png/29/1/indofood-logo-png_seeklogo-298884.png"
  }
];

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const nextHero = () => setHeroIdx((heroIdx + 1) % heroImages.length);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [outlineColor, setOutlineColor] = useState("#fff");

  // Fungsi warna pastel random
  function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
  }

  return (
    <>
      <Head>
        <title>SuperSayur - Supplier Sayur & Daging Segar</title>
      </Head>
      <Navbar />

      <div className="space-y-32">
        {/* HERO */}
        <section
          className="relative h-[80vh] flex items-center justify-center text-center text-white overflow-hidden"
          style={{
            backgroundImage: `url(${heroImages[heroIdx]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 0.8s ease-in-out"
          }}
          onMouseEnter={nextHero}
        >
          {/* Konten hero */}
          <div>
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">SuperSayur</h1>
            <p className="text-xl mb-6 drop-shadow">
              Supplier Sayur & Daging Segar untuk Bisnis Anda
            </p>
            <Link
              href="/contact"
              className="px-6 py-3 bg-green-600 rounded-full font-semibold hover:bg-green-700 transition shadow"
            >
              Belanja Sekarang
            </Link>
          </div>
        </section>

        {/* KEUNGGULAN */}
        <AnimatedSection effect="up" className="max-w-6xl mx-auto px-4 relative">
          {/* Asset animasi */}
          <img
            src="https://png.pngtree.com/png-clipart/20241024/original/pngtree-hyper-realistic-broccoli-rabe-rapini-transparent-background-png-image_16480964.png"
            alt=""
            className="absolute -left-10 -bottom-10 w-25 h-25 opacity-60 pointer-events-none animate-wiggle"
            style={{ zIndex: 0 }}
          />
          <img
            src="https://cdn.pixabay.com/photo/2017/02/01/18/29/pimento-2031006_1280.png"
            alt=""
            className="absolute right-4 top-4 w-25 h-25 opacity-70 pointer-events-none animate-wiggle-x"
            style={{ zIndex: 0 }}
          />
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center mb-10 animate-fadeIn">
            Mengapa Memilih SuperSayur?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center hover:scale-105 transition group">
              <div className="text-4xl mb-3">🥦</div>
              <div className="font-bold mb-1 group-hover:text-green-700 transition">Produk Segar</div>
              <p className="text-gray-600 text-sm text-center">
                Semua produk dikirim dalam keadaan segar, langsung dari petani dan distributor terpercaya.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center hover:scale-105 transition group">
              <div className="text-4xl mb-3">🚚</div>
              <div className="font-bold mb-1 group-hover:text-green-700 transition">Pengiriman Cepat</div>
              <p className="text-gray-600 text-sm text-center">
                Jangkauan pengiriman luas, selalu tepat waktu dan aman sampai tujuan.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center hover:scale-105 transition group">
              <div className="text-4xl mb-3">💰</div>
              <div className="font-bold mb-1 group-hover:text-green-700 transition">Harga Terjangkau</div>
              <p className="text-gray-600 text-sm text-center">
                Harga kompetitif, cocok untuk kebutuhan rumah tangga, UMKM, Restoran, maupun skala besar.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* MENYEDIAKAN PRODUK */}
        <AnimatedSection effect="fade" className="bg-gray-50 py-16 relative overflow-hidden">
          {/* asset animasi */}
          <img
            src="https://wallpapers.com/images/hd/vibrant-green-palm-leaf-png-hssxbc5zjjtjz7us.jpg"
            alt=""
            className="absolute left-0 top-25 w-45 h-30 opacity-60 pointer-events-none animate-wiggle"
            style={{ zIndex: 0 }}
          />
          <img
            src="https://png.pngtree.com/png-clipart/20250430/original/pngtree-fresh-green-mint-leaves-isolated-on-white-with-crisp-botanical-texture-png-image_20900240.png"
            alt=""
            className="absolute right-0 bottom-0 w-40 h-40 opacity-60 pointer-events-none animate-wiggle"
            style={{ zIndex: 0 }}
          />
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 z-50">Menyediakan Produk</h2>
            <div className="grid sm:grid-cols-2 place-content-center md:grid-cols-3 gap-6">
              {categories.map((c, i) => (
                <AnimatedSection key={i} effect="up" delay={i * 0.10}>
                  <Link
                    key={i}
                    href="/product"
                    className="group"
                    style={{ display: "block", zIndex: 10 }}
                  >
                    <button
                      type="button"
                      tabIndex={0}
                      className="w-full flex flex-col items-center bg-white p-4 rounded-lg shadow hover:scale-105 transition cursor-pointer"
                      style={
                        hoveredIdx === i
                          ? {
                            outline: `4px solid ${outlineColor}`,
                            outlineOffset: "3px",
                            transition: "outline-color 0.2s"
                          }
                          : { outline: "4px solid transparent", outlineOffset: "3px" }
                      }
                      onMouseEnter={() => {
                        setHoveredIdx(i);
                        setOutlineColor(getRandomPastelColor());
                      }}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      <img src={c.icon} alt={c.name} className="w-16 h-16 mb-4" />
                      <span className="font-medium">{c.name}</span>
                    </button>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* COMPANY PROFILE SINGKAT */}
        <AnimatedSection effect="left" className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 py-16">
          <div className="md:w-1/2 text-center md:text-left space-y-4">
            <div className="text-3xl font-bold">Tentang SuperSayur</div>
            <p className="text-gray-700">
              SuperSayur adalah pemasok sayur dan daging segar terpercaya sejak 2023, melayani kebutuhan restoran,
              hotel, dan bisnis skala besar dengan kualitas terjamin.
            </p>
            <Link href="/company-profile" className="px-5 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition">
              Lebih Lanjut
            </Link>
          </div>
          <div className="md:w-1/2">
            <TiltImage
              src="https://images.unsplash.com/photo-1562147529-1f05d6533ceb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Company Profile"
              className=" mx-auto"
            />
          </div>
        </AnimatedSection>


        {/* PENGANTARAN SINGKAT */}
        <AnimatedSection effect="right" className="bg-gray-50 py-16 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <TiltImage
                src="https://images.unsplash.com/photo-1627019866926-b6030ff785fe?q=80&w=1170&auto=format&fit=crop"
                alt="Company Profile"
                className="mx-auto"
              />
            </div>
            <div className="md:w-1/2 space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold">Sistem Pengantaran Kami</h2>
              <p className="text-gray-700">
                Kami melayani Jakarta, Depok, Tangerang, Bekasi setiap hari pukul 06:00–22:00. Pesanan
                sebelum jam 17:00 dikirim hari yang sama.
              </p>
              <p className="text-gray-500 text-[14px]">
                Syarat dan ketentuan berlaku*
              </p>
              <Link href="/jangkauan-pengiriman" className="px-5 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition">
                Mengenai Pengantaran
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* OUR CUSTOMER */}
        <AnimatedSection effect="up" className="max-w-6xl mx-auto px-4 py-16 relative">
          <h2 className="text-[50px] font-bold text-center mb-8">Our Customers</h2>
          <CustomerCarousel customers={customers} />
          <div className="mt-12 text-center space-y-2">
            <ReviewCarousel />
          </div>
        </AnimatedSection>

        {/* FAQ AnimatedSection */}
        <AnimatedSection effect="fade" className="py-16 bg-gray-50 relative overflow-hidden">
          <img
            src="https://i.postimg.cc/qR1Z1Xzy/Layer-Side1.png"
            alt="Asset"
            className="absolute right-0 top-5 h-75 opacity-40 pointer-events-none animate-wiggle"
          />
          <img
            src="https://i.postimg.cc/NMz7dK0Y/Asset-4-300x.png"
            alt="Asset"
            className="absolute left-0 bottom-0 h-40 opacity-40 pointer-events-none animate-wiggle-x rotate-20 grayscale"
          />
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center mb-10 animate-fadeIn">
              Frequently Asked Questions
            </h2>
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
        </AnimatedSection>
      </div>
      <Footer />
    </>
  );
}
