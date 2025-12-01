import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle2, XCircle, Star, Trophy, Sparkles } from "lucide-react";
import { useState } from "react";

interface QuizPageProps {
  onComplete: () => void;
  onBack: () => void;
}

export function QuizPage({ onComplete, onBack }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      question: "What fraction of the pizza is one slice if it's cut into 4 equal pieces?",
      emoji: "🍕",
      options: ["1/2", "1/4", "1/3", "1/8"],
      correct: 1,
      hint: "Think: 1 slice out of 4 total slices!",
      isBonus: false,
    },
    {
      question: "If you eat 2 slices of a pizza cut into 8 pieces, what fraction did you eat?",
      emoji: "🍕",
      options: ["2/8", "1/4", "Both are correct!", "1/2"],
      correct: 2,
      hint: "2/8 can be simplified to 1/4!",
      isBonus: false,
    },
    {
      question: "🌟 BONUS: Which is bigger: 1/2 or 1/4?",
      emoji: "⭐",
      options: ["1/2", "1/4", "They're equal", "Can't tell"],
      correct: 0,
      hint: "Half of something is more than a quarter!",
      isBonus: true,
    },
  ];

  const currentQ = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);

    if (index === currentQ.correct) {
      setScore(score + (currentQ.isBonus ? 2 : 1));
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setIsComplete(true);
      }
    }, 2500);
  };

  if (isComplete) {
    const maxScore = questions.length + 1; // +1 for bonus
    const percentage = (score / maxScore) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFD700] via-[#FFB74D] to-[#FF6B9D] relative overflow-hidden flex items-center justify-center">
        {/* Confetti-like elements */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              backgroundColor: ["#FF6B9D", "#FFD700", "#B3E5FC", "#C8E6C9"][i % 4],
              borderRadius: Math.random() > 0.5 ? "50%" : "0%",
              top: "-10%",
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0vh", "110vh"],
              rotate: [0, 360],
              opacity: [1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="relative z-10 max-w-3xl bg-white rounded-3xl p-12 shadow-2xl text-center"
          style={{ border: "8px solid #FFD700" }}
        >
          {/* Trophy */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-9xl mb-6"
          >
            🏆
          </motion.div>

          <h1 className="text-5xl mb-6" style={{ fontWeight: 800, color: "#6B4BA0" }}>
            Amazing Work, Champion! 🎉
          </h1>

          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-block bg-gradient-to-r from-[#FF6B9D] to-[#FFD700] text-white rounded-full px-12 py-6 shadow-xl mb-4"
            >
              <div className="text-6xl" style={{ fontWeight: 800 }}>
                {score} / {maxScore}
              </div>
              <div className="text-2xl" style={{ fontWeight: 600 }}>
                {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Great Job!" : "Keep Practicing!"}
              </div>
            </motion.div>
          </div>

          {/* Dancing mascot and pet */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -10, 0],
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-7xl"
            >
              😊
            </motion.div>

            <motion.div
              animate={{
                rotate: [0, -10, 10, 0],
                y: [0, -15, 0],
              }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-6xl"
            >
              🐰
            </motion.div>
          </div>

          <p className="text-2xl mb-8" style={{ color: "#6B4BA0", fontWeight: 600 }}>
            You've earned +50 XP and a new badge! 🎖️
          </p>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#D4BBFF] text-white rounded-full shadow-lg"
              style={{ fontWeight: 700 }}
            >
              Continue Adventure! 🚀
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setSelectedAnswer(null);
                setShowFeedback(false);
                setIsComplete(false);
              }}
              className="px-8 py-4 bg-white border-4 border-[#FFD700] text-[#6B4BA0] rounded-full shadow-lg"
              style={{ fontWeight: 700 }}
            >
              Try Again 🔄
            </motion.button>
          </div>

          {/* Sparkles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + (i % 4) * 20}%`,
                left: `${10 + (i % 4) * 25}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            >
              <Sparkles size={32} color="#FFD700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F8] to-[#F0F8FF] relative overflow-hidden pb-12">
      {/* Floating decorations */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
          }}
        >
          {["⭐", "✨", "🌟"][i % 3]}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-8 py-12">
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
          Back
        </motion.button>

        {/* Progress and score */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={24} color="#FFD700" fill="#FFD700" />
              <span style={{ fontWeight: 700, color: "#6B4BA0" }}>Score: {score}</span>
            </div>
            <div style={{ fontWeight: 600, color: "#757575" }}>
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className="flex gap-1">
            {questions.map((q, i) => (
              <motion.div
                key={i}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  i < currentQuestion
                    ? "bg-green-500"
                    : i === currentQuestion
                    ? "bg-[#FFD700]"
                    : "bg-gray-300"
                }`}
                animate={i === currentQuestion ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {i < currentQuestion ? (
                  <CheckCircle2 size={24} color="white" />
                ) : q.isBonus ? (
                  <Star size={24} color="white" fill="white" />
                ) : (
                  <span className="text-white" style={{ fontWeight: 700 }}>
                    {i + 1}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 100, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -100, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className={`bg-white rounded-3xl p-12 shadow-2xl mb-8 ${
              currentQ.isBonus ? "ring-8 ring-[#FFD700] ring-offset-4" : ""
            }`}
            style={{ border: currentQ.isBonus ? "6px solid #FFD700" : "6px solid #B3E5FC" }}
          >
            {currentQ.isBonus && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center gap-2 mb-4 text-[#FFD700]"
              >
                <Star size={32} fill="#FFD700" />
                <span className="text-2xl" style={{ fontWeight: 800 }}>
                  BONUS QUESTION!
                </span>
                <Star size={32} fill="#FFD700" />
              </motion.div>
            )}

            {/* Question emoji */}
            <motion.div
              className="text-8xl text-center mb-6"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {currentQ.emoji}
            </motion.div>

            {/* Question text */}
            <h2 className="text-3xl mb-8 text-center" style={{ fontWeight: 700, color: "#6B4BA0" }}>
              {currentQ.question}
            </h2>

            {/* Answer options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={!showFeedback ? { scale: 1.05, rotate: [0, -2, 2, 0] } : {}}
                  whileTap={!showFeedback ? { scale: 0.95 } : {}}
                  onClick={() => !showFeedback && handleAnswer(index)}
                  disabled={showFeedback}
                  className={`p-6 rounded-2xl shadow-lg transition-all ${
                    showFeedback
                      ? index === currentQ.correct
                        ? "bg-green-500 text-white"
                        : index === selectedAnswer
                        ? "bg-red-500 text-white"
                        : "bg-gray-200"
                      : "bg-[#4FA8C5] hover:bg-[#3D8DA8] text-white"
                  }`}
                  style={{ fontWeight: 700, fontSize: "1.25rem" }}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showFeedback && index === currentQ.correct && (
                      <CheckCircle2 size={32} color="white" />
                    )}
                    {showFeedback && index === selectedAnswer && index !== currentQ.correct && (
                      <XCircle size={32} color="white" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ y: 20, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`p-6 rounded-2xl ${
                    selectedAnswer === currentQ.correct
                      ? "bg-green-100 border-4 border-green-500"
                      : "bg-red-100 border-4 border-red-500"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-5xl"
                    >
                      {selectedAnswer === currentQ.correct ? "😊" : "🤔"}
                    </motion.div>
                    <div>
                      <h3
                        className="text-2xl mb-2"
                        style={{
                          fontWeight: 700,
                          color: selectedAnswer === currentQ.correct ? "#10B981" : "#EF4444",
                        }}
                      >
                        {selectedAnswer === currentQ.correct
                          ? "🎉 Correct! Amazing!"
                          : "💭 Not quite, but great try!"}
                      </h3>
                      <p className="text-lg" style={{ color: "#6B4BA0" }}>
                        {currentQ.hint}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Balloons and stars on correct answer */}
        {showFeedback && selectedAnswer === currentQ.correct && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`balloon-${i}`}
                className="absolute text-5xl"
                style={{
                  bottom: "-10%",
                  left: `${10 + i * 10}%`,
                }}
                animate={{
                  y: [0, -800],
                  x: [0, (Math.random() - 0.5) * 100],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.1,
                }}
              >
                {["🎈", "🎉", "⭐", "✨"][i % 4]}
              </motion.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}