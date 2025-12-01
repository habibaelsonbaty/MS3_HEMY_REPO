import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, User, Key, CheckCircle, Mail, Lock, UserCircle, AlertCircle, Upload } from "lucide-react";
import { useParentContext } from "../context/ParentContext";
import { useAppContext } from "../context/AppContext";

interface ParentManageStudentProps {
  onBack: () => void;
}

export function ParentManageStudent({ onBack }: ParentManageStudentProps) {
  const { currentParent, linkStudent, updateParentInfo } = useParentContext();
  const { userName, userRole, setUserInfo, avatar, setAvatar, pet, setPet } = useAppContext();
  
  // Tab state
  const [activeTab, setActiveTab] = useState<"student" | "parent">("student");
  
  // Student states
  const [editMode, setEditMode] = useState<string | null>(null);
  const [newName, setNewName] = useState(userName);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showParentSuccess, setShowParentSuccess] = useState(false);

  // Parent states
  const [parentName, setParentName] = useState(currentParent?.name || "Sarah Johnson");
  const [parentEmail, setParentEmail] = useState(currentParent?.email || "Hazem@gmail.com");
  const [parentPassword, setParentPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  
  // Parent profile picture state
  const [parentProfilePic, setParentProfilePic] = useState<string>(() => {
    return localStorage.getItem(`parentProfilePic_${currentParent?.id}`) || "";
  });
  
  // Delete student states
  const [showDeleteStudentPopup, setShowDeleteStudentPopup] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  // Avatar and pet options
  const avatarOptions = ["👦", "👧", "🧒", "👨", "👩", "🧑", "👶", "🧔"];
  const petOptions = ["🐱", "🐶", "🐰", "🐼", "🦊", "🐻", "🐨", "🐯"];

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setParentProfilePic(result);
        if (currentParent?.id) {
          localStorage.setItem(`parentProfilePic_${currentParent.id}`, result);
        }
        showParentSuccessMessage();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = () => {
    setUserInfo(newName, userRole);
    setEditMode(null);
    showSuccessMessage();
  };

  const handleSelectAvatar = (emoji: string) => {
    setAvatar(emoji);
    setEditMode(null);
    showSuccessMessage();
  };

  const handleSelectPet = (emoji: string) => {
    setPet(emoji);
    setEditMode(null);
    showSuccessMessage();
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const showParentSuccessMessage = () => {
    setShowParentSuccess(true);
    setTimeout(() => setShowParentSuccess(false), 2000);
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

  // Handle parent settings save
  const handleSaveParentSettings = () => {
    const isEmailValid = validateEmail(parentEmail);
    const isPasswordValid = validatePassword(parentPassword);
    
    if (isEmailValid && isPasswordValid) {
      // Save parent settings and update hardcoded values
      updateParentInfo(parentName, parentEmail, parentPassword || undefined);
      showParentSuccessMessage();
      // Clear password field after save
      setParentPassword("");
    }
  };
  
  // Handle delete student
  const handleDeleteStudent = (studentCode: string) => {
    setStudentToDelete(studentCode);
    setShowDeleteStudentPopup(true);
  };
  
  const confirmDeleteStudent = () => {
    if (studentToDelete && currentParent) {
      // Remove student from parent's linked students
      const parents = JSON.parse(localStorage.getItem("parentAccounts") || "[]");
      const updatedParents = parents.map((p: any) => {
        if (p.id === currentParent.id) {
          return {
            ...p,
            linkedStudents: p.linkedStudents.filter((code: string) => code !== studentToDelete)
          };
        }
        return p;
      });
      localStorage.setItem("parentAccounts", JSON.stringify(updatedParents));
      
      // Delete student account from studentAccounts
      const students = JSON.parse(localStorage.getItem("studentAccounts") || "[]");
      const studentToRemove = students.find((s: any) => s.studentCode === studentToDelete);
      
      if (studentToRemove) {
        const updatedStudents = students.filter((s: any) => s.studentCode !== studentToDelete);
        localStorage.setItem("studentAccounts", JSON.stringify(updatedStudents));
        
        // Delete student data
        localStorage.removeItem(`studentData_${studentToRemove.id}`);
      }
      
      // Update current parent state
      if (currentParent) {
        const updatedParent = {
          ...currentParent,
          linkedStudents: currentParent.linkedStudents.filter(code => code !== studentToDelete)
        };
        localStorage.setItem("currentParent", JSON.stringify(updatedParent));
      }
      
      setShowDeleteStudentPopup(false);
      setStudentToDelete(null);
      showSuccessMessage();
      
      // Reload page to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  // Generate student code (mock)
  const studentCode = `STU-${userName.toUpperCase().replace(/\s/g, "")}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

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
              Manage {activeTab === "student" ? "Student" : "Parent"} Account
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
          {showParentSuccess && (
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("student")}
            className={`px-6 py-3 rounded-2xl ${activeTab === "student" ? "bg-[#C9B6E4] text-white" : "bg-[#F3F4F6] text-[#6B7280]"}`}
            style={{ fontWeight: 600 }}
          >
            Student
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("parent")}
            className={`px-6 py-3 rounded-2xl ${activeTab === "parent" ? "bg-[#C9B6E4] text-white" : "bg-[#F3F4F6] text-[#6B7280]"}`}
            style={{ fontWeight: 600 }}
          >
            Parent
          </motion.button>
        </div>

        {/* Tab Content with Smooth Transitions */}
        <AnimatePresence mode="wait">
          {activeTab === "student" ? (
            <motion.div
              key="student-tab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Current Student */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl p-8 mb-6"
                style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
              >
                <h2 className="text-2xl mb-6" style={{ fontWeight: 700, color: "#4A5568" }}>
                  Current Student
                </h2>

                <div className="flex items-center gap-4 p-6 rounded-2xl" style={{ backgroundColor: "#F9FAFB" }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A8D8EA] to-[#87CEEB] flex items-center justify-center text-3xl"
                      style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                    >
                      {avatar}
                    </div>
                    <div
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFE5A0] to-[#FFD670] flex items-center justify-center text-2xl"
                      style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                    >
                      {pet}
                    </div>
                  </div>
                  <div>
                    <p className="text-xl mb-1" style={{ fontWeight: 700, color: "#4A5568" }}>
                      {userName}
                    </p>
                    <p className="text-sm" style={{ color: "#9CA3AF" }}>Grade 4 Student</p>
                  </div>
                </div>
              </motion.div>

              {/* Change Student Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-3xl p-8 mb-6"
                style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <User size={28} color="#A8D8EA" />
                  <h2 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
                    Change Student Name
                  </h2>
                </div>

                {editMode === "name" ? (
                  <div>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none mb-4"
                      style={{ fontWeight: 600 }}
                    />
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSaveName}
                        className="px-6 py-3 rounded-2xl text-white"
                        style={{ backgroundColor: "#C9B6E4", fontWeight: 600 }}
                      >
                        Save
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setEditMode(null);
                          setNewName(userName);
                        }}
                        className="px-6 py-3 rounded-2xl"
                        style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p style={{ fontWeight: 600, color: "#6B7280" }}>Current Name: {userName}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditMode("name")}
                      className="px-6 py-3 rounded-2xl"
                      style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                    >
                      Edit
                    </motion.button>
                  </div>
                )}
              </motion.div>

              {/* Change Avatar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 mb-6"
                style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl">{avatar}</div>
                  <h2 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
                    Change Avatar
                  </h2>
                </div>

                {editMode === "avatar" ? (
                  <div>
                    <div className="grid grid-cols-8 gap-3 mb-4">
                      {avatarOptions.map((option) => (
                        <motion.button
                          key={option}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSelectAvatar(option)}
                          className="aspect-square rounded-2xl flex items-center justify-center text-4xl"
                          style={{
                            backgroundColor: option === avatar ? "#C9B6E4" : "#F3F4F6"
                          }}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditMode(null)}
                      className="px-6 py-3 rounded-2xl"
                      style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p style={{ fontWeight: 600, color: "#6B7280" }}>Click to select a new avatar</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditMode("avatar")}
                      className="px-6 py-3 rounded-2xl"
                      style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                    >
                      Change
                    </motion.button>
                  </div>
                )}
              </motion.div>

              {/* Change Micropet */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white rounded-3xl p-8 mb-6"
                style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl">{pet}</div>
                  <h2 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
                    Change Micropet
                  </h2>
                </div>

                {editMode === "pet" ? (
                  <div>
                    <div className="grid grid-cols-8 gap-3 mb-4">
                      {petOptions.map((option) => (
                        <motion.button
                          key={option}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSelectPet(option)}
                          className="aspect-square rounded-2xl flex items-center justify-center text-4xl"
                          style={{
                            backgroundColor: option === pet ? "#FFD670" : "#F3F4F6"
                          }}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditMode(null)}
                      className="px-6 py-3 rounded-2xl"
                      style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p style={{ fontWeight: 600, color: "#6B7280" }}>Click to select a new micropet</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditMode("pet")}
                      className="px-6 py-3 rounded-2xl"
                      style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                    >
                      Change
                    </motion.button>
                  </div>
                )}
              </motion.div>

              {/* Linked Student */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-8 mb-6"
                style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <UserCircle size={28} color="#FFD670" />
                  <h2 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
                    Linked Student
                  </h2>
                </div>

                {currentParent && currentParent.linkedStudents.length > 0 ? (
                  <div className="space-y-3">
                    {currentParent.linkedStudents.map((studentId, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-2xl flex items-center gap-3"
                        style={{ backgroundColor: "#F9FAFB" }}
                      >
                        <CheckCircle size={20} color="#10B981" />
                        <span className="text-lg" style={{ fontWeight: 600, color: "#4A5568" }}>{studentId}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "#9CA3AF", fontWeight: 600 }}>No student linked yet.</p>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="parent-tab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Parent Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl p-8 mb-6"
                style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
              >
                <h2 className="text-2xl mb-6" style={{ fontWeight: 700, color: "#4A5568" }}>
                  Parent Profile
                </h2>

                <div className="flex items-center gap-6 p-6 rounded-2xl" style={{ backgroundColor: "#F9FAFB" }}>
                  {/* Profile Picture */}
                  <div className="relative">
                    {parentProfilePic ? (
                      <div
                        className="w-24 h-24 rounded-2xl overflow-hidden"
                        style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                      >
                        <img 
                          src={parentProfilePic} 
                          alt="Parent Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#C9B6E4] to-[#A89FD1] flex items-center justify-center text-5xl"
                        style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                      >
                        👤
                      </div>
                    )}
                    {/* Upload overlay */}
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-2xl">
                      <Upload size={32} color="#FFF" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  <div>
                    <p className="text-2xl mb-1" style={{ fontWeight: 700, color: "#4A5568" }}>
                      {parentName}
                    </p>
                    <p className="text-sm mb-2" style={{ color: "#9CA3AF" }}>Parent Account</p>
                    <p className="text-sm" style={{ color: "#6B7280", fontWeight: 600 }}>
                      {parentEmail}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#C9B6E4]/10 to-[#C9B6E4]/5">
                  <p className="text-sm flex items-center gap-2" style={{ color: "#6B7280", fontWeight: 600 }}>
                    <Upload size={16} />
                    Click on the profile picture to upload a new image from your computer
                  </p>
                </div>
              </motion.div>

              {/* Change Parent Name */}
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
                    Change Parent Name
                  </h2>
                </div>

                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none mb-4"
                  style={{ fontWeight: 600 }}
                />
              </motion.div>

              {/* Change Parent Email */}
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
                    Change Parent Email
                  </h2>
                </div>

                <input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none mb-4"
                  style={{ fontWeight: 600 }}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </motion.div>

              {/* Change Parent Password */}
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
                    Change Parent Password
                  </h2>
                </div>

                <input
                  type="password"
                  value={parentPassword}
                  onChange={(e) => setParentPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none mb-4"
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
                      {showParentSuccess ? "Settings Saved Successfully!" : "Save Parent Settings"}
                    </h2>
                    <p className="text-white/80">
                      {showParentSuccess 
                        ? "Your account information has been updated"
                        : "Update your parent account information"}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveParentSettings}
                  className="px-12 py-5 rounded-2xl text-2xl bg-white"
                  style={{ 
                    fontWeight: 700, 
                    color: "#C9B6E4",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)"
                  }}
                >
                  {showParentSuccess ? "✓ Saved" : "Save Changes"}
                </motion.button>
              </motion.div>

              {/* Delete Account Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6 bg-white rounded-3xl p-8"
                style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle size={28} color="#EF4444" />
                  <h2 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
                    Delete Account
                  </h2>
                </div>
                
                <p className="mb-4" style={{ color: "#6B7280", fontWeight: 600 }}>
                  Permanently delete your parent account and all associated data. This action cannot be undone.
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
            </motion.div>
          )}
        </AnimatePresence>

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