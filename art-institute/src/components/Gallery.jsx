import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

/* Auto import every image inside gallery folder */
const images = Object.values(
  import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp}", {
    eager: true,
    as: "url",
  })
)

function GalleryItem({ src, index, onSelect }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: (index % 12) * 0.05,
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="mb-5 break-inside-avoid cursor-pointer group relative"
      onClick={() => onSelect(index)}
    >
      {/* SHIMMER SKELETON */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-gray-300 animate-spin" />
        </div>
      )}

      <img
        src={src}
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto rounded-xl shadow-sm transition-all duration-700 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        alt={`Creative student artwork ${index + 1} at 7 Shades Art Studio Pune`}
      />

      {/* SECURITY OVERLAY - STOPS RIGHT CLICK & DRAG ON IMAGE SOURCE */}
      <div className="absolute inset-0 z-10 select-none bg-transparent" onContextMenu={(e) => e.preventDefault()} />

      {/* HOVER OVERLAY Decoration */}
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-20" />
    </motion.div>
  )
}

export default function Gallery() {
  const [active, setActive] = useState(null)

  const close = () => setActive(null)
  const prev = () =>
    setActive((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () =>
    setActive((i) => (i === images.length - 1 ? 0 : i + 1))

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (active === null) return
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [active])

  return (
    <section className="min-h-screen bg-white px-4 sm:px-6 pt-24 pb-12 overflow-x-hidden">

      {/* PAGE HEADER */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#1F5C8C] to-[#0F2A44] bg-clip-text text-transparent pb-2 px-2 mb-4 hover:opacity-90 transition-opacity inline-block"
        >
          Art Gallery
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          className="h-1.5 bg-yellow-400 mx-auto rounded-full"
        />
      </div>

      {/* MASONRY COLLAGE */}
      <div
        className="
          columns-1
          sm:columns-2
          md:columns-3
          lg:columns-4
          gap-5
          max-w-7xl
          mx-auto
        "
      >
        {images.map((src, i) => (
          <GalleryItem key={i} src={src} index={i} onSelect={setActive} />
        ))}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CLOSE */}
            <button
              onClick={close}
              className="cursor-pointer absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
            >
              <X size={36} />
            </button>

            {/* PREV */}
            <button
              onClick={prev}
              className="cursor-pointer absolute left-4 sm:left-6 text-white/50 hover:text-white transition-all hover:scale-110 z-[110]"
            >
              <ChevronLeft size={48} />
            </button>

            {/* IMAGE CONTAINER */}
            <div className="relative flex items-center justify-center w-full h-full max-w-7xl max-h-[90vh]">
              <motion.img
                key={active}
                src={images[active]}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl border border-white/10"
                initial={{ scale: 0.9, opacity: 0, x: 20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.9, opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              {/* Invisible Shield */}
              <div
                className="absolute inset-0 z-[120] cursor-default bg-transparent"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>

            {/* NEXT */}
            <button
              onClick={next}
              className="cursor-pointer absolute right-4 sm:right-6 text-white/50 hover:text-white transition-all hover:scale-110 z-[110]"
            >
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
