import { motion } from "motion/react";
import { Calculator, TestTube, BookOpen, Palette, ArrowLeft } from "lucide-react";

interface SubjectWorldsProps {
  onSelectSubject: (subject: string) => void;
  onBack: () => void;
}

export function SubjectWorlds({ onSelectSubject, onBack }: SubjectWorldsProps) {
  const subjects = [
    {
      id: "math",
      title: "Math Mountain",
      subtitle: "Sky World Adventure",
      icon: Calculator,
      emoji: "☁️",
      color: "#B3E5FC",
      gradient: "from-[#B3E5FC] to-[#81D4FA]",
      description: "Soar through clouds and floating islands!",
      decorations: ["✈️", "☁️", "🏔️", "⛰️"],
    },
    {
      id: "science",
      title: "Science Lab",
      subtitle: "Jungle Discovery",
      icon: TestTube,
      emoji: "🧪",
      color: "#C8E6C9",
      gradient: "from-[#C8E6C9] to-[#A5D6A7]",
      description: "Explore glowing mushrooms and mysteries!",
      decorations: ["🌿", "🐸", "🍄", "🦋"],
    },
    {
      id: "english",
      title: "Fairy Tale Books",
      subtitle: "Story Kingdom",
      icon: BookOpen,
      emoji: "📖",
      color: "#E1BEE7",
      gradient: "from-[#E1BEE7] to-[#CE93D8]",
      description: "Dive into magical stories and castles!",
      decorations: ["🏰", "✨", "📚", "🧚"],
    },
    {
      id: "art",
      title: "Painter's Studio",
      subtitle: "Creative Meadow",
      icon: Palette,
      emoji: "🎨",
      color: "#FFE0B2",
      gradient: "from-[#FFE0B2] to-[#FFCC80]",
      description: "Paint the world with colors!",
      decorations: ["🖌️", "🎨", "🌈", "💫"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F8] to-[#F0F8FF] relative overflow-hidden pb-12">
      {/* Floating background shapes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: `${30 + Math.random() * 50}px`,
            height: `${30 + Math.random() * 50}px`,
            backgroundColor: ["#FFB3D9", "#D4BBFF", "#B3E5FC", "#C8E6C9", "#FFE0B2"][i % 5],
            opacity: 0.15,
            borderRadius: i % 2 === 0 ? "50%" : "30%",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
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
          className="mb-8 flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg"
          style={{ fontWeight: 600 }}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </motion.button>

        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl mb-4" style={{ fontWeight: 800, color: "#6B4BA0" }}>
            Choose Your Adventure World! 🌍
          </h1>
          <p className="text-2xl" style={{ color: "#757575" }}>
            Each world is full of magical lessons and fun challenges!
          </p>
        </motion.div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {subjects.map((subject, index) => (
            <motion.button
              key={subject.id}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.15, type: "spring", bounce: 0.5 }}
              whileHover={{
                scale: 1.05,
                rotate: [0, -1, 1, 0],
                transition: { rotate: { repeat: Infinity, duration: 0.5 } },
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectSubject(subject.id)}
              className={`relative bg-gradient-to-br ${subject.gradient} rounded-3xl p-8 shadow-2xl overflow-hidden cursor-pointer group`}
              style={{ minHeight: "350px" }}
            >
              {/* Decorative emojis floating */}
              {subject.decorations.map((decoration, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  style={{
                    top: `${20 + (i % 2) * 40}%`,
                    left: `${10 + i * 20}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {decoration}
                </motion.div>
              ))}

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, ${subject.color}66 0%, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon */}
                <motion.div
                  className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <subject.icon size={64} color={subject.color} strokeWidth={2.5} />
                </motion.div>

                {/* Title */}
                <h2 className="text-4xl mb-2 text-white" style={{ fontWeight: 800 }}>
                  {subject.title}
                </h2>

                {/* Subtitle */}
                <div className="text-xl mb-4 text-white/90" style={{ fontWeight: 600 }}>
                  {subject.subtitle}
                </div>

                {/* Description */}
                <p className="text-lg text-white/80 mb-6">{subject.description}</p>

                {/* Emoji badge */}
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
                  {subject.emoji}
                </motion.div>

                {/* Start button */}
                <motion.div
                  className="mt-6 px-8 py-3 bg-white rounded-full shadow-lg"
                  style={{ fontWeight: 700, color: subject.color }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Start Adventure! 🚀
                </motion.div>
              </div>

              {/* Sparkles on corners */}
              <motion.div
                className="absolute top-4 right-4 text-3xl"
                animate={{
                  scale: [1, 1.5, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                ✨
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 text-3xl"
                animate={{
                  scale: [1, 1.5, 1],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  repeat: Infinity,
                }}
              >
                ⭐
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Bottom encouragement */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-white rounded-full px-8 py-4 shadow-xl">
            <p className="text-xl" style={{ fontWeight: 600, color: "#6B4BA0" }}>
              Pick any world and start your learning adventure! 🌟
            </p>
          </div>
        </motion.div>
      </div>

      {/* Floating sparkles and stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`deco-${i}`}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${16 + Math.random() * 16}px`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 3,
            repeat: Infinity,
          }}
        >
          {i % 2 === 0 ? "✨" : "⭐"}
        </motion.div>
      ))}
    </div>
  );
}