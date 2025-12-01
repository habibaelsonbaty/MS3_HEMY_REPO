import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Palette, Shirt, Sparkles, Home, Save, Star } from "lucide-react";
import { useState } from "react";

interface CustomizationPageProps {
  onBack: () => void;
}

interface FurnitureItem {
  id: string;
  emoji: string;
  name: string;
  x: number;
  y: number;
  size: "small" | "medium" | "large";
}

export function CustomizationPage({ onBack }: CustomizationPageProps) {
  const [selectedTab, setSelectedTab] = useState<"avatar" | "pet" | "furniture" | "colors">("avatar");
  const [selectedAvatar, setSelectedAvatar] = useState("😊");
  const [selectedHair, setSelectedHair] = useState("👱");
  const [selectedOutfit, setSelectedOutfit] = useState("👕");
  const [selectedAccessory, setSelectedAccessory] = useState("🎒");
  const [selectedPet, setSelectedPet] = useState("🐰");
  const [roomTheme, setRoomTheme] = useState({
    walls: "#FFE0B2",
    floor: "#D7CCC8",
    lighting: "#FFF9C4",
  });
  const [furnitureItems, setFurnitureItems] = useState<FurnitureItem[]>([
    { id: "1", emoji: "🛏️", name: "Bed", x: 65, y: 60, size: "large" },
    { id: "2", emoji: "📚", name: "Bookshelf", x: 25, y: 35, size: "medium" },
    { id: "3", emoji: "🪴", name: "Plant", x: 80, y: 30, size: "small" },
  ]);
  const [showSaveAnimation, setShowSaveAnimation] = useState(false);

  const hairs = ["👱", "👩‍🦰", "👩‍🦱", "👩‍🦳", "🧑", "👨‍🦱", "👨‍🦲", "👱‍♂️"];
  const outfits = ["👕", "👔", "👗", "🎽", "🧥", "👘", "🥼", "🦺"];
  const accessories = ["🎒", "👓", "🎩", "👑", "🎀", "🧢", "⛑️", "🎭"];
  const pets = [
    { emoji: "🐰", name: "Bunny", color: "#FFB3D9" },
    { emoji: "🐶", name: "Puppy", color: "#FFE0B2" },
    { emoji: "🐱", name: "Kitty", color: "#B3E5FC" },
    { emoji: "🐼", name: "Panda", color: "#C8E6C9" },
    { emoji: "🦊", name: "Fox", color: "#FFCC80" },
    { emoji: "🐨", name: "Koala", color: "#D7CCC8" },
    { emoji: "🐸", name: "Frog", color: "#A5D6A7" },
    { emoji: "🦋", name: "Butterfly", color: "#E1BEE7" },
  ];
  const availableFurniture = [
    { emoji: "🛏️", name: "Bed", size: "large" as const },
    { emoji: "🛋️", name: "Couch", size: "large" as const },
    { emoji: "📚", name: "Bookshelf", size: "medium" as const },
    { emoji: "🎨", name: "Easel", size: "medium" as const },
    { emoji: "🪴", name: "Plant", size: "small" as const },
    { emoji: "🎮", name: "Gaming", size: "small" as const },
    { emoji: "⚽", name: "Ball", size: "small" as const },
    { emoji: "🎸", name: "Guitar", size: "medium" as const },
    { emoji: "🎪", name: "Tent", size: "large" as const },
    { emoji: "🏀", name: "Hoop", size: "medium" as const },
    { emoji: "🎯", name: "Target", size: "small" as const },
    { emoji: "📺", name: "TV", size: "medium" as const },
  ];

  const colorThemes = [
    { name: "Peachy Dream", walls: "#FFE0B2", floor: "#D7CCC8", lighting: "#FFF9C4" },
    { name: "Ocean Breeze", walls: "#B3E5FC", floor: "#90CAF9", lighting: "#E1F5FE" },
    { name: "Forest Magic", walls: "#C8E6C9", floor: "#A5D6A7", lighting: "#E8F5E9" },
    { name: "Purple Paradise", walls: "#E1BEE7", floor: "#CE93D8", lighting: "#F3E5F5" },
    { name: "Bubble Gum", walls: "#FFB3D9", floor: "#F48FB1", lighting: "#FCE4EC" },
    { name: "Sunshine", walls: "#FFF9C4", floor: "#FFF59D", lighting: "#FFFDE7" },
  ];

  const addFurniture = (emoji: string, name: string, size: "small" | "medium" | "large") => {
    const newItem: FurnitureItem = {
      id: Date.now().toString(),
      emoji,
      name,
      x: 50 + Math.random() * 20,
      y: 50 + Math.random() * 20,
      size,
    };
    setFurnitureItems([...furnitureItems, newItem]);
  };

  const removeFurniture = (id: string) => {
    setFurnitureItems(furnitureItems.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    setShowSaveAnimation(true);
    setTimeout(() => setShowSaveAnimation(false), 3000);
  };

  const getSizeStyle = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "text-3xl";
      case "medium":
        return "text-4xl";
      case "large":
        return "text-5xl";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F8] via-[#F0F8FF] to-[#FFF9C4] relative overflow-hidden pb-12">
      {/* Floating doodles */}
      {[...Array(20)].map((_, i) => (
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
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
          }}
        >
          {["✨", "⭐", "☁️", "🌟", "💫", "🎨"][i % 6]}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg"
            style={{ fontWeight: 600 }}
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </motion.button>

          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl text-center"
            style={{ fontWeight: 800, color: "#6B4BA0" }}
          >
            🏠 Decorate Your Room! 🎨
          </motion.h1>

          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#FFD700] text-white rounded-full shadow-2xl"
            style={{ fontWeight: 700 }}
          >
            <Save size={24} />
            Save Room! ✨
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Isometric Room Preview - Large */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            style={{ border: "8px solid #FFB3D9", minHeight: "700px" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Home size={28} color="#FF6B9D" />
              <h2 className="text-3xl" style={{ fontWeight: 700, color: "#6B4BA0" }}>
                Your Magical Room 🌟
              </h2>
            </div>

            {/* 3D Isometric Room Container */}
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden" style={{ perspective: "1000px" }}>
              {/* Room walls (isometric view) */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${roomTheme.walls}dd 0%, ${roomTheme.walls} 100%)`,
                  transform: "rotateX(5deg) rotateY(-5deg)",
                  transformStyle: "preserve-3d",
                }}
                animate={{ backgroundColor: roomTheme.walls }}
                transition={{ duration: 0.5 }}
              >
                {/* Floor */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 opacity-80"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${roomTheme.floor} 30%, ${roomTheme.floor} 100%)`,
                  }}
                />

                {/* Lighting glow */}
                <motion.div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 20%, ${roomTheme.lighting} 0%, transparent 60%)`,
                  }}
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Back wall decorations */}
                <div className="absolute top-12 left-12">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 bg-[#B3E5FC] rounded-xl border-4 border-white shadow-lg flex items-center justify-center text-4xl"
                  >
                    🖼️
                  </motion.div>
                </div>

                <div className="absolute top-12 right-12">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-6xl"
                  >
                    🌟
                  </motion.div>
                </div>

                {/* Window with view */}
                <div className="absolute top-8 right-32 w-32 h-32 bg-[#87CEEB] rounded-2xl border-4 border-white shadow-xl overflow-hidden">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-2 right-2 text-3xl"
                  >
                    ☀️
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, 40, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute bottom-4 left-2 text-2xl"
                  >
                    ☁️
                  </motion.div>
                </div>

                {/* Avatar in room */}
                <motion.div
                  className="absolute"
                  style={{ left: "30%", bottom: "30%", transform: "translate(-50%, 50%)" }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  drag
                  dragMomentum={false}
                  dragElastic={0.1}
                >
                  <div className="relative">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-2xl bg-white"
                      style={{ border: "4px solid #FFB3D9" }}
                    >
                      {selectedAvatar}
                    </div>
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-3xl">{selectedHair}</div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-2xl">{selectedOutfit}</div>
                    <div className="absolute -right-4 top-0 text-2xl">{selectedAccessory}</div>
                  </div>
                </motion.div>

                {/* Micropet */}
                <motion.div
                  className="absolute"
                  style={{ left: "20%", bottom: "25%" }}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  drag
                  dragMomentum={false}
                  dragElastic={0.1}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-xl bg-white"
                    style={{ border: "4px solid #C8E6C9" }}
                  >
                    {selectedPet}
                  </div>
                </motion.div>

                {/* Furniture items - draggable */}
                {furnitureItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="absolute cursor-move group"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    drag
                    dragMomentum={false}
                    dragElastic={0.1}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileDrag={{ scale: 1.2, zIndex: 50 }}
                    onDragEnd={(_, info) => {
                      const rect = info.point;
                      const container = document.querySelector(".relative.w-full.h-\\[600px\\]")?.getBoundingClientRect();
                      if (container) {
                        const x = ((info.point.x - container.left) / container.width) * 100;
                        const y = ((info.point.y - container.top) / container.height) * 100;
                        setFurnitureItems(
                          furnitureItems.map((f) =>
                            f.id === item.id
                              ? {
                                  ...f,
                                  x: Math.max(10, Math.min(90, x)),
                                  y: Math.max(10, Math.min(90, y)),
                                }
                              : f
                          )
                        );
                      }
                    }}
                  >
                    <div className={`${getSizeStyle(item.size)} drop-shadow-2xl relative`}>
                      {item.emoji}
                      {/* Delete button on hover */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFurniture(item.id);
                        }}
                      >
                        ✕
                      </motion.button>
                    </div>
                  </motion.div>
                ))}

                {/* Sparkles effect */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute pointer-events-none"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.4,
                      repeat: Infinity,
                    }}
                  >
                    <Sparkles size={24} color="#FFD700" />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <p className="text-center mt-4 text-lg" style={{ color: "#757575", fontWeight: 600 }}>
              💡 Drag items to rearrange! Click × to remove furniture.
            </p>
          </motion.div>

          {/* Customization Tabs Panel */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Tab Navigation */}
            <div className="bg-white rounded-3xl p-4 shadow-xl" style={{ border: "6px solid #D4BBFF" }}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "avatar", label: "Avatar", emoji: "😊" },
                  { id: "pet", label: "Pet", emoji: "🐰" },
                  { id: "furniture", label: "Furniture", emoji: "🛋️" },
                  { id: "colors", label: "Colors", emoji: "🎨" },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`py-4 px-4 rounded-2xl transition-all ${
                      selectedTab === tab.id
                        ? "bg-gradient-to-r from-[#FF6B9D] to-[#D4BBFF] text-white shadow-lg"
                        : "bg-gray-100 text-gray-600"
                    }`}
                    style={{ fontWeight: 700 }}
                  >
                    <div className="text-2xl mb-1">{tab.emoji}</div>
                    <div className="text-sm">{tab.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {selectedTab === "avatar" && (
                <motion.div
                  key="avatar"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Face */}
                  <div className="bg-white rounded-3xl p-6 shadow-xl" style={{ border: "4px solid #FFE0B2" }}>
                    <h3 className="text-xl mb-4 flex items-center gap-2" style={{ fontWeight: 700, color: "#6B4BA0" }}>
                      <Sparkles size={20} color="#FFB74D" /> Face
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      {["😊", "😎", "🤓", "😄", "🥳", "😇", "🤗", "😺"].map((face) => (
                        <motion.button
                          key={face}
                          whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedAvatar(face)}
                          className={`w-full aspect-square rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                            selectedAvatar === face ? "ring-4 ring-[#FFB74D] ring-offset-2 bg-[#FFF9C4]" : "bg-[#FFF9C4]/50"
                          }`}
                        >
                          {face}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Hair */}
                  <div className="bg-white rounded-3xl p-6 shadow-xl" style={{ border: "4px solid #B3E5FC" }}>
                    <h3 className="text-xl mb-4" style={{ fontWeight: 700, color: "#6B4BA0" }}>
                      💇 Hair Style
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      {hairs.map((hair) => (
                        <motion.button
                          key={hair}
                          whileHover={{ scale: 1.15, y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedHair(hair)}
                          className={`w-full aspect-square rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                            selectedHair === hair ? "ring-4 ring-[#4FC3F7] ring-offset-2 bg-[#E1F5FE]" : "bg-[#E1F5FE]/50"
                          }`}
                        >
                          {hair}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Outfit */}
                  <div className="bg-white rounded-3xl p-6 shadow-xl" style={{ border: "4px solid #FFB3D9" }}>
                    <h3 className="text-xl mb-4" style={{ fontWeight: 700, color: "#6B4BA0" }}>
                      👕 Outfit
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      {outfits.map((outfit) => (
                        <motion.button
                          key={outfit}
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedOutfit(outfit)}
                          className={`w-full aspect-square rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                            selectedOutfit === outfit ? "ring-4 ring-[#F48FB1] ring-offset-2 bg-[#FCE4EC]" : "bg-[#FCE4EC]/50"
                          }`}
                        >
                          {outfit}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Accessories */}
                  <div className="bg-white rounded-3xl p-6 shadow-xl" style={{ border: "4px solid #C8E6C9" }}>
                    <h3 className="text-xl mb-4" style={{ fontWeight: 700, color: "#6B4BA0" }}>
                      🎒 Accessories
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      {accessories.map((acc) => (
                        <motion.button
                          key={acc}
                          whileHover={{ scale: 1.15, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedAccessory(acc)}
                          className={`w-full aspect-square rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                            selectedAccessory === acc ? "ring-4 ring-[#81C784] ring-offset-2 bg-[#E8F5E9]" : "bg-[#E8F5E9]/50"
                          }`}
                        >
                          {acc}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === "pet" && (
                <motion.div
                  key="pet"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl p-6 shadow-xl"
                  style={{ border: "6px solid #C8E6C9" }}
                >
                  <h3 className="text-2xl mb-6" style={{ fontWeight: 700, color: "#6B4BA0" }}>
                    Choose Your Micropet! 🐾
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {pets.map((pet, i) => (
                      <motion.button
                        key={pet.emoji}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1, type: "spring", bounce: 0.6 }}
                        whileHover={{ scale: 1.1, y: -10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedPet(pet.emoji)}
                        className={`relative p-6 rounded-3xl shadow-xl ${
                          selectedPet === pet.emoji ? "ring-6 ring-offset-4" : ""
                        }`}
                        style={{
                          backgroundColor: pet.color + "66",
                          borderWidth: "4px",
                          borderColor: pet.color,
                          ringColor: pet.color,
                        }}
                      >
                        <motion.div
                          className="text-6xl mb-3"
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {pet.emoji}
                        </motion.div>
                        <div style={{ fontWeight: 700, color: "#6B4BA0" }}>{pet.name}</div>

                        {selectedPet === pet.emoji && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                          >
                            <span className="text-white text-xl">✓</span>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedTab === "furniture" && (
                <motion.div
                  key="furniture"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl p-6 shadow-xl"
                  style={{ border: "6px solid #FFE0B2" }}
                >
                  <h3 className="text-2xl mb-4" style={{ fontWeight: 700, color: "#6B4BA0" }}>
                    Add Furniture 🛋️
                  </h3>
                  <p className="text-sm mb-6" style={{ color: "#757575" }}>
                    Click to add items to your room!
                  </p>
                  <div className="grid grid-cols-3 gap-3 max-h-[600px] overflow-y-auto">
                    {availableFurniture.map((item, i) => (
                      <motion.button
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05, type: "spring" }}
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addFurniture(item.emoji, item.name, item.size)}
                        className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF9C4] to-[#FFE0B2] shadow-lg hover:shadow-2xl transition-all"
                        style={{ border: "3px solid #FFB74D" }}
                      >
                        <div className={`${getSizeStyle(item.size)} mb-2`}>{item.emoji}</div>
                        <div className="text-xs" style={{ fontWeight: 600, color: "#6B4BA0" }}>
                          {item.name}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedTab === "colors" && (
                <motion.div
                  key="colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="bg-white rounded-3xl p-6 shadow-xl" style={{ border: "6px solid #E1BEE7" }}>
                    <h3 className="text-2xl mb-6" style={{ fontWeight: 700, color: "#6B4BA0" }}>
                      Color Themes 🎨
                    </h3>
                    <div className="space-y-3">
                      {colorThemes.map((theme, i) => (
                        <motion.button
                          key={i}
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.03, x: 5 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setRoomTheme(theme)}
                          className={`w-full p-4 rounded-2xl shadow-lg flex items-center gap-4 ${
                            roomTheme.walls === theme.walls ? "ring-4 ring-[#BA68C8] ring-offset-2" : ""
                          }`}
                          style={{ backgroundColor: theme.walls }}
                        >
                          <div className="flex gap-2">
                            <div
                              className="w-10 h-10 rounded-full shadow-inner"
                              style={{ backgroundColor: theme.walls }}
                            />
                            <div
                              className="w-10 h-10 rounded-full shadow-inner"
                              style={{ backgroundColor: theme.floor }}
                            />
                            <div
                              className="w-10 h-10 rounded-full shadow-inner"
                              style={{ backgroundColor: theme.lighting }}
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <div style={{ fontWeight: 700, color: "#6B4BA0" }}>{theme.name}</div>
                          </div>
                          {roomTheme.walls === theme.walls && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <span className="text-white">✓</span>
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Save Animation */}
      <AnimatePresence>
        {showSaveAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            {/* Confetti */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: `${10 + Math.random() * 20}px`,
                  height: `${10 + Math.random() * 20}px`,
                  backgroundColor: ["#FF6B9D", "#FFD700", "#B3E5FC", "#C8E6C9", "#E1BEE7"][i % 5],
                  borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  y: [(Math.random() - 0.5) * 800],
                  x: [(Math.random() - 0.5) * 1000],
                  rotate: [0, Math.random() * 720],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2,
                }}
              />
            ))}

            {/* Success message */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="bg-white rounded-3xl p-12 shadow-2xl text-center"
              style={{ border: "8px solid #FFD700" }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-8xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-4xl mb-4" style={{ fontWeight: 800, color: "#6B4BA0" }}>
                Room Saved!
              </h2>
              <p className="text-2xl" style={{ color: "#757575", fontWeight: 600 }}>
                Your magical room looks amazing! ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
