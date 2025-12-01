import { motion } from "motion/react";
import { ArrowLeft, Trash2, Save, Palette, Pencil } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { SaveArtworkModal } from "./SaveArtworkModal";

interface ArtWhiteboardProps {
  onBack: () => void;
  onViewGallery: () => void;
}

export function ArtWhiteboard({ onBack, onViewGallery }: ArtWhiteboardProps) {
  const { avatar, pet, unlockBadge, currentStudent } = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [currentColor, setCurrentColor] = useState("#4A5568");
  const [showSaveAnimation, setShowSaveAnimation] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const colors = [
    "#4A5568", // Dark gray
    "#FF6B6B", // Red
    "#FFD93D", // Yellow
    "#6BCF7F", // Green
    "#4D96FF", // Blue
    "#C77DFF", // Purple
    "#FF8C42", // Orange
    "#F72585", // Pink
    "#8B5CF6", // Violet
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EC4899", // Rose
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Fill with white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== "mousedown") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  const handleSaveWithTitle = (title: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    
    // Use student-specific key for storage
    const studentKey = currentStudent ? `artworks_${currentStudent.email}` : "artworks";
    const savedArtworks = JSON.parse(localStorage.getItem(studentKey) || "[]");
    savedArtworks.unshift({
      id: Date.now(),
      dataUrl,
      timestamp: new Date().toISOString(),
      title: title,
    });
    localStorage.setItem(studentKey, JSON.stringify(savedArtworks));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("artworksUpdated"));

    // Check if artist badge should be unlocked (10 art pieces)
    if (savedArtworks.length >= 10) {
      unlockBadge("artist");
    }

    setShowSaveModal(false);
    setShowSaveAnimation(true);
    // Redirect to gallery after showing animation
    setTimeout(() => {
      setShowSaveAnimation(false);
      onViewGallery();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] pb-12">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
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
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl"
            >
              {avatar}
            </motion.div>
            <div>
              <h1 className="text-3xl" style={{ fontWeight: 700, color: "#4A5568" }}>
                Art Studio
              </h1>
              <p style={{ color: "#6B7280" }}>Create something amazing!</p>
            </div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl"
            >
              {pet}
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewGallery}
            className="px-6 py-3 rounded-full text-white flex items-center gap-2"
            style={{
              backgroundColor: "#C9B6E4",
              boxShadow: "0 4px 16px rgba(201, 182, 228, 0.3)",
              fontWeight: 600,
            }}
          >
            <Palette size={20} />
            My Gallery
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tools Sidebar */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            {/* Brush Size */}
            <div
              className="bg-white rounded-3xl p-6"
              style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Pencil size={20} color="#4A5568" />
                <h3 className="text-xl" style={{ fontWeight: 700, color: "#4A5568" }}>
                  Brush Size
                </h3>
              </div>

              <input
                type="range"
                min="1"
                max="30"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full mb-3"
                style={{ accentColor: "#FFD670" }}
              />

              <div className="flex items-center justify-center">
                <div
                  className="rounded-full"
                  style={{
                    width: `${brushSize * 2}px`,
                    height: `${brushSize * 2}px`,
                    backgroundColor: currentColor,
                  }}
                />
              </div>
            </div>

            {/* Color Palette */}
            <div
              className="bg-white rounded-3xl p-6"
              style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Palette size={20} color="#4A5568" />
                <h3 className="text-xl" style={{ fontWeight: 700, color: "#4A5568" }}>
                  Colors
                </h3>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {colors.map((color) => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentColor(color)}
                    className={`w-12 h-12 rounded-xl ${
                      currentColor === color ? "ring-4 ring-offset-2" : ""
                    }`}
                    style={{
                      backgroundColor: color,
                      ringColor: color,
                    }}
                  />
                ))}
              </div>

              {/* Eraser */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentColor("#FFFFFF")}
                className={`w-full mt-4 py-3 rounded-xl ${
                  currentColor === "#FFFFFF" ? "ring-4 ring-offset-2 ring-gray-300" : ""
                }`}
                style={{
                  backgroundColor: "#F8F9FA",
                  fontWeight: 600,
                  color: "#4A5568",
                }}
              >
                🧹 Eraser
              </motion.button>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearCanvas}
                className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-white"
                style={{
                  backgroundColor: "#FF9999",
                  boxShadow: "0 4px 16px rgba(255, 153, 153, 0.3)",
                  fontWeight: 600,
                }}
              >
                <Trash2 size={20} />
                Clear Canvas
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveClick}
                className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-white"
                style={{
                  backgroundColor: "#8BC9B0",
                  boxShadow: "0 4px 16px rgba(139, 201, 176, 0.3)",
                  fontWeight: 600,
                }}
              >
                <Save size={20} />
                Save Artwork
              </motion.button>
            </div>
          </motion.div>

          {/* Canvas Area */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="lg:col-span-3 bg-white rounded-3xl p-6"
            style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
          >
            <h3 className="text-2xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
              Your Canvas
            </h3>

            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onMouseLeave={stopDrawing}
              className="w-full rounded-2xl cursor-crosshair"
              style={{
                height: "600px",
                backgroundColor: "#FFFFFF",
                boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.06)",
              }}
            />

            <p className="mt-4 text-center" style={{ color: "#6B7280" }}>
              🎨 Click and drag to draw! Use the tools on the left to customize your artwork.
            </p>
          </motion.div>
        </div>

        {/* Save Animation */}
        {showSaveAnimation && (
          <motion.div
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-8 py-6 rounded-2xl flex items-center gap-4 bg-white"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="text-4xl">🎨</div>
            <div>
              <div className="text-xl" style={{ fontWeight: 700, color: "#4A5568" }}>
                Artwork Saved!
              </div>
              <div style={{ color: "#6B7280" }}>Check your gallery to see it!</div>
            </div>
          </motion.div>
        )}

        {/* Save Artwork Modal */}
        <SaveArtworkModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          onSave={handleSaveWithTitle}
        />
      </div>
    </div>
  );
}