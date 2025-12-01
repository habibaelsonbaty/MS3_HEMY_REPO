import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Lightbulb, Star } from "lucide-react";
import { useState } from "react";

interface LessonPageProps {
  mode: string;
  onNext: () => void;
  onBack: () => void;
}

export function LessonPage({ mode, onNext, onBack }: LessonPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const lessonContent = {
    visual: {
      title: "Visual Learning: Fractions Are Fun! 🍕",
      color: "#B3E5FC",
      slides: [
        {
          title: "What is a Fraction?",
          content: "A fraction is a part of a whole!",
          visual: "🍕",
          explanation: "Imagine a pizza cut into equal slices. Each slice is a fraction!",
        },
        {
          title: "Understanding 1/2",
          content: "One half means 1 out of 2 equal parts",
          visual: "🍕",
          explanation: "If you cut a pizza in 2 equal pieces, each piece is 1/2!",
        },
        {
          title: "Understanding 1/4",
          content: "One quarter means 1 out of 4 equal parts",
          visual: "🍕",
          explanation: "Cut the pizza into 4 pieces, and each is 1/4!",
        },
      ],
    },
    auditory: {
      title: "Auditory Learning: Listen and Learn! 🎵",
      color: "#D4BBFF",
      slides: [
        {
          title: "The Fraction Song",
          content: "🎵 Parts of a whole, that's what we are... 🎵",
          visual: "🎶",
          explanation: "Sing along: Numerator on top, denominator below, together they show, how much we know!",
        },
        {
          title: "Half and Half",
          content: "🎵 One part, two parts, makes it complete... 🎵",
          visual: "🎧",
          explanation: "Listen: When we say 'half', we mean one of two equal parts!",
        },
        {
          title: "Quarter Notes",
          content: "🎵 Four parts together, one part alone... 🎵",
          visual: "🎼",
          explanation: "Hear the rhythm: A quarter is one out of four equal beats!",
        },
      ],
    },
    interactive: {
      title: "Interactive Learning: Let's Play! 🎮",
      color: "#FFD700",
      slides: [
        {
          title: "Drag the Fraction",
          content: "Move the pieces to create fractions!",
          visual: "🎯",
          explanation: "Click and drag the pizza slices to make different fractions!",
        },
        {
          title: "Match the Fractions",
          content: "Connect equal fractions together!",
          visual: "🧩",
          explanation: "Find pairs like 2/4 = 1/2 and connect them!",
        },
        {
          title: "Fraction Builder",
          content: "Build your own fractions!",
          visual: "🏗️",
          explanation: "Choose how many parts to divide your shape into!",
        },
      ],
    },
  };

  const lesson = lessonContent[mode as keyof typeof lessonContent] || lessonContent.visual;
  const currentContent = lesson.slides[currentSlide];

  return (
    <div
      className="min-h-screen relative overflow-hidden pb-12"
      style={{
        background: `linear-gradient(135deg, ${lesson.color}33 0%, ${lesson.color}66 100%)`,
      }}
    >
      {/* Floating decorations */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {["✨", "⭐", "🌟", "💫"][i % 4]}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-12">
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

        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl mb-8 text-center"
          style={{ fontWeight: 800, color: "#6B4BA0" }}
        >
          {lesson.title}
        </motion.h1>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span style={{ fontWeight: 600, color: "#6B4BA0" }}>Progress</span>
            <span style={{ fontWeight: 700, color: "#6B4BA0" }}>
              {currentSlide + 1} / {lesson.slides.length}
            </span>
          </div>
          <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: lesson.color }}
              initial={{ width: 0 }}
              animate={{ width: `${((currentSlide + 1) / lesson.slides.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Lesson content card */}
        <motion.div
          key={currentSlide}
          initial={{ x: 100, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -100, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", bounce: 0.3 }}
          className="bg-white rounded-3xl p-12 shadow-2xl mb-8"
          style={{ border: `6px solid ${lesson.color}` }}
        >
          {/* Visual/Icon */}
          <motion.div
            className="text-9xl text-center mb-8"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentContent.visual}
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl mb-6 text-center" style={{ fontWeight: 800, color: "#6B4BA0" }}>
            {currentContent.title}
          </h2>

          {/* Content */}
          <motion.div
            className="text-center mb-8 p-6 rounded-2xl"
            style={{ backgroundColor: `${lesson.color}33` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <p className="text-3xl" style={{ fontWeight: 600, color: "#6B4BA0" }}>
              {currentContent.content}
            </p>
          </motion.div>

          {/* Explanation with hint character */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-start gap-4 p-6 bg-[#FFF9C4] rounded-2xl"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl flex-shrink-0"
            >
              🦉
            </motion.div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={20} color="#FFD700" fill="#FFD700" />
                <span style={{ fontWeight: 700, color: "#6B4BA0" }}>Wise Owl Says:</span>
              </div>
              <p className="text-lg" style={{ color: "#6B4BA0" }}>
                {currentContent.explanation}
              </p>
            </div>
          </motion.div>

          {/* Decorative stars */}
          <div className="flex justify-center gap-4 mt-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
              >
                <Star size={32} color={lesson.color} fill={lesson.color} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className={`px-8 py-4 rounded-full shadow-lg flex items-center gap-2 ${
              currentSlide === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-white"
            }`}
            style={{ fontWeight: 700 }}
          >
            <ArrowLeft size={20} />
            Previous
          </motion.button>

          <div className="flex gap-2">
            {lesson.slides.map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: i === currentSlide ? lesson.color : "#E0E0E0",
                }}
                animate={i === currentSlide ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            ))}
          </div>

          {currentSlide === lesson.slides.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-8 py-4 rounded-full shadow-lg text-white flex items-center gap-2"
              style={{ backgroundColor: lesson.color, fontWeight: 700 }}
            >
              Take Quiz! 🎯
              <ArrowRight size={20} />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(currentSlide + 1)}
              className="px-8 py-4 rounded-full shadow-lg text-white flex items-center gap-2"
              style={{ backgroundColor: lesson.color, fontWeight: 700 }}
            >
              Next
              <ArrowRight size={20} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
