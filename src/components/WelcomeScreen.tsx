import { motion } from "motion/react";
import { User, Users, BookOpen } from "lucide-react";
import { useAppContext } from "../context/AppContext";

interface WelcomeScreenProps {
  onSelectRole: (role: "student" | "parent" | "teacher") => void;
}

export function WelcomeScreen({ onSelectRole }: WelcomeScreenProps) {
  const { avatar, pet } = useAppContext();

  const roles = [
    {
      id: "student" as const,
      title: "Student",
      icon: User,
      color: "#4FA8C5",
      illustration: "👨‍🎓",
      description: "Start your learning journey",
    },
    {
      id: "parent" as const,
      title: "Parent",
      icon: Users,
      color: "#A896C9",
      illustration: "👨‍👩‍👧",
      description: "Support your child's growth",
    },
    {
      id: "teacher" as const,
      title: "Teacher",
      icon: BookOpen,
      color: "#5FB89A",
      illustration: "👩‍🏫",
      description: "Guide and inspire learners",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] relative overflow-hidden">
      {/* Soft flat background shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#FFB3D9] opacity-20" />
      <div className="absolute bottom-32 left-16 w-80 h-80 rounded-full bg-[#A8D8EA] opacity-20" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-[#C9B6E4] opacity-20" />

      {/* Floating decorative elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          style={{
            top: `${20 + (i % 3) * 30}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-16 h-16 rounded-full"
            style={{ backgroundColor: ["#A8D8EA", "#C9B6E4", "#B8E6D5"][i % 3] }}
          />
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl mb-6"
          >
            📚
          </motion.div>
          <h1 className="text-6xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
            Welcome to MyWay Learning!
          </h1>
          <p className="text-2xl" style={{ color: "#6B7280" }}>
            Choose your path to start exploring
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          {roles.map((role, index) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectRole(role.id)}
              className="bg-white rounded-3xl p-8 cursor-pointer group btn-hover-darken"
              style={{
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
                border: `3px solid ${role.color}`,
              }}
            >
              <div className="flex flex-col items-center gap-4">
                {/* Icon circle */}
                <motion.div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: role.color }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <role.icon size={40} color="white" strokeWidth={2} />
                </motion.div>

                {/* Illustration */}
                <motion.div
                  className="text-5xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {role.illustration}
                </motion.div>

                {/* Title */}
                <h2 className="text-2xl" style={{ fontWeight: 600, color: "#4A5568" }}>
                  {role.title}
                </h2>

                {/* Description */}
                <p className="text-center" style={{ color: "#6B7280" }}>
                  {role.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="w-12 h-1 rounded-full opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: role.color }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Bottom decorative text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <p className="text-lg" style={{ color: "#9CA3AF" }}>
            Made with care for curious minds ages 8-12 ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
}