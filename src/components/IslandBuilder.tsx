import { motion } from "motion/react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";

interface IslandBuilderProps {
  onBack: () => void;
}

interface IslandItem {
  id: string;
  emoji: string;
  name: string;
  x: number;
  y: number;
  unlocked: boolean;
}

export function IslandBuilder({ onBack }: IslandBuilderProps) {
  const [items, setItems] = useState<IslandItem[]>([
    { id: "1", emoji: "🌳", name: "Magic Tree", x: 20, y: 30, unlocked: true },
    { id: "2", emoji: "🏠", name: "Learning House", x: 50, y: 40, unlocked: true },
    { id: "3", emoji: "💎", name: "Knowledge Gem", x: 70, y: 25, unlocked: true },
    { id: "4", emoji: "🌊", name: "Wisdom River", x: 30, y: 70, unlocked: true },
    { id: "5", emoji: "⛵", name: "Adventure Boat", x: 60, y: 75, unlocked: true },
    { id: "6", emoji: "🏆", name: "Trophy Stand", x: 80, y: 60, unlocked: false },
    { id: "7", emoji: "🌈", name: "Rainbow Bridge", x: 40, y: 50, unlocked: false },
  ]);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragEnd = (e: React.MouseEvent, id: string) => {
    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setItems(
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                x: Math.max(5, Math.min(95, x)),
                y: Math.max(5, Math.min(95, y)),
              }
            : item
        )
      );
    }
    setDraggedItem(null);
  };

  const completedLessons = items.filter((item) => item.unlocked).length;
  const totalLessons = 15;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#87CEEB] via-[#B3E5FC] to-[#E1F5FE] relative overflow-hidden pb-12">
      {/* Clouds floating */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-6xl opacity-60"
          style={{
            top: `${10 + (i % 3) * 25}%`,
            left: `${(i * 12) % 100}%`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8 + i,
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
          Back to Dashboard
        </motion.button>

        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl mb-4" style={{ fontWeight: 800, color: "#2D5F8D" }}>
            Build Your Learning Island! 🏝️
          </h1>
          <p className="text-2xl mb-6" style={{ color: "#4A90A4" }}>
            Watch your island grow as you complete lessons!
          </p>

          {/* Progress bar */}
          <div className="max-w-xl mx-auto">
            <div className="flex justify-between mb-2">
              <span style={{ fontWeight: 600, color: "#2D5F8D" }}>Island Progress</span>
              <span style={{ fontWeight: 700, color: "#2D5F8D" }}>
                {completedLessons} / {totalLessons} lessons
              </span>
            </div>
            <div className="h-4 bg-white/50 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FFD700] to-[#FF6B9D] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedLessons / totalLessons) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Island Canvas */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative bg-gradient-to-br from-[#C8E6C9] via-[#A5D6A7] to-[#81C784] rounded-3xl shadow-2xl overflow-hidden"
          style={{
            minHeight: "600px",
            border: "8px solid white",
          }}
        >
          {/* Beach sand at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFE0B2] to-transparent" />

          {/* Water shimmer effect */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, #B3E5FC 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, #B3E5FC 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, #B3E5FC 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, #B3E5FC 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Island items */}
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + index * 0.1, type: "spring", bounce: 0.6 }}
              className="absolute cursor-move"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: "translate(-50%, -50%)",
                opacity: item.unlocked ? 1 : 0.4,
                filter: item.unlocked ? "none" : "grayscale(100%)",
              }}
              onMouseDown={() => item.unlocked && handleDragStart(item.id)}
              onMouseUp={(e) => item.unlocked && handleDragEnd(e, item.id)}
              whileHover={item.unlocked ? { scale: 1.2, rotate: 10 } : {}}
              whileDrag={{ scale: 1.3, zIndex: 50 }}
              drag={item.unlocked}
              dragMomentum={false}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                const rect = document.querySelector(".relative.bg-gradient-to-br")?.getBoundingClientRect();
                if (rect) {
                  const x = ((info.point.x - rect.left) / rect.width) * 100;
                  const y = ((info.point.y - rect.top) / rect.height) * 100;
                  setItems(
                    items.map((i) =>
                      i.id === item.id
                        ? {
                            ...i,
                            x: Math.max(5, Math.min(95, x)),
                            y: Math.max(5, Math.min(95, y)),
                          }
                        : i
                    )
                  );
                }
              }}
            >
              <motion.div
                className="relative"
                animate={
                  item.unlocked
                    ? {
                        y: [0, -10, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Item */}
                <div className="text-6xl drop-shadow-lg">{item.emoji}</div>

                {/* Lock icon for locked items */}
                {!item.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gray-800/80 text-white rounded-full w-12 h-12 flex items-center justify-center">
                      🔒
                    </div>
                  </div>
                )}

                {/* Name tooltip */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1 rounded-full shadow-lg text-xs opacity-0 group-hover:opacity-100"
                  style={{ fontWeight: 600 }}
                  whileHover={{ opacity: 1 }}
                >
                  {item.name}
                </motion.div>

                {/* Sparkles for unlocked items */}
                {item.unlocked &&
                  [...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: `${-20 + (i % 2) * 40}px`,
                        left: `${-20 + i * 20}px`,
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
                      <Sparkles size={16} color="#FFD700" />
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          ))}

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg"
          >
            <p style={{ fontWeight: 600, color: "#6B4BA0" }}>
              🎯 Drag and drop items to arrange your island!
            </p>
          </motion.div>

          {/* Sun */}
          <motion.div
            className="absolute top-8 right-8"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity },
            }}
          >
            <div className="text-7xl drop-shadow-xl">☀️</div>
          </motion.div>
        </motion.div>

        {/* Available items to unlock */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-3xl p-8 shadow-xl"
          style={{ border: "6px solid #FFD700" }}
        >
          <h2 className="text-2xl mb-6" style={{ fontWeight: 700, color: "#6B4BA0" }}>
            🎁 Unlock More by Learning!
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🎪", name: "Fun Fair", lessons: 5 },
              { emoji: "🎢", name: "Roller Coaster", lessons: 8 },
              { emoji: "🚀", name: "Rocket Ship", lessons: 10 },
              { emoji: "🏰", name: "Knowledge Castle", lessons: 12 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                className="bg-gradient-to-br from-[#FFE0B2] to-[#FFB74D] rounded-2xl p-6 text-center shadow-lg"
              >
                <div className="text-5xl mb-2 grayscale opacity-50">{item.emoji}</div>
                <div style={{ fontWeight: 700, color: "#6B4BA0" }}>{item.name}</div>
                <div className="text-sm mt-2" style={{ color: "#757575" }}>
                  🔒 Unlock at {item.lessons} lessons
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-3xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
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
