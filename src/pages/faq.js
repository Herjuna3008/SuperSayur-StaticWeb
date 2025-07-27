import { NextSeo } from 'next-seo';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQItem from "@/components/FAQItem";

// Contoh data FAQ (nanti bisa fetch dari Supabase)
const FAQ_LIST = [
  {
    question: "Apakah pengiriman bisa ke seluruh Indonesia?",
    answer:
      "Saat ini pengiriman kami mencakup area Jadetabek (Jakarta, Depok, Tangerang, Bekasi). Hubungi admin untuk info pengiriman luar pulau.",
  },
  {
    question: "Mengapa saya tidak bisa melihat harga?",
    answer:
      "Untuk harga dan update stok bisa ditanyakan kepada Admin kami",
  },
  {
    question: "Apakah harga bisa negosiasi untuk pembelian dalam jumlah besar?",
    answer:
      "Tentu! Untuk pemesanan dalam skala besar atau kebutuhan vendor, silakan hubungi kami langsung untuk penawaran harga khusus.",
  },
  {
    question: "Bagaimana cara pesan produk di website ini?",
    answer:
      "Lihat produk yang diinginkan, lalu klik tombol 'WhatsApp' pada pojok kiri bawah layar anda. Tim kami akan memproses pesanan Anda secepatnya.",
  },
  {
    question: "Berapa lama estimasi pengiriman?",
    answer:
      "Pengiriman akan dilakukan 1 Hari setelah melakukan Order melalui Whatsapp.",
  },
  {
    question: "Apakah pemabayaran dapat dilakukan dengan sistem cicilan/tempo?",
    answer: "Ya tentu saja pembayaran dapat dilakukan dengan sistem tempo, hubungi admin kami untuk info lebih lanjut."
  }
];

export default function FAQPage() {
  return (
    <>
      <NextSeo
        title="FAQ"
        canonical="https://www.supersayur.com/faq"
        description="Pertanyaan yang sering diajukan mengenai layanan SuperSayur."
      />
      <Navbar />
      <main className="min-h-screen bg-white py-16 animate-fadeIn">
        <section className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h1>
          <div className="divide-y divide-gray-200">
            {FAQ_LIST.map((item, idx) => (
              <FAQItem key={idx} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
