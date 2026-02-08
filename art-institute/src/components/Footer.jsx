import {
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaYoutube,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const navigate = useNavigate()

  return (
    <footer className="bg-[#123754] text-white px-4 md:px-10 overflow-x-hidden">

      {/* ================= MAIN GRID ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 pt-16 sm:pt-24 pb-12 sm:pb-16">

        {/* BRAND */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">7 Shades Art Studio</h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Inspiring creativity through art.
            A space where imagination meets skill and every artist finds their voice.
          </p>
        </div>

        {/* VISIT – ADDRESS */}
        <div>
          <h3 className="font-semibold mb-4">Visit Us</h3>
          <div className="flex gap-2 items-start text-white/70 text-sm">
            <FaMapMarkerAlt className="mt-1 text-white/80" />
            <span>
              Shop No. 319, Second Floor,
              18 Latitude Commercial Mall,
              Punawale, Pune – 411033,
              Maharashtra, India
            </span>
          </div>
        </div>

        {/* VISIT – TIMING */}
        <div>
          <h3 className="font-semibold mb-4">Visiting Hours</h3>
          <div className="flex gap-2 items-start text-white/70 text-sm">
            <FaClock className="mt-1 text-white/80" />
            <span>
              Mon–Sat: 4:00 PM – 7:00 PM<br />
              Sun: 9:00 AM – 1:00 PM<br />
              Wednesday Closed
            </span>
          </div>
        </div>

        {/* ABOUT */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  navigate('/gallery')
                }}
                className="cursor-pointer hover:text-white transition"
              >
                Gallery
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  navigate('/courses-main')
                }}
                className="cursor-pointer hover:text-white transition"
              >
                Courses
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  navigate('/about')
                }}
                className="cursor-pointer hover:text-white transition"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  navigate('/contact')
                }}
                className="cursor-pointer hover:text-white transition"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <h3 className="font-semibold mb-4">Connect</h3>

          <ul className="space-y-3 text-white/70 text-sm">

            <li className="flex items-center gap-2">
              <FaPhoneAlt />
              <a href="tel:8390493388">8390493388</a>
            </li>

            <li className="flex items-center gap-2">
              <FaPhoneAlt />
              <a href="tel:9168278222">9168278222</a>
            </li>

            <li className="flex items-center gap-2">
              <FaWhatsapp />
              <a href="https://wa.me/919168278222" target="_blank" rel="noreferrer">
                WhatsApp Chat
              </a>
            </li>

            <li className="flex items-center gap-2">
              <FaEnvelope />
              <a href="mailto:yythorat@gmail.com">
                yythorat@gmail.com
              </a>
            </li>

          </ul>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-5 text-lg">
            <a href="https://www.facebook.com/Ompaitingclasses/" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/7_shades_art_studio/" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@7shadesartstudio875" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
          </div>

          {/* CTA BUTTON */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" })
              navigate("/contact")
            }}
            className="mt-6 relative overflow-hidden
              border border-white/40 px-6 py-3
              text-sm text-white group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#123754]">
              Enquire Now
            </span>
            <span
              className="absolute inset-0 bg-white
                scale-x-0 origin-left
                transition-transform duration-300
                group-hover:scale-x-100"
            />
          </button>
        </div>

      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-white/10 py-6 text-sm text-white/60
                      flex flex-col md:flex-row justify-between
                      max-w-7xl mx-auto">

        <span>© {currentYear} 7 Shades Art Studio. All Rights Reserved.</span>

        <div className="flex gap-6">
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
        </div>

      </div>

    </footer>
  )
}
