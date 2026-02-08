import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import bgPink from "../assets/background/pink.png"

export default function WhyChoose() {
  const [students, setStudents] = useState(0)
  const [years, setYears] = useState(0)

  // Count-up animation
  useEffect(() => {
    let s = 0
    let y = 0

    const studentTarget = 8000
    const yearTarget = 15

    const timer = setInterval(() => {
      if (s < studentTarget) s += 120
      if (y < yearTarget) y += 1

      setStudents(Math.min(s, studentTarget))
      setYears(Math.min(y, yearTarget))

      if (s >= studentTarget && y >= yearTarget) clearInterval(timer)
    }, 40)

    return () => clearInterval(timer)
  }, [])

  const features = [
    "State-Of-The-Art Studio",
    "All Arts Under One Roof",
    "Systematic Training Structure",
    "Syllabus-Based Learning",
    "Flexible Timings",
    "Artistic Learning Environment",
    "Professional & Friendly Faculty",
    "Various Discount Offers Available",
  ]


  return (
    <main
      className="bg-white text-black min-h-screen px-4 md:px-10 py-16 md:py-24 bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={{ backgroundImage: `url(${bgPink})` }}
    >
      {/* HEADER */}
      <motion.section
        className="text-center mb-8 sm:mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-[#1F5C8C] to-[#0F2A44] bg-clip-text text-transparent">Us?</span>
        </h1>
      </motion.section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto flex flex-col gap-8">

        {/* TOP STATS */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">

          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            whileFocus={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="bg-white rounded-xl shadow-md p-3 md:p-4 min-h-[90px]
                       flex flex-col justify-center focus:outline-none"
            tabIndex={0}
          >
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F5C8C]">
              {years}+
            </div>
            <div className="text-[10px] md:text-sm font-medium tracking-wide leading-tight">
              Years of Experience
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            whileFocus={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="bg-white rounded-xl shadow-md p-3 md:p-4 min-h-[90px]
                       flex flex-col justify-center focus:outline-none"
            tabIndex={0}
          >
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F5C8C]">
              {students}+
            </div>
            <div className="text-[10px] md:text-sm font-medium tracking-wide leading-tight">
              Students Empowered Through Art
            </div>
          </motion.div>

        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{
                x: i % 2 === 0 ? -50 : 50,
                opacity: 0
              }}
              whileInView={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              whileFocus={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#F4F9FF] to-white
rounded-lg shadow-md
px-5 py-3 min-h-[56px]
flex items-center gap-3
border-l-4 border-[#1F5C8C]
focus:outline-none"

              tabIndex={0}
            >
              {/* Pointer Dot */}
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#1F5C8C] to-[#0F2A44] flex-shrink-0" />

              <span className="text-sm md:text-base font-semibold text-[#1F5C8C] tracking-wide">
                {item}
              </span>
            </motion.div>
          ))}

        </div>

      </section>
    </main>
  )
}
