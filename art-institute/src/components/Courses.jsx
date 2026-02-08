import { useEffect, useRef } from "react"
import gsap from "gsap"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import bgYellow from "../assets/background/yellow.png"
import paintingImg from "../assets/courses/painting.png"
import craftImg from "../assets/courses/craft.png"
import handwritingImg from "../assets/courses/handwriting.png"
import pianoImg from "../assets/courses/piano.png"
import abacusImg from "../assets/courses/abacus.png"
import phonicsImg from "../assets/courses/phonics.jpg"
import hobbyImg from "../assets/courses/hobby.png"

const categories = [
  {
    title: "Drawing & Painting",
    image: paintingImg,
    desc: "Master foundational sketching, portrait, and drawing techniques."
  },
  {
    title: "Art & Craft",
    image: craftImg,
    desc: "Master foundational sketching, portrait, and drawing techniques."
  },
  {
    title: "Handwriting Improvement & Calligraphy",
    image: handwritingImg,
    desc: "Improve clarity, speed, and presentation in multiple languages."
  },
  {
    title: "Singing & Music",
    image: pianoImg,
    desc: "Learn Piano and Guitar with guided, confidence-building lessons."
  },
  {
    title: "Abacus & Vedic Maths",
    image: abacusImg,
    desc: "Build strong mental calculation and logical skills through structured Abacus and Vedic training."
  },
  {
    title: "Phonics Learning",
    image: phonicsImg,
    desc: "Improve clarity, speed, and presentation in multiple languages."
  },
  {
    title: "Hobby Classes",
    image: hobbyImg,
    desc: "Prepare for certified art exams with focused skill-based courses."
  }
]

export default function Courses() {
  const trackRef1 = useRef(null)
  const trackRef2 = useRef(null)
  const navigate = useNavigate()
  const backgroundImage = `url(${bgYellow})`

  const handleCourseClick = (categoryTitle) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    navigate(`/courses-main?category=${encodeURIComponent(categoryTitle)}`)
  }

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth < 1024

    // Speed is inversely proportional to width (smaller width = faster/shorter duration)
    // Mobile: 16s, Tablet: 22s, Desktop: 30s
    const speed = isMobile ? 16 : (isTablet ? 22 : 30)

    const setupTrack = (track, direction = -1) => {
      if (!track) return
      const totalWidth = track.scrollWidth / 2

      // Normalize start and end based on direction to ensure same distance/speed
      // Left (-1): 0 -> -totalWidth
      // Right (1): -totalWidth -> 0
      const startX = direction === -1 ? 0 : -totalWidth
      const endX = direction === -1 ? -totalWidth : 0

      const tween = gsap.fromTo(track,
        { x: startX },
        {
          x: endX,
          duration: speed,
          ease: "linear",
          repeat: -1
        }
      )

      track.addEventListener("mouseenter", () => tween.pause())
      track.addEventListener("mouseleave", () => tween.play())
      return tween
    }

    const t1 = setupTrack(trackRef1.current, -1)
    const t2 = setupTrack(trackRef2.current, 1)

    return () => {
      if (t1) t1.kill()
      if (t2) t2.kill()
    }
  }, [])

  // Split categories for the two rows if needed, or just use same for both
  const row1 = categories
  const row2 = [...categories].reverse()

  return (
    <section
      className="relative min-h-screen bg-[#f2f2f2] text-black overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col justify-center py-12"
      style={{ backgroundImage }}
    >
      {/* TITLE */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-[#1F5C8C] to-[#0F2A44] bg-clip-text text-transparent">Creative Courses</h2>
      </div>

      {/* DUAL SLIDERS */}
      <div className="flex flex-col gap-6 sm:gap-10">

        {/* ROW 1: Moves Left */}
        <div className="w-full overflow-hidden">
          <div
            ref={trackRef1}
            className="flex px-10 h-[260px] sm:h-[300px] w-max items-center gap-6 sm:gap-8"
          >
            {[...row1, ...row1].map((cat, i) => (
              <motion.div
                key={`r1-${i}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => handleCourseClick(cat.title)}
                className="cursor-pointer w-[240px] sm:w-[300px] h-[220px] sm:h-[280px] bg-white rounded-xl overflow-hidden shadow-md flex flex-col flex-shrink-0"
              >
                <div className="w-full aspect-[16/9] overflow-hidden">
                  <img src={cat.image} alt={cat.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex flex-col flex-1 justify-center">
                  <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-tight leading-tight line-clamp-1">{cat.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ROW 2: Moves Right (Visible on mobile/tablet, hidden on large screens) */}
        <div className="w-full overflow-hidden lg:hidden">
          <div
            ref={trackRef2}
            className="flex px-10 h-[260px] sm:h-[300px] w-max items-center gap-6 sm:gap-8"
          >
            {[...row2, ...row2].map((cat, i) => (
              <motion.div
                key={`r2-${i}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => handleCourseClick(cat.title)}
                className="cursor-pointer w-[240px] sm:w-[300px] h-[220px] sm:h-[280px] bg-white rounded-xl overflow-hidden shadow-md flex flex-col flex-shrink-0"
              >
                <div className="w-full aspect-[16/9] overflow-hidden">
                  <img src={cat.image} alt={cat.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex flex-col flex-1 justify-center">
                  <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-tight leading-tight line-clamp-1">{cat.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM BANNER */}
      <div className="mt-12 flex justify-center px-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="max-w-5xl w-full
          bg-gradient-to-r from-[#1F5C8C] to-[#0F2A44]
          text-white
          px-6 py-4
          text-xs sm:text-sm md:text-base
          tracking-wider font-bold
          shadow-xl
          text-center leading-tight rounded-xl"
        >
          ELEMENTARY & INTERMEDIATE GRADE EXAM PREPARATION (GOVT. OF MAHARASHTRA)
        </motion.div>
      </div>

    </section>
  )
}
