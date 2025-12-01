import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X, Palette, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { generateChildDrawing } from "../utils/childDrawings";

interface ArtGalleryProps {
  onBack: () => void;
}

interface Artwork {
  id: number;
  dataUrl: string;
  timestamp: string;
  title?: string;
}

const generateInitialArtworks = (): Artwork[] => {
  const drawings = [
    { type: 'house', title: 'My House' },
    { type: 'cat', title: 'Cute Cat' },
    { type: 'dog', title: 'Happy Dog' },
    { type: 'family', title: 'My Family' },
    { type: 'tree', title: 'Big Tree' },
    { type: 'sun', title: 'Sunny Day' },
    { type: 'flower', title: 'Pretty Flower' },
    { type: 'butterfly', title: 'Butterfly' },
    { type: 'car', title: 'Fast Car' },
    { type: 'bird', title: 'Colorful Bird' },
    { type: 'fish', title: 'Swimming Fish' },
    { type: 'heart', title: 'Love Heart' },
    { type: 'balloon', title: 'Balloons' },
  ];

  return drawings.map((drawing, index) => ({
    id: 1000001 + index,
    dataUrl: generateChildDrawing(drawing.type),
    timestamp: new Date(Date.now() - (14 - index) * 24 * 60 * 60 * 1000).toISOString(),
    title: drawing.title,
  }));
};

