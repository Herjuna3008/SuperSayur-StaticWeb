import { useState } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { NextSeo, LocalBusinessJsonLd } from 'next-seo';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomerCarousel from "@/components/CustomerCarousel";
import TiltImage from "@/components/TiltImage";
import AnimatedSection from "@/components/AnimatedSection";

const ReviewCarousel = dynamic(() => import('@/components/ReviewCarousel'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const heroImages = [
  "https://ik.imagekit.io/hexocdn/ChatGPT%20Image%20Jul%2027,%202025,%2007_28_07%20AM.png?updatedAt=1753576147434",
  "https://ik.imagekit.io/hexocdn/ChatGPT%20Image%20Jul%2027,%202025,%2007_26_07%20AM.png?updatedAt=1753576147511"
];

const categories = [
  { name: "Sayur", icon: "https://cdn0.iconfinder.com/data/icons/goofy-international-food-color/96/Salad-512.png", key: "sayuran" },
  { name: "Daging Ayam", icon: "https://cdn0.iconfinder.com/data/icons/weight-loss-1/64/meat-protein-keto_diet-ketogenic_diet-beef-poultry-bacon-512.png", key: "daging" },
  { name: "Seafood", icon: "https://cdn1.iconfinder.com/data/icons/animal-kingdom-vol-2/512/catship_carp_fish_seafood-1024.png", key: "seafood" }
];

const customers = [
  {
    name: "BOXMIE",
    logo: "https://images.glints.com/unsafe/glints-dashboard.oss-ap-southeast-1.aliyuncs.com/company-logo/125139095b2ccecdc167c341c52c774d.jpg"
  },
  {
    name: "Bakpao Legend Baozi",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRje52oDVLpynwUpaUgcFsk54Ns2qTvntviGA&s"
  },
  {
    name: "SeiDjiwa",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIMBGw6d8GdlNpOpNRnIgSuJKnrFPJ8ulYfg&s"
  },
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
      <NextSeo
        title="Supplier Sayur & Daging Segar"
        description="Pemasok sayur, daging, dan seafood berkualitas untuk restoran, hotel, dan retailer."
        canonical="https://www.supersayur.com/"
      />
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
            <h1 className="text-5xl md:text-8xl font-extrabold mb-4 drop-shadow-lg ">SuperSayur</h1>
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
                    href={`/product#${c.key}`}
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
              SuperSayur adalah pemasok sayur dan daging segar terpercaya sejak 2004, melayani kebutuhan restoran,
              hotel, dan bisnis skala besar dengan kualitas terjamin.
            </p>
            <Link href="/company-profile" className="px-5 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition">
              Lebih Lanjut
            </Link>
          </div>
          <div className="md:w-1/2">
            <TiltImage
              src="https://ik.imagekit.io/hexocdn/ChatGPT%20Image%20Jul%2027,%202025,%2005_13_59%20AM.png?updatedAt=1753571168863"
              alt="SuperSayur Company Profile"
              className=" mx-auto"
            />
          </div>
        </AnimatedSection>


        {/* PENGANTARAN SINGKAT */}
        <AnimatedSection effect="right" className="bg-gray-50 py-16 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <TiltImage
                src="https://ik.imagekit.io/hexocdn/ChatGPT%20Image%20Jul%2027,%202025,%2005_25_38%20AM.png?updatedAt=1753571168672"
                alt="SuperSayur Delivery"
                className="mx-auto"
              />
            </div>
            <div className="md:w-1/2 space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold">Sistem Pengantaran Kami</h2>
              <p className="text-gray-700">
                Kami melayani Jakarta, Depok, Tangerang, Bekasi setiap hari pukul 09:00–17:00. Pesanan
                dilakukan setelah melakukan Pre-Order terlebih dahulu dan dikirim 1 hari setelah pemesanan.
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
            src="/images/LayerSide1.png"
            alt="Asset"
            className="absolute right-0 top-5 h-75 opacity-40 pointer-events-none animate-wiggle"
          />
          <img
            src="https://ik.imagekit.io/hexocdn/Asset%204@300x.png?updatedAt=1753571167158"
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
