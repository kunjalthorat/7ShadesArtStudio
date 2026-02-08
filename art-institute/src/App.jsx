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

const LoadingPlaceholder = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
  </div>
)

function App() {
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
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
