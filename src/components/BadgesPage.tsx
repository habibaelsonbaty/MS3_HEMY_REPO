import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Trophy, Star, Zap, Heart, Brain, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

interface BadgesPageProps {
  onBack: () => void;
}

interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  unlockedDate?: string;
  color: string;
}

export function BadgesPage({ onBack }: BadgesPageProps) {
  const { badges: contextBadges } = useAppContext();
  const [selectedBadge, setSelectedBadge] = useState<any>(null);

  // Map context badges to display format with colors
  const badgeColors: Record<string, string> = {
    "first-lesson": "#F5C542",
    "math-master": "#4FA8C5",
    "science-star": "#5FB89A",
    "artist": "#F5C542",
    "rocket-thinker": "#4FA8C5",
    "perfect-score": "#E85D8A",
    "explorer": "#5FB89A",
  };

  const badges = contextBadges.map(badge => ({
    ...badge,
    emoji: badge.icon,
    color: badgeColors[badge.id] || "#E0E0E0",
    unlockedDate: badge.unlocked ? "Nov 20, 2024" : undefined,
  }));

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const totalCount = badges.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] relative overflow-hidden pb-12">
      {/* Floating decorations */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
          }}
        >
          {["🏆", "⭐", "🌟", "✨"][i % 4]}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="mb-8 flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg btn-hover-darken"
          style={{ fontWeight: 600 }}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </motion.button>

        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-8xl mb-4"
          >
            🏆
          </motion.div>
          <h1 className="text-6xl mb-4" style={{ fontWeight: 800, color: "#6B4BA0" }}>
            Your Amazing Badges! 🌟
          </h1>
          <p className="text-2xl mb-6" style={{ color: "#757575" }}>
            Collect them all by learning and growing!
          </p>

          {/* Progress */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block bg-gradient-to-r from-[#FF6B9D] to-[#FFD700] text-white rounded-full px-12 py-4 shadow-xl"
          >
            <div className="text-3xl" style={{ fontWeight: 800 }}>
              {unlockedCount} / {totalCount} Badges
            </div>
          </motion.div>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
          {badges.map((badge, index) => (
            <motion.button
              key={badge.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1, type: "spring", bounce: 0.5 }}
              whileHover={badge.unlocked ? { scale: 1.05, y: -10 } : {}}
              whileTap={badge.unlocked ? { scale: 0.95 } : {}}
              onClick={() => badge.unlocked && setSelectedBadge(badge)}
              className={`relative bg-white rounded-3xl p-8 shadow-xl btn-hover-darken ${
                badge.unlocked ? "cursor-pointer" : "opacity-50"
              }`}
              style={{
                border: `6px solid ${badge.color}`,
                filter: badge.unlocked ? "none" : "grayscale(80%)",
              }}
            >
              {/* Badge emoji */}
              <motion.div
                className="text-7xl mb-4"
                animate={
                  badge.unlocked
                    ? {
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                {badge.emoji}
              </motion.div>

              {/* Badge name */}
              <h3 className="text-xl mb-2" style={{ fontWeight: 700, color: "#6B4BA0" }}>
                {badge.name}
              </h3>

              {/* Badge description */}
              <p className="text-sm" style={{ color: "#757575" }}>
                {badge.description}
              </p>

              {/* Unlocked date */}
              {badge.unlocked && badge.unlockedDate && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full inline-block"
                  style={{ fontWeight: 600 }}
                >
                  ✓ {badge.unlockedDate}
                </motion.div>
              )}

              {/* Locked overlay */}
              {!badge.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20 rounded-3xl">
                  <div className="bg-gray-800 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                    🔒
                  </div>
                </div>
              )}

              {/* Sparkles for unlocked badges */}
              {badge.unlocked &&
                [...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${10 + (i % 2) * 70}%`,
                      left: `${10 + (i % 3) * 35}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.5,
                      repeat: Infinity,
                    }}
                  >
                    <Sparkles size={20} color={badge.color} />
                  </motion.div>
                ))}
            </motion.button>
          ))}
        </div>

        {/* Trophy shelf */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-[#FFE0B2] to-[#FFCC80] rounded-3xl p-8 shadow-xl"
          style={{ border: "6px solid #FFB74D" }}
        >
          <h2 className="text-3xl mb-6 text-center" style={{ fontWeight: 800, color: "#6B4BA0" }}>
            🏆 Your Trophy Shelf 🏆
          </h2>

          <div className="flex justify-center items-end gap-4 mb-6">
            {badges
              .filter((b) => b.unlocked)
              .slice(0, 8)
              .map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
                  className="text-5xl"
                  style={{ marginBottom: `${(i % 3) * 10}px` }}
                  animate-prop={{
                    y: [0, -10, 0],
                  }}
                  transition-prop={{
                    duration: 2 + (i % 3) * 0.5,
                    repeat: Infinity,
                  }}
                >
                  {badge.emoji}
                </motion.div>
              ))}
          </div>

          <p className="text-center text-xl" style={{ fontWeight: 600, color: "#6B4BA0" }}>
            Keep learning to fill your trophy shelf! 🌟
          </p>
        </motion.div>
      </div>

      {/* Badge detail modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBadge(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-12 shadow-2xl max-w-md relative"
              style={{ border: `8px solid ${selectedBadge.color}` }}
            >
              {/* Confetti effect */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: ["#FF6B9D", "#FFD700", "#B3E5FC", "#C8E6C9"][i % 4],
                    borderRadius: "50%",
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: [(Math.random() - 0.5) * 400],
                    y: [(Math.random() - 0.5) * 400],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              ))}

              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-9xl text-center mb-6"
              >
                {selectedBadge.emoji}
              </motion.div>

              <h2 className="text-4xl mb-4 text-center" style={{ fontWeight: 800, color: "#6B4BA0" }}>
                {selectedBadge.name}
              </h2>

              <p className="text-xl text-center mb-6" style={{ color: "#757575" }}>
                {selectedBadge.description}
              </p>

              {selectedBadge.unlockedDate && (
                <div className="text-center mb-6">
                  <div className="inline-block bg-green-100 text-green-700 px-6 py-3 rounded-full">
                    <span style={{ fontWeight: 700 }}>Unlocked: {selectedBadge.unlockedDate}</span>
                  </div>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedBadge(null)}
                className="w-full py-4 bg-gradient-to-r from-[#FF6B9D] to-[#FFD700] text-white rounded-full shadow-lg text-xl btn-hover-darken"
                style={{ fontWeight: 700 }}
              >
                Awesome! ✨
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}