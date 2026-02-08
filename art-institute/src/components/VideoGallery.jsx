import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, Volume2, VolumeX } from "lucide-react"

/* Auto import every video inside video_gallery folder */
const videos = Object.entries(
    import.meta.glob("../assets/video_gallery/*.mp4", {
        eager: true,
        as: "url",
    })
).map(([path, url]) => {
    // Extract filename for title - simply replace underscores with spaces
    const fileName = path.split('/').pop().replace('.mp4', '').replace(/_/g, ' ')
    return { url, title: fileName }
})

export default function VideoGallery() {
    const [active, setActive] = useState(null)
    const [isMuted, setIsMuted] = useState(false)

    const close = () => {
        setActive(null)
        setIsMuted(false)
    }

    return (
        <section className="min-h-screen bg-white px-4 sm:px-10 pt-24 pb-16 overflow-x-hidden">

            {/* HEADER SECTION */}
            <div className="max-w-7xl mx-auto mb-16 text-center">

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1F5C8C] to-[#0F2A44] bg-clip-text text-transparent pb-2 px-2 mb-4 hover:opacity-90 transition-opacity inline-block"
                >
                    Video Gallery
                </motion.h1>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80px" }}
                    className="h-1.5 bg-yellow-400 mx-auto rounded-full"
                />
            </div>

            {/* VIDEO MASONRY GRID */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 max-w-7xl mx-auto">
                {videos.map((video, i) => (
                    <VideoCard
                        key={i}
                        video={video}
                        onClick={() => setActive(video)}
                        index={i}
                    />
                ))}
            </div>

            {/* FULL SCREEN PLAYER MODAL */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-4 sm:p-10"
                    >
                        {/* Modal Controls */}
                        <div className="absolute top-6 right-6 flex items-center gap-4">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="text-white hover:text-yellow-400 transition cursor-pointer p-2 bg-white/10 rounded-full"
                            >
                                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                            </button>
                            <button
                                onClick={close}
                                className="text-white hover:text-yellow-400 transition cursor-pointer p-2 bg-white/10 rounded-full"
                            >
                                <X size={32} />
                            </button>
                        </div>

                        {/* Video Container */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
                        >
                            <video
                                src={active.url}
                                controls
                                controlsList="nodownload"
                                disablePictureInPicture
                                autoPlay
                                muted={isMuted}
                                className="w-full h-full object-contain rounded-2xl"
                                onContextMenu={(e) => e.preventDefault()}
                            />
                            {/* Shield - slightly offset to allow access to controls if needed, 
                                but here we rely on the video's own onContextMenu protection as well */}
                            <div className="absolute inset-0 z-10 bg-transparent pointer-events-none" />
                        </motion.div>

                        {/* Video Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 text-center"
                        >
                            <h2 className="text-white text-xl md:text-2xl font-bold tracking-wide">
                                {active.title}
                            </h2>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

function VideoCard({ video, onClick, index }) {
    const videoRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
        if (videoRef.current) {
            videoRef.current.play().catch(() => { })
        }
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="group relative cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-8 break-inside-avoid"
        >
            {/* Video Preview */}
            <div className="relative bg-gray-900 overflow-hidden">
                <video
                    ref={videoRef}
                    src={video.url}
                    muted
                    loop
                    playsInline
                    controlsList="nodownload"
                    disablePictureInPicture
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105 rounded-t-2xl"
                />

                {/* SECURITY SHIELD */}
                <div
                    className="absolute inset-0 z-10 bg-transparent"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                />

                {/* Overlay Decoration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 z-[5]" />

                {/* Play Icon */}
                <motion.div
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl transform transition-transform duration-300 group-hover:bg-white">
                        <Play fill="currentColor" className="text-[#1F5C8C] ml-1" size={24} />
                    </div>
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-sm sm:text-base font-semibold text-[#1F5C8C] tracking-tight group-hover:text-yellow-600 transition-colors leading-snug">
                    {video.title}
                </h3>
            </div>
        </motion.div>
    )
}
