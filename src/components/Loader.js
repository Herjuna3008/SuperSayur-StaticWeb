export default function Loader({ className = "" }) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-14 h-14 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  