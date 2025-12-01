import { motion } from "motion/react";
import { Eye, Headphones, MousePointer2, ArrowLeft, Sparkles } from "lucide-react";

interface LessonModeSelectionProps {
  onSelectMode: (mode: string) => void;
  onBack: () => void;
}

export function LessonModeSelection({ onSelectMode, onBack }: LessonModeSelectionProps) {
  const modes = [
    {
      id: "visual",
      title: "Visual Mode",
      icon: Eye,
      color: "#B3E5FC",
      glowColor: "rgba(179, 229, 252, 0.6)",
      description: "Watch and learn with pictures and animations!",
      emoji: "👀",
      particles: ["🔵", "💠", "🔷", "💎"],
    },
    {
      id: "auditory",
      title: "Auditory Mode",
      icon: Headphones,
      color: "#D4BBFF",
      glowColor: "rgba(212, 187, 255, 0.6)",
      description: "Listen to stories and sounds!",
      emoji: "🎧",
      particles: ["🎵", "🎶", "🎼", "🔊"],
    },
    {
      id: "interactive",
      title: "Interactive Mode",
      icon: MousePointer2,
      color: "#FFD700",
      glowColor: "rgba(255, 215, 0, 0.6)",
      description: "Touch, play, and explore!",
      emoji: "🎮",
      particles: ["⭐", "✨", "🌟", "💫"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D1B4E] via-[#4A2B6F] to-[#6B4BA0] relative overflow-hidden">
      {/* Magical background elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="mb-8 flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur text-white rounded-full shadow-lg"
          style={{ fontWeight: 600 }}
        >
          <ArrowLeft size={20} />
          Back to Map
        </motion.button>

        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-6xl mb-4"
          >
            🚪
          </motion.div>
          <h1 className="text-6xl mb-4 text-white" style={{ fontWeight: 800 }}>
            Choose Your Magic Door! ✨
          </h1>
          <p className="text-2xl text-white/90" style={{ fontWeight: 600 }}>
            Each door teaches in a different, magical way!
          </p>
        </motion.div>

        {/* Magic Doors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto mb-12">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ y: 100, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, type: "spring", bounce: 0.4 }}
              className="relative"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  rotateY: [0, 5, -5, 0],
                  transition: { rotateY: { repeat: Infinity, duration: 0.6 } },
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectMode(mode.id)}
                className="relative w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 shadow-2xl overflow-hidden cursor-pointer group"
                style={{
                  border: `4px solid ${mode.color}`,
                  minHeight: "500px",
                }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at center, ${mode.glowColor} 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Door frame decoration */}
                <div className="absolute inset-4 rounded-2xl border-4 border-dashed border-white/30" />

                {/* Floating particles */}
                {mode.particles.map((particle, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-3xl"
                    style={{
                      top: `${20 + (i % 2) * 50}%`,
                      left: `${10 + i * 20}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 180, 360],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {particle}
                  </motion.div>
                ))}

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Main icon */}
                  <motion.div
                    className="w-40 h-40 rounded-full flex items-center justify-center mb-6 shadow-2xl relative"
                    style={{ backgroundColor: mode.color }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${mode.glowColor}`,
                        `0 0 40px ${mode.glowColor}`,
                        `0 0 20px ${mode.glowColor}`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <mode.icon size={80} color="white" strokeWidth={2.5} />

                    {/* Orbiting sparkles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 3,
                          delay: i * 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Sparkles
                          size={20}
                          color={mode.color}
                          fill={mode.color}
                          style={{
                            position: "absolute",
                            top: "-10px",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Title */}
                  <h2 className="text-3xl mb-4 text-white" style={{ fontWeight: 800 }}>
                    {mode.title}
                  </h2>

                  {/* Description */}
                  <p className="text-lg text-white/90 mb-6 px-4">{mode.description}</p>

                  {/* Emoji */}
                  <motion.div
                    className="text-6xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    {mode.emoji}
                  </motion.div>

                  {/* Enter button */}
                  <motion.div
                    className="mt-6 px-8 py-4 rounded-full text-white"
                    style={{ backgroundColor: mode.color, fontWeight: 700 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Open Door! 🔓
                  </motion.div>
                </div>

                {/* Corner sparkles */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles size={32} color={mode.color} />
                </motion.div>

                <motion.div
                  className="absolute bottom-4 left-4"
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles size={32} color={mode.color} />
                </motion.div>
              </motion.button>

              {/* Door shadow */}
              <div
                className="absolute inset-0 rounded-3xl -z-10 blur-2xl opacity-50"
                style={{ backgroundColor: mode.color, transform: "translateY(20px)" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Hint text */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-block bg-white/10 backdrop-blur rounded-full px-8 py-4 shadow-xl">
            <p className="text-xl text-white" style={{ fontWeight: 600 }}>
              💡 Tip: Try different doors to learn in the way you love most!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Magical floating elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`magic-${i}`}
          className="absolute text-4xl"
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
            duration: 5,
            delay: Math.random() * 5,
            repeat: Infinity,
          }}
        >
          {["✨", "🌟", "💫", "⭐"][i % 4]}
        </motion.div>
      ))}
    </div>
  );
}
