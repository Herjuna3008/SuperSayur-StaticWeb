import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef } from "react";

export default function CustomerCarousel({ customers }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 24,
    },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 3, spacing: 12 } },
      "(max-width: 640px)": { slides: { perView: 2, spacing: 6 } },
      "(max-width: 450px)": { slides: { perView: 1, spacing: 3 } },
    },
    drag: true,
    mode: "free-snap",
    renderMode: "performance",
    autoplay: true,
    created(slider) {
      // autoplay manual
      let timeout;
      function next() {
        slider.next();
        timeout = setTimeout(next, 2000);
      }
      slider.container.addEventListener("mouseenter", () => clearTimeout(timeout));
      slider.container.addEventListener("mouseleave", () => next());
      next();
    },
  });

  return (
    <div className="w-full py-8">
      <h3 className="text-xl font-bold text-center mb-6">
        Telah Dipercaya lebih dari 1 Dekade Menemani 1.000++ Pelanggan
      </h3>
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => instanceRef.current?.prev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-green-100 rounded-full p-2 shadow border"
        >
          <FiChevronLeft size={28} />
        </button>
        {/* Carousel */}
        <div ref={sliderRef} className="keen-slider flex">
          {customers.map((cus, i) => (
            <div
              key={i}
              className="keen-slider__slide flex justify-center items-center"
            >
              <div className="bg-white rounded-2xl shadow px-8 py-4 flex justify-center items-center w-52 h-28 transition hover:shadow-xl">
                <img
                  src={cus.logo}
                  alt={cus.name}
                  className="max-h-16 max-w-[140px] object-contain grayscale"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Right Button */}
        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-green-100 rounded-full p-2 shadow border"
        >
          <FiChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
