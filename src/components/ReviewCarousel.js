import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// Dummy data
const reviews = [
  {
    name: "Teddy Nursyafrani",
    date: "1 year ago",
    rating: 5,
    text: "Baru pertama kali coba order untuk usaha saya, ternyata sangat menguntungkan banget. Cocok ini buat jadi langganan sukse...",
  },
  {
    name: "Martha Diniyanti",
    date: "1 year ago",
    rating: 5,
    text: "Worth it banget ternyata ada supplier yang sigap dan siap untuk kita repotin. Staf tetap ramah dan proses cepat.",
  },
  {
    name: "Ika Amalia",
    date: "1 year ago",
    rating: 5,
    text: "Good job",
  },
  {
    name: "Hendri Wirawan",
    date: "2 years ago",
    rating: 4,
    text: "Pelayanan oke, variasi produk banyak, kadang promo menarik.",
  },
  {
    name: "Sari Pratiwi",
    date: "5 days ago",
    rating: 5,
    text: "Beli dalam jumlah besar untuk acara kantor, semua fresh dan rapi.",
  },
  {
    name: "Budi Santoso",
    date: "1 month ago",
    rating: 4,
    text: "Lokasi strategis, pelayan ramah, area bersih.",
  },
  {
    name: "Nina Rachmawati",
    date: "2 weeks ago",
    rating: 5,
    text: "Order via WA gampang, pengantaran cepat, produk tidak pernah kecewa.",
  },
  {
    name: "Rian Aditya",
    date: "3 months ago",
    rating: 5,
    text: "Langganan bulanan buat restoran. Sering ada diskon. Support adminnya cepat.",
  },
  {
    name: "Mira Febrianti",
    date: "8 months ago",
    rating: 5,
    text: "Kualitas buah dan sayur fresh. Harga terjangkau.",
  },
  {
    name: "Dwi Cahya",
    date: "1 year ago",
    rating: 5,
    text: "Tempatnya luas, nyaman, bisa mesen di mesin Self order kios, posisi sebelah SPBU. Produknya segar, pengiriman tepat waktu. Sangat recommended untuk belanja keluarga.",
  },
];

// Card avatar
function ReviewAvatar({ name }) {
  return (
    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-600 border-2 border-green-200">
      {name[0]}
    </div>
  );
}

// Card star
function StarBar({ rating }) {
  return (
    <div className="flex gap-0.5 mb-2">
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg key={idx} viewBox="0 0 20 20" className="w-5 h-5" fill={idx < rating ? "#FBC02D" : "#E2E8F0"}>
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.564-.955L10 0l2.947 5.955 6.564.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

// Card
function ReviewCard({ review }) {
  const [expand, setExpand] = useState(false);
  const maxLen = 130;
  const isLong = review.text.length > maxLen;
  const showText = !expand && isLong ? review.text.slice(0, maxLen) + "..." : review.text;

  return (
    <div className="bg-white rounded-2xl shadow px-8 py-6 mx-2 flex flex-col items-center text-center min-h-[280px] max-w-md mx-auto">
      <ReviewAvatar name={review.name} />
      <div className="mt-4 font-bold text-lg text-black">{review.name}</div>
      <div className="text-sm text-gray-400 mb-2">{review.date}</div>
      <StarBar rating={review.rating} />
      <div className="text-gray-700 mt-1 mb-2">
        {showText}
        {isLong && (
          <button className="ml-1 text-green-600 hover:underline text-sm" onClick={() => setExpand(v => !v)}>
            {expand ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}

// Rating bar top
function RatingBar({ avg = 4.75, total = 326}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow p-6 mb-10 w-full">
      <div className="flex items-center gap-4">
        <img
          src="https://i.postimg.cc/4NJNWBrf/Logo-Super-Sayur-300x.png"
          alt="Logo"
          className="w-8 h-8"
        />
        <span className="font-bold text-xl md:text-2xl">"All Customer are Satisfied"</span>
        <div className="flex sm-4">
          {Array.from({ length: 1 }).map((_, i) => (
            <svg key={i} viewBox="0 0 20 20" className="w-6 h-6" fill={i < avg ? "#FBC02D" : "#E2E8F0"}>
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.564-.955L10 0l2.947 5.955 6.564.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
        <span className="ml-2 font-semibold text-lg">{avg}</span>
        <span className="text-gray-600 ml-1">out of {reviews.length} based on {total.toLocaleString()} reviews</span>
      </div>
      <a
        href="https://www.google.com/maps/place/SuperSayur/"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden mt-4 md:mt-0 px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow transition"
      >
        Review us on Google
      </a>
    </div>
  );
}

export default function ReviewSection() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 24 },
    breakpoints: {
      "(max-width: 1200px)": { slides: { perView: 3, spacing: 20 } },
      "(max-width: 900px)": { slides: { perView: 2, spacing: 16 } },
      "(max-width: 600px)": { slides: { perView: 1, spacing: 12 } },
    },
  });

  return (
    <section className="bg-green-50 py-12 px-2">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">What Our Customers Say</h2>
        <RatingBar />
        <div ref={sliderRef} className="keen-slider mb-5">
          {reviews.map((review, idx) => (
            <div className="keen-slider__slide" key={idx}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
