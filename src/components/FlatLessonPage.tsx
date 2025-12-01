import { motion } from "motion/react";
import { ArrowLeft, Trophy } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { VisualLesson } from "./lessons/VisualLesson";
import { AuditoryLesson } from "./lessons/AuditoryLesson";
import { InteractiveLesson } from "./lessons/InteractiveLesson";
import { mathLessons } from "../data/mathLessons";
import { scienceLessons } from "../data/scienceLessons";
import { Quiz } from "./Quiz";
import { QuizResults } from "./QuizResults";

interface FlatLessonPageProps {
  subject: string;
  worldId: string;
  levelId: string;
  mode: "visual" | "auditory" | "interactive";
  onBack: () => void;
  onFinish: () => void;
}

export function FlatLessonPage({
  subject,
  worldId,
  levelId,
  mode,
  onBack,
  onFinish,
}: FlatLessonPageProps) {
  const { avatar, pet, completeLesson, completeQuiz } = useAppContext();
  const [showCompletion, setShowCompletion] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);

  // Get lesson content from mathLessons or scienceLessons data if available
  const getLessonContent = () => {
    if (subject === "math" && mathLessons[levelId]) {
      return mathLessons[levelId][mode];
    }
    if (subject === "science" && scienceLessons[levelId]) {
      return scienceLessons[levelId][mode];
    }
    return null;
  };

  // Get quiz data
  const getQuizData = () => {
    if (subject === "math" && mathLessons[levelId]?.quiz) {
      return {
        questions: mathLessons[levelId].quiz.questions,
        levelName: mathLessons[levelId].name,
      };
    }
    if (subject === "science" && scienceLessons[levelId]?.quiz) {
      return {
        questions: scienceLessons[levelId].quiz.questions,
        levelName: scienceLessons[levelId].name,
      };
    }
    return null;
  };

  // Subject-specific content (fallback for non-math subjects)
  const lessonContent: Record<string, any> = {
    math: {
      visual: {
        title: "Understanding Fractions in Math Mountain",
        chapters: [
          { time: "0:00", title: "Introduction", thumbnail: "📊" },
          { time: "2:30", title: "What is a Fraction?", thumbnail: "🍕" },
          { time: "5:00", title: "Numerator & Denominator", thumbnail: "📐" },
          { time: "7:30", title: "Practice Examples", thumbnail: "✏️" },
        ],
        diagrams: [
          {
            emoji: "🍕",
            title: "Pizza Fractions",
            description: "If you cut a pizza into 4 slices and eat 1, you ate 1/4 of the pizza!",
          },
          {
            emoji: "📊",
            title: "Visual Chart",
            description: "Fractions can be shown as parts of a whole using colorful charts.",
          },
          {
            emoji: "🎯",
            title: "Real-World Use",
            description: "We use fractions in cooking, sharing, and measuring!",
          },
          {
            emoji: "⭐",
            title: "Key Concept",
            description: "The top number tells you how many parts you have.",
          },
        ],
      },
      auditory: {
        title: "Listening to Math: Fractions Explained",
        chapters: [
          {
            title: "Welcome to Fractions",
            duration: "2:15",
            keyPoints: [
              "A fraction represents part of a whole",
              "Listen for the words 'numerator' and 'denominator'",
              "Think of examples like pizza slices",
            ],
          },
          {
            title: "Breaking Down Numbers",
            duration: "3:30",
            keyPoints: [
              "The top number = how many parts you have",
              "The bottom number = total parts in the whole",
              "1/2 means 1 out of 2 equal parts",
            ],
          },
          {
            title: "Practice Problems",
            duration: "4:00",
            keyPoints: [
              "Listen to each example carefully",
              "Visualize the fraction in your mind",
              "Pause and replay if needed",
            ],
          },
        ],
      },
      interactive: {
        title: "Interactive Fraction Challenge",
        activities: [
          {
            type: "build" as const,
            title: "Build a Fraction!",
            instruction: "Click to add pizza slices",
            interactiveElement: {},
            explanation: "Fractions show parts of a whole",
          },
        ],
      },
    },
    science: {
      visual: {
        title: "The Amazing Water Cycle",
        chapters: [
          { time: "0:00", title: "Introduction", thumbnail: "🌊" },
          { time: "2:00", title: "Evaporation", thumbnail: "☀️" },
          { time: "4:30", title: "Condensation", thumbnail: "☁️" },
          { time: "6:00", title: "Precipitation", thumbnail: "🌧️" },
        ],
        diagrams: [
          {
            emoji: "☀️",
            title: "Evaporation",
            description: "The sun heats water and turns it into invisible water vapor!",
          },
          {
            emoji: "☁️",
            title: "Condensation",
            description: "Water vapor cools down and forms tiny droplets that make clouds.",
          },
          {
            emoji: "🌧️",
            title: "Precipitation",
            description: "When clouds get heavy, water falls as rain, snow, or hail.",
          },
          {
            emoji: "🌊",
            title: "Collection",
            description: "Water collects in oceans, lakes, and rivers, then the cycle repeats!",
          },
        ],
      },
      auditory: {
        title: "Listen & Learn: The Water Cycle",
        chapters: [
          {
            title: "Water on the Move",
            duration: "2:45",
            keyPoints: [
              "Water is always moving and changing",
              "The water cycle has four main stages",
              "This process happens all around us",
            ],
          },
          {
            title: "From Liquid to Gas",
            duration: "3:15",
            keyPoints: [
              "Heat energy causes evaporation",
              "Water becomes invisible water vapor",
              "Plants also release water vapor",
            ],
          },
          {
            title: "Clouds and Rain",
            duration: "3:00",
            keyPoints: [
              "Cold air causes condensation",
              "Millions of tiny droplets form clouds",
              "Heavy clouds produce rain",
            ],
          },
        ],
      },
      interactive: {
        title: "Build the Water Cycle",
        activities: [
          {
            type: "drag-drop" as const,
            question: "Drag the stages in the correct order",
            items: [
              { emoji: "☀️", label: "Evaporation", value: "evaporation" },
              { emoji: "☁️", label: "Condensation", value: "condensation" },
              { emoji: "🌧️", label: "Precipitation", value: "precipitation" },
              { emoji: "🌊", label: "Collection", value: "collection" },
            ],
            correctAnswer: "evaporation",
          },
          {
            type: "matching" as const,
            question: "What happens during evaporation?",
            items: [
              { emoji: "❄️", label: "Water freezes", value: "freeze" },
              { emoji: "💨", label: "Water turns to vapor", value: "vapor" },
              { emoji: "🌧️", label: "Water falls as rain", value: "rain" },
              { emoji: "🌊", label: "Water collects", value: "collect" },
            ],
            correctAnswer: "vapor",
          },
        ],
      },
    },
    reading: {
      visual: {
        title: "The Magic of Storytelling",
        chapters: [
          { time: "0:00", title: "Story Elements", thumbnail: "📚" },
          { time: "2:30", title: "Characters", thumbnail: "🧙" },
          { time: "5:00", title: "Setting", thumbnail: "🏰" },
          { time: "7:30", title: "Plot", thumbnail: "🗺️" },
        ],
        diagrams: [
          {
            emoji: "🧙",
            title: "Characters",
            description: "The people or creatures in the story who make things happen.",
          },
          {
            emoji: "🏰",
            title: "Setting",
            description: "Where and when the story takes place - like a castle or forest.",
          },
          {
            emoji: "🗺️",
            title: "Plot",
            description: "The sequence of events that make up the story's adventure.",
          },
          {
            emoji: "✨",
            title: "Theme",
            description: "The message or lesson the story teaches us.",
          },
        ],
      },
      auditory: {
        title: "Story Time: The Brave Little Knight",
        chapters: [
          {
            title: "Once Upon a Time",
            duration: "3:00",
            keyPoints: [
              "Listen for the main character",
              "Notice where the story begins",
              "Pay attention to the problem",
            ],
          },
          {
            title: "The Adventure Begins",
            duration: "4:30",
            keyPoints: [
              "What challenges does the knight face?",
              "Who helps along the way?",
              "How does the setting change?",
            ],
          },
          {
            title: "The Happy Ending",
            duration: "2:30",
            keyPoints: [
              "How is the problem solved?",
              "What lesson did the knight learn?",
              "How do you feel about the ending?",
            ],
          },
        ],
      },
      interactive: {
        title: "Story Builder Challenge",
        activities: [
          {
            type: "matching" as const,
            question: "Choose the best character for this story",
            items: [
              { emoji: "🧙", label: "Wise Wizard", value: "wizard" },
              { emoji: "🐉", label: "Friendly Dragon", value: "dragon" },
              { emoji: "👸", label: "Brave Princess", value: "princess" },
              { emoji: "🦊", label: "Clever Fox", value: "fox" },
            ],
            correctAnswer: "princess",
          },
          {
            type: "puzzle" as const,
            question: "Pick the best setting for a magical adventure",
            items: [
              { emoji: "🏰", value: "castle" },
              { emoji: "🌲", value: "forest" },
              { emoji: "🏖️", value: "beach" },
              { emoji: "🌋", value: "volcano" },
              { emoji: "❄️", value: "snow" },
              { emoji: "🏙️", value: "city" },
            ],
            correctAnswer: "castle",
          },
        ],
      },
    },
    art: {
      visual: {
        title: "Color Theory in the Art Studio",
        chapters: [
          { time: "0:00", title: "Primary Colors", thumbnail: "🔴" },
          { time: "2:30", title: "Secondary Colors", thumbnail: "🟣" },
          { time: "5:00", title: "Color Mixing", thumbnail: "🎨" },
          { time: "7:00", title: "Creating Art", thumbnail: "🖼️" },
        ],
        diagrams: [
          {
            emoji: "🔴",
            title: "Primary Colors",
            description: "Red, blue, and yellow - you can't make these by mixing!",
          },
          {
            emoji: "🟣",
            title: "Secondary Colors",
            description: "Mix two primary colors to create orange, green, and purple!",
          },
          {
            emoji: "🌈",
            title: "Color Wheel",
            description: "Colors next to each other look good together.",
          },
          {
            emoji: "✨",
            title: "Warm & Cool",
            description: "Reds and yellows are warm. Blues and greens are cool.",
          },
        ],
      },
      auditory: {
        title: "Listen & Paint: Color Mixing Guide",
        chapters: [
          {
            title: "Understanding Color",
            duration: "2:30",
            keyPoints: [
              "There are three primary colors",
              "All other colors come from mixing",
              "Colors have feelings and moods",
            ],
          },
          {
            title: "Mixing Magic",
            duration: "3:45",
            keyPoints: [
              "Red + Yellow = Orange",
              "Blue + Yellow = Green",
              "Red + Blue = Purple",
            ],
          },
          {
            title: "Creative Expression",
            duration: "3:00",
            keyPoints: [
              "Choose colors that express your mood",
              "Experiment with different combinations",
              "There's no wrong way to create art",
            ],
          },
        ],
      },
      interactive: {
        title: "Color Mixing Workshop",
        activities: [
          {
            type: "matching" as const,
            question: "What color do you get when you mix these?",
            items: [
              { emoji: "🔴+🟡", label: "Red + Yellow", value: "orange" },
              { emoji: "🔵+🟡", label: "Blue + Yellow", value: "green" },
              { emoji: "🔴+🔵", label: "Red + Blue", value: "purple" },
              { emoji: "⚪+⚫", label: "White + Black", value: "gray" },
            ],
            correctAnswer: "orange",
          },
          {
            type: "puzzle" as const,
            question: "Which is a primary color?",
            items: [
              { emoji: "🔴", value: "red" },
              { emoji: "🟣", value: "purple" },
              { emoji: "🟠", value: "orange" },
              { emoji: "🟢", value: "green" },
              { emoji: "🟤", value: "brown" },
              { emoji: "🩷", value: "pink" },
            ],
            correctAnswer: "red",
          },
        ],
      },
    },
  };

  const content = getLessonContent() || lessonContent[subject]?.[mode] || lessonContent.math[mode];

  const handleComplete = () => {
    const score = Math.floor(Math.random() * 20) + 80; // Random score 80-100
    completeLesson(worldId, levelId, score);
    setShowCompletion(true);
  };

  const handleFinish = () => {
    setShowCompletion(false);
    onFinish(); // Navigate back to world map
  };

  const handleTakeQuiz = () => {
    setShowCompletion(false);
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number, total: number) => {
    setQuizScore(score);
    setQuizTotal(total);
    completeQuiz(worldId, levelId, score * 10, total); // 10 XP per correct answer
    setShowQuiz(false);
    setShowQuizResults(true);
  };

  const handleQuizFinish = () => {
    setShowQuizResults(false);
    onFinish(); // Navigate back to world map
  };

  const handleQuizCancel = () => {
    setShowQuiz(false);
    onBack();
  };

  // Show Quiz
  const quizData = getQuizData();
  if (showQuiz && quizData) {
    return (
      <Quiz
        questions={quizData.questions}
        levelName={quizData.levelName}
        onComplete={handleQuizComplete}
        onBack={handleQuizCancel}
      />
    );
  }

  // Show Quiz Results
  if (showQuizResults && quizData) {
    return (
      <QuizResults
        score={quizScore}
        totalQuestions={quizTotal}
        levelName={quizData.levelName}
        onContinue={handleQuizFinish}
      />
    );
  }

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFE8D6] to-[#B8E6D5] flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          className="bg-white rounded-3xl p-12 text-center max-w-2xl"
          style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)" }}
        >
          {/* Celebration animation */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: `${10 + Math.random() * 15}px`,
                height: `${10 + Math.random() * 15}px`,
                backgroundColor: ["#A8D8EA", "#C9B6E4", "#B8E6D5", "#FFE5A0", "#F7B7D2"][i % 5],
                borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                top: "20%",
                left: "50%",
              }}
              animate={{
                y: [(Math.random() - 0.5) * 400],
                x: [(Math.random() - 0.5) * 600],
                rotate: [0, Math.random() * 720],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
              }}
            />
          ))}

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-9xl mb-6"
          >
            <Trophy size={120} color="#FFD670" />
          </motion.div>

          <h2 className="text-5xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
            Lesson Complete! 🎉
          </h2>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="text-6xl">{avatar}</div>
            <div className="text-5xl">❤️</div>
            <div className="text-6xl">{pet}</div>
          </div>

          <p className="text-2xl mb-8" style={{ color: "#6B7280" }}>
            You've earned +{Math.floor(Math.random() * 20) + 80} XP!
          </p>

          {/* Quiz Button (if quiz available) */}
          {quizData && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTakeQuiz}
              className="px-12 py-5 rounded-2xl text-white text-xl mb-4"
              style={{
                backgroundColor: "#FFD700",
                boxShadow: "0 4px 24px rgba(255, 215, 0, 0.3)",
                fontWeight: 700,
              }}
            >
              📝 Take Quiz for Bonus XP!
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFinish}
            className="px-12 py-5 rounded-2xl text-white text-xl"
            style={{
              backgroundColor: "#7BA7BC",
              boxShadow: "0 4px 24px rgba(123, 167, 188, 0.3)",
              fontWeight: 700,
            }}
          >
            Continue Adventure
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] pb-12">
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-full"
            style={{ boxShadow: "0 2px 16px rgba(0, 0, 0, 0.06)", fontWeight: 600 }}
          >
            <ArrowLeft size={20} />
            Back
          </motion.button>

          <div className="flex items-center gap-4">
            <div
              className="px-6 py-3 rounded-full"
              style={{ backgroundColor: "#FFF", fontWeight: 600 }}
            >
              {mode === "visual" && "📺 Visual Mode"}
              {mode === "auditory" && "🎧 Auditory Mode"}
              {mode === "interactive" && "🎮 Interactive Mode"}
            </div>
          </div>
        </motion.div>

        {/* Lesson Content */}
        {mode === "visual" && (
          <VisualLesson
            subject={subject}
            worldId={worldId}
            levelId={levelId}
            {...content}
            onComplete={handleComplete}
          />
        )}

        {mode === "auditory" && (
          <AuditoryLesson
            subject={subject}
            worldId={worldId}
            levelId={levelId}
            {...content}
            onComplete={handleComplete}
          />
        )}

        {mode === "interactive" && (
          <InteractiveLesson
            subject={subject}
            worldId={worldId}
            levelId={levelId}
            {...content}
            onComplete={handleComplete}
          />
        )}
      </div>
    </div>
  );
}