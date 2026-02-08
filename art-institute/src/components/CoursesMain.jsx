import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronDown, Palette, Brush } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"

const handleScrollAndNavigate = (navigate, path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    navigate(path)
}

const courseCategories = {
    "Drawing & Painting": [
        { name: "Foundation", desc: "Foundational art classes for complete beginners. Explore various art forms and discover your passion." },
        { name: "Kid's Sketching", desc: "Fun and engaging sketching classes for children aged 5+. Build confidence and creativity in a supportive environment." },
        { name: "Graphite Sketching", desc: "Master the art of pencil sketching with basic to advanced techniques. Build strong foundational skills in shading and composition." },
        { name: "Portrait Sketching", desc: "Specialize in capturing human faces and expressions with precision. Perfect for intermediate to advanced artists." },
        { name: "Colour Pencil Portrait", desc: "Master the art of colored pencil portraiture. Achieve realistic skin tones and fine details." },
        { name: "Regular Drawing", desc: "Develop core drawing skills through structured lessons. Learn proportions, perspectives, and creative expression." },
        { name: "Canvas Painting", desc: "Explore painting techniques on canvas with acrylics and oils. Create beautiful artwork from basic to professional level." },
        { name: "Canvas Portrait", desc: "Advanced portrait painting on canvas using various mediums. Develop realistic and artistic portrait skills." },
        { name: "Poster Colour", desc: "Learn vibrant poster colour painting techniques. Create bold and expressive artworks with this accessible medium." },
    ],
    "Art & Craft": [
        { name: "Paper Quilling", desc: "Transform rolled paper strips into stunning decorative art. Learn intricate designs and 3D paper crafts." },
        { name: "Lippan Art", desc: "Traditional Indian art form using clay and mirror work. Create decorative wall pieces with cultural significance." },
        { name: "Mural Painting", desc: "Create large-scale murals on walls and public spaces. Learn composition, color theory, and outdoor painting techniques." },
    ],
    "Handwriting Improvement & Calligraphy": [
        { name: "English Handwriting", desc: "Improve writing clarity and speed in English. Perfect for all ages to achieve neat and professional handwriting." },
        { name: "Hindi Handwriting", desc: "Master Hindi script with proper formation and fluency. Enhance writing skills in Devanagari script." },
        { name: "Marathi Handwriting", desc: "Learn beautiful Marathi script writing with correct stroke order. Improve handwriting clarity in Marathi." },
        { name: "Handwriting Course", desc: "Comprehensive handwriting improvement program. Develop muscle memory and writing confidence." },
        { name: "Hindi Grammar", desc: "Learn Hindi grammar rules and sentence construction. Build strong linguistic foundations." },
        { name: "Marathi Grammar", desc: "Master Marathi language grammar and composition. Enhance communication skills in Marathi." },
        { name: "Marathi Language", desc: "Develop fluency in reading, writing, and speaking Marathi. Perfect for students and language enthusiasts." },
        { name: "English Calligraphy", desc: "Master beautiful English script calligraphy with traditional pen techniques. Create elegant lettering and decorative writing." },
        { name: "Hindi Calligraphy", desc: "Learn calligraphy techniques for Hindi script. Create artistic Devanagari lettering and decorative designs." },
        { name: "Marathi Calligraphy", desc: "Develop calligraphy skills in Marathi script. Master artistic writing styles and decorative compositions." },
        { name: "Advanced Calligraphy", desc: "Advanced calligraphy techniques combining multiple scripts and styles. Master professional-level lettering and artistic composition." },
    ],
    "Singing & Music": [
        {
            name: "Piano",
            desc: "Learn piano from basics to advanced levels. Master music theory and develop finger dexterity."
        },
        {
            name: "Acoustic Guitar",
            desc: "Learn acoustic guitar with focus on chords, strumming, fingerstyle, and music theory. Suitable for all ages."
        },
        {
            name: "Classical Singing",
            desc: "Learn classical vocal techniques, breathing exercises, voice modulation, and raga-based singing."
        },
    ],

    "Abacus & Vedic Maths": [
        {
            name: "Abacus (Level 1–8)",
            desc: "Structured Abacus training from Level 1 to Level 8 focusing on number sense, mental visualization, calculation speed, accuracy, and problem-solving skills."
        },
        {
            name: "Vedic Maths (Level 1–3)",
            desc: "Progressive Vedic Maths program covering basic to advanced sutras for fast mental calculations and shortcut techniques."
        },
    ],
    "Phonics Learning": [
        { name: "Phonics Pre Level", desc: "Introductory phonics for young learners. Learn letter sounds and basic word recognition." },
        { name: "Phonics Level-I", desc: "Foundation phonics with focus on letter-sound relationships. Develop reading confidence." },
        { name: "Phonics Level-II", desc: "Intermediate phonics with blending and digraphs. Enhance reading fluency and comprehension." },
    ],
    "Hobby Classes": [
        { name: "Mehandi", desc: "Learn beautiful henna application and traditional mehandi designs. Perfect for festivals and special occasions." },

        { name: "Knife Painting", desc: "Unique painting technique using palette knives instead of brushes. Create textured and dynamic artworks." },
        { name: "Madhubani", desc: "Learn traditional Madhubani art from Bihar. Master intricate patterns and cultural motifs with brushes and natural colors." },
        { name: "Mandala Art", desc: "Create intricate mandala designs with geometric patterns. Develop focus, creativity, and meditative art practice." },
        { name: "Warli Painting", desc: "Master tribal Warli art technique using geometric patterns. Learn this ancient Indian art form with modern applications." },
        { name: "3D Canvas", desc: "Create three-dimensional artworks on canvas using mixed media. Learn texture building and dimensional effects." },
        { name: "Abstract Painting", desc: "Explore abstract art expression without representational limits. Develop color theory and composition skills." },
        { name: "Texture Painting", desc: "Master techniques to create texture and dimension in paintings. Learn layering, impasto, and mixed media methods." },
        { name: "Oil Painting", desc: "Master traditional oil painting techniques and medium characteristics. Create rich, luminous artworks with lasting quality." },
        { name: "Acrylic Painting", desc: "Learn acrylic painting techniques for both fine art and commercial applications. Develop versatility with fast-drying mediums." },
        { name: "Water Colour Painting", desc: "Explore watercolor painting techniques and transparent glazing methods. Master water control and color blending." },
        { name: "Rubik's Class", desc: "Learn Rubik's cube solving techniques with proven methods. Develop logical thinking and hand-eye coordination." },

    ],
}

