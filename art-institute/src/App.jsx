import Header from './components/Header'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Courses from './components/Courses'
import CoursesMain from './components/CoursesMain'
import AboutMission from './components/AboutMission'
import WhyChoose from './components/WhyChoose'
import Contact from './components/Contact'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Ratings from './components/Ratings'
import { lazy, Suspense } from 'react'

// Lazy load non-critical components
const LazyCourses = lazy(() => import('./components/Courses'))
const LazyCoursesMain = lazy(() => import('./components/CoursesMain'))
const LazyAboutMission = lazy(() => import('./components/AboutMission'))
const LazyAbout = lazy(() => import('./components/About'))
const LazyWhyChoose = lazy(() => import('./components/WhyChoose'))
const LazyContact = lazy(() => import('./components/Contact'))
const LazyRatings = lazy(() => import('./components/Ratings'))
const LazyGallery = lazy(() => import('./components/Gallery'))
const LazyVideoGallery = lazy(() => import('./components/VideoGallery'))
const LazyPrivacy = lazy(() => import('./components/PrivacyPolicy'))
const LazyTerms = lazy(() => import('./components/Terms'))
const LazyNotFound = lazy(() => import('./components/NotFound'))

import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const SEO_DATA = {
  "/": {
    title: "Best Art & Music Classes in PCMC | 7 Shades Art Studio",
    description: "Unleash your creativity at 7 Shades Art Studio, Punawale. Professional drawing, painting, and music classes for kids and adults. Expert faculty and certified courses."
  },
  "/courses-main": {
    title: "Art & Music Courses in Pune | 7 Shades Art Studio",
    description: "Explore our professional courses in Fine Arts, Sketching, Oil Painting, Guitar, and Piano. Certified curriculum tailored for all age groups in PCMC."
  },
  "/gallery": {
    title: "Art Gallery - Student Masterpieces | 7 Shades Art Studio",
    description: "Browse through our collection of stunning artworks created by talented students. From sketching to oil paintings, witness the creative journey at 7 Shades."
  },
  "/video-gallery": {
    title: "Video Gallery - Student Performances | 7 Shades Art Studio",
    description: "Watch our students perform guitar and piano classics. Live performances and musical milestones captured at 7 Shades Art Studio, Punawale."
  },
  "/about": {
    title: "About Us - 7 Shades Art Studio | Pune's Premier Art Institute",
    description: "Know more about our mission to inspire creativity. Led by expert faculty, we provide a nurturing environment for artists and musicians alike."
  },
  "/contact": {
    title: "Contact Us - Visit 7 Shades Art Studio in Punawale",
    description: "Join Pune's best art institute today. Get directions to our studio in Punawale, call us at 8390493388, or message us on WhatsApp for enquiries."
  },
  "/privacy": {
    title: "Privacy Policy | 7 Shades Art Studio",
    description: "Read our privacy policy to understand how we protect your data and maintain your privacy at 7 Shades Art Studio."
  },
  "/terms": {
    title: "Terms & Conditions | 7 Shades Art Studio",
    description: "Standard terms and conditions for enrollment and participation in courses at 7 Shades Art Studio."
  }
}

function useSEO() {
  const location = useLocation()
  useEffect(() => {
    const data = SEO_DATA[location.pathname] || SEO_DATA["/"]
    document.title = data.title
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", data.description)
    }
  }, [location])
}

const LoadingPlaceholder = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
  </div>
)

function AppContent() {
  return (
    <div className="overflow-x-hidden w-full relative bg-black">
      <Header />
      <div className="relative">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Suspense fallback={<LoadingPlaceholder />}>
                <LazyCourses />
              </Suspense>
              <Suspense fallback={<LoadingPlaceholder />}>
                <LazyAboutMission />
              </Suspense>
              <Suspense fallback={<LoadingPlaceholder />}>
                <LazyWhyChoose />
              </Suspense>
              <Suspense fallback={<LoadingPlaceholder />}>
                <LazyRatings />
              </Suspense>
            </>
          } />
          <Route path="/courses" element={
            <Suspense fallback={<LoadingPlaceholder />}>
              <LazyCourses />
            </Suspense>
          } />
          <Route path="/courses-main" element={
            <Suspense fallback={<LoadingPlaceholder />}>
              <LazyCoursesMain />
            </Suspense>
          } />
          <Route path="/gallery" element={
            <Suspense fallback={<LoadingPlaceholder />}>
              <LazyGallery />
            </Suspense>
          } />
          <Route path="/video-gallery" element={
            <Suspense fallback={<LoadingPlaceholder />}>
              <LazyVideoGallery />
            </Suspense>
          } />
          <Route path="/about" element={
            <>
              <Suspense fallback={<LoadingPlaceholder />}>
                <LazyAbout />
              </Suspense>
            </>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<LoadingPlaceholder />}>
              <LazyContact />
            </Suspense>
          } />
          <Route path="/privacy" element={
            <Suspense fallback={<LoadingPlaceholder />}>
              <LazyPrivacy />
            </Suspense>
          } />
          <Route path="/terms" element={
            <Suspense fallback={<LoadingPlaceholder />}>
              <LazyTerms />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<LoadingPlaceholder />}>
              <LazyNotFound />
            </Suspense>
          } />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default function App() {
  useSEO()
  return <AppContent />
}
