import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useAppContext } from "../context/AppContext";

interface FlatSubjectWorldsProps {
  onSelectSubject: (subject: string) => void;
  onBack: () => void;
}

export function FlatSubjectWorlds({
  onSelectSubject,
  onBack,
}: FlatSubjectWorldsProps) {
  const { avatar, pet } = useAppContext();
  
  const subjects = [
    {
      id: "math",
      name: "Mathematics",
      world: "Math Mountain",
      color: "#A8D8EA",
      icon: "🔢",
      description: "Explore numbers, equations, and problem-solving in the sky!",
    },
    {
      id: "science",
      name: "Science",
      world: "Science Lab",
      color: "#B8E6D5",
      icon: "🔬",
      description: "Discover experiments, nature, and the wonders of our world!",
    },
    {
      id: "art",
      name: "Art",
      world: "Art Studio",
      color: "#FFE5A0",
      icon: "🎨",
      description: "Create beautiful artworks and explore your creativity!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] pb-12">
      <div className="max-w-7xl mx-auto px-8 py-8">
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
          Back to Dashboard
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="text-5xl">{avatar}</div>
          <div>
            <h1 className="text-5xl" style={{ fontWeight: 700, color: "#4A5568" }}>
              Choose Your Subject
            </h1>
            <p className="text-xl" style={{ color: "#6B7280" }}>
              Each world is full of fun lessons and challenges!
            </p>
          </div>
          <div className="text-4xl">{pet}</div>
        </motion.div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subjects.map((subject, index) => (
            <motion.button
              key={subject.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectSubject(subject.id)}
              className="bg-white rounded-3xl p-8 cursor-pointer group relative overflow-hidden"
              style={{
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
              }}
            >
              {/* Background decorative layer */}
              <div
                className="absolute inset-0 opacity-10 rounded-3xl"
                style={{ backgroundColor: subject.color }}
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon */}
                <motion.div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 text-5xl"
                  style={{ backgroundColor: subject.color }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {subject.icon}
                </motion.div>

                {/* Title */}
                <h2 className="text-3xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
                  {subject.name}
                </h2>

                <h3 className="text-xl mb-4" style={{ fontWeight: 600, color: "#6B7280" }}>
                  {subject.world}
                </h3>

                {/* Description */}
                <p className="text-lg mb-6" style={{ color: "#6B7280" }}>
                  {subject.description}
                </p>

                {/* Start button */}
                <div
                  className="px-8 py-3 rounded-full text-white"
                  style={{ backgroundColor: subject.color, fontWeight: 600 }}
                >
                  Start Learning →
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}