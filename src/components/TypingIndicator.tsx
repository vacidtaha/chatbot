export default function YaziyorGostergesi() {
  return (
    <div className="flex gap-4">
      {/* Avatar - Logo */}
      <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0 p-1.5">
        <img 
          src="/simge.png" 
          alt="Taytech AI" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="bg-neutral-800/50 rounded-2xl px-5 py-4 inline-block">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce-dot" style={{ animationDelay: '0s' }} />
            <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce-dot" style={{ animationDelay: '0.16s' }} />
            <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce-dot" style={{ animationDelay: '0.32s' }} />
          </div>
        </div>
        <div className="text-xs text-neutral-600 mt-2.5">
          Yanıt hazırlanıyor...
        </div>
      </div>
    </div>
  );
}
