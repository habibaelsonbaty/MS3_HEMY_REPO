import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

interface VisualLessonProps {
  subject: string;
  worldId: string;
  levelId: string;
  title: string;
  chapters: { time: string; title: string; thumbnail: string }[];
  diagrams: { title: string; description: string; emoji: string }[];
  onComplete: () => void;
}

export function VisualLesson({
  subject,
  worldId,
  levelId,
  title,
  chapters,
  diagrams,
  onComplete,
}: VisualLessonProps) {
  const { avatar, pet } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const subjectColors: Record<string, { bg: string; accent: string; helper: string }> = {
    math: { bg: "#A8D8EA", accent: "#7BA7BC", helper: "☁️" },
    science: { bg: "#B8E6D5", accent: "#8BC9B0", helper: "🔬" },
    reading: { bg: "#F7B7D2", accent: "#E889B1", helper: "📖" },
    art: { bg: "#FFE5A0", accent: "#FFD670", helper: "🎨" },
  };

  const colors = subjectColors[subject] || subjectColors.math;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = async () => {
    if (!videoContainerRef.current) return;
    
    try {
      if (!isFullscreen) {
        // Try different fullscreen methods
        if (videoContainerRef.current.requestFullscreen) {
          await videoContainerRef.current.requestFullscreen();
        } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
          // Safari support
          await (videoContainerRef.current as any).webkitRequestFullscreen();
        } else if ((videoContainerRef.current as any).mozRequestFullScreen) {
          // Firefox support
          await (videoContainerRef.current as any).mozRequestFullScreen();
        } else if ((videoContainerRef.current as any).msRequestFullscreen) {
          // IE/Edge support
          await (videoContainerRef.current as any).msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          // Safari support
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          // Firefox support
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          // IE/Edge support
          await (document as any).msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      // Fullscreen not allowed or blocked by permissions policy
      // Fallback: just toggle a "fullscreen-like" mode using CSS
      console.log("Fullscreen not available, using CSS fallback");
      setIsFullscreen(!isFullscreen);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        )
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Video Player Section */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8"
        style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
      >
        <h2 className="text-3xl mb-6" style={{ fontWeight: 700, color: "#4A5568" }}>
          {title}
        </h2>

        {/* Video Display */}
        <div 
          ref={videoContainerRef}
          className="relative rounded-2xl overflow-hidden mb-6" 
          style={{ 
            backgroundColor: colors.bg,
            ...(isFullscreen && !document.fullscreenElement ? {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 9999,
              borderRadius: 0,
              margin: 0,
              padding: 0,
            } : {})
          }}
        >
          <div 
            className={isFullscreen && !document.fullscreenElement ? "w-full h-full flex items-center justify-center relative" : "aspect-video flex items-center justify-center relative"}
          >
            {/* General Educational Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                {/* Animated Learning Characters */}
                <div className="flex items-center justify-center gap-6 mb-6">
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, -8, 8, 0]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-7xl"
                  >
                    📚
                  </motion.div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      y: [0, -20, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3
                    }}
                    className="text-8xl"
                  >
                    🎓
                  </motion.div>
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 8, -8, 0]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6
                    }}
                    className="text-7xl"
                  >
                    ✨
                  </motion.div>
                </div>

                {/* Floating Text */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-5xl mb-4"
                  style={{ fontWeight: 700, color: "#FFF", textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
                >
                  Educational Video
                </motion.div>

                {/* Sparkle Effects */}
                <div className="flex items-center justify-center gap-4">
                  <motion.div
                    animate={{ 
                      scale: [0, 1.5, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                    className="text-3xl"
                  >
                    ⭐
                  </motion.div>
                  <motion.div
                    className="text-2xl px-6 py-3 rounded-full"
                    style={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      color: "#FFF",
                      fontWeight: 600
                    }}
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  >
                    Press Play to Watch
                  </motion.div>
                  <motion.div
                    animate={{ 
                      scale: [0, 1.5, 0],
                      rotate: [0, -180, -360]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      delay: 1
                    }}
                    className="text-3xl"
                  >
                    ✨
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Helper Character */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-4 right-4 text-6xl"
            >
              {colors.helper}
            </motion.div>

            {/* Exit Fullscreen Button - Only visible in fullscreen */}
            {isFullscreen && (
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFullscreen}
                className="absolute top-6 right-6 z-50 p-4 rounded-full bg-white/90 backdrop-blur-sm flex items-center gap-2"
                style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)" }}
              >
                <Minimize size={24} color="#4A5568" />
                <span style={{ fontWeight: 600, color: "#4A5568" }}>Exit Fullscreen</span>
              </motion.button>
            )}

            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/20"
              >
                <div
                  className="w-24 h-24 rounded-full bg-white flex items-center justify-center"
                  style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)" }}
                >
                  <Play size={48} color={colors.accent} fill={colors.accent} />
                </div>
              </motion.button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/20">
            <motion.div
              className="h-full"
              style={{ backgroundColor: colors.accent, width: `${progress}%` }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Video Controls */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            className="p-3 rounded-xl"
            style={{ backgroundColor: colors.bg }}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </motion.button>

          <div className="flex-1 text-center" style={{ fontWeight: 600, color: "#4A5568" }}>
            {chapters[currentChapter]?.title || "Introduction"}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="p-3 rounded-xl"
            style={{ backgroundColor: colors.bg }}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFullscreen}
            className="p-3 rounded-xl"
            style={{ backgroundColor: colors.bg }}
          >
            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </motion.button>
        </div>

        {/* Chapter Markers */}
        <div className="grid grid-cols-4 gap-4">
          {chapters.map((chapter, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentChapter(i)}
              className={`p-4 rounded-2xl transition-all ${
                currentChapter === i ? "ring-4 ring-offset-2" : ""
              }`}
              style={{
                backgroundColor: currentChapter === i ? colors.bg : "#FFF3E6",
                ringColor: currentChapter === i ? colors.accent : "transparent",
              }}
            >
              <div className="text-4xl mb-2">{chapter.thumbnail}</div>
              <div className="text-xs" style={{ fontWeight: 600 }}>
                {chapter.title}
              </div>
              <div className="text-xs opacity-60">{chapter.time}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Diagrams & Visual Aids */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-8"
        style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
            Visual Learning Aids
          </h3>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{avatar}</div>
            <div className="text-2xl">{pet}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diagrams.map((diagram, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-6 rounded-2xl relative overflow-hidden"
              style={{ backgroundColor: colors.bg + "30" }}
            >
              <div className="text-6xl mb-4 text-center">{diagram.emoji}</div>
              <h4 className="text-xl mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                {diagram.title}
              </h4>
              <p style={{ color: "#6B7280" }}>{diagram.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlight Moments */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-6 rounded-2xl relative"
          style={{ backgroundColor: "#FFE5A0" }}
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h4 className="text-xl mb-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                Key Takeaway
              </h4>
              <p style={{ color: "#6B7280" }}>
                Remember to watch the video multiple times to understand all the details!
              </p>
            </div>
          </div>
        </motion.div>
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