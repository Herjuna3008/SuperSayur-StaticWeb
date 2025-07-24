import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsapp() {
  const [showDialog, setShowDialog] = useState(false);
  const [shake, setShake] = useState(false);
  const intervalRef = useRef(null);

  // Efek getar tiap beberapa detik
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <>
      {/* Tombol WhatsApp Bulat */}
      <button
        aria-label="WhatsApp"
        className={`
          fixed z-50 bottom-6 right-6 bg-green-500 rounded-full shadow-lg 
          w-20 h-20 flex items-center justify-center text-white text-4xl 
          transition-all duration-300
          ${shake ? "animate-shake" : ""}
        `}
        onClick={() => setShowDialog(true)}
        style={{ boxShadow: "0 6px 24px 0 rgba(44, 62, 80, 0.17)" }}
      >
        <FaWhatsapp />
      </button>
      {/* Popup Dialog */}
      {showDialog && (
        <div className="fixed z-50 inset-0 flex items-end justify-end bg-black/20">
          <div className="mb-32 mr-8 bg-white rounded-xl shadow-xl p-6 w-72 animate-fadeInUp">
            <div className="flex items-center gap-2 mb-4">
              <FaWhatsapp className="text-green-500 text-2xl" />
              <span className="font-semibold text-lg">Mari mengobrol dengan admin</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Klik tombol di bawah ini untuk langsung chat admin via WhatsApp.
            </p>
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-full font-semibold transition"
            >
              Chat Sekarang
            </a>
            <button
              className="mt-3 text-xs text-gray-500 hover:underline w-full"
              onClick={() => setShowDialog(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Tailwind Custom Animation */}
      <style jsx>{`
        .animate-shake {
          animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.35s cubic-bezier(.39,.575,.565,1) both;
        }
        @keyframes fadeInUp {
          0% { opacity:0; transform: translateY(40px);}
          100% { opacity:1; transform: translateY(0);}
        }
      `}</style>
    </>
  );
}
