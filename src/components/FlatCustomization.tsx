import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

interface FlatCustomizationProps {
  onBack: () => void;
}

export function FlatCustomization({ onBack }: FlatCustomizationProps) {
  const { avatar, pet, setAvatar, setPet } = useAppContext();
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);
  const [selectedPet, setSelectedPet] = useState(pet);
  const [showSaveAnimation, setShowSaveAnimation] = useState(false);

  const avatars = [
    "😊", "😎", "🤓", "😄", "🥳", "😇", "🤗", "😺",
    "🦊", "🐻", "🐼", "🐨", "🐸", "🦁", "🐷", "🐮"
  ];

  const pets = [
    { emoji: "🐰", name: "Bunny", color: "#FFB3D9" },
    { emoji: "🐶", name: "Puppy", color: "#FFE0B2" },
    { emoji: "🐱", name: "Kitty", color: "#B3E5FC" },
    { emoji: "🐼", name: "Panda", color: "#C8E6C9" },
    { emoji: "🦊", name: "Fox", color: "#FFCC80" },
    { emoji: "🐨", name: "Koala", color: "#D7CCC8" },
    { emoji: "🐸", name: "Frog", color: "#A5D6A7" },
    { emoji: "🦋", name: "Butterfly", color: "#E1BEE7" },
    { emoji: "🐢", name: "Turtle", color: "#A8D8EA" },
    { emoji: "🐹", name: "Hamster", color: "#FFCCBC" },
    { emoji: "🦉", name: "Owl", color: "#C9B6E4" },
    { emoji: "🐝", name: "Bee", color: "#FFE5A0" },
  ];

  const handleSave = () => {
    setAvatar(selectedAvatar);
    setPet(selectedPet);
    setShowSaveAnimation(true);
    setTimeout(() => {
      setShowSaveAnimation(false);
      onBack();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] pb-20">
      {/* Soft background decorations */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#A8D8EA] opacity-10" />
      <div className="absolute bottom-32 left-16 w-80 h-80 rounded-full bg-[#C9B6E4] opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-full"
            style={{ boxShadow: "0 2px 16px rgba(0, 0, 0, 0.06)", fontWeight: 600, color: "#4A5568" }}
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </motion.button>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl text-center"
            style={{ fontWeight: 700, color: "#4A5568" }}
          >
            Customize Your Character
          </motion.h1>

          <div style={{ width: "180px" }} /> {/* Spacer for centering */}
        </div>

        {/* Top: Character Preview Card - Horizontal Layout */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-12 mb-10"
          style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
        >
          <h2 className="text-3xl mb-12 text-center" style={{ fontWeight: 700, color: "#4A5568" }}>
            Your Character Preview
          </h2>

          <div className="flex items-center justify-center gap-20">
            {/* Avatar Preview */}
            <motion.div
              key={selectedAvatar}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div
                  className="w-64 h-64 rounded-3xl flex items-center justify-center bg-white"
                  style={{ 
                    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)", 
                    border: "4px solid #A8D8EA",
                    fontSize: "160px",
                    lineHeight: "1"
                  }}
                >
                  {selectedAvatar}
                </div>

                {/* Sparkle effect */}
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <Sparkles size={32} color="#FFE5A0" fill="#FFE5A0" />
                </motion.div>
              </motion.div>

              {/* Platform */}
              <div className="w-40 h-4 rounded-full bg-[#A8D8EA] mt-8 opacity-20" />

              <p className="mt-6 text-2xl" style={{ fontWeight: 600, color: "#4A5568" }}>
                Your Avatar
              </p>
            </motion.div>

            {/* Pet Preview */}
            <motion.div
              key={selectedPet}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div
                  className="w-64 h-64 rounded-3xl flex items-center justify-center bg-white"
                  style={{
                    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
                    border: `4px solid ${pets.find((p) => p.emoji === selectedPet)?.color || "#B8E6D5"}`,
                    fontSize: "160px",
                    lineHeight: "1"
                  }}
                >
                  {selectedPet}
                </div>

                {/* Heart effect */}
                <motion.div
                  className="absolute -top-2 -right-2 text-4xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  💝
                </motion.div>
              </motion.div>

              {/* Platform */}
              <div className="w-40 h-4 rounded-full bg-[#B8E6D5] mt-8 opacity-20" />

              <p className="mt-6 text-2xl" style={{ fontWeight: 600, color: "#4A5568" }}>
                {pets.find((p) => p.emoji === selectedPet)?.name || "Your Micropet"}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Middle: Selection Grids - Two Columns */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          {/* Left: Avatar Selection */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8"
            style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
          >
            <h3 className="text-2xl mb-8 text-center" style={{ fontWeight: 700, color: "#4A5568" }}>
              Choose Your Avatar
            </h3>

            <div className="grid grid-cols-4 gap-4">
              {avatars.map((avatar, i) => (
                <motion.button
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + i * 0.03, type: "spring", bounce: 0.5 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`aspect-square rounded-2xl flex items-center justify-center text-5xl transition-all ${
                    selectedAvatar === avatar
                      ? "bg-[#4FA8C5] ring-4 ring-[#4FA8C5] ring-offset-2"
                      : "bg-[#F8F9FA] hover:bg-[#E8ECEF]"
                  }`}
                >
                  {avatar}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right: Pet Selection */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-8"
            style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
          >
            <h3 className="text-2xl mb-8 text-center" style={{ fontWeight: 700, color: "#4A5568" }}>
              Choose Your Micropet
            </h3>

            <div className="grid grid-cols-4 gap-4">
              {pets.map((pet, i) => (
                <motion.button
                  key={pet.emoji}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + i * 0.05, type: "spring", bounce: 0.5 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPet(pet.emoji)}
                  className={`aspect-square rounded-2xl transition-all flex flex-col items-center justify-center ${
                    selectedPet === pet.emoji
                      ? `ring-4 ring-offset-2`
                      : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: selectedPet === pet.emoji ? pet.color : pet.color + "40",
                    ringColor: selectedPet === pet.emoji ? pet.color : "transparent",
                    padding: "12px"
                  }}
                >
                  <div className="text-4xl mb-1">{pet.emoji}</div>
                  <div className="text-xs" style={{ fontWeight: 600, color: "#4A5568" }}>
                    {pet.name}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom: Save Button - Centered */}
        <div className="flex justify-center">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex items-center gap-3 px-20 py-6 text-white rounded-full text-xl"
            style={{
              backgroundColor: "#7BA7BC",
              boxShadow: "0 6px 24px rgba(123, 167, 188, 0.4)",
              fontWeight: 700,
            }}
          >
            <Save size={26} />
            Save Changes
          </motion.button>
        </div>
      </div>

      {/* Save Animation */}
      <AnimatePresence>
        {showSaveAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm"
          >
            {/* Confetti */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: `${10 + Math.random() * 15}px`,
                  height: `${10 + Math.random() * 15}px`,
                  backgroundColor: ["#A8D8EA", "#C9B6E4", "#B8E6D5", "#FFE5A0", "#F7B7D2"][i % 5],
                  borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  y: [(Math.random() - 0.5) * 600],
                  x: [(Math.random() - 0.5) * 800],
                  rotate: [0, Math.random() * 720],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1.5,
                }}
              />
            ))}

            {/* Success message */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              className="bg-white rounded-3xl p-12 text-center"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)" }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-7xl mb-4"
              >
                ✨
              </motion.div>
              <h2 className="text-4xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
                Saved!
              </h2>
              <p className="text-xl" style={{ color: "#6B7280" }}>
                Your character looks amazing!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}