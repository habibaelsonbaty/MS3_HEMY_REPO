import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useAppContext } from "../context/AppContext";

interface StudentIntroProps {
  onBegin: () => void;
}

export function StudentIntro({ onBegin }: StudentIntroProps) {
  const { avatar, pet, userName } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] relative overflow-hidden">
      {/* Soft background decorations */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-[#FFB3D9] opacity-10 rounded-b-[100px]" />
      <div className="absolute bottom-0 right-0 w-2/3 h-1/4 bg-[#A8D8EA] opacity-10 rounded-tl-[100px]" />

      {/* Floating soft shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${15 + (i % 4) * 25}%`,
            left: `${5 + i * 12}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {i % 3 === 0 ? (
            <div className="w-12 h-12 rounded-full bg-[#FFE5A0]" />
          ) : i % 3 === 1 ? (
            <div className="w-16 h-2 rounded-full bg-[#A8D8EA]" />
          ) : (
            <div className="w-3 h-3 rounded-full bg-[#F7B7D2]" />
          )}
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
            Hi there, Learner! 👋
          </h1>
          <p className="text-xl" style={{ color: "#6B7280" }}>
            Meet your companions on this learning adventure
          </p>
        </motion.div>

        {/* Avatar and Micropet Container */}
        <div className="flex items-end gap-12 mb-16">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Avatar character */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div
                className="w-48 h-48 rounded-3xl flex items-center justify-center text-7xl bg-white"
                style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
              >
                {avatar}
              </div>

              {/* Blink effect */}
              <motion.div
                className="absolute top-4 right-4"
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Sparkles size={24} color="#FFE5A0" fill="#FFE5A0" />
              </motion.div>
            </motion.div>

            {/* Platform */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="w-32 h-3 rounded-full bg-[#A8D8EA] mt-4 opacity-30"
            />

            <p className="mt-4 text-lg" style={{ fontWeight: 600, color: "#4A5568" }}>
              That's You!
            </p>
          </motion.div>

          {/* Micropet */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Pet character */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div
                className="w-36 h-36 rounded-3xl flex items-center justify-center text-6xl bg-white"
                style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
              >
                {pet}
              </div>

              {/* Heart effect */}
              <motion.div
                className="absolute -top-2 -right-2 text-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                💝
              </motion.div>
            </motion.div>

            {/* Platform */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="w-24 h-3 rounded-full bg-[#B8E6D5] mt-4 opacity-30"
            />

            <p className="mt-4 text-lg" style={{ fontWeight: 600, color: "#4A5568" }}>
              Your Micropet!
            </p>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white rounded-3xl p-8 max-w-2xl mb-12"
          style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
        >
          <p className="text-center text-xl" style={{ color: "#6B7280" }}>
            Together, you'll explore exciting subjects, complete fun challenges, and unlock amazing rewards!
          </p>
        </motion.div>

        {/* Begin Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBegin}
          className="px-12 py-5 rounded-full text-white text-xl btn-hover-darken"
          style={{
            backgroundColor: "#7BA7BC",
            boxShadow: "0 4px 16px rgba(123, 167, 188, 0.3)",
            fontWeight: 600,
          }}
        >
          Let's Begin! 🚀
        </motion.button>
      </div>
    </div>
  );
}