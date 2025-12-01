import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { CheckCircle, XCircle, Trophy, ArrowRight } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  levelName: string;
  onComplete: (score: number, totalQuestions: number) => void;
  onBack: () => void;
}

export function Quiz({ questions, levelName, onComplete, onBack }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return; // Prevent changing answer after submission
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    setShowFeedback(true);

    // Update score if correct
    if (isCorrect && !answeredQuestions[currentQuestionIndex]) {
      setScore(score + 1);
    }

    // Mark question as answered
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Quiz complete
      const finalScore = isCorrect && !answeredQuestions[currentQuestionIndex] ? score + 1 : score;
      onComplete(finalScore, questions.length);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] flex items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-10 max-w-3xl w-full"
        style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)" }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl" style={{ fontWeight: 700, color: "#4A5568" }}>
              {levelName} Quiz 📝
            </h2>
            <div
              className="px-4 py-2 rounded-full"
              style={{
                backgroundColor: "#A8D8EA",
                color: "#FFFFFF",
                fontWeight: 700,
              }}
            >
              Question {currentQuestionIndex + 1}/{questions.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full"
              style={{ backgroundColor: "#A8D8EA" }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="mb-8 p-6 rounded-2xl"
              style={{ backgroundColor: "#F9FAFB", border: "2px solid #E5E7EB" }}
            >
              <p className="text-2xl" style={{ fontWeight: 600, color: "#4A5568" }}>
                {currentQuestion.question}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrectOption = option === currentQuestion.correctAnswer;
                const showCorrect = showFeedback && isCorrectOption;
                const showIncorrect = showFeedback && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    whileHover={!showFeedback ? { scale: 1.02, x: 4 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showFeedback}
                    className="w-full p-5 rounded-2xl text-left flex items-center justify-between transition-all btn-hover-darken"
                    style={{
                      backgroundColor: showCorrect
                        ? "#D1FAE5"
                        : showIncorrect
                        ? "#FEE2E2"
                        : isSelected
                        ? "#E0F2FE"
                        : "#FFFFFF",
                      border: `3px solid ${
                        showCorrect
                          ? "#10B981"
                          : showIncorrect
                          ? "#EF4444"
                          : isSelected
                          ? "#A8D8EA"
                          : "#E5E7EB"
                      }`,
                      cursor: showFeedback ? "default" : "pointer",
                    }}
                  >
                    <span
                      className="text-xl"
                      style={{
                        fontWeight: isSelected ? 700 : 600,
                        color: showCorrect
                          ? "#059669"
                          : showIncorrect
                          ? "#DC2626"
                          : "#4A5568",
                      }}
                    >
                      {option}
                    </span>
                    {showCorrect && <CheckCircle size={28} color="#10B981" />}
                    {showIncorrect && <XCircle size={28} color="#EF4444" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback Message */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="mb-6 p-5 rounded-2xl flex items-center gap-4"
                  style={{
                    backgroundColor: isCorrect ? "#D1FAE5" : "#FEE2E2",
                    border: `2px solid ${isCorrect ? "#10B981" : "#EF4444"}`,
                  }}
                >
                  {isCorrect ? (
                    <>
                      <div className="text-4xl">🎉</div>
                      <div>
                        <p
                          className="text-xl mb-1"
                          style={{ fontWeight: 700, color: "#059669" }}
                        >
                          Correct! Great job!
                        </p>
                        <p style={{ color: "#065F46", fontWeight: 500 }}>
                          You're doing amazing! Keep it up!
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl">💪</div>
                      <div>
                        <p
                          className="text-xl mb-1"
                          style={{ fontWeight: 700, color: "#DC2626" }}
                        >
                          Not quite right
                        </p>
                        <p style={{ color: "#991B1B", fontWeight: 500 }}>
                          The correct answer is: <strong>{currentQuestion.correctAnswer}</strong>
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {!showFeedback ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onBack}
                    className="px-6 py-4 rounded-2xl btn-hover-darken"
                    style={{
                      backgroundColor: "#F3F4F6",
                      fontWeight: 600,
                      color: "#6B7280",
                    }}
                  >
                    Cancel Quiz
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    className="flex-1 px-8 py-4 rounded-2xl text-white flex items-center justify-center gap-2 btn-hover-darken"
                    style={{
                      backgroundColor: selectedAnswer ? "#A8D8EA" : "#D1D5DB",
                      boxShadow: selectedAnswer ? "0 4px 20px rgba(168, 216, 234, 0.3)" : "none",
                      fontWeight: 700,
                      fontSize: "18px",
                      cursor: selectedAnswer ? "pointer" : "not-allowed",
                    }}
                  >
                    Submit Answer
                  </motion.button>
                </>
              ) : (
                <motion.button
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextQuestion}
                  className="w-full px-8 py-4 rounded-2xl text-white flex items-center justify-center gap-3 btn-hover-darken"
                  style={{
                    backgroundColor: isCorrect ? "#10B981" : "#A8D8EA",
                    boxShadow: "0 4px 20px rgba(168, 216, 234, 0.3)",
                    fontWeight: 700,
                    fontSize: "18px",
                  }}
                >
                  {isLastQuestion ? (
                    <>
                      <Trophy size={24} />
                      Finish Quiz
                    </>
                  ) : (
                    <>
                      Next Question
                      <ArrowRight size={24} />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Score Display */}
        <div className="mt-6 pt-6 border-t-2 border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl">⭐</div>
            <p style={{ fontWeight: 600, color: "#6B7280" }}>
              Current Score: <span style={{ color: "#A8D8EA", fontWeight: 700 }}>{score}</span> /{" "}
              {questions.length}
            </p>
          </div>
          <div className="text-3xl">
            {score === questions.length ? "🏆" : score >= questions.length / 2 ? "😊" : "💪"}
          </div>
        </div>
      </motion.div>
    </div>
  );
}