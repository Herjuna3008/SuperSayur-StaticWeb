export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform transition-transform hover:scale-105 duration-300 animate-fadeIn group">
      <div className="relative">
        <img
          src={product.image_url || "https://source.unsplash.com/400x300/?vegetable"}
          alt={product.name}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <div className="flex items-center justify-between">
        </div>
      </div>
    </div>
  );
}
