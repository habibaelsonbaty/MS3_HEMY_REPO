import { motion } from "motion/react";
import { Eye, Headphones, MousePointer2, ArrowLeft } from "lucide-react";
import { useAppContext } from "../context/AppContext";

interface FlatMagicDoorsProps {
  onSelectMode: (mode: string) => void;
  onBack: () => void;
}

export function FlatMagicDoors({ onSelectMode, onBack }: FlatMagicDoorsProps) {
  const { avatar, pet } = useAppContext();
  const modes = [
    {
      id: "visual",
      title: "Visual Mode",
      icon: Eye,
      color: "#4FA8C5",
      description: "Learn by seeing pictures and diagrams",
      emoji: "👁️",
    },
    {
      id: "auditory",
      title: "Auditory Mode",
      icon: Headphones,
      color: "#A896C9",
      description: "Learn by listening to explanations",
      emoji: "🎧",
    },
    {
      id: "interactive",
      title: "Interactive Mode",
      icon: MousePointer2,
      color: "#F5C542",
      description: "Learn by touching and playing",
      emoji: "🎮",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] pb-12">
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Header */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="mb-8 flex items-center gap-2 px-6 py-3 bg-white rounded-full"
          style={{ boxShadow: "0 2px 16px rgba(0, 0, 0, 0.06)", fontWeight: 600, color: "#4A5568" }}
        >
          <ArrowLeft size={20} />
          Back to Map
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl mb-6"
          >
            🚪
          </motion.div>
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
            Choose Your Learning Style
          </h1>
          <p className="text-xl" style={{ color: "#6B7280" }}>
            Pick the way you learn best!
          </p>
        </motion.div>

        {/* Magic Doors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {modes.map((mode, index) => (
            <motion.button
              key={mode.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectMode(mode.id)}
              className="bg-white rounded-3xl p-8 cursor-pointer group"
              style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <motion.div
                  className="w-32 h-32 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: mode.color }}
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <mode.icon size={56} color="white" strokeWidth={2} />
                </motion.div>

                {/* Emoji */}
                <div className="text-5xl mb-4">{mode.emoji}</div>

                {/* Title */}
                <h2 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
                  {mode.title}
                </h2>

                {/* Description */}
                <p className="text-lg mb-6" style={{ color: "#6B7280" }}>
                  {mode.description}
                </p>

                {/* Select Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-3 rounded-full text-white"
                  style={{ backgroundColor: mode.color, fontWeight: 600 }}
                >
                  Choose This →
                </motion.div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-white rounded-full px-8 py-4" style={{ boxShadow: "0 2px 16px rgba(0, 0, 0, 0.06)" }}>
            <p className="text-lg" style={{ color: "#6B7280" }}>
              💡 Try different modes to find what works best for you!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}