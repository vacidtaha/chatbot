export default function YaziyorGostergesi() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-3">
        {/* AI Avatar */}
        <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
          <img 
            src="/simge.png" 
            alt="Ercüment" 
            className="w-5 h-5 object-contain"
          />
        </div>
        
        {/* Text */}
        <span className="text-sm text-neutral-500">
          Düşünüyor...
        </span>
      </div>
    </div>
  );
}
