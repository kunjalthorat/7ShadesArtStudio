import { motion, useScroll } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import logo from "../assets/logo_nobg.png"

const navItems = ["Home", "Gallery", "Videos", "Courses", "About", "Contact"]

export default function Header() {

  /* ---------------------------------- */
  /* INFO ITEMS */
  /* ---------------------------------- */
  const infoItems = [
    { icon: <FaPhoneAlt />, text: "+91 98765 43210" },
    { icon: <FaWhatsapp />, text: "WhatsApp: +91 98765 43210" },
    { icon: <FaMapMarkerAlt />, text: "Punawale, Pune, Maharashtra" },
  ]

  const { scrollY } = useScroll()
  const navigate = useNavigate()
  const location = useLocation()

  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isContactPage = location.pathname === "/contact"
  const isGalleryPage = location.pathname === "/gallery"
  const isVideoGalleryPage = location.pathname === "/video-gallery"
  const isCoursesMainPage = location.pathname === "/courses-main"
  const isAboutPage = location.pathname === "/about"

  const isPrimaryBgPage =
    isContactPage || isGalleryPage || isCoursesMainPage || isAboutPage || isVideoGalleryPage

  const getActiveTab = () => {
    if (location.pathname === "/" || location.pathname === "") return "Home"
    if (isGalleryPage) return "Gallery"
    if (isVideoGalleryPage) return "Videos"
    if (isCoursesMainPage) return "Courses"
    if (location.pathname === "/about") return "About"
    if (isContactPage) return "Contact"
    return null
  }

  const activeTab = getActiveTab()

  const handleNavClick = (item) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const routes = {
      Home: "/",
      Gallery: "/gallery",
      Videos: "/video-gallery",
      Courses: "/courses-main",
      About: "/about",
      Contact: "/contact",
    }
    navigate(routes[item] || "/")
  }

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const previous = scrollY.getPrevious()
      setHidden(latest > previous && latest > 80)
      setScrolled(latest > 50)
    })
  }, [scrollY])

  return (
    <>
      {/* ================================================= */}
      {/* TOP INFO BAR */}
      {/* ================================================= */}

      <div
        className="fixed top-0 left-0 w-full z-[60]
  bg-gradient-to-r from-[#1F5C8C] via-[#2F7BC1] to-[#0F2A44]
  text-white h-[28px] flex items-center"
      >
        <div
          className="max-w-7xl mx-auto w-full
    flex flex-row items-center justify-center sm:justify-between
    px-3 md:px-4 text-[11px] sm:text-xs md:text-sm"
        >

          {/* LEFT TEXT */}
          <div className="hidden sm:block font-medium tracking-tight truncate mr-1 flex-shrink-0">
            <span className="hidden sm:inline">Welcome to </span>
            <span className="text-xs">7 Shades Art Studio</span>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4 sm:gap-6 font-bold">

            {/* Phone 1 */}
            <a
              href="tel:8390493388"
              className="flex items-center gap-1.5 hover:opacity-80 transition whitespace-nowrap"
            >
              <FaPhoneAlt className="text-[10px] md:text-xs" />
              <span className="text-[11px] sm:text-xs md:text-sm">8390493388</span>
            </a>

            {/* Phone 2 */}
            <a
              href="tel:9168278222"
              className="flex items-center gap-1.5 hover:opacity-80 transition whitespace-nowrap"
            >
              <FaPhoneAlt className="text-[10px] md:text-xs" />
              <span className="text-[11px] sm:text-xs md:text-sm">9168278222</span>
            </a>

            {/* SOCIAL ICONS - Visible on sm and up */}
            <div className="hidden sm:flex items-center gap-4 text-[13px] md:text-base ml-4 border-l border-white/20 pl-4">
              <a
                href="https://www.facebook.com/Ompaitingclasses/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-yellow-400 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/7_shades_art_studio/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-yellow-400 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.youtube.com/@7shadesartstudio875"
                target="_blank"
                rel="noreferrer"
                className="hover:text-yellow-400 transition"
              >
                <FaYoutube />
              </a>
            </div>

          </div>

        </div>
      </div>



      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-[28px] left-0 w-full z-50 transition-colors duration-300
    ${isPrimaryBgPage
            ? "bg-[#1F5C8C] text-white"
            : "bg-white text-black shadow-sm"
          }
  `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-1">

          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick("Home")}
          >
            <img
              src={logo}
              alt="7 Shades Art Studio Logo"
              className="h-11 sm:h-12 w-auto object-contain rounded-lg shadow-sm"
            />
            <span className="tracking-tight text-sm sm:text-lg md:text-xl font-bold">
              7 Shades Art Studio
            </span>
          </div>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center space-x-10 text-base">
            {navItems.map((item) => (
              <li
                key={item}
                className={`relative group cursor-pointer font-semibold
          ${item === activeTab ? "underline underline-offset-4" : ""}`}
                onClick={() => handleNavClick(item)}
              >
                {item}
                {item !== activeTab && (
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full" />
                )}
              </li>
            ))}
          </ul>

          {/* HAMBURGER */}
          <div className="md:hidden flex items-center h-10">
            <button
              className="cursor-pointer relative w-7 h-5 flex flex-col justify-between"
              onClick={() => setMenuOpen(true)}
            >
              <span className="w-full h-[2.5px] bg-current rounded-full" />
              <span className="w-full h-[2.5px] bg-current rounded-full" />
              <span className="w-full h-[2.5px] bg-current rounded-full" />
            </button>
          </div>

        </div>
      </motion.header>

      {/* ================================================= */}
      {/* MOBILE MENU */}
      {/* ================================================= */}

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: menuOpen ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-[28px] right-0 w-full h-[calc(100vh-28px)] z-[70] backdrop-blur-md bg-[#1F5C8C]/95 text-white flex flex-col"
      >
        {/* TOP OVERLAP SECTION */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-1 h-[48px]">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-11 sm:h-12 w-auto object-contain rounded-lg shadow-sm" />
              <span className="tracking-tight text-sm sm:text-lg md:text-xl font-bold">7 Shades Art Studio</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer w-7 h-5 flex items-center justify-center text-3xl font-light"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-8 pt-10 overflow-y-auto">
          <div className="flex flex-col space-y-6">
            {navItems.map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 20 }}
                transition={{ delay: index * 0.1 }}
                className={`text-2xl font-medium cursor-pointer transition-colors duration-300
                ${item === activeTab ? "text-yellow-400 pl-4 border-l-4 border-yellow-400" : "hover:text-yellow-200"}`}
                onClick={() => {
                  handleNavClick(item)
                  setMenuOpen(false)
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>

          {/* MOBILE MENU FOOTER */}
          <div className="mt-auto border-t border-white/20 pt-8 pb-4">
            <p className="text-xs text-white/70 mb-4 font-semibold uppercase tracking-widest">Connect With Us</p>
            <div className="flex items-center gap-6 text-2xl">
              <a href="https://wa.me/919168278222" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition"><FaWhatsapp /></a>
              <a href="https://www.facebook.com/Ompaitingclasses/" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition"><FaFacebookF /></a>
              <a href="https://www.instagram.com/7_shades_art_studio/" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition"><FaInstagram /></a>
              <a href="https://www.youtube.com/@7shadesartstudio875" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition"><FaYoutube /></a>
            </div>
            <div className="mt-6 flex flex-col gap-3 text-sm text-white/80">
              <a href="tel:8390493388" className="flex items-center gap-2 hover:text-white transition"><FaPhoneAlt size={12} /> 8390493388</a>
              <a href="tel:9168278222" className="flex items-center gap-2 hover:text-white transition"><FaPhoneAlt size={12} /> 9168278222</a>
            </div>
          </div>
        </div>
      </motion.div>

    </>
  )
}
