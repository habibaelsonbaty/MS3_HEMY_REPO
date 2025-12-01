import { motion, AnimatePresence } from "motion/react";
import { X, Save } from "lucide-react";
import { useState } from "react";

interface SaveArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
}

export function SaveArtworkModal({ isOpen, onClose, onSave }: SaveArtworkModalProps) {
  const [artworkTitle, setArtworkTitle] = useState("");

  const handleSave = () => {
    if (artworkTitle.trim()) {
      onSave(artworkTitle.trim());
      setArtworkTitle("");
    }
  };

  const handleCancel = () => {
    setArtworkTitle("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="bg-white rounded-3xl p-8 max-w-md w-full"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "#FFE5A0" }}
                  >
                    <Save size={24} color="#E8914E" />
                  </div>
                  <h2 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
                    Name Your Artwork
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancel}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#F3F4F6" }}
                >
                  <X size={20} color="#6B7280" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="mb-4" style={{ color: "#6B7280", fontWeight: 500 }}>
                  Give your masterpiece a special name! 🎨
                </p>

                <div className="mb-2">
                  <label
                    className="block mb-2 text-sm"
                    style={{ fontWeight: 600, color: "#4A5568" }}
                  >
                    Artwork Title
                  </label>
                  <input
                    type="text"
                    value={artworkTitle}
                    onChange={(e) => setArtworkTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && artworkTitle.trim()) {
                        handleSave();
                      }
                    }}
                    placeholder="e.g., Rainbow Sunset, Happy Cat, My Family..."
                    className="w-full px-4 py-4 rounded-2xl border-2 outline-none transition-all"
                    style={{
                      borderColor: artworkTitle ? "#FFE5A0" : "#E5E7EB",
                      backgroundColor: "#FAFAFA",
                      fontWeight: 600,
                      color: "#4A5568",
                    }}
                    autoFocus
                    maxLength={50}
                  />
                </div>

                <p className="text-xs" style={{ color: "#9CA3AF", fontWeight: 500 }}>
                  {artworkTitle.length}/50 characters
                </p>
              </div>

              {/* Suggestions */}
              <div className="mb-6">
                <p className="text-sm mb-2" style={{ fontWeight: 600, color: "#6B7280" }}>
                  💡 Suggestions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["My Masterpiece", "Happy Day", "Colorful Dream", "Art Time"].map(
                    (suggestion) => (
                      <motion.button
                        key={suggestion}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setArtworkTitle(suggestion)}
                        className="px-3 py-2 rounded-xl text-sm"
                        style={{
                          backgroundColor: "#F9FAFB",
                          border: "1px solid #E5E7EB",
                          color: "#6B7280",
                          fontWeight: 600,
                        }}
                      >
                        {suggestion}
                      </motion.button>
                    )
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="flex-1 py-4 rounded-2xl"
                  style={{
                    backgroundColor: "#F3F4F6",
                    fontWeight: 600,
                    color: "#6B7280",
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: artworkTitle.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: artworkTitle.trim() ? 0.98 : 1 }}
                  onClick={handleSave}
                  disabled={!artworkTitle.trim()}
                  className="flex-1 py-4 rounded-2xl text-white flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: artworkTitle.trim() ? "#8BC9B0" : "#D1D5DB",
                    boxShadow: artworkTitle.trim()
                      ? "0 4px 20px rgba(139, 201, 176, 0.3)"
                      : "none",
                    fontWeight: 700,
                    cursor: artworkTitle.trim() ? "pointer" : "not-allowed",
                  }}
                >
                  <Save size={20} />
                  Save Artwork
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
