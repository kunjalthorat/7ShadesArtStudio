import { motion } from "framer-motion"
import { MessageCircle, Mail, Phone } from "lucide-react"
import bgGrey from "../assets/background/grey.png"

export default function Contact() {
  return (
    <main
      className="
    bg-white text-black
    min-h-screen
    px-4 sm:px-6 md:px-10
    py-16 sm:py-20
    bg-cover bg-center bg-no-repeat
    flex items-start
  "
      style={{ backgroundImage: `url(${bgGrey})` }}
    >


      <div className="max-w-7xl mx-auto w-full mt-3">

        {/* ================= MAP HERO ================= */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden shadow-md mb-10"
        >
          <iframe
            title="7 SHADES ART STUDIO"
            src="https://www.google.com/maps?q=7+SHADES+ART+STUDIO,+Punawale,+Pune&z=17&output=embed"
            className="w-full h-[220px]"
            loading="lazy"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* ================= CONTACT CARDS ================= */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >

          {/* WhatsApp */}
          <div className="bg-white rounded-xl shadow-sm p-5 text-center">
            <MessageCircle size={26} className="mx-auto text-[#25D366] mb-2" />
            <h3 className="font-semibold text-sm sm:text-base">WhatsApp</h3>
            <p className="text-xs sm:text-sm text-black/70">+91 91682 78222</p>
            <p className="text-xs sm:text-sm text-black/70">+91 83904 93388</p>

            <a
              href="https://wa.me/919168278222"
              target="_blank"
              rel="noreferrer"
              className="
                inline-block mt-3
                px-4 py-1.5
                rounded-md
                bg-[#25D366]
                text-white text-sm
                hover:bg-[#1da851]
                transition
              "
            >
              Message
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl shadow-sm p-5 text-center">
            <Mail size={26} className="mx-auto text-[#EA4335] mb-2" />
            <h3 className="font-semibold text-sm sm:text-base">Email</h3>
            <p className="text-xs sm:text-sm text-black/70">yythorat@gmail.com</p>

            <a
              href="mailto:yythorat@gmail.com"
              className="
                inline-block mt-3
                px-4 py-1.5
                rounded-md
                bg-[#EA4335]
                text-white text-sm
                hover:bg-[#d33a2c]
                transition
              "
            >
              Send
            </a>
          </div>

          {/* Call */}
          <div className="bg-white rounded-xl shadow-sm p-5 text-center">
            <Phone size={26} className="mx-auto text-[#1F5C8C] mb-2" />
            <h3 className="font-semibold text-sm sm:text-base">Call Us</h3>
            <p className="text-xs sm:text-sm text-black/70">+91 91682 78222</p>
            <p className="text-xs sm:text-sm text-black/70">+91 83904 93388</p>

            <a
              href="tel:+919168278222"
              className="
                inline-block mt-3
                px-4 py-1.5
                rounded-md
                bg-[#1F5C8C]
                text-white text-sm
                hover:bg-[#17486f]
                transition
              "
            >
              Call
            </a>
          </div>

        </motion.div>

      </div>

    </main>
  )
}
