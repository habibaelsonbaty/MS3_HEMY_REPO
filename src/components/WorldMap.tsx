import { motion } from "motion/react";
import { ArrowLeft, Lock, CheckCircle2, Star } from "lucide-react";

interface WorldMapProps {
  subject: string;
  onSelectLevel: (level: string) => void;
  onBack: () => void;
}

export function WorldMap({ subject, onSelectLevel, onBack }: WorldMapProps) {
  const worldData: Record<
    string,
    {
      name: string;
      bgGradient: string;
      levels: Array<{
        id: string;
        name: string;
        emoji: string;
        status: "completed" | "current" | "locked";
        position: { top: string; left: string };
      }>;
    }
  > = {
    math: {
      name: "Math Mountain",
      bgGradient: "from-[#B3E5FC] via-[#81D4FA] to-[#4FC3F7]",
      levels: [
        {
          id: "pebble-path",
          name: "Pebble Path",
          emoji: "🪨",
          status: "completed",
          position: { top: "70%", left: "15%" },
        },
        {
          id: "number-forest",
          name: "Number Forest",
          emoji: "🌲",
          status: "completed",
          position: { top: "50%", left: "30%" },
        },
        {
          id: "fraction-falls",
          name: "Fraction Falls",
          emoji: "💧",
          status: "current",
          position: { top: "35%", left: "50%" },
        },
        {
          id: "algebra-summit",
          name: "Algebra Summit",
          emoji: "⛰️",
          status: "locked",
          position: { top: "15%", left: "70%" },
        },
      ],
    },
    science: {
      name: "Science Jungle Lab",
      bgGradient: "from-[#C8E6C9] via-[#A5D6A7] to-[#81C784]",
      levels: [
        {
          id: "moon-base",
          name: "Moon Base",
          emoji: "🌙",
          status: "completed",
          position: { top: "65%", left: "20%" },
        },
        {
          id: "mars-lab",
          name: "Mars Lab",
          emoji: "🔬",
          status: "current",
          position: { top: "45%", left: "45%" },
        },
        {
          id: "galaxy-quest",
          name: "Galaxy Quest",
          emoji: "🌌",
          status: "locked",
          position: { top: "25%", left: "70%" },
        },
      ],
    },
    english: {
      name: "Fairy Tale Kingdom",
      bgGradient: "from-[#E1BEE7] via-[#CE93D8] to-[#BA68C8]",
      levels: [
        {
          id: "story-stream",
          name: "Story Stream",
          emoji: "📚",
          status: "completed",
          position: { top: "68%", left: "18%" },
        },
        {
          id: "chapter-canopy",
          name: "Chapter Canopy",
          emoji: "🌳",
          status: "current",
          position: { top: "48%", left: "42%" },
        },
        {
          id: "legend-lagoon",
          name: "Legend Lagoon",
          emoji: "🏰",
          status: "locked",
          position: { top: "22%", left: "68%" },
        },
      ],
    },
    art: {
      name: "Painter's Meadow",
      bgGradient: "from-[#FFE0B2] via-[#FFCC80] to-[#FFB74D]",
      levels: [
        {
          id: "color-creek",
          name: "Color Creek",
          emoji: "🎨",
          status: "completed",
          position: { top: "66%", left: "22%" },
        },
        {
          id: "sketch-hill",
          name: "Sketch Hill",
          emoji: "✏️",
          status: "current",
          position: { top: "44%", left: "48%" },
        },
        {
          id: "masterpiece-peak",
          name: "Masterpiece Peak",
          emoji: "🖼️",
          status: "locked",
          position: { top: "20%", left: "72%" },
        },
      ],
    },
  };

  const world = worldData[subject] || worldData.math;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${world.bgGradient} relative overflow-hidden pb-12`}
    >
      {/* Animated clouds/decorations */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-5xl opacity-40"
          style={{
            top: `${10 + (i % 3) * 25}%`,
            left: `${(i * 12) % 100}%`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ☁️
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
          className="mb-8 flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg"
          style={{ fontWeight: 600 }}
        >
          <ArrowLeft size={20} />
          Back to Worlds
        </motion.button>

        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl mb-3 text-white" style={{ fontWeight: 800 }}>
            {world.name} 🗺️
          </h1>
          <p className="text-2xl text-white/90" style={{ fontWeight: 600 }}>
            Choose a level to explore!
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
          style={{ minHeight: "600px", border: "6px solid white" }}
        >
          {/* Path connecting levels */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {world.levels.map((level, i) => {
              if (i === world.levels.length - 1) return null;
              const nextLevel = world.levels[i + 1];
              return (
                <motion.line
                  key={`path-${i}`}
                  x1={level.position.left}
                  y1={level.position.top}
                  x2={nextLevel.position.left}
                  y2={nextLevel.position.top}
                  stroke="white"
                  strokeWidth="6"
                  strokeDasharray="20,10"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.3 }}
                />
              );
            })}
          </svg>

          {/* Level nodes */}
          {world.levels.map((level, index) => (
            <motion.div
              key={level.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: level.position.top,
                left: level.position.left,
                zIndex: 10,
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + index * 0.2, type: "spring", bounce: 0.6 }}
            >
              <motion.button
                whileHover={level.status !== "locked" ? { scale: 1.15, rotate: [0, -5, 5, 0] } : {}}
                whileTap={level.status !== "locked" ? { scale: 0.9 } : {}}
                onClick={() => level.status !== "locked" && onSelectLevel(level.id)}
                disabled={level.status === "locked"}
                className={`relative flex flex-col items-center ${
                  level.status === "locked" ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {/* Level circle */}
                <motion.div
                  className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl shadow-2xl relative ${
                    level.status === "locked" ? "bg-gray-400" : "bg-white"
                  }`}
                  style={{
                    border: level.status === "current" ? "6px solid #FFD700" : "6px solid white",
                  }}
                  animate={
                    level.status === "current"
                      ? {
                          boxShadow: [
                            "0 0 20px rgba(255, 215, 0, 0.5)",
                            "0 0 40px rgba(255, 215, 0, 0.8)",
                            "0 0 20px rgba(255, 215, 0, 0.5)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {level.status === "locked" ? (
                    <Lock size={48} color="#666" />
                  ) : (
                    <span>{level.emoji}</span>
                  )}

                  {/* Status badge */}
                  {level.status === "completed" && (
                    <motion.div
                      className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                    >
                      <CheckCircle2 size={24} color="white" fill="white" />
                    </motion.div>
                  )}

                  {level.status === "current" && (
                    <motion.div
                      className="absolute -top-3 -right-3"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Star size={32} color="#FFD700" fill="#FFD700" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Level name */}
                <motion.div
                  className={`mt-4 px-6 py-3 rounded-full shadow-lg ${
                    level.status === "locked"
                      ? "bg-gray-400 text-gray-600"
                      : level.status === "current"
                      ? "bg-[#FFD700] text-white"
                      : "bg-white text-gray-800"
                  }`}
                  style={{ fontWeight: 700 }}
                  whileHover={level.status !== "locked" ? { scale: 1.05 } : {}}
                >
                  {level.name}
                </motion.div>

                {/* Floating sparkles for current level */}
                {level.status === "current" &&
                  [...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        top: `${-20 + (i % 2) * 40}px`,
                        left: `${-30 + (i % 3) * 30}px`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
              </motion.button>
            </motion.div>
          ))}

          {/* Decorative elements */}
          <motion.div
            className="absolute bottom-8 left-8 text-6xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌳
          </motion.div>

          <motion.div
            className="absolute top-8 right-8 text-6xl"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎈
          </motion.div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex justify-center gap-6"
        >
          <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <CheckCircle2 size={20} color="#10B981" fill="#10B981" />
            <span style={{ fontWeight: 600 }}>Completed</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <Star size={20} color="#FFD700" fill="#FFD700" />
            <span style={{ fontWeight: 600 }}>Current</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <Lock size={20} color="#666" />
            <span style={{ fontWeight: 600 }}>Locked</span>
          </div>
        </motion.div>
      </div>

      {/* Floating decorations */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-3xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            delay: Math.random() * 4,
            repeat: Infinity,
          }}
        >
          {["✨", "⭐", "🌟"][i % 3]}
        </motion.div>
      ))}
    </div>
  );
}
