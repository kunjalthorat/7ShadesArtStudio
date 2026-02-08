import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import {
  FaUsers,
  FaStar,
  FaPalette,
} from "react-icons/fa"
import heroImg from "../assets/team/Hero.jpeg"
import founderImg from "../assets/team/founder.jpeg"
import bgGreen from "../assets/background/green.png"

/* ----------------------------------------
   Lazy Image
-----------------------------------------*/
const LazyImage = ({ src, alt, ...props }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    {...props}
  />
)

/* ----------------------------------------
   PAGE
-----------------------------------------*/
export default function About() {

  /* COUNT-UP STATS */
  const [students, setStudents] = useState(0)
  const [years, setYears] = useState(0)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    let s = 0, y = 0, r = 0

    const timer = setInterval(() => {
      if (s < 8000) s += 120
      if (y < 15) y += 1
      if (r < 48) r += 1

      setStudents(Math.min(s, 8000))
      setYears(Math.min(y, 15))
      setRating(Math.min(r, 48))

      if (s >= 8000 && y >= 15 && r >= 48) clearInterval(timer)
    }, 40)

    return () => clearInterval(timer)
  }, [])

  return (
    <main
      className="min-h-screen bg-white text-black px-6 md:px-10 py-28
                 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgGreen})` }}
    >

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center mb-24">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            About
            <span className="block bg-gradient-to-r from-[#1F5C8C] to-[#0F2A44]
              bg-clip-text text-transparent">
              7 Shades Art Studio
            </span>
          </h1>

          <p className="text-base sm:text-lg text-black/75 leading-relaxed">
            7 Shades Art Studio in Punawale, PCMC, Pune is a premier destination for
            hobby enthusiasts of all ages. <b>Established in 2010</b>, we provide
            enriching, hands-on learning experiences in art, music, calligraphy,
            and skill development guided by passionate instructors in a warm and
            supportive environment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <LazyImage
            src={heroImg}
            alt="7 Shades Art Studio - Premier Art Institute in PCMC"
            className="w-full h-[250px] sm:h-[360px] object-cover rounded-2xl shadow-md"
          />
        </motion.div>

      </section>

      {/* ================================================= */}
      {/* INFO MASTER CARD (TEXT ONLY) */}
      {/* ================================================= */}

      <section className="max-w-5xl mx-auto mb-28">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-md p-10 space-y-10"
        >
          <h3 className="text-xl sm:text-2xl font-bold">Overview</h3>

          <p className="text-base sm:text-lg text-black/80 leading-relaxed">
            7 Shades Art Studio in Punawale, PCMC, Pune has grown into a trusted creative
            learning hub since <b>2010</b>. What started as a small
            passion-driven initiative has evolved into a vibrant studio where
            creativity, self-expression, and confidence are nurtured every day.
          </p>

          <p className="text-base sm:text-lg text-black/80 leading-relaxed">
            We offer a diverse range of hobby and skill-based programs designed
            for children, teenagers, and adults. Our classes are structured yet
            enjoyable, ensuring students learn strong fundamentals while freely
            exploring their imagination.
          </p>

          <p className="text-lg text-black/80 leading-relaxed">
            Conveniently located near Gaikwad Nagar, the studio is easily
            accessible from all parts of Pune, making it an ideal destination
            for families seeking high-quality creative education.
          </p>


          <p className="text-lg text-black/80 leading-relaxed">
            7 Shades Art Studio is a hub for hobby enthusiasts who want to explore
            drawing, painting, music, calligraphy, and creative skill
            development. Our programs cater to beginners as well as advanced
            learners, with personal attention given to every student.
          </p>

          <h3 className="text-2xl font-bold">What We Offer</h3>

          <p className="text-lg text-black/80 leading-relaxed">
            Arts Classes including Canvas Painting, Charcoal Painting, Fabric
            Painting, Drawing, Coloring, and Fine Arts.
          </p>

          <p className="text-lg text-black/80 leading-relaxed">
            Calligraphy & Handwriting programs such as Hindi Handwriting, English
            Handwriting, Hindi Calligraphy, and handwriting improvement.
          </p>

          <p className="text-lg text-black/80 leading-relaxed">
            Music Classes covering Classical Music, Guitar, and Instrumental
            training with both theory and practical sessions.
          </p>

          <p className="text-lg text-black/80 leading-relaxed">
            Special Courses including Phonics, Rubik’s Cube, Handwriting Expert,
            and other skill-focused programs.
          </p>

        </motion.div>

      </section>

      {/* ================================================= */}
      {/* FOUNDER CARD */}
      {/* ================================================= */}

      <section className="max-w-5xl mx-auto mb-28">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-md
                     grid md:grid-cols-2 gap-10
                     items-center p-8"
        >

          <LazyImage
            src={founderImg}
            alt="Founder of 7 Shades Art Studio Pune"
            className="w-full h-[250px] sm:h-[320px] object-cover rounded-xl"
          />

          <div>
            <span className="inline-block mb-3 px-4 py-1 rounded-full
                             bg-[#1F5C8C]/10 text-[#1F5C8C]
                             text-sm font-semibold">
              Founder & Owner
            </span>

            <h3 className="text-2xl font-bold mb-4">
              7 Shades Art Studio
            </h3>

            <p className="text-black/75 leading-relaxed mb-4">
              Founded by a passionate art educator, the studio was created to
              make creative education accessible, structured, and enjoyable.
            </p>

            <p className="text-black/75 leading-relaxed">
              The focus remains on nurturing talent, building confidence, and
              guiding learners toward continuous creative growth.
            </p>
          </div>

        </motion.div>

      </section>

      {/* ================================================= */}
      {/* TRUST STATS */}
      {/* ================================================= */}

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        <Stat icon={<FaUsers />} value={`${students}+`} label="Students Trained" />
        <Stat icon={<FaPalette />} value={`${years}+`} label="Years of Experience" />
        <Stat icon={<FaStar />} value={`${rating / 10}★`} label="Average Rating" />

      </section>

    </main>
  )
}

/* ----------------------------------------
   STAT COMPONENT
-----------------------------------------*/

function Stat({ icon, value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="bg-white rounded-xl shadow-md p-8 text-center"
    >
      <div className="text-3xl text-[#1F5C8C] mb-2 flex justify-center">
        {icon}
      </div>
      <div className="text-3xl font-bold text-[#1F5C8C]">{value}</div>
      <div className="text-sm text-black/70">{label}</div>
    </motion.div>
  )
}
