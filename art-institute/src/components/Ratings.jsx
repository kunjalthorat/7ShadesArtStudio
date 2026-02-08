import { motion } from "framer-motion"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import bgOrange from "../assets/background/orange.png"

const ratings = [
  { platform: "Google Reviews", rating: "4.9 ", text: "265+ reviews" },
  { platform: "JustDial", rating: "4.8 ", text: "390+ votes" },
  { platform: "PlanetSpark", rating: "Top Rated Partner", text: "Phonics & Creative Courses" },
]

const reviews = [
  {
    name: "Pranita Deshmukh",
    stars: 5,
    text: "We enrolled our daughter in art classes at 7 Shades Art Studio and had a truly wonderful experience. The teacher is extremely cooperative, kind, and flexible with timings.",
  },
  {
    name: "Bhagywnti Kamble",
    stars: 5,
    text: "I had a wonderful experience learning Mehendi art. The teaching was clear, detailed, and very creative. Highly recommended for anyone who wants to learn professionally or as a hobby.",
  },
  {
    name: "Pooja Jha",
    stars: 5,
    text: "My son completed the Advance Certificate Course and I can see huge improvement in his drawing skills. He is more confident and creative now.",
  },
  {
    name: "Aditi Ghugare",
    stars: 5,
    text: "My daughter has completed basic certificate course at 7 shades art studio. It has been another wonderful and worthwhile experience. She got to learn so many new techniques of creating a beautiful form of art from Gitanjali ma'am. She is an amazing teacher who really puts her 100% into her work. She gives excellent guidance and at the same time ensures that you do it yourself and that the painting comes out to perfection. She is a very warm and amicable person and its nice to get a chance to learn so much from her. Thank you so much 7 shades art studio!",
  },
  {
    name: "Pranita Chaudhari",
    stars: 5,
    text: "This is the best place for kids to grow in their hobbies. My 7 years daughter joined this class and result is awesome. My daughter's interest in drawing and painting is increased due to Gitanjali mam and she got a correct direction due to mam's perfect guidance. I am very thankful of Gitanjali mam for her guidance and support.",
  },
]

export default function Ratings() {
  const trackRef1 = useRef(null)
  const trackRef2 = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth < 1024

    // Aligned with Courses speed logic
    const duration = isMobile ? 18 : (isTablet ? 26 : 40)

    const setupTrack = (track, direction = -1) => {
      if (!track) return
      const totalWidth = track.scrollWidth / 2

      // Left (-1): 0 -> -totalWidth
      // Right (1): -totalWidth -> 0
      const startX = direction === -1 ? 0 : -totalWidth
      const endX = direction === -1 ? -totalWidth : 0

      const tween = gsap.fromTo(track,
        { x: startX },
        {
          x: endX,
          duration: duration,
          ease: "linear",
          repeat: -1
        }
      )

      const pause = () => tween.pause()
      const play = () => tween.play()

      track.addEventListener("mouseenter", pause)
      track.addEventListener("mouseleave", play)
      return { tween, pause, play }
    }

    const t1 = setupTrack(trackRef1.current, -1)
    const t2 = setupTrack(trackRef2.current, 1)

    return () => {
      if (t1) {
        trackRef1.current?.removeEventListener("mouseenter", t1.pause)
        trackRef1.current?.removeEventListener("mouseleave", t1.play)
        t1.tween.kill()
      }
      if (t2) {
        trackRef2.current?.removeEventListener("mouseenter", t2.pause)
        trackRef2.current?.removeEventListener("mouseleave", t2.play)
        t2.tween.kill()
      }
    }
  }, [])

  const renderStars = (stars) => {
    return "⭐".repeat(stars)
  }

  const row1 = reviews
  const row2 = [...reviews].reverse()

  return (
    <main
      className="bg-white text-black min-h-screen py-16 bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${bgOrange})` }}
    >

      {/* RATINGS CARDS CENTERED */}
      <div className="flex items-center justify-center mb-12 w-full px-6">
        <motion.div
          className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center w-full max-w-lg md:max-w-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {ratings.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="flex-1 min-w-[180px] sm:min-w-[200px] border border-[#123754] p-3 sm:p-4 bg-[#123754] rounded-lg flex flex-col justify-center"
            >
              <h3 className="text-sm sm:text-base font-semibold mb-1 text-white">{item.platform}</h3>
              <p className="text-lg sm:text-xl font-bold mb-1 text-yellow-400">{item.rating}</p>
              <p className="text-white/80 text-[10px] sm:text-xs">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* PARENT REVIEWS - DUAL INFINITE SLIDERS */}
      <div className="flex flex-col gap-6 sm:gap-10 w-full overflow-hidden">

        {/* ROW 1: Moves Left */}
        <div className="w-full">
          <div
            ref={trackRef1}
            className="flex px-10 h-[240px] sm:h-[300px] w-max items-center gap-6 sm:gap-8"
          >
            {[...row1, ...row1].map((review, i) => (
              <ReviewCard key={`r1-${i}`} review={review} renderStars={renderStars} />
            ))}
          </div>
        </div>

        {/* ROW 2: Moves Right - Hidden on LG screens */}
        <div className="w-full lg:hidden">
          <div
            ref={trackRef2}
            className="flex px-10 h-[240px] sm:h-[320px] w-max items-center gap-6 sm:gap-8"
          >
            {[...row2, ...row2].map((review, i) => (
              <ReviewCard key={`r2-${i}`} review={review} renderStars={renderStars} />
            ))}
          </div>
        </div>

      </div>

    </main>
  )
}

function ReviewCard({ review, renderStars }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
      className="w-[260px] sm:w-[300px] h-[220px] sm:h-[280px] bg-white rounded-xl shadow-lg p-4 sm:p-5 border-t-4 border-[#1F5C8C] flex flex-col justify-between transition-shadow duration-300 flex-shrink-0"
    >
      <div>
        <p className="text-yellow-400 text-xs sm:text-sm mb-2 sm:mb-3 tracking-wide">{renderStars(review.stars)}</p>
        <p className="text-black/70 leading-relaxed text-[10px] sm:text-xs font-normal line-clamp-4">
          "{review.text}"
        </p>
      </div>
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
        <p className="text-xs sm:text-sm font-bold text-[#1F5C8C]">{review.name}</p>
      </div>
    </motion.div>
  )
}
