import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Palette, Home } from "lucide-react"

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-32 px-6 relative overflow-hidden">

            {/* BACKGROUND DECORATION - SUBTLE FLOATING BRUSH STROKES */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-[#1F5C8C]"
                        style={{
                            width: Math.random() * 300 + 100,
                            height: Math.random() * 100 + 50,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            filter: "blur(60px)",
                        }}
                        animate={{
                            x: [0, 30, 0],
                            y: [0, 50, 0],
                            rotate: [0, 10, 0],
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 text-center max-w-md">

                {/* ART INSPIRED ANIMATION - CALM FLOATING PALETTE */}
                <motion.div
                    className="mb-8 flex justify-center"
                    animate={{
                        y: [0, -15, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="relative">
                        <Palette size={100} strokeWidth={1} className="text-[#1F5C8C] opacity-20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl font-bold bg-gradient-to-r from-[#1F5C8C] to-[#0F2A44] bg-clip-text text-transparent opacity-80">
                                404
                            </span>
                        </div>
                    </div>
                </motion.div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Oops! The Canvas is Empty
                </h1>

                <p className="text-gray-500 mb-10 leading-relaxed font-medium">
                    It looks like the page you are looking for has been moved or doesn't exist.
                    Let's get you back to the right path.
                </p>

                {/* CALM BUTTON */}
                <motion.button
                    onClick={() => navigate('/')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer group flex items-center gap-3 bg-gradient-to-r from-[#1F5C8C] to-[#0F2A44] 
                     text-white px-8 py-3 rounded-full shadow-lg shadow-blue-900/10 
                     transition-all duration-300 mx-auto"
                >
                    <Home size={18} />
                    <span className="font-semibold tracking-wide">Back to Home</span>
                </motion.button>

                {/* SUBTLE BRANDING */}
                <p className="mt-16 text-[10px] text-gray-300 uppercase tracking-[0.2em] font-bold">
                    7 Shades Art Studio
                </p>
            </div>
        </div>
    )
}
