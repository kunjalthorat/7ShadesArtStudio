import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import heroVideo from "../assets/videos/Hero_video.mp4"
import heroPoster from "../assets/team/Hero.jpeg"

export default function Hero() {
  const videoRef = useRef(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const navigate = useNavigate()

  const handleNavigate = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    navigate(path)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0F2A44]">

      {/* Placeholder Poster Image (Landed Instantly) */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isVideoReady ? 'opacity-0' : 'opacity-100'}`}
      >
        <img
          src={heroPoster}
          alt="Hero Placeholder"
          className="w-full h-full object-cover brightness-75"
        />
      </div>

      {/* Background Video (Buffers and Fades In) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        controlsList="nodownload"
        disablePictureInPicture
        onCanPlayThrough={() => setIsVideoReady(true)}
        className={`absolute inset-0 w-full h-full object-cover brightness-90 z-[1] transition-opacity duration-1000 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
        preload="auto"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay (Consistently over both) */}
      <div className="absolute inset-0 bg-black/50 z-[2]" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 sm:px-10 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-5xl"
        >
          <h1 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl 
                 font-light tracking-widest mb-4 sm:mb-6 uppercase leading-tight">
            Unleash the Artist Within You
          </h1>

          <p className="text-white/80 text-sm sm:text-lg md:text-xl mb-6 sm:mb-10 max-w-3xl mx-auto px-4 sm:px-0">
            Professional art and music classes for all ages at
            7 Shades Art Studio, Punawale.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-8 sm:px-0">

            <motion.button
              onClick={() => handleNavigate('/courses-main')}
              className="cursor-pointer relative overflow-hidden border border-white/40 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm text-white group">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                Explore Our Courses
              </span>
              <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </motion.button>

            <motion.button
              onClick={() => handleNavigate('/contact')}
              className="cursor-pointer relative overflow-hidden border border-white/40 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm text-white group">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                Enquire Now
              </span>
              <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </motion.button>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
