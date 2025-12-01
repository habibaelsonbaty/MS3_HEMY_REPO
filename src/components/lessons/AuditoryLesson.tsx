import { motion } from "motion/react";
import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

interface AuditoryLessonProps {
  subject: string;
  worldId: string;
  levelId: string;
  title: string;
  chapters: { title: string; duration: string; keyPoints: string[] }[];
  onComplete: () => void;
}

export function AuditoryLesson({
  subject,
  worldId,
  levelId,
  title,
  chapters,
  onComplete,
}: AuditoryLessonProps) {
  const { avatar, pet } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);

  const subjectColors: Record<string, { bg: string; accent: string; wave: string }> = {
    math: { bg: "#A8D8EA", accent: "#7BA7BC", wave: "#5A8BA0" },
    science: { bg: "#B8E6D5", accent: "#8BC9B0", wave: "#6AAA8A" },
    reading: { bg: "#F7B7D2", accent: "#E889B1", wave: "#D56A9A" },
    art: { bg: "#FFE5A0", accent: "#FFD670", wave: "#FFC040" },
  };

  const colors = subjectColors[subject] || subjectColors.math;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const handlePrevious = () => {
    setCurrentChapter((prev) => Math.max(0, prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentChapter((prev) => Math.min(chapters.length - 1, prev + 1));
    setProgress(0);
  };

  return (
    <div className="space-y-8">
      {/* Audio Player Section */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8"
        style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl" style={{ fontWeight: 700, color: "#4A5568" }}>
            {title}
          </h2>
          
          {/* Mascot with headphones */}
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <div className="text-5xl">{pet}</div>
            <div className="absolute -top-2 -right-2 text-3xl">🎧</div>
          </motion.div>
        </div>

        {/* Audio Waveform Visualization */}
        <div className="rounded-2xl p-8 mb-6" style={{ backgroundColor: colors.bg }}>
          <div className="flex items-center justify-center gap-1 h-32">
            {[...Array(40)].map((_, i) => {
              const height = isPlaying
                ? Math.random() * 100 + 20
                : 30 + Math.sin(i / 5) * 20;
              const isPastProgress = (i / 40) * 100 <= progress;
              
              return (
                <motion.div
                  key={i}
                  className="w-2 rounded-full"
                  style={{
                    backgroundColor: isPastProgress ? colors.wave : colors.accent,
                    height: `${height}%`,
                  }}
                  animate={{
                    height: isPlaying ? `${Math.random() * 100 + 20}%` : `${height}%`,
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: isPlaying ? Infinity : 0,
                    repeatType: "reverse",
                  }}
                />
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="mt-4 flex justify-between text-sm" style={{ fontWeight: 600, color: "#FFF" }}>
            <span>{Math.floor(progress / 2)}s</span>
            <span>{chapters[currentChapter]?.duration || "0:00"}</span>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            disabled={currentChapter === 0}
            className="p-4 rounded-xl"
            style={{
              backgroundColor: colors.bg,
              opacity: currentChapter === 0 ? 0.5 : 1,
            }}
          >
            <SkipBack size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            className="p-6 rounded-2xl"
            style={{
              backgroundColor: colors.accent,
              boxShadow: `0 4px 16px ${colors.accent}40`,
            }}
          >
            {isPlaying ? (
              <Pause size={32} color="#FFF" />
            ) : (
              <Play size={32} color="#FFF" fill="#FFF" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            disabled={currentChapter === chapters.length - 1}
            className="p-4 rounded-xl"
            style={{
              backgroundColor: colors.bg,
              opacity: currentChapter === chapters.length - 1 ? 0.5 : 1,
            }}
          >
            <SkipForward size={24} />
          </motion.button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-4 px-4">
          <Volume2 size={24} color={colors.accent} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1"
            style={{
              accentColor: colors.accent,
            }}
          />
          <span style={{ fontWeight: 600, color: "#4A5568", minWidth: "3rem" }}>
            {volume}%
          </span>
        </div>
      </motion.div>

      {/* Chapters List */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-8"
        style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
      >
        <h3 className="text-2xl mb-6" style={{ fontWeight: 700, color: "#4A5568" }}>
          Chapters
        </h3>

        <div className="space-y-4">
          {chapters.map((chapter, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02, x: 8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setCurrentChapter(i);
                setProgress(0);
              }}
              className={`w-full p-6 rounded-2xl text-left transition-all ${
                currentChapter === i ? "ring-4 ring-offset-2" : ""
              }`}
              style={{
                backgroundColor: currentChapter === i ? colors.bg : "#FFF3E6",
                ringColor: currentChapter === i ? colors.accent : "transparent",
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: currentChapter === i ? "#FFF" : colors.bg,
                    fontWeight: 700,
                    color: colors.accent,
                  }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg mb-1" style={{ fontWeight: 600, color: "#4A5568" }}>
                    {chapter.title}
                  </h4>
                  <p className="text-sm" style={{ color: "#6B7280" }}>
                    Duration: {chapter.duration}
                  </p>
                </div>
                {currentChapter === i && isPlaying && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-2xl"
                  >
                    🔊
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Listening Notes */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl p-8"
        style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">{avatar}</div>
          <h3 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
            Listening Notes
          </h3>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="p-6 rounded-2xl"
            style={{ backgroundColor: "#FFE5A0" }}
          >
            <div className="flex gap-3">
              <div className="text-2xl">👂</div>
              <div>
                <h4 className="text-lg mb-2" style={{ fontWeight: 600 }}>
                  Focus Points
                </h4>
                <ul className="space-y-2">
                  {chapters[currentChapter]?.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: colors.accent }}>•</span>
                      <span style={{ color: "#4A5568" }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl"
            style={{ backgroundColor: colors.bg + "40" }}
          >
            <div className="flex gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <h4 className="text-lg mb-2" style={{ fontWeight: 600 }}>
                  Tip
                </h4>
                <p style={{ color: "#6B7280" }}>
                  Listen carefully and try to visualize what you hear. You can replay any chapter!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Complete Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onComplete}
        className="w-full py-6 rounded-2xl flex items-center justify-center gap-3 text-white text-xl"
        style={{
          backgroundColor: colors.accent,
          boxShadow: `0 4px 24px ${colors.accent}40`,
          fontWeight: 700,
        }}
      >
        Complete Lesson
        <ChevronRight size={24} />
      </motion.button>
    </div>
  );
}