export function ArtGallery({ onBack }: ArtGalleryProps) {
  const { avatar, pet, currentStudent } = useAppContext();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const loadArtworks = () => {
    // Use student-specific key for artworks
    const studentKey = currentStudent ? `artworks_${currentStudent.email}` : "artworks";
    const savedArtworks = JSON.parse(localStorage.getItem(studentKey) || "[]");
    
    // Check if we need to add initial demo artworks for Gamila only
    const hasInitialized = localStorage.getItem(`${studentKey}_initialized`);
    
    if (savedArtworks.length === 0 && !hasInitialized) {
      // Check if this is Gamila - she should have demo artworks
      if (currentStudent?.email === "gamila@gmail.com") {
        const initialArtworks = generateInitialArtworks();
        localStorage.setItem(studentKey, JSON.stringify(initialArtworks));
        localStorage.setItem(`${studentKey}_initialized`, "true");
        setArtworks(initialArtworks);
      } else {
        // New students start with empty gallery
        localStorage.setItem(`${studentKey}_initialized`, "true");
        setArtworks([]);
      }
    } else {
      // Load existing artworks
      setArtworks(savedArtworks);
      
      // Mark as initialized if not already
      if (!hasInitialized) {
        localStorage.setItem(`${studentKey}_initialized`, "true");
      }
    }
  };

  // Load artworks immediately on mount
  useEffect(() => {
    loadArtworks();
    
    // Also reload when component becomes visible (when navigating to this screen)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadArtworks();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentStudent]); // Add currentStudent as dependency

  // Add event listener for storage changes from other components
  useEffect(() => {
    const studentKey = currentStudent ? `artworks_${currentStudent.email}` : "artworks";
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === studentKey || e.key === "artworks") {
        loadArtworks();
      }
    };

    // Also listen for custom events for same-window updates
    const handleArtworkUpdate = () => {
      loadArtworks();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("artworksUpdated", handleArtworkUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("artworksUpdated", handleArtworkUpdate);
    };
  }, [currentStudent]);

  const deleteArtwork = (id: number) => {
    const updatedArtworks = artworks.filter(art => art.id !== id);
    setArtworks(updatedArtworks);
    
    // Use student-specific key for storage
    const studentKey = currentStudent ? `artworks_${currentStudent.email}` : "artworks";
    localStorage.setItem(studentKey, JSON.stringify(updatedArtworks));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("artworksUpdated"));
    
    setShowDeleteConfirm(null);
    if (selectedArtwork?.id === id) {
      setSelectedArtwork(null);
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
            Back to Studio
          </motion.button>

          <div className="flex items-center gap-4">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl"
            >
              {avatar}
            </motion.div>
            <div className="text-center">
              <h1 className="text-3xl" style={{ fontWeight: 700, color: "#4A5568" }}>
                My Art Gallery
              </h1>
              <p style={{ color: "#6B7280" }}>
                {artworks.length} {artworks.length === 1 ? "masterpiece" : "masterpieces"}
              </p>
            </div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl"
            >
              {pet}
            </motion.div>
          </div>

          <div className="w-32" />
        </motion.div>

        {/* Gallery Grid */}
        {artworks.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-16 text-center"
            style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="text-9xl mb-6"
            >
              🎨
            </motion.div>
            <h2 className="text-3xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
              No Artworks Yet!
            </h2>
            <p className="text-xl mb-8" style={{ color: "#6B7280" }}>
              Go to the Art Studio and create your first masterpiece!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="px-8 py-4 rounded-full text-white"
              style={{
                backgroundColor: "#FFD670",
                boxShadow: "0 4px 16px rgba(255, 214, 112, 0.3)",
                fontWeight: 600,
              }}
            >
              Start Creating
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-3xl p-4 group relative"
                style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
              >
                {/* Delete Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-2 right-2 z-10 w-10 h-10 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteConfirm(artwork.id);
                  }}
                  style={{ boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)" }}
                >
                  <Trash2 size={18} color="white" />
                </motion.button>

                <div
                  onClick={() => setSelectedArtwork(artwork)}
                  className="cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative rounded-2xl overflow-hidden mb-3 aspect-square">
                    <img
                      src={artwork.dataUrl}
                      alt={artwork.title || `Artwork ${artwork.id}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* New badge for recent artworks */}
                    {index === 0 && artwork.id > 1000013 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 left-2 px-3 py-1 rounded-full text-white text-xs"
                        style={{ backgroundColor: "#FF9999", fontWeight: 700 }}
                      >
                        NEW! ✨
                      </motion.div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                  </div>

                  {/* Title & Date */}
                  <div className="text-center">
                    {artwork.title && (
                      <div className="text-sm mb-1" style={{ fontWeight: 700, color: "#4A5568" }}>
                        {artwork.title}
                      </div>
                    )}
                    <div className="text-xs" style={{ color: "#6B7280", fontWeight: 600 }}>
                      {formatDate(artwork.timestamp)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowDeleteConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-8 max-w-md w-full mx-4"
                style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)" }}
              >
                <div className="text-6xl text-center mb-4">🗑️</div>
                <h2 className="text-2xl mb-4 text-center" style={{ fontWeight: 700, color: "#4A5568" }}>
                  Delete this artwork?
                </h2>
                <p className="text-center mb-6" style={{ color: "#6B7280" }}>
                  This action cannot be undone. Your artwork will be deleted forever.
                </p>
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 py-4 rounded-2xl"
                    style={{
                      backgroundColor: "#F3F4F6",
                      fontWeight: 600,
                      color: "#4A5568",
                    }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => deleteArtwork(showDeleteConfirm)}
                    className="flex-1 py-4 rounded-2xl text-white"
                    style={{
                      backgroundColor: "#EF4444",
                      boxShadow: "0 4px 16px rgba(239, 68, 68, 0.3)",
                      fontWeight: 600,
                    }}
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Large View Modal */}
        <AnimatePresence>
          {selectedArtwork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
              onClick={() => setSelectedArtwork(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-8 max-w-4xl w-full relative"
                style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)" }}
              >
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedArtwork(null)}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#FFE8D6] flex items-center justify-center"
                >
                  <X size={24} color="#4A5568" />
                </motion.button>

                {/* Delete Button in Modal */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedArtwork(null);
                    setShowDeleteConfirm(selectedArtwork.id);
                  }}
                  className="absolute top-4 right-20 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center"
                  style={{ boxShadow: "0 4px 16px rgba(239, 68, 68, 0.3)" }}
                >
                  <Trash2 size={24} color="white" />
                </motion.button>

                {/* Artwork */}
                <div className="mb-6">
                  <h2 className="text-3xl mb-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                    {selectedArtwork.title || "Your Masterpiece"}
                  </h2>
                  <p style={{ color: "#6B7280" }}>
                    Created on {formatDate(selectedArtwork.timestamp)}
                  </p>
                </div>

                <div className="rounded-2xl overflow-hidden" style={{ maxHeight: "70vh" }}>
                  <img
                    src={selectedArtwork.dataUrl}
                    alt="Selected artwork"
                    className="w-full h-auto"
                  />
                </div>

                {/* Appreciation message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 p-4 rounded-2xl flex items-center gap-4"
                  style={{ backgroundColor: "#FFE5A0" }}
                >
                  <div className="text-3xl">{pet}</div>
                  <div>
                    <p style={{ fontWeight: 600, color: "#4A5568" }}>
                      Amazing work! This is so creative! 🌟
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}