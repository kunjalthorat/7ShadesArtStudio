import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

/* Auto import every image inside gallery folder */
const images = Object.values(
  import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp}", {
    eager: true,
    as: "url",
  })
)

export default function Gallery() {
  const [active, setActive] = useState(null)

  const close = () => setActive(null)
  const prev = () =>
    setActive((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () =>
    setActive((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <section className="min-h-screen bg-white px-4 sm:px-6 pt-20 sm:pt-24 pb-12">

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
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="mb-5 break-inside-avoid cursor-pointer"
            onClick={() => setActive(i)}
          >
            <img
              src={src}
              loading="lazy"
              className="w-full h-auto rounded-xl"
              alt={`Gallery ${i + 1}`}
            />
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            {/* CLOSE */}
            <button
              onClick={close}
              className="cursor-pointer absolute top-6 right-6 text-white"
            >
              <X size={34} />
            </button>

            {/* PREV */}
            <button
              onClick={prev}
              className="cursor-pointer absolute left-6 text-white"
            >
              <ChevronLeft size={40} />
            </button>

            {/* IMAGE */}
            <motion.img
              key={active}
              src={images[active]}
              className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* NEXT */}
            <button
              onClick={next}
              className="cursor-pointer absolute right-6 text-white"
            >
              <ChevronRight size={40} />
            </button>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
