import Loader from "./Loader";

export default function LoadingOverlay({ show = false, children }) {
  return (
    <div className="relative">
      {children}
      {show && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex flex-col items-center justify-center z-[1200] transition-all">
          <Loader />
          <div className="mt-5 text-green-700 text-lg font-semibold animate-pulse">Sedang memuat...</div>
        </div>
      )}
    </div>
  );
}