export default function CoursesMain() {
    const [searchParams] = useSearchParams()
    const categoryParam = searchParams.get('category')
    const [activeTab, setActiveTab] = useState(categoryParam || "Drawing & Painting")
    const [expandedCourse, setExpandedCourse] = useState(null)
    const navigate = useNavigate()

    const tabs = Object.keys(courseCategories)
    const currentCourses = courseCategories[activeTab]

    const rainbowColors = [
        { gradient: "from-[#7B2CBF] to-[#5A189A]", border: "#7B2CBF", text: "#7B2CBF", color1: "#7B2CBF", color2: "#5A189A" }, // Violet
        { gradient: "from-[#3C096C] to-[#240046]", border: "#3C096C", text: "#3C096C", color1: "#3C096C", color2: "#240046" }, // Indigo
        { gradient: "from-[#0D47A1] to-[#0D3B66]", border: "#0D47A1", text: "#0D47A1", color1: "#0D47A1", color2: "#0D3B66" }, // Blue
        { gradient: "from-[#00B541] to-[#007D32]", border: "#00B541", text: "#00B541", color1: "#00B541", color2: "#007D32" }, // Green
        { gradient: "from-[#FFD60A] to-[#F4A261]", border: "#FFD60A", text: "#FFD60A", color1: "#FFD60A", color2: "#F4A261" }, // Yellow
        { gradient: "from-[#FF9500] to-[#FF6D00]", border: "#FF9500", text: "#FF9500", color1: "#FF9500", color2: "#FF6D00" }, // Orange
        { gradient: "from-[#D62828] to-[#A4161A]", border: "#D62828", text: "#D62828", color1: "#D62828", color2: "#A4161A" }  // Red
    ]

    const currentTabIndex = tabs.indexOf(activeTab)
    const currentColor = rainbowColors[currentTabIndex % rainbowColors.length]

    return (
        <main
            className="bg-white text-black min-h-screen px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 pb-8"
        >
            <div className="max-w-6xl mx-auto">
                {/* HEADER */}
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6"
                >
                    <div className="max-w-3xl mx-auto">

                        <p className="text-xs md:text-sm font-semibold text-[#1F5C8C] tracking-widest uppercase mb-1">
                            Discover Your Artistic Journey
                        </p>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text 
      bg-gradient-to-r from-[#1F5C8C] via-[#0F2A44] to-[#1F5C8C] mb-2 leading-tight">
                            Master Creative <span className="italic">& Academic</span> Skills
                        </h1>

                    </div>
                </motion.div>


                {/* TABS */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-2 mb-6"
                >
                    {tabs.map((tab, index) => {
                        const rainbowColors = [
                            { gradient: "from-[#7B2CBF] to-[#5A189A]", text: "#7B2CBF" }, // Violet
                            { gradient: "from-[#3C096C] to-[#240046]", text: "#3C096C" }, // Indigo
                            { gradient: "from-[#0D47A1] to-[#0D3B66]", text: "#0D47A1" }, // Blue
                            { gradient: "from-[#00B541] to-[#007D32]", text: "#00B541" }, // Green
                            { gradient: "from-[#FFD60A] to-[#F4A261]", text: "#FFD60A" }, // Yellow
                            { gradient: "from-[#FF9500] to-[#FF6D00]", text: "#FF9500" }, // Orange
                            { gradient: "from-[#D62828] to-[#A4161A]", text: "#D62828" }  // Red
                        ]
                        const color = rainbowColors[index % rainbowColors.length]
                        return (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab)
                                    setExpandedCourse(null)
                                }}
                                className={`cursor-pointer px-3 py-1.5 rounded-lg font-medium text-xs md:text-sm transition-all duration-300 ${activeTab === tab
                                    ? `bg-gradient-to-r ${color.gradient} text-white shadow-lg`
                                    : `bg-white text-[${color.text}] border border-[${color.text}] hover:bg-[#f0f0f0]`
                                    }`}
                            >
                                {tab}
                            </button>
                        )
                    })}
                </motion.div>

                {/* ACCORDION COURSES */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-2"
                >
                    <AnimatePresence mode="wait">
                        {currentCourses.map((course, index) => (
                            <motion.div
                                key={course.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4`}
                                style={{ borderLeftColor: currentColor.border }}
                            >
                                <button
                                    onClick={() =>
                                        setExpandedCourse(
                                            expandedCourse === course.name ? null : course.name
                                        )
                                    }
                                    className="cursor-pointer w-full px-4 py-2 flex items-center justify-between hover:bg-[#f9f9f9] transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center`}
                                            style={{ background: `linear-gradient(135deg, ${currentColor.color1}, ${currentColor.color2})` }}
                                        >
                                            {expandedCourse === course.name ? (
                                                <ChevronDown size={20} className="text-white rotate-180" />
                                            ) : (
                                                <Palette size={20} className="text-white" />
                                            )}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-black text-sm md:text-base">
                                                {course.name}
                                            </h3>
                                            {expandedCourse !== course.name && (
                                                <p className="text-black/50 text-xs mt-0.5 line-clamp-1">
                                                    {course.desc}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: expandedCourse === course.name ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0"
                                    >
                                        <ChevronDown size={20} className="text-[#1F5C8C]" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {expandedCourse === course.name && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="border-t border-[#e0e0e0] px-4 py-3 bg-white">
                                                <p className="text-black/70 leading-snug text-xs md:text-sm">
                                                    {course.desc}
                                                </p>
                                                <div className="mt-2 pt-2 border-t border-[#e0e0e0]">
                                                    <button
                                                        onClick={() => handleScrollAndNavigate(navigate, '/contact')}
                                                        className="cursor-pointer text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:shadow-lg transition-shadow"
                                                        style={{ background: `linear-gradient(135deg, ${currentColor.color1}, ${currentColor.color2})` }}
                                                    >
                                                        Enquire Now
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    )
}
