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
  const trackRef = useRef(null)
  const navigate = useNavigate()
  const backgroundImage = `url(${bgYellow})`

  const handleCourseClick = (categoryTitle) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    navigate(`/courses-main?category=${encodeURIComponent(categoryTitle)}`)
  }

  useEffect(() => {
    const track = trackRef.current
    const totalWidth = track.scrollWidth / 2

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 25,
      ease: "linear",
      repeat: -1
    })

    track.addEventListener("mouseenter", () => tween.pause())
    track.addEventListener("mouseleave", () => tween.play())

    return () => tween.kill()
  }, [])

  return (
    <section
      className="relative min-h-screen bg-[#f2f2f2] text-black overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage }}
    >
      {/* TITLE */}
      <div className="text-center py-6 sm:py-8">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-[#1F5C8C] to-[#0F2A44] bg-clip-text text-transparent">Our Courses</h1>
      </div>

      {/* CENTERED SLIDER */}
      <div className="h-full items-center">
        <div
          ref={trackRef}
          className="flex px-10 h-[320px] w-max items-center gap-8"
        >
          {[...categories, ...categories].map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => handleCourseClick(cat.title)}
              className="cursor-pointer w-[260px] sm:w-[300px] h-[260px] sm:h-[280px] bg-white rounded-xl overflow-hidden shadow-md flex flex-col"
            >

              {/* Image */}
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="p-5 flex flex-col flex-1 justify-between">

                <h3 className="text-base font-extrabold uppercase tracking-wide leading-tight line-clamp-2">
                  {cat.title}
                </h3>

                <p className="text-black/70 text-xs font-normal leading-relaxed line-clamp-4">
                  {cat.desc}
                </p>

              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* BOTTOM BANNER */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2
        max-w-5xl w-[90%]
        bg-gradient-to-r from-[#1F5C8C] to-[#0F2A44]
        text-white
        px-4 md:px-8 py-3 md:py-4
        text-xs sm:text-base md:text-lg
        tracking-wide font-semibold
        shadow-2xl
        text-center leading-tight rounded-lg"
      >
        ELEMENTARY & INTERMEDIATE GRADE EXAM PREPARATION (GOVT. OF MAHARASHTRA)
      </motion.div>

    </section>
  )
}
