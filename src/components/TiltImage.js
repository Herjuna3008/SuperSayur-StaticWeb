import { useRef, useState } from "react";

export default function TiltImage({
  src,
  alt,
  className = "",
  maxTilt = 20,
  glowColor = "rgba(16,200,100,1)",
  ...props
}) {
  const imgRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 }); // in percent

  function handleMouseMove(e) {
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;
    // For shadow/glow position (in %)
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    setTilt({ x: -tiltX, y: tiltY });
    setGlow({ x: glowX, y: glowY });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setGlow({ x: 50, y: 50 });
  }

  return (
    <div
      ref={imgRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block relative transition-transform duration-300 [perspective:900px] cursor-pointer ${className}`}
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.04)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.6s cubic-bezier(.03,.98,.52,.99)" : "transform 0.12s",
      }}
      {...props}
    >
      {/* GLOW/SHADOW */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${glowColor} 0%, transparent 65%)`,
          filter: "blur(12px)",
          zIndex: 2,
        }}
      />
      <img
        src={src}
        alt={alt}
        className="block w-full h-full rounded-xl shadow-lg relative z-10 pointer-events-none select-none"
        draggable={false}
      />
    </div>
  );
}
