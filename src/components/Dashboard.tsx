import { motion } from "motion/react";
import { Sparkles, Sun, Cloud, Rainbow, Star, Zap, Heart, Smile, Laugh, Meh, Frown } from "lucide-react";
import { useState } from "react";

interface DashboardProps {
  onNavigate: (destination: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [progress] = useState(65); // Mock progress

  const moods = [
    { emoji: "😊", label: "Happy", icon: Smile, color: "#FFD700" },
    { emoji: "😄", label: "Excited", icon: Laugh, color: "#FF6B9D" },
    { emoji: "😌", label: "Calm", icon: Meh, color: "#B3E5FC" },
    { emoji: "😔", label: "Tired", icon: Frown, color: "#D4BBFF" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F8] via-[#F0F8FF] to-[#FFF9C4] relative overflow-hidden pb-12">
      {/* Floating background bubbles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${40 + Math.random() * 60}px`,
            height: `${40 + Math.random() * 60}px`,
            backgroundColor: ["#FFB3D9", "#D4BBFF", "#B3E5FC", "#C8E6C9"][i % 4],
            opacity: 0.2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Header with animated mascot */}
        <div className="flex justify-between items-start mb-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <h1 className="text-5xl mb-2" style={{ fontWeight: 800, color: "#6B4BA0" }}>
              Hey there, Champion! 🌟
            </h1>
            <p className="text-xl" style={{ color: "#757575" }}>
              Ready to explore magical worlds today?
            </p>
          </motion.div>

          {/* Animated Mascot */}
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-6xl shadow-xl"
              style={{ backgroundColor: "#FFE0B2" }}
            >
              🦊
            </div>
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Sparkles size={24} color="#FFD700" fill="#FFD700" />
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Today's Challenge Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, rotate: -1 }}
            className="lg:col-span-2 bg-gradient-to-br from-[#FF6B9D] to-[#D4BBFF] rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Sparkles decoration */}
            <motion.div
              className="absolute top-4 right-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Star size={32} color="white" fill="white" />
            </motion.div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Zap size={32} color="white" fill="white" />
                <h2 className="text-3xl text-white" style={{ fontWeight: 700 }}>
                  Today's Challenge
                </h2>
              </div>

              <p className="text-white text-xl mb-6">
                Complete 3 Math Mountain levels to unlock a surprise! 🎁
              </p>

              <div className="bg-white/30 rounded-2xl p-4 mb-4 backdrop-blur">
                <div className="flex justify-between text-white mb-2">
                  <span style={{ fontWeight: 600 }}>Progress</span>
                  <span style={{ fontWeight: 700 }}>1 / 3 levels</span>
                </div>
                <div className="h-4 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: "33%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    {/* Sparkle effect */}
                    <motion.div
                      className="absolute right-0 top-1/2 transform -translate-y-1/2"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      <Sparkles size={16} color="#FFD700" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate("subjects")}
                className="bg-white text-[#FF6B9D] px-8 py-4 rounded-full shadow-lg text-xl"
                style={{ fontWeight: 700 }}
              >
                Let's Go! 🚀
              </motion.button>
            </div>

            {/* Floating stars */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.4,
                  repeat: Infinity,
                }}
              >
                <Star size={20} color="white" fill="white" />
              </motion.div>
            ))}
          </motion.div>

          {/* Your Mood Today Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
            style={{ border: "6px solid #FFE0B2" }}
          >
            <h3 className="text-2xl mb-4" style={{ fontWeight: 700, color: "#6B4BA0" }}>
              How are you feeling? 💭
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {moods.map((mood, i) => (
                <motion.button
                  key={mood.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", bounce: 0.6 }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedMood(mood.label)}
                  className={`p-4 rounded-2xl transition-all ${
                    selectedMood === mood.label ? "ring-4 ring-offset-2" : ""
                  }`}
                  style={{
                    backgroundColor: mood.color + "33",
                    borderColor: mood.color,
                    borderWidth: "3px",
                  }}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <div className="text-sm" style={{ fontWeight: 600 }}>
                    {mood.label}
                  </div>
                </motion.button>
              ))}
            </div>

            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-[#C8E6C9] rounded-2xl text-center"
              >
                <span style={{ fontWeight: 600 }}>Great choice! Keep shining! ✨</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Weather Vibes & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Weather Vibes */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-[#B3E5FC] to-[#E1BEE7] rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <h3 className="text-2xl mb-6 text-white" style={{ fontWeight: 700 }}>
              Today's Vibes 🌈
            </h3>

            <div className="flex items-center justify-around">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Sun size={64} color="#FFD700" fill="#FFD700" />
              </motion.div>

              <motion.div
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Cloud size={48} color="white" fill="white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Rainbow size={56} color="#FF6B9D" />
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles size={40} color="#FFD700" fill="#FFD700" />
              </motion.div>
            </div>

            <p className="text-center text-white text-xl mt-6" style={{ fontWeight: 600 }}>
              Magical Learning Weather! ✨
            </p>
          </motion.div>

          {/* Overall Progress */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
            style={{ border: "6px solid #C8E6C9" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Heart size={32} color="#FF6B9D" fill="#FF6B9D" />
              <h3 className="text-2xl" style={{ fontWeight: 700, color: "#6B4BA0" }}>
                Your Progress
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span style={{ fontWeight: 600 }}>Level 3: Brain Hero</span>
                  <span style={{ fontWeight: 700 }}>{progress}%</span>
                </div>
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-full relative"
                    style={{
                      background: "linear-gradient(90deg, #FF6B9D, #FFD700, #B3E5FC)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    {/* Sparkle particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 transform -translate-y-1/2"
                        style={{ left: `${30 + i * 20}%` }}
                        animate={{
                          scale: [0, 1, 0],
                          y: [-10, -20],
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.3,
                          repeat: Infinity,
                        }}
                      >
                        <Sparkles size={12} color="white" />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-[#FFB3D9] rounded-2xl p-4 text-center">
                  <div className="text-3xl mb-1" style={{ fontWeight: 800 }}>
                    42
                  </div>
                  <div className="text-xs" style={{ fontWeight: 600 }}>
                    Lessons Done
                  </div>
                </div>
                <div className="bg-[#C8E6C9] rounded-2xl p-4 text-center">
                  <div className="text-3xl mb-1" style={{ fontWeight: 800 }}>
                    15
                  </div>
                  <div className="text-xs" style={{ fontWeight: 600 }}>
                    Badges
                  </div>
                </div>
                <div className="bg-[#FFE0B2] rounded-2xl p-4 text-center">
                  <div className="text-3xl mb-1" style={{ fontWeight: 800 }}>
                    7
                  </div>
                  <div className="text-xs" style={{ fontWeight: 600 }}>
                    Day Streak
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "My Subjects", emoji: "📚", color: "#FFB3D9", route: "subjects" },
            { label: "My Island", emoji: "🏝️", color: "#B3E5FC", route: "island" },
            { label: "Customize Room", emoji: "🎨", color: "#FFE0B2", route: "customize" },
            { label: "My Badges", emoji: "🏆", color: "#C8E6C9", route: "badges" },
          ].map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(action.route)}
              className="bg-white rounded-3xl p-6 shadow-xl text-center"
              style={{ border: `4px solid ${action.color}` }}
            >
              <motion.div
                className="text-5xl mb-3"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {action.emoji}
              </motion.div>
              <div style={{ fontWeight: 700, color: "#6B4BA0" }}>{action.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Floating sparkles everywhere */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-2xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            delay: Math.random() * 4,
            repeat: Infinity,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
