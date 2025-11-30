import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import ThemeToggle from '../components/ThemeToggle';

const Landing = () => {
  const heroSlides = [
    <div key="slide1" className="relative h-96 md:h-[500px] bg-gradient-to-br from-primary-600 via-primary-700 to-purple-600 dark:from-primary-800 dark:via-primary-900 dark:to-purple-900 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="bg-white/20 backdrop-blur-md rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
          >
            Smart Attendance System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
          >
            Track attendance with AI-powered insights and real-time analytics
          </motion.p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-900/50 dark:from-primary-950/50 to-transparent"></div>
    </div>,
    <div key="slide2" className="relative h-96 md:h-[500px] bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 dark:from-green-800 dark:via-teal-800 dark:to-blue-800 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-teal-300 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="bg-white/20 backdrop-blur-md rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
          >
            Advanced Analytics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
          >
            Comprehensive reports and insights for better workforce management
          </motion.p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-900/50 dark:from-green-950/50 to-transparent"></div>
    </div>,
    <div key="slide3" className="relative h-96 md:h-[500px] bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 dark:from-purple-800 dark:via-pink-800 dark:to-red-800 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-300 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="bg-white/20 backdrop-blur-md rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
          >
            Secure & Reliable
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
          >
            Enterprise-grade security with encrypted data and role-based access
          </motion.p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/50 dark:from-purple-950/50 to-transparent"></div>
    </div>,
  ];

  // Attendance-related SVG illustrations
  const AttendanceIllustration = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Clock */}
      <circle cx="100" cy="80" r="40" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary-500 dark:text-primary-400" />
      <line x1="100" y1="80" x2="100" y2="60" stroke="currentColor" strokeWidth="3" className="text-primary-500 dark:text-primary-400" />
      <line x1="100" y1="80" x2="115" y2="80" stroke="currentColor" strokeWidth="2" className="text-primary-500 dark:text-primary-400" />
      {/* Calendar */}
      <rect x="200" y="50" width="120" height="100" rx="8" fill="currentColor" className="text-primary-500 dark:text-primary-400 opacity-20" />
      <rect x="200" y="50" width="120" height="30" rx="8" fill="currentColor" className="text-primary-600 dark:text-primary-500" />
      <line x1="250" y1="80" x2="250" y2="150" stroke="currentColor" strokeWidth="2" className="text-primary-500 dark:text-primary-400" />
      <line x1="270" y1="80" x2="270" y2="150" stroke="currentColor" strokeWidth="2" className="text-primary-500 dark:text-primary-400" />
      {/* People/Team */}
      <circle cx="80" cy="200" r="25" fill="currentColor" className="text-green-500 dark:text-green-400" />
      <circle cx="150" cy="200" r="25" fill="currentColor" className="text-green-500 dark:text-green-400" />
      <circle cx="220" cy="200" r="25" fill="currentColor" className="text-green-500 dark:text-green-400" />
      <circle cx="290" cy="200" r="25" fill="currentColor" className="text-green-500 dark:text-green-400" />
      {/* Chart/Graph */}
      <polyline points="50,250 100,220 150,240 200,200 250,210 300,180 350,200" 
        fill="none" stroke="currentColor" strokeWidth="4" className="text-purple-500 dark:text-purple-400" />
      <circle cx="50" cy="250" r="5" fill="currentColor" className="text-purple-500 dark:text-purple-400" />
      <circle cx="100" cy="220" r="5" fill="currentColor" className="text-purple-500 dark:text-purple-400" />
      <circle cx="150" cy="240" r="5" fill="currentColor" className="text-purple-500 dark:text-purple-400" />
      <circle cx="200" cy="200" r="5" fill="currentColor" className="text-purple-500 dark:text-purple-400" />
      <circle cx="250" cy="210" r="5" fill="currentColor" className="text-purple-500 dark:text-purple-400" />
      <circle cx="300" cy="180" r="5" fill="currentColor" className="text-purple-500 dark:text-purple-400" />
      <circle cx="350" cy="200" r="5" fill="currentColor" className="text-purple-500 dark:text-purple-400" />
    </svg>
  );

  const AnalyticsIllustration = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      {/* Bar Chart */}
      <rect x="50" y="200" width="40" height="80" rx="4" fill="currentColor" className="text-blue-500 dark:text-blue-400" />
      <rect x="110" y="150" width="40" height="130" rx="4" fill="currentColor" className="text-green-500 dark:text-green-400" />
      <rect x="170" y="180" width="40" height="100" rx="4" fill="currentColor" className="text-yellow-500 dark:text-yellow-400" />
      <rect x="230" y="120" width="40" height="160" rx="4" fill="currentColor" className="text-purple-500 dark:text-purple-400" />
      <rect x="290" y="100" width="40" height="180" rx="4" fill="currentColor" className="text-pink-500 dark:text-pink-400" />
      {/* Pie Chart */}
      <circle cx="300" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="30" 
        strokeDasharray="157 78.5" className="text-primary-500 dark:text-primary-400" />
      <circle cx="300" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="30" 
        strokeDasharray="78.5 157" strokeDashoffset="-78.5" className="text-green-500 dark:text-green-400" />
      {/* Stats Icons */}
      <circle cx="100" cy="50" r="20" fill="currentColor" className="text-primary-500 dark:text-primary-400 opacity-20" />
      <circle cx="200" cy="50" r="20" fill="currentColor" className="text-green-500 dark:text-green-400 opacity-20" />
      <circle cx="100" cy="50" r="10" fill="currentColor" className="text-primary-600 dark:text-primary-500" />
      <circle cx="200" cy="50" r="10" fill="currentColor" className="text-green-600 dark:text-green-500" />
    </svg>
  );

  const SecurityIllustration = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      {/* Shield */}
      <path d="M200 50 L250 70 L250 150 Q250 200 200 250 Q150 200 150 150 L150 70 Z" 
        fill="currentColor" className="text-purple-500 dark:text-purple-400 opacity-30" />
      <path d="M200 50 L250 70 L250 150 Q250 200 200 250 Q150 200 150 150 L150 70 Z" 
        fill="none" stroke="currentColor" strokeWidth="4" className="text-purple-600 dark:text-purple-500" />
      {/* Lock */}
      <rect x="175" y="140" width="50" height="60" rx="4" fill="currentColor" className="text-blue-500 dark:text-blue-400" />
      <path d="M185 140 Q185 120 200 120 Q215 120 215 140" 
        fill="none" stroke="currentColor" strokeWidth="4" className="text-blue-500 dark:text-blue-400" />
      {/* Checkmark */}
      <path d="M190 170 L205 185 L230 160" 
        fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" 
        className="text-green-500 dark:text-green-400" />
      {/* Encryption symbols */}
      <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="2" 
        strokeDasharray="5,5" className="text-primary-500 dark:text-primary-400 opacity-50" />
      <circle cx="300" cy="200" r="30" fill="none" stroke="currentColor" strokeWidth="2" 
        strokeDasharray="5,5" className="text-primary-500 dark:text-primary-400 opacity-50" />
    </svg>
  );

  // Testimonials/Quotes
  const testimonials = [
    {
      quote: "This attendance management system has revolutionized how we track our workforce. The real-time analytics help us make data-driven decisions.",
      author: "Sarah Johnson",
      role: "HR Director",
      company: "TechCorp Inc.",
      avatar: "👩‍💼"
    },
    {
      quote: "The gamification features keep our employees engaged and motivated. Attendance rates have improved by 40% since implementation.",
      author: "Michael Chen",
      role: "Operations Manager",
      company: "Global Solutions",
      avatar: "👨‍💼"
    },
    {
      quote: "As an employee, I love how easy it is to check in, request leaves, and track my attendance history. The mobile-friendly design is perfect!",
      author: "Emily Rodriguez",
      role: "Software Developer",
      company: "Innovate Labs",
      avatar: "👩‍💻"
    },
    {
      quote: "The leave management system is incredibly efficient. Approving and tracking team leaves has never been easier. Highly recommended!",
      author: "David Thompson",
      role: "Team Lead",
      company: "Digital Dynamics",
      avatar: "👨‍💻"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section with Main Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-primary-500 to-purple-500 dark:from-primary-600 dark:to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              ✨ Modern Workforce Management
            </div>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 dark:from-primary-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Attendance Management
            </span>
            <br />
            <span className="text-gray-800 dark:text-gray-200 text-3xl md:text-5xl font-bold">
              Made Simple & Efficient
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Streamline your workforce tracking with our comprehensive attendance management system. 
            <span className="block mt-2 text-primary-600 dark:text-primary-400 font-semibold">
              Real-time insights • Smart analytics • Seamless experience
            </span>
          </p>
        </motion.div>
      </div>

      {/* Hero Slideshow Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Carousel slides={heroSlides} autoPlay={true} interval={4000} />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Choose Your Portal
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Access your personalized dashboard and manage your attendance seamlessly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Employee Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-300 dark:from-primary-900 dark:to-primary-800 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative z-10">
              {/* Illustration */}
              <div className="h-48 mb-6 flex items-center justify-center">
                <div className="w-full h-full text-primary-500 dark:text-primary-400">
                  <AttendanceIllustration />
                </div>
              </div>
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-xl"
                >
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Employee Portal</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Mark your attendance, view your history, track working hours, request leaves, and earn badges with our gamification system
                </p>
                <div className="space-y-4">
                  <Link to="/employee/login">
                    <Button variant="primary" className="w-full">
                      Employee Login
                    </Button>
                  </Link>
                  <Link to="/employee/register">
                    <Button variant="secondary" className="w-full">
                      Register as Employee
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Manager Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 dark:from-green-900 dark:to-green-800 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative z-10">
              {/* Illustration */}
              <div className="h-48 mb-6 flex items-center justify-center">
                <div className="w-full h-full text-green-500 dark:text-green-400">
                  <AnalyticsIllustration />
                </div>
              </div>
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-xl"
                >
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Manager Portal</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  View team attendance, generate comprehensive reports, approve leaves, and manage your workforce efficiently
                </p>
                <Link to="/manager/login">
                  <Button variant="success" className="w-full">
                    Manager Login
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Features Section with Illustrations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Key Features
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg">
            Everything you need for efficient attendance management
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Real-time Tracking',
                description: 'Monitor attendance in real-time with instant updates and notifications',
                color: 'from-primary-500 to-primary-600',
                bgColor: 'bg-primary-100 dark:bg-primary-900/30',
                illustration: <AttendanceIllustration />,
              },
              {
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                title: 'Analytics & Reports',
                description: 'Comprehensive insights, detailed reports, and data visualization',
                color: 'from-green-500 to-green-600',
                bgColor: 'bg-green-100 dark:bg-green-900/30',
                illustration: <AnalyticsIllustration />,
              },
              {
                icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
                title: 'Secure & Reliable',
                description: 'Enterprise-grade security with encrypted data and role-based access',
                color: 'from-purple-500 to-purple-600',
                bgColor: 'bg-purple-100 dark:bg-purple-900/30',
                illustration: <SecurityIllustration />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                {/* Illustration */}
                <div className="h-40 mb-6 flex items-center justify-center">
                  <div className={`w-full h-full ${feature.bgColor} rounded-xl p-4`}>
                    <div className="text-primary-500 dark:text-primary-400">
                      {feature.illustration}
                    </div>
                  </div>
                </div>
                <div className={`${feature.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  <svg className={`w-8 h-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-20 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "10K+", label: "Active Users", icon: "👥", color: "from-blue-500 to-blue-600" },
              { number: "500+", label: "Companies", icon: "🏢", color: "from-green-500 to-green-600" },
              { number: "99.9%", label: "Uptime", icon: "⚡", color: "from-yellow-500 to-yellow-600" },
              { number: "24/7", label: "Support", icon: "🛡️", color: "from-purple-500 to-purple-600" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className={`text-4xl mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-extrabold`}>
                  {stat.number}
                </div>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials/Quotes Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-20 mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Trusted by teams worldwide for efficient attendance management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 left-4 text-6xl text-primary-200 dark:text-primary-900/30 font-serif">
                  "
                </div>
                <div className="relative z-10">
                  <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 italic leading-relaxed pl-4">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center space-x-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-20 mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
              Why Choose Our Attendance Management System?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "⏰",
                title: "Time-Saving Automation",
                description: "Automated check-in/out processes save hours of manual work every week"
              },
              {
                icon: "📊",
                title: "Comprehensive Analytics",
                description: "Get detailed insights into attendance patterns and workforce trends"
              },
              {
                icon: "🎮",
                title: "Gamification Features",
                description: "Engage employees with badges, streaks, and achievement rewards"
              },
              {
                icon: "📱",
                title: "Mobile-First Design",
                description: "Access your attendance system anywhere, anytime on any device"
              },
              {
                icon: "🔒",
                title: "Enterprise Security",
                description: "Bank-level encryption and role-based access control for data protection"
              },
              {
                icon: "🌐",
                title: "Cloud-Based Solution",
                description: "No installation needed. Access from anywhere with internet connection"
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-20 mb-12"
        >
          <div className="relative bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 dark:from-primary-700 dark:via-purple-700 dark:to-pink-700 rounded-3xl p-12 text-center text-white shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold mb-4">Ready to Transform Your Attendance Management?</h3>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join thousands of companies using our attendance system to streamline their workforce management and boost productivity
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/employee/register">
                  <Button variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4">
                    Get Started as Employee
                  </Button>
                </Link>
                <Link to="/manager/login">
                  <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-2 border-white text-lg px-8 py-4">
                    Manager Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;

