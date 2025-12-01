import { motion } from "motion/react";
import { ArrowLeft, Lock, Check } from "lucide-react";
import { useAppContext } from "../context/AppContext";

interface FlatLevelMapProps {
  subject: string;
  onSelectLevel: (level: string) => void;
  onBack: () => void;
}

export function FlatLevelMap({ subject, onSelectLevel, onBack }: FlatLevelMapProps) {
  const { avatar, pet, isLessonCompleted } = useAppContext();

  const worldData: Record<
    string,
    {
      name: string;
      color: string;
      levels: Array<{
        id: string;
        number: number;
        name: string;
        icon: string;
        position: { x: number; y: number };
      }>;
    }
  > = {
    math: {
      name: "Math Mountain",
      color: "#4FA8C5",
      levels: [
        { id: "level-1", number: 1, name: "Number Valley", icon: "1️⃣", position: { x: 12, y: 82 } },
        { id: "level-2", number: 2, name: "Addition Trail", icon: "➕", position: { x: 22, y: 72 } },
        { id: "level-3", number: 3, name: "Subtraction Path", icon: "➖", position: { x: 35, y: 65 } },
        { id: "level-4", number: 4, name: "Multiplication Hill", icon: "✖️", position: { x: 48, y: 58 } },
        { id: "level-5", number: 5, name: "Division Ridge", icon: "➗", position: { x: 62, y: 52 } },
        { id: "level-6", number: 6, name: "Fraction Falls", icon: "½", position: { x: 75, y: 45 } },
        { id: "level-7", number: 7, name: "Decimal Forest", icon: "0.5", position: { x: 68, y: 35 } },
        { id: "level-8", number: 8, name: "Geometry Peak", icon: "△", position: { x: 55, y: 25 } },
        { id: "level-9", number: 9, name: "Algebra Summit", icon: "x²", position: { x: 42, y: 18 } },
        { id: "level-10", number: 10, name: "Problem Solving Paradise", icon: "🏆", position: { x: 30, y: 10 } },
      ],
    },
    science: {
      name: "Science Lab",
      color: "#5FB89A",
      levels: [
        { id: "level-1", number: 1, name: "Matter Basics", icon: "⚗️", position: { x: 12, y: 82 } },
        { id: "level-2", number: 2, name: "Water Cycle", icon: "💧", position: { x: 22, y: 72 } },
        { id: "level-3", number: 3, name: "Plant Life", icon: "🌱", position: { x: 35, y: 65 } },
        { id: "level-4", number: 4, name: "Animal Kingdom", icon: "🦁", position: { x: 48, y: 58 } },
        { id: "level-5", number: 5, name: "Energy Forms", icon: "⚡", position: { x: 62, y: 52 } },
        { id: "level-6", number: 6, name: "Forces & Motion", icon: "🎢", position: { x: 75, y: 45 } },
        { id: "level-7", number: 7, name: "Solar System", icon: "🌍", position: { x: 68, y: 35 } },
        { id: "level-8", number: 8, name: "Ecosystems", icon: "🌿", position: { x: 55, y: 25 } },
        { id: "level-9", number: 9, name: "Human Body", icon: "🫀", position: { x: 42, y: 18 } },
        { id: "level-10", number: 10, name: "Scientific Method", icon: "🔬", position: { x: 30, y: 10 } },
      ],
    },
  };

  const world = worldData[subject] || worldData.math;

  // Determine level status
  const getLevelStatus = (levelId: string, levelNumber: number) => {
    const isCompleted = isLessonCompleted(subject, levelId);
    
    if (isCompleted) return "completed";
    
    // Check if previous level is completed
    if (levelNumber === 1) return "unlocked";
    
    const previousLevelId = `level-${levelNumber - 1}`;
    const isPreviousCompleted = isLessonCompleted(subject, previousLevelId);
    
    return isPreviousCompleted ? "unlocked" : "locked";
  };

  // Find next level to play
  const getNextLevel = () => {
    for (let i = 0; i < world.levels.length; i++) {
      const level = world.levels[i];
      const status = getLevelStatus(level.id, level.number);
      if (status === "unlocked") {
        return level;
      }
    }
    return null;
  };

  const nextLevel = getNextLevel();

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(to bottom, #E3F2FD 0%, #F8E8D8 50%, #FFE8CC 100%)"
      }}
    >
      {/* Header - Fixed at top */}
      <div className="px-8 py-6 flex items-center justify-between">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full"
          style={{ boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)", fontWeight: 600, color: "#4A5568" }}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl mb-1" style={{ fontWeight: 700, color: "#4A5568" }}>
            {world.name}
          </h1>
          <p className="text-sm" style={{ color: "#6B7280", fontWeight: 500 }}>
            Follow the path to complete your adventure
          </p>
        </motion.div>

        <div className="w-32" /> {/* Spacer for centering */}
      </div>

      {/* Full-Screen Adventure World Map */}
      <div className="flex-1 relative overflow-hidden px-4 pb-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full h-full rounded-3xl overflow-hidden"
          style={{ 
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            minHeight: "85vh"
          }}
        >
          {/* Background Decorations - Subtle */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Faint Mountain Silhouettes */}
            <svg className="absolute bottom-0 left-0 w-full h-1/3" preserveAspectRatio="none" style={{ opacity: 0.06 }}>
              <path
                d="M0,200 L150,100 L300,150 L450,80 L600,120 L750,60 L900,90 L1050,50 L1200,80 L1400,200 L1400,300 L0,300 Z"
                fill={world.color}
              />
            </svg>
            
            <svg className="absolute bottom-0 right-0 w-2/3 h-1/2" preserveAspectRatio="none" style={{ opacity: 0.04 }}>
              <path
                d="M0,300 L200,180 L400,220 L600,140 L800,160 L1000,300 L1000,400 L0,400 Z"
                fill={world.color}
              />
            </svg>

            {/* Floating Clouds - Very Subtle */}
            <motion.div
              animate={{ x: ["-5%", "105%"] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute top-16 left-0 text-6xl opacity-15"
            >
              ☁️
            </motion.div>
            <motion.div
              animate={{ x: ["105%", "-5%"] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-32 right-0 text-5xl opacity-12"
            >
              ☁️
            </motion.div>

            {/* Tiny Sparkles - Minimal */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.8, 1.1, 0.8]
                }}
                transition={{ 
                  duration: 3 + i, 
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                className="absolute text-lg"
                style={{
                  left: `${20 + i * 25}%`,
                  top: `${10 + i * 8}%`,
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>

          {/* Winding Path */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor={world.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={world.color} stopOpacity="0.5" />
              </linearGradient>
            </defs>
            
            {world.levels.slice(0, -1).map((level, i) => {
              const nextLevel = world.levels[i + 1];
              const status = getLevelStatus(level.id, level.number);
              const isCompleted = status === "completed";
              
              return (
                <motion.path
                  key={i}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  d={`M ${level.position.x}% ${level.position.y}% Q ${(level.position.x + nextLevel.position.x) / 2}% ${Math.min(level.position.y, nextLevel.position.y) - 3}% ${nextLevel.position.x}% ${nextLevel.position.y}%`}
                  stroke={isCompleted ? world.color : "url(#pathGradient)"}
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={isCompleted ? "0" : "15,10"}
                  strokeLinecap="round"
                  style={{ 
                    opacity: isCompleted ? 0.6 : 0.4
                  }}
                />
              );
            })}
          </svg>

          {/* Level Nodes */}
          {world.levels.map((level, i) => {
            const status = getLevelStatus(level.id, level.number);
            const isLocked = status === "locked";
            const isCompleted = status === "completed";
            const isUnlocked = status === "unlocked";
            const isCurrent = nextLevel?.id === level.id;

            return (
              <motion.div
                key={level.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 150 }}
                className="absolute"
                style={{
                  left: `${level.position.x}%`,
                  top: `${level.position.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              >
                <motion.button
                  whileHover={!isLocked ? { scale: 1.08 } : {}}
                  whileTap={!isLocked ? { scale: 0.95 } : {}}
                  onClick={() => !isLocked && onSelectLevel(level.id)}
                  disabled={isLocked}
                  className={`relative flex flex-col items-center ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {/* Current level glow */}
                  {isCurrent && (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity 
                      }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundColor: world.color,
                        filter: "blur(20px)",
                        width: "140px",
                        height: "140px",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                      }}
                    />
                  )}

                  {/* Pointer for current level */}
                  {isCurrent && (
                    <motion.div
                      animate={{ y: [-8, -12, -8] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="absolute -top-20 text-4xl"
                    >
                      👇
                    </motion.div>
                  )}

                  {/* Large Level Circle */}
                  <div
                    className="relative rounded-full flex items-center justify-center"
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: isLocked 
                        ? "#F3F4F6" 
                        : isCompleted 
                          ? world.color 
                          : "#FFFFFF",
                      border: `4px solid ${
                        isLocked 
                          ? "#D1D5DB" 
                          : isCurrent 
                            ? world.color 
                            : isCompleted 
                              ? world.color 
                              : "#E5E7EB"
                      }`,
                      boxShadow: isLocked 
                        ? "0 4px 12px rgba(0, 0, 0, 0.06)" 
                        : isCurrent
                          ? `0 8px 32px ${world.color}50`
                          : "0 6px 20px rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    {/* Lock icon for locked levels */}
                    {isLocked && <Lock size={32} color="#9CA3AF" strokeWidth={2.5} />}
                    
                    {/* Check icon for completed */}
                    {isCompleted && <Check size={40} color="#FFFFFF" strokeWidth={3} />}
                    
                    {/* Icon for unlocked */}
                    {isUnlocked && !isCompleted && (
                      <div className="text-5xl">{level.icon}</div>
                    )}

                    {/* Level Number Badge */}
                    <div
                      className="absolute -top-2 -right-2 rounded-full flex items-center justify-center text-white"
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: isLocked ? "#9CA3AF" : world.color,
                        fontWeight: 800,
                        fontSize: "15px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
                      }}
                    >
                      {level.number}
                    </div>
                  </div>

                  {/* Level Name Label */}
                  <div
                    className="mt-4 px-4 py-2 rounded-xl text-center"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
                      minWidth: "140px"
                    }}
                  >
                    <div
                      className="text-sm"
                      style={{
                        fontWeight: 700,
                        color: isLocked ? "#9CA3AF" : "#4A5568",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {level.name}
                    </div>
                  </div>

                  {/* Mascot Tip Bubble - Only for Current Level */}
                  {isCurrent && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.5, type: "spring" }}
                      className="absolute"
                      style={{
                        left: level.position.x > 50 ? "-200px" : "160px",
                        top: "50%",
                        transform: "translateY(-50%)"
                      }}
                    >
                      <div
                        className="relative px-5 py-4 rounded-2xl"
                        style={{
                          backgroundColor: "#FFFFFF",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
                          border: `2px solid ${world.color}`,
                          minWidth: "160px"
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-3xl">{pet}</div>
                          <div className="text-xl">💬</div>
                        </div>
                        <p 
                          className="text-sm"
                          style={{ 
                            fontWeight: 700, 
                            color: "#4A5568",
                            lineHeight: "1.4"
                          }}
                        >
                          Let's explore<br />
                          <span style={{ color: world.color }}>{level.name}</span>!
                        </p>
                        
                        {/* Bubble tail */}
                        <div
                          className="absolute top-1/2 rotate-45"
                          style={{ 
                            width: "14px",
                            height: "14px",
                            backgroundColor: "#FFFFFF",
                            border: `2px solid ${world.color}`,
                            borderRight: "none",
                            borderBottom: "none",
                            transform: level.position.x > 50 
                              ? "translateY(-50%) rotate(45deg)" 
                              : "translateY(-50%) rotate(-135deg)",
                            right: level.position.x > 50 ? "-7px" : "auto",
                            left: level.position.x > 50 ? "auto" : "-7px"
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}