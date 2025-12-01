import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle, Mail, Lock, UserCircle, Trash2, Upload } from "lucide-react";
import { useTeacherContext } from "../context/TeacherContext";

interface TeacherManageAccountProps {
  onBack: () => void;
}

export function TeacherManageAccount({ onBack }: TeacherManageAccountProps) {
  const { currentTeacher, updateTeacherInfo } = useTeacherContext();
  
  const [teacherName, setTeacherName] = useState(currentTeacher?.name || "");
  const [teacherEmail, setTeacherEmail] = useState(currentTeacher?.email || "");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // Teacher profile picture state
  const [teacherProfilePic, setTeacherProfilePic] = useState<string>(() => {
    return localStorage.getItem(`teacherProfilePic_${currentTeacher?.id}`) || "";
  });

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setTeacherProfilePic(result);
        if (currentTeacher?.id) {
          localStorage.setItem(`teacherProfilePic_${currentTeacher.id}`, result);
        }
        showSuccessMessage();
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Email must follow format name@domain.com");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Validate password strength
  const validatePassword = (password: string): boolean => {
    if (password.length === 0) {
      setPasswordError("");
      return true; // Allow empty password (no change)
    }
    
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return false;
    }
    
    if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }
    
    setPasswordError("");
    return true;
  };

  // Handle save settings
  const handleSaveSettings = () => {
    const isEmailValid = validateEmail(teacherEmail);
    const isPasswordValid = validatePassword(teacherPassword);
    
    if (isEmailValid && isPasswordValid) {
      // Save teacher settings (keep existing subject)
      updateTeacherInfo(teacherName, teacherEmail, currentTeacher?.subject || "Math", teacherPassword || undefined);
      showSuccessMessage();
      // Clear password field after save
      setTeacherPassword("");
    }
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] pb-12">
      <div className="w-full px-12 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl"
              style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }}
            >
              <ArrowLeft size={20} color="#6B7280" />
              <span style={{ fontWeight: 600, color: "#6B7280" }}>Back</span>
            </motion.button>

            <h1 className="text-3xl" style={{ fontWeight: 800, color: "#4A5568" }}>
              Manage Teacher Account
            </h1>
          </div>

          {/* Success Indicator */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-2xl"
            >
              <CheckCircle size={20} color="#10B981" />
              <span style={{ fontWeight: 600, color: "#10B981" }}>Saved!</span>
            </motion.div>
          )}
        </motion.div>

        {/* Teacher Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 mb-6"
          style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
        >
          <h2 className="text-2xl mb-6" style={{ fontWeight: 700, color: "#4A5568" }}>
            Teacher Profile
          </h2>

          <div className="flex items-center gap-6 p-6 rounded-2xl" style={{ backgroundColor: "#F9FAFB" }}>
            {/* Profile Picture */}
            <div className="relative">
              {teacherProfilePic ? (
                <div
                  className="w-24 h-24 rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                >
                  <img 
                    src={teacherProfilePic} 
                    alt="Teacher Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#A8D8EA] to-[#87CEEB] flex items-center justify-center text-5xl"
                  style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                >
                  👨‍🏫
                </div>
              )}
              {/* Upload overlay */}
              <label
                htmlFor="teacher-profile-upload"
                className="absolute inset-0 cursor-pointer rounded-2xl hover:bg-black/10 transition-all flex items-center justify-center group"
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full p-2">
                  <Upload size={20} color="#FFFFFF" />
                </div>
                <input
                  id="teacher-profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <div>
              <p className="text-2xl mb-1" style={{ fontWeight: 700, color: "#4A5568" }}>
                {currentTeacher?.name || "Teacher"}
              </p>
              <p className="text-sm mb-2" style={{ color: "#9CA3AF" }}>Teacher Account</p>
              <p className="text-sm" style={{ color: "#6B7280", fontWeight: 600 }}>
                {currentTeacher?.email}
              </p>
              <p className="text-sm" style={{ color: "#A8D8EA", fontWeight: 600 }}>
                {currentTeacher?.subject || "Math"} Teacher
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#A8D8EA]/10 to-[#A8D8EA]/5">
            <p className="text-sm flex items-center gap-2" style={{ color: "#6B7280", fontWeight: 600 }}>
              <Upload size={16} />
              Click on the profile picture to upload a new image from your computer
            </p>
          </div>
        </motion.div>

        {/* Change Teacher Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl p-8 mb-6"
          style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <UserCircle size={28} color="#A8D8EA" />
            <h2 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
              Change Teacher Name
            </h2>
          </div>

          <input
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none"
            style={{ fontWeight: 600 }}
          />
        </motion.div>

        {/* Change Teacher Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 mb-6"
          style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Mail size={28} color="#A8D8EA" />
            <h2 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
              Change Teacher Email
            </h2>
          </div>

          <input
            type="email"
            value={teacherEmail}
            onChange={(e) => setTeacherEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none mb-2"
            style={{ fontWeight: 600 }}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </motion.div>

        {/* Change Teacher Password */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-3xl p-8 mb-6"
          style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock size={28} color="#A8D8EA" />
            <h2 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
              Change Teacher Password
            </h2>
          </div>

          <input
            type="password"
            value={teacherPassword}
            onChange={(e) => setTeacherPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none mb-2"
            style={{ fontWeight: 600 }}
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#C9B6E4] to-[#A89FD1] rounded-3xl p-8 flex items-center justify-between"
          style={{ boxShadow: "0 8px 32px rgba(201, 182, 228, 0.4)" }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <CheckCircle size={32} color="#FFFFFF" />
            </div>
            <div>
              <h2 className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>
                {showSuccess ? "Settings Saved Successfully!" : "Save Teacher Settings"}
              </h2>
              <p className="text-white/80">
                {showSuccess 
                  ? "Your account information has been updated"
                  : "Update your teacher account information"}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveSettings}
            className="px-8 py-4 bg-white rounded-2xl text-[#C9B6E4]"
            style={{ fontWeight: 700 }}
          >
            Save Changes
          </motion.button>
        </motion.div>

        {/* Delete Account Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-white rounded-3xl p-8"
          style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Trash2 size={28} color="#EF4444" />
            <h2 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
              Delete Account
            </h2>
          </div>
          
          <p className="mb-4" style={{ color: "#6B7280", fontWeight: 600 }}>
            Permanently delete your teacher account and all associated data. This action cannot be undone.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDeletePopup(true)}
            className="px-6 py-3 rounded-2xl text-white"
            style={{ backgroundColor: "#EF4444", fontWeight: 600 }}
          >
            Delete Account
          </motion.button>
        </motion.div>

        {/* Delete Confirmation Popup */}
        <AnimatePresence>
          {showDeletePopup && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setShowDeletePopup(false)}
              />
              
              {/* Popup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 z-50 w-full max-w-md"
                style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h2 className="text-2xl mb-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                    Delete Account?
                  </h2>
                  <p style={{ color: "#9CA3AF", fontWeight: 600 }}>
                    This action is permanent and cannot be undone. All your data will be permanently deleted.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeletePopup(false)}
                    className="flex-1 px-6 py-3 rounded-2xl"
                    style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      alert("Account deleted. Redirecting to home...");
                      onBack();
                    }}
                    className="flex-1 px-6 py-3 rounded-2xl text-white"
                    style={{ backgroundColor: "#EF4444", fontWeight: 600 }}
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}