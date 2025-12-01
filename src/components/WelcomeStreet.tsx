import { motion } from "motion/react";
import { GraduationCap, Users, BookOpen } from "lucide-react";

interface WelcomeStreetProps {
  onSelectRole: (role: "student" | "parent" | "teacher") => void;
}

export function WelcomeStreet({ onSelectRole }: WelcomeStreetProps) {
  const roles = [
    {
      id: "student" as const,
      title: "Student",
      icon: GraduationCap,
      color: "#FFB3D9",
      description: "Start your magical adventure!",
    },
    {
      id: "parent" as const,
      title: "Parent",
      icon: Users,
      color: "#B3E5FC",
      description: "Watch your child learn & grow",
    },
    {
      id: "teacher" as const,
      title: "Teacher",
      icon: BookOpen,
      color: "#C8E6C9",
      description: "Guide young learners",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE0B2] via-[#FFF9C4] to-[#B3E5FC] relative overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 bg-[#FFB3D9] rounded-full opacity-30"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 bg-[#D4BBFF] rounded-full opacity-30"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-20 h-20 bg-[#B2DFDB] rounded-full opacity-30"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-12">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-6xl mb-4" style={{ fontWeight: 800 }}>
            🏠 Welcome Street 🌟
          </h1>
          <p className="text-2xl" style={{ color: "#6B4BA0" }}>
            Choose your magical door to begin!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {roles.map((role, index) => (
            <motion.button
              key={role.id}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, type: "spring", bounce: 0.4 }}
              whileHover={{
                scale: 1.05,
                rotate: [0, -2, 2, 0],
                transition: { rotate: { repeat: Infinity, duration: 0.5 } },
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectRole(role.id)}
              className="relative bg-white rounded-3xl p-8 shadow-2xl cursor-pointer group overflow-hidden"
              style={{
                border: `6px solid ${role.color}`,
              }}
            >
              {/* Sparkle effect on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle, ${role.color}33 0%, transparent 70%)` }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              <div className="relative z-10 flex flex-col items-center gap-6">
                <motion.div
                  className="w-32 h-32 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: role.color }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <role.icon size={64} color="white" strokeWidth={2.5} />
                </motion.div>

                <h2 className="text-3xl" style={{ fontWeight: 700, color: "#4A4A4A" }}>
                  {role.title}
                </h2>

                <p className="text-lg" style={{ color: "#757575" }}>
                  {role.description}
                </p>

                <motion.div
                  className="text-4xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ✨
                </motion.div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Cute street elements at bottom */}
        <div className="mt-16 flex gap-8 items-end">
          {["🌳", "🏡", "🌻", "🦋", "🌈"].map((emoji, i) => (
            <motion.div
              key={i}
              className="text-5xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
