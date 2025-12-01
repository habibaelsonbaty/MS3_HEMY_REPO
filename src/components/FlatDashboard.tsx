import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Trophy, Sparkles, Palette, LogOut, MessageCircle, Heart, ThumbsUp, Star, Smile } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

interface FlatDashboardProps {
  onNavigate: (destination: string) => void;
  onLogout: () => void;
}

export function FlatDashboard({ onNavigate, onLogout }: FlatDashboardProps) {
  const { avatar, pet, userName, totalXP, setDailyMood, dailyMood, completedLessons, badges, studentCode, teacherMessages } = useAppContext();
  const [selectedMood, setSelectedMood] = useState<string | null>(dailyMood);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // Teacher feedback messages with reactions
  const [feedbackReactions, setFeedbackReactions] = useState<{ [key: number]: string | null }>({});

  const reactionEmojis = [
    { emoji: "❤️", label: "Love" },
    { emoji: "👍", label: "Thanks" },
    { emoji: "⭐", label: "Star" },
    { emoji: "😊", label: "Happy" },
  ];

  const handleReaction = (feedbackId: number, emoji: string) => {
    setFeedbackReactions(prev => ({
      ...prev,
      [feedbackId]: prev[feedbackId] === emoji ? null : emoji,
    }));
  };

  const quotesOfTheDay = [
    "Every expert was once a beginner! 🌟",
    "Learning is an adventure, not a race! 🚀",
    "Mistakes are proof that you're trying! 💪",
    "You're braver than you believe! 🦁",
    "Believe in yourself and magic happens! ✨",
    "Today is a great day to learn something new! 📚",
    "Your potential is endless! 🌈",
    "Small steps every day = big success! 🎯",
    "Be curious, be creative, be amazing! 🎨",
    "You're doing GREAT! Keep going! 🌟",
  ];

  // Pick a consistent quote for today
  const today = new Date().toDateString();
  const quoteIndex = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % quotesOfTheDay.length;
  const todayQuote = quotesOfTheDay[quoteIndex];

  const moods = [
    { emoji: "😊", label: "Happy", message: "You look cheerful today! Ready for a fun quest?" },
    { emoji: "😴", label: "Tired", message: "Feeling low-energy? Let's take it slow today." },
    { emoji: "😄", label: "Excited", message: "Woohoo! Let's dive into an awesome new adventure!" },
    { emoji: "😢", label: "Sad", message: "It's okay to feel down. Your buddy is here for you." },
  ];

  // Calculate progress for each subject
  const mathProgress = completedLessons.filter(l => l.worldId === "math").length;
  const scienceProgress = completedLessons.filter(l => l.worldId === "science").length;

  const subjects = [
    { 
      id: "math", 
      name: "Mathematics", 
      color: "#4FA8C5", 
      icon: "🔢",
      progress: mathProgress,
      total: 10,
      description: "Explore numbers & shapes"
    },
    { 
      id: "art", 
      name: "Art", 
      color: "#F5C542", 
      icon: "🎨",
      showProgress: false,
      description: "Create amazing artworks"
    },
    { 
      id: "science", 
      name: "Science", 
      color: "#5FB89A", 
      icon: "🔬",
      progress: scienceProgress,
      total: 10,
      description: "Discover nature's secrets"
    },
  ];

  const getCurrentMoodMessage = () => {
    if (!selectedMood) return "";
    const mood = moods.find(m => m.label === selectedMood);
    return mood ? mood.message : "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] pb-12">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end mb-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLogoutPopup(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full btn-hover-darken"
            style={{ boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)", fontWeight: 600, color: "#6B7280" }}
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </motion.div>
        
        {/* Logout Confirmation Popup */}
        <AnimatePresence>
          {showLogoutPopup && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setShowLogoutPopup(false)}
              />
              
              {/* Popup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 z-50 w-full max-w-md"
                style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">👋</div>
                  <h2 className="text-2xl mb-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                    Logout?
                  </h2>
                  <p style={{ color: "#9CA3AF", fontWeight: 600 }}>
                    Are you sure you want to logout?
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLogoutPopup(false)}
                    className="flex-1 px-6 py-3 rounded-2xl"
                    style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onLogout}
                    className="flex-1 px-6 py-3 rounded-2xl text-white"
                    style={{ backgroundColor: "#EF4444", fontWeight: 600 }}
                  >
                    Logout
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Header with Avatar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          {/* Avatar + Pet */}
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-4xl"
              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
            >
              {avatar}
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-3xl"
              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
            >
              {pet}
            </motion.div>

            <div>
              <h2 className="text-3xl mb-1" style={{ fontWeight: 700, color: "#4A5568" }}>
                Welcome back, {userName || "Explorer"}!
              </h2>
              <p className="text-lg" style={{ color: "#6B7280" }}>
                Ready to continue your learning adventure!
              </p>
            </div>
          </div>

          {/* XP Badge */}
          <div className="flex items-center gap-4">
            {/* Student Code Display */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-3xl px-6 py-4"
              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
            >
              <p className="text-xs mb-1" style={{ color: "#9CA3AF", fontWeight: 600 }}>
                Student Code
              </p>
              <p className="text-lg" style={{ color: "#4A5568", fontWeight: 800 }}>
                {studentCode}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-3xl px-8 py-4 flex items-center gap-3"
              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-3xl"
              >
                ✨
              </motion.div>
              <div>
                <p className="text-sm" style={{ color: "#6B7280", fontWeight: 600 }}>
                  Total XP
                </p>
                <p className="text-2xl" style={{ fontWeight: 800, color: "#FFD670" }}>
                  {totalXP}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Quote of the Day - Redesigned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-2 bg-gradient-to-br from-[#E5D4FF] to-[#F3E8FF] rounded-3xl overflow-hidden relative"
            style={{ boxShadow: "0 6px 20px rgba(197, 167, 255, 0.25)" }}
          >
            {/* Subtle Background Decorations */}
            <div className="absolute top-6 right-8 text-xl opacity-20">⭐</div>
            <div className="absolute top-16 right-20 text-lg opacity-15">✨</div>
            <div className="absolute bottom-10 right-10 text-xl opacity-20">💛</div>
            <div className="absolute top-1/2 right-6 text-lg opacity-15">☁️</div>
            <div className="absolute bottom-20 left-1/3 text-lg opacity-15">⭐</div>
            <div className="absolute top-12 left-1/2 text-sm opacity-15">✨</div>
            
            <div className="relative p-8 flex flex-col items-center justify-center text-center">
              {/* Cute Mascot - Sticker Style */}
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex-shrink-0 relative mb-6"
              >
                <div 
                  className="w-28 h-28 rounded-full bg-white flex items-center justify-center text-6xl"
                  style={{ 
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "4px solid rgba(255, 255, 255, 0.8)"
                  }}
                >
                  {pet}
                </div>
                {/* Small sparkle near mascot */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity 
                  }}
                  className="absolute -top-1 -right-1 text-2xl"
                >
                  ✨
                </motion.div>
              </motion.div>

              {/* Content Area */}
              <div className="w-full max-w-2xl">
                {/* Title with Bubble Icon */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="text-2xl">💬</div>
                  <h3 
                    className="text-xl"
                    style={{ 
                      fontWeight: 700, 
                      color: "#E8914E",
                      letterSpacing: "0.3px"
                    }}
                  >
                    Today's Inspiration
                  </h3>
                </div>
                
                {/* Inspirational Quote - Large & Friendly */}
                <p 
                  className="text-3xl leading-relaxed"
                  style={{ 
                    fontWeight: 800, 
                    color: "#5A4A42",
                    letterSpacing: "0.2px",
                    lineHeight: "1.4"
                  }}
                >
                  {todayQuote}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl p-8"
            style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "#C9B6E4" }}
              >
                <Trophy size={28} color="#FFF" />
              </div>
              <h2 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
                Progress
              </h2>
            </div>

            {/* Level Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg" style={{ fontWeight: 600, color: "#4A5568" }}>
                  {completedLessons.length === 0 && "Beginner"}
                  {completedLessons.length > 0 && completedLessons.length < 5 && "Curious"}
                  {completedLessons.length >= 5 && completedLessons.length < 10 && "Explorer"}
                  {completedLessons.length >= 10 && completedLessons.length < 20 && "Solver"}
                  {completedLessons.length >= 20 && "Master"}
                </h3>
                <span className="text-xl" style={{ fontWeight: 700, color: "#C9B6E4" }}>
                  {Math.min(Math.floor((completedLessons.length / 20) * 100), 100)}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((completedLessons.length / 20) * 100, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: "#C9B6E4" }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-2xl" style={{ backgroundColor: "#F8F9FA" }}>
                <span style={{ fontWeight: 600, color: "#6B7280" }}>Lessons</span>
                <motion.span
                  key={completedLessons.length}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl"
                  style={{ fontWeight: 800, color: "#A8D8EA" }}
                >
                  {completedLessons.length}
                </motion.span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl" style={{ backgroundColor: "#F8F9FA" }}>
                <span style={{ fontWeight: 600, color: "#6B7280" }}>Badges</span>
                <motion.span
                  key={badges.filter(b => b.unlocked).length}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl"
                  style={{ fontWeight: 800, color: "#FFD670" }}
                >
                  {badges.filter(b => b.unlocked).length}
                </motion.span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl" style={{ backgroundColor: "#F8F9FA" }}>
                <span style={{ fontWeight: 600, color: "#6B7280" }}>Streak</span>
                <motion.span
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl flex items-center gap-1"
                  style={{ fontWeight: 800, color: "#8BC9B0" }}
                >
                  {Math.floor(totalXP / 100)}
                  <motion.span
                    animate={{ 
                      scale: [1, 1.15, 1.05, 1.2, 1],
                      rotate: [-5, 5, -3, 3, -5]
                    }}
                    transition={{ 
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🔥
                  </motion.span>
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subject Cards - Full Width */}
        <div className="mb-6">
          <h2 className="text-2xl mb-6" style={{ fontWeight: 700, color: "#4A5568" }}>
            Your Learning Worlds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(subject.id)}
                className="bg-white rounded-3xl p-8 cursor-pointer group"
                style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
              >
                <div 
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-5xl mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: subject.color }}
                >
                  {subject.icon}
                </div>

                <h3 className="text-2xl mb-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                  {subject.name}
                </h3>

                <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
                  {subject.description}
                </p>

                {subject.showProgress !== false ? (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm" style={{ fontWeight: 600, color: "#6B7280" }}>
                        Progress
                      </span>
                      <span className="text-sm" style={{ fontWeight: 700, color: subject.color }}>
                        {subject.progress} / {subject.total}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(subject.progress / subject.total) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 * index }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: subject.color }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-2 text-sm" style={{ color: "#6B7280", fontStyle: "italic", height: "20px" }}>
                      Create freely, no limits! ✨
                    </div>
                    <div className="h-2 mb-4" style={{ opacity: 0 }}>
                      {/* Invisible spacer to match progress bar height */}
                    </div>
                  </>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-2xl text-white transition-all btn-hover-darken"
                  style={{
                    backgroundColor: subject.color,
                    boxShadow: `0 4px 16px ${subject.color}40`,
                    fontWeight: 600,
                  }}
                >
                  {subject.showProgress !== false ? "Continue Learning →" : "Start Creating →"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* My Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate("badges")}
            className="bg-gradient-to-br from-[#FFD670] to-[#FFC340] rounded-3xl p-8 cursor-pointer group"
            style={{ boxShadow: "0 4px 24px rgba(255, 214, 112, 0.3)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Trophy size={32} color="#FFFFFF" />
                  <h3 className="text-2xl text-white" style={{ fontWeight: 700 }}>
                    My Badges
                  </h3>
                </div>
                <p className="text-white/90 mb-6">
                  You've earned {badges.filter(b => b.unlocked).length} of {badges.length} badges!
                </p>
                <motion.div 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl text-white"
                  style={{ fontWeight: 600 }}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                >
                  View Collection →
                </motion.div>
              </div>
              <div className="text-6xl opacity-90 transition-transform group-hover:scale-110">
                🏆
              </div>
            </div>
          </motion.div>

          {/* Customize */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate("customize")}
            className="bg-gradient-to-br from-[#C9B6E4] to-[#A896C9] rounded-3xl p-8 cursor-pointer group"
            style={{ boxShadow: "0 4px 24px rgba(201, 182, 228, 0.3)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles size={32} color="#FFFFFF" />
                  <h3 className="text-2xl text-white" style={{ fontWeight: 700 }}>
                    Customize
                  </h3>
                </div>
                <p className="text-white/90 mb-6">
                  Change your avatar and micropet
                </p>
                <motion.div 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl text-white"
                  style={{ fontWeight: 600 }}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                >
                  Customize Now →
                </motion.div>
              </div>
              <div className="text-6xl opacity-90 transition-transform group-hover:scale-110">
                ✨
              </div>
            </div>
          </motion.div>
        </div>

        {/* Teacher Feedback Panel */}
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle size={28} color="#FF9B9B" />
            <h2 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
              Messages from Teachers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {teacherMessages.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center" style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)" }}>
                <p style={{ color: "#9CA3AF", fontWeight: 600 }}>No messages yet. Keep learning and your teachers will send you feedback!</p>
              </div>
            ) : (
              teacherMessages.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-6 relative"
                style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
              >
                {/* Selected Reaction Badge - Top Right */}
                {feedbackReactions[feedback.id] && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{
                      backgroundColor: feedback.color,
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      border: "3px solid white",
                    }}
                  >
                    {feedbackReactions[feedback.id]}
                  </motion.div>
                )}

                <div className="flex items-start gap-4">
                  {/* Subject Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ backgroundColor: feedback.color }}
                  >
                    {feedback.emoji}
                  </motion.div>

                  {/* Message Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg mb-1" style={{ fontWeight: 700, color: "#4A5568" }}>
                          {feedback.teacher}
                        </h3>
                        <p className="text-sm" style={{ color: "#9CA3AF", fontWeight: 600 }}>
                          {feedback.subject} • {feedback.timestamp}
                        </p>
                      </div>
                    </div>

                    <p className="text-base mb-4" style={{ color: "#6B7280", lineHeight: "1.6" }}>
                      {feedback.message}
                    </p>

                    {/* Emoji Reactions */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm mr-2" style={{ color: "#9CA3AF", fontWeight: 600 }}>
                        React:
                      </span>
                      {reactionEmojis.map((reaction) => (
                        <motion.button
                          key={reaction.label}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleReaction(feedback.id, reaction.emoji)}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all btn-hover-darken"
                          style={{
                            backgroundColor: feedbackReactions[feedback.id] === reaction.emoji 
                              ? feedback.color 
                              : "#F3F4F6",
                            border: feedbackReactions[feedback.id] === reaction.emoji 
                              ? `2px solid ${feedback.color}` 
                              : "2px solid transparent",
                            transform: feedbackReactions[feedback.id] === reaction.emoji 
                              ? "scale(1.1)" 
                              : "scale(1)",
                          }}
                          title={reaction.label}
                        >
                          {reaction.emoji}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}