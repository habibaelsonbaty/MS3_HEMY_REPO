import { motion } from "motion/react";
import { Trophy, Star, Award } from "lucide-react";
import { useAppContext } from "../context/AppContext";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  levelName: string;
  onContinue: () => void;
}

export function QuizResults({ score, totalQuestions, levelName, onContinue }: QuizResultsProps) {
  const { avatar, pet } = useAppContext();
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Determine performance level
  const getPerformanceData = () => {
    if (percentage === 100) {
      return {
        title: "Perfect Score!",
        emoji: "🏆",
        message: "You're a math superstar! Amazing work!",
        color: "#FFD700",
        bgColor: "#FEF3C7",
        stars: 3,
      };
    } else if (percentage >= 66) {
      return {
        title: "Great Job!",
        emoji: "⭐",
        message: "You did really well! Keep up the excellent work!",
        color: "#A8D8EA",
        bgColor: "#E0F2FE",
        stars: 2,
      };
    } else if (percentage >= 33) {
      return {
        title: "Good Effort!",
        emoji: "💪",
        message: "You're learning! Try the lesson again to improve!",
        color: "#C9B6E4",
        bgColor: "#EDE9FE",
        stars: 1,
      };
    } else {
      return {
        title: "Keep Practicing!",
        emoji: "📚",
        message: "Don't give up! Review the lesson and try again!",
        color: "#F7B7D2",
        bgColor: "#FCE7F3",
        stars: 1,
      };
    }
  };

  const performanceData = getPerformanceData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] flex items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="bg-white rounded-3xl p-12 text-center max-w-2xl w-full"
        style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)" }}
      >
        {/* Confetti Animation */}
        {percentage >= 66 && (
          <>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: `${8 + Math.random() * 12}px`,
                  height: `${8 + Math.random() * 12}px`,
                  backgroundColor: ["#A8D8EA", "#C9B6E4", "#B8E6D5", "#FFE5A0", "#F7B7D2"][i % 5],
                  borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                  top: "20%",
                  left: "50%",
                }}
                animate={{
                  y: [(Math.random() - 0.5) * 500],
                  x: [(Math.random() - 0.5) * 700],
                  rotate: [0, Math.random() * 720],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.02,
                }}
              />
            ))}
          </>
        )}

        {/* Performance Icon */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{ duration: 1, repeat: 2 }}
          className="text-9xl mb-6"
        >
          {performanceData.emoji}
        </motion.div>

        {/* Title */}
        <h2 className="text-5xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
          {performanceData.title}
        </h2>

        {/* Avatar and Pet */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="text-6xl">{avatar}</div>
          <div className="text-5xl">❤️</div>
          <div className="text-6xl">{pet}</div>
        </div>

        {/* Message */}
        <p className="text-xl mb-8" style={{ color: "#6B7280", fontWeight: 500 }}>
          {performanceData.message}
        </p>

        {/* Score Display */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="mb-8 p-8 rounded-3xl"
          style={{
            backgroundColor: performanceData.bgColor,
            border: `3px solid ${performanceData.color}`,
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Trophy size={40} color={performanceData.color} />
            <div>
              <p className="text-6xl" style={{ fontWeight: 800, color: performanceData.color }}>
                {score}/{totalQuestions}
              </p>
            </div>
            <Award size={40} color={performanceData.color} />
          </div>
          <p className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
            {percentage}% Correct
          </p>
        </motion.div>

        {/* Star Rating */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
            >
              {i < performanceData.stars ? (
                <Star size={48} fill="#FFD700" color="#FFD700" />
              ) : (
                <Star size={48} color="#D1D5DB" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Level Name */}
        <p className="text-lg mb-8" style={{ color: "#9CA3AF", fontWeight: 600 }}>
          {levelName} - Quiz Complete
        </p>

        {/* Continue Button */}
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="px-12 py-5 rounded-2xl text-white text-xl btn-hover-darken"
          style={{
            backgroundColor: performanceData.color,
            boxShadow: `0 4px 24px ${performanceData.color}50`,
            fontWeight: 700,
          }}
        >
          Continue Adventure
        </motion.button>

        {/* Bonus XP Info */}
        {percentage >= 66 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-lg"
            style={{ color: "#10B981", fontWeight: 600 }}
          >
            🎁 Bonus: +{score * 10} XP for quiz completion!
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}