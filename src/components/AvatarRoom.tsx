import { motion } from "motion/react";
import { Sparkles, Cloud, Sun, Rainbow } from "lucide-react";
import { useState, useEffect } from "react";

interface AvatarRoomProps {
  onEnter: () => void;
}

export function AvatarRoom({ onEnter }: AvatarRoomProps) {
  const [isAwake, setIsAwake] = useState(false);

  useEffect(() => {
    // Wake up animation after a moment
    const timer = setTimeout(() => setIsAwake(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE0B2] to-[#FFB3D9] relative overflow-hidden">
      {/* Window with weather vibes */}
      <motion.div
        className="absolute top-8 right-8 w-64 h-64 bg-[#B3E5FC] rounded-3xl p-4 shadow-xl"
        style={{ border: "8px solid white" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <div className="relative w-full h-full bg-gradient-to-b from-[#87CEEB] to-[#B3E5FC] rounded-2xl overflow-hidden">
          {/* Sun */}
          <motion.div
            className="absolute top-4 right-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Sun size={40} color="#FFD700" fill="#FFD700" />
          </motion.div>

          {/* Clouds */}
          <motion.div
            className="absolute top-12 left-4"
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Cloud size={32} color="white" fill="white" />
          </motion.div>

          {/* Rainbow */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Rainbow size={48} color="#FF6B9D" />
          </motion.div>

          {/* Sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            >
              <Sparkles size={16} color="#FFD700" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Room content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        <motion.h1
          className="text-5xl mb-8 text-center"
          style={{ fontWeight: 800, color: "#6B4BA0" }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Good Morning, Adventurer! ☀️
        </motion.h1>

        {/* Room scene */}
        <div className="relative w-full max-w-4xl">
          {/* Bed and Avatar */}
          <motion.div
            className="relative bg-white rounded-3xl p-12 shadow-2xl"
            style={{ border: "8px solid #D4BBFF" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Decorative items */}
            <div className="absolute -top-6 -left-6 text-6xl">🎨</div>
            <div className="absolute -top-6 -right-6 text-6xl">📚</div>
            <div className="absolute -bottom-6 -left-6 text-6xl">🎮</div>
            <div className="absolute -bottom-6 -right-6 text-6xl">⚽</div>

            <div className="flex items-center justify-around gap-8">
              {/* Sleeping/Waking Avatar */}
              <motion.div
                className="relative"
                animate={
                  isAwake
                    ? {
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div
                  className="w-48 h-48 rounded-full flex items-center justify-center text-8xl relative"
                  style={{ backgroundColor: "#FFE0B2" }}
                >
                  {isAwake ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.6 }}
                    >
                      😊
                    </motion.div>
                  ) : (
                    "😴"
                  )}
                </div>

                {isAwake && (
                  <motion.div
                    className="absolute -top-4 -right-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Sparkles size={32} color="#FFD700" fill="#FFD700" />
                  </motion.div>
                )}
              </motion.div>

              {/* Micropet */}
              <motion.div
                className="relative"
                animate={{
                  y: isAwake ? [0, -15, 0] : [0, -5, 0],
                }}
                transition={{
                  duration: isAwake ? 0.6 : 2,
                  repeat: Infinity,
                }}
              >
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center text-6xl"
                  style={{ backgroundColor: "#B2DFDB" }}
                >
                  🐰
                </div>
                {isAwake && (
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl px-4 py-2 shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <span className="text-sm" style={{ fontWeight: 600 }}>
                      Hi buddy! 🌟
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {isAwake && (
              <motion.p
                className="text-center mt-8 text-2xl"
                style={{ color: "#6B4BA0", fontWeight: 600 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Ready to explore and learn today? 🚀
              </motion.p>
            )}
          </motion.div>

          {/* Furniture decorations */}
          <motion.div
            className="absolute -left-24 bottom-0 text-7xl"
            animate={{ rotate: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🪴
          </motion.div>

          <motion.div
            className="absolute -right-24 top-0 text-7xl"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            🎪
          </motion.div>
        </div>

        {/* Enter button */}
        {isAwake && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
            whileTap={{ scale: 0.9 }}
            onClick={onEnter}
            className="mt-12 px-12 py-6 bg-gradient-to-r from-[#FF6B9D] to-[#D4BBFF] text-white rounded-full shadow-2xl text-2xl"
            style={{ fontWeight: 700 }}
          >
            Let's Start the Adventure! 🎉
          </motion.button>
        )}
      </div>

      {/* Floating sparkles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
