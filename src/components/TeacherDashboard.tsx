import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LogOut,
  Upload,
  Users,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Send,
  BookOpen,
  Award,
  X,
  Mail,
  Calendar,
  Target,
  Settings,
  Flame,
  Plus
} from "lucide-react";
import { useTeacherContext, LearningStyle, StudentInfo } from "../context/TeacherContext";

interface TeacherDashboardProps {
  onLogout: () => void;
  onManageAccount: () => void;
}

export function TeacherDashboard({ onLogout, onManageAccount }: TeacherDashboardProps) {
  const {
    currentTeacher,
    students,
    uploadedLessons,
    uploadLesson,
    messages,
    sendMessage,
    replyToMessage,
    markAsRead
  } = useTeacherContext();

  const [activeTab, setActiveTab] = useState<"overview" | "upload" | "messages" | "analytics">("overview");
  const [selectedStudent, setSelectedStudent] = useState<StudentInfo | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isHoveringLogout, setIsHoveringLogout] = useState(false);

  // Upload lesson state
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonStyle, setLessonStyle] = useState<LearningStyle>("Visual");
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [selectedAudioFile, setSelectedAudioFile] = useState<File | null>(null);
  const [selectedInteractiveFile, setSelectedInteractiveFile] = useState<File | null>(null);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);

  // Message state
  const [newMessageTo, setNewMessageTo] = useState("");
  const [newMessageSubject, setNewMessageSubject] = useState("");
  const [newMessageBody, setNewMessageBody] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showNewMessagePopup, setShowNewMessagePopup] = useState(false);
  const [messageFilter, setMessageFilter] = useState<"all" | "unread" | "sent">("all");

  const handleVideoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'mp4') {
        setSelectedVideoFile(file);
      } else {
        alert('Please upload a valid MP4 video file');
        e.target.value = '';
      }
    }
  };

  const handleAudioFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'mp3') {
        setSelectedAudioFile(file);
      } else {
        alert('Please upload a valid MP3 audio file');
        e.target.value = '';
      }
    }
  };

  const handleInteractiveFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'html' || ext === 'htm') {
        setSelectedInteractiveFile(file);
      } else {
        alert('Please upload a valid HTML5 file');
        e.target.value = '';
      }
    }
  };

  const getFileType = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'PDF';
    if (['mp4', 'mov', 'avi', 'mkv'].includes(ext || '')) return 'Video';
    if (['mp3', 'wav', 'ogg'].includes(ext || '')) return 'Audio';
    return 'File';
  };

  const handleUploadLesson = () => {
    if (!lessonTitle || !lessonDescription) {
      alert("Please fill in lesson title and description");
      return;
    }

    if (!selectedVideoFile || !selectedAudioFile || !selectedInteractiveFile) {
      alert("Please upload all 3 required files:\n- Video file (.mp4)\n- Audio file (.mp3)\n- Interactive file (.html)");
      return;
    }

    // Upload lesson with all three files
    uploadLesson({
      title: lessonTitle,
      description: lessonDescription,
      learningStyle: lessonStyle,
      fileName: `${selectedVideoFile.name}, ${selectedAudioFile.name}, ${selectedInteractiveFile.name}`,
      fileType: 'Multi-mode (Video, Audio, Interactive)'
    });

    // Reset form
    setLessonTitle("");
    setLessonDescription("");
    setLessonStyle("Visual");
    setSelectedVideoFile(null);
    setSelectedAudioFile(null);
    setSelectedInteractiveFile(null);
    
    // Reset file inputs
    const videoInput = document.getElementById('video-upload') as HTMLInputElement;
    const audioInput = document.getElementById('audio-upload') as HTMLInputElement;
    const interactiveInput = document.getElementById('interactive-upload') as HTMLInputElement;
    if (videoInput) videoInput.value = '';
    if (audioInput) audioInput.value = '';
    if (interactiveInput) interactiveInput.value = '';
    
    setShowUploadSuccess(true);
    setTimeout(() => setShowUploadSuccess(false), 3000);
  };

  const handleSendMessage = () => {
    if (!newMessageTo || !newMessageSubject || !newMessageBody) {
      alert("Please fill in all fields");
      return;
    }

    sendMessage(newMessageTo, newMessageSubject, newMessageBody);
    setNewMessageTo("");
    setNewMessageSubject("");
    setNewMessageBody("");
  };

  const handleReply = (messageId: string) => {
    if (!replyText.trim()) return;
    replyToMessage(messageId, replyText);
    setReplyText("");
    setReplyingTo(null);
  };

  const learningStyleColors: Record<LearningStyle, string> = {
    Visual: "#4FA8C5",
    Auditory: "#F5C542",
    Interactive: "#5FB89A"
  };

  // Calculate statistics
  const totalStudents = students.length;
  const avgAttendance = students.length > 0 
    ? students.reduce((acc, s) => acc + s.attendance, 0) / students.length 
    : 0;
  const avgScore = students.length > 0 
    ? students.reduce((acc, s) => acc + s.score, 0) / students.length 
    : 0;
  const totalLessonsCompleted = students.reduce((acc, s) => acc + s.completedLessons, 0);

  const filteredMessages = messages.filter(msg => {
    if (messageFilter === "unread") return !msg.isRead;
    if (messageFilter === "sent") return msg.fromType === "teacher";
    return true; // "all" shows all messages
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] pb-12">
      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md mx-4"
              style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)" }}
            >
              <h2 className="text-2xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
                Are you sure you want to logout?
              </h2>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowLogoutConfirm(false);
                    onLogout();
                  }}
                  className="flex-1 py-3 rounded-2xl text-white"
                  style={{ backgroundColor: "#EF4444", fontWeight: 600 }}
                >
                  Logout
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 rounded-2xl"
                  style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student Detail Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-4xl w-full my-8"
              style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)" }}
            >
              {/* Student Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#A8D8EA] to-[#87CEEB] flex items-center justify-center text-4xl"
                    style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                  >
                    {selectedStudent.avatar}
                  </div>
                  <div>
                    <h2 className="text-3xl mb-1" style={{ fontWeight: 700, color: "#4A5568" }}>
                      {selectedStudent.name}
                    </h2>
                    <p style={{ color: "#9CA3AF", fontWeight: 600 }}>
                      Current Lesson: {selectedStudent.currentLesson}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 rounded-xl"
                  style={{ backgroundColor: "#F3F4F6" }}
                >
                  <X size={24} color="#6B7280" />
                </motion.button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-[#4FA8C5] to-[#3B8BA8] rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1" style={{ fontWeight: 800, color: "#FFF" }}>
                    {selectedStudent.score}
                  </div>
                  <div className="text-sm" style={{ color: "#FFF", fontWeight: 600 }}>Score</div>
                </div>

                <div className="bg-gradient-to-br from-[#5FB89A] to-[#4A9B82] rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1" style={{ fontWeight: 800, color: "#FFF" }}>
                    {selectedStudent.completedLessons}
                  </div>
                  <div className="text-sm" style={{ color: "#FFF", fontWeight: 600 }}>Lessons</div>
                </div>

                <div className="bg-gradient-to-br from-[#F5C542] to-[#E0B030] rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1" style={{ fontWeight: 800, color: "#FFF" }}>
                    {selectedStudent.attendance}%
                  </div>
                  <div className="text-sm" style={{ color: "#FFF", fontWeight: 600 }}>Attendance</div>
                </div>

                <div className="bg-gradient-to-br from-[#E85D8A] to-[#D64A75] rounded-2xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl mb-1" style={{ fontWeight: 800, color: "#FFF" }}>
                    {selectedStudent.streak} <Flame size={20} />
                  </div>
                  <div className="text-sm" style={{ color: "#FFF", fontWeight: 600 }}>Day Streak</div>
                </div>
              </div>

              {/* Badges */}
              <div className="mb-6">
                <h3 className="text-xl mb-3 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                  <Award size={24} color="#A896C9" />
                  Badges Earned
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedStudent.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#A896C9] to-[#9080B5] text-white"
                      style={{ fontWeight: 600 }}
                    >
                      🏆 {badge}
                    </div>
                  ))}
                </div>
              </div>

              {/* Attendance Timeline */}
              <div className="mb-6">
                <h3 className="text-xl mb-3 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                  <Calendar size={24} color="#5FB89A" />
                  Recent Attendance
                </h3>
                <div className="grid grid-cols-6 gap-2">
                  {selectedStudent.attendanceTimeline.map((day, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="h-16 rounded-xl flex items-center justify-center text-2xl mb-1"
                        style={{
                          backgroundColor: day.present ? "#E8F5F1" : "#FEE2E2"
                        }}
                      >
                        {day.present ? "✅" : "❌"}
                      </div>
                      <p className="text-xs" style={{ color: "#9CA3AF", fontWeight: 600 }}>
                        {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parent Information */}
              <div className="bg-gradient-to-r from-[#F0F4FF] to-[#E8F0FF] rounded-2xl p-6">
                <h3 className="text-xl mb-4 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                  👨‍👩‍👧 Parent Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#4FA8C5] flex items-center justify-center">
                      <Users size={20} color="#FFF" />
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: "#9CA3AF", fontWeight: 600 }}>Name</p>
                      <p style={{ fontWeight: 700, color: "#4A5568" }}>{selectedStudent.parentInfo.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5FB89A] flex items-center justify-center">
                      <Mail size={20} color="#FFF" />
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: "#9CA3AF", fontWeight: 600 }}>Email</p>
                      <p style={{ fontWeight: 700, color: "#4A5568" }}>{selectedStudent.parentInfo.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full px-12 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl text-center mb-8" style={{ fontWeight: 800, color: "#4A5568" }}>
            Welcome back, {currentTeacher?.name}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-end gap-4 mb-8"
        >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onManageAccount}
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-2xl"
              style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }}
            >
              <Settings size={20} color="#A896C9" />
              <span style={{ fontWeight: 700, color: "#4A5568" }}>Manage</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsHoveringLogout(true)}
              onMouseLeave={() => setIsHoveringLogout(false)}
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl transition-colors"
              style={{
                backgroundColor: isHoveringLogout ? "#FEE2E2" : "#FFF",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)"
              }}
            >
              <LogOut size={20} color={isHoveringLogout ? "#EF4444" : "#6B7280"} />
              <span style={{ fontWeight: 600, color: isHoveringLogout ? "#EF4444" : "#6B7280" }}>Logout</span>
            </motion.button>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8 overflow-x-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 rounded-2xl flex items-center gap-2 ${activeTab === "overview" ? "bg-[#A896C9] text-white" : "bg-white text-[#6B7280]"}`}
            style={{ fontWeight: 600, boxShadow: activeTab === "overview" ? "0 4px 12px rgba(168, 150, 201, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.05)" }}
          >
            <Users size={20} />
            Class List
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("upload")}
            className={`px-6 py-3 rounded-2xl flex items-center gap-2 ${activeTab === "upload" ? "bg-[#4FA8C5] text-white" : "bg-white text-[#6B7280]"}`}
            style={{ fontWeight: 600, boxShadow: activeTab === "upload" ? "0 4px 12px rgba(79, 168, 197, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.05)" }}
          >
            <Upload size={20} />
            Upload Lessons
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("messages")}
            className={`px-6 py-3 rounded-2xl flex items-center gap-2 ${activeTab === "messages" ? "bg-[#F5C542] text-white" : "bg-white text-[#6B7280]"}`}
            style={{ fontWeight: 600, boxShadow: activeTab === "messages" ? "0 4px 12px rgba(245, 197, 66, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.05)" }}
          >
            <MessageSquare size={20} />
            Messages {messages.filter(m => !m.isRead).length > 0 && `(${messages.filter(m => !m.isRead).length})`}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("analytics")}
            className={`px-6 py-3 rounded-2xl flex items-center gap-2 ${activeTab === "analytics" ? "bg-[#E85D8A] text-white" : "bg-white text-[#6B7280]"}`}
            style={{ fontWeight: 600, boxShadow: activeTab === "analytics" ? "0 4px 12px rgba(232, 93, 138, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.05)" }}
          >
            <TrendingUp size={20} />
            Analytics
          </motion.button>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="bg-gradient-to-br from-[#4FA8C5] to-[#3B8BA8] rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2" style={{ fontWeight: 800, color: "#FFF" }}>
                    {totalStudents}
                  </div>
                  <div className="text-sm" style={{ color: "#FFF", fontWeight: 600 }}>Total Students</div>
                </div>

                <div className="bg-gradient-to-br from-[#5FB89A] to-[#4A9B82] rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2" style={{ fontWeight: 800, color: "#FFF" }}>
                    {avgAttendance.toFixed(0)}%
                  </div>
                  <div className="text-sm" style={{ color: "#FFF", fontWeight: 600 }}>Avg Attendance</div>
                </div>

                <div className="bg-gradient-to-br from-[#F5C542] to-[#E0B030] rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2" style={{ fontWeight: 800, color: "#FFF" }}>
                    {totalLessonsCompleted}
                  </div>
                  <div className="text-sm" style={{ color: "#FFF", fontWeight: 600 }}>Total Lessons Done</div>
                </div>

                <div className="bg-gradient-to-br from-[#A896C9] to-[#9080B5] rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2" style={{ fontWeight: 800, color: "#FFF" }}>
                    {avgScore.toFixed(0)}
                  </div>
                  <div className="text-sm" style={{ color: "#FFF", fontWeight: 600 }}>Avg Class Score</div>
                </div>
              </div>

              {/* Students List */}
              <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}>
                <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                  <Users size={28} color="#A896C9" />
                  Class List
                </h2>

                <div className="space-y-4">
                  {students.map((student) => (
                    <motion.div
                      key={student.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white cursor-pointer"
                      style={{ border: "1px solid #F3F4F6" }}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A8D8EA] to-[#87CEEB] flex items-center justify-center text-3xl"
                            style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                          >
                            {student.avatar}
                          </div>
                          <div>
                            <p className="text-xl mb-1" style={{ fontWeight: 700, color: "#4A5568" }}>
                              {student.name}
                            </p>
                            <p className="text-sm" style={{ color: "#9CA3AF", fontWeight: 600 }}>
                              Current: {student.currentLesson}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <p className="text-2xl mb-1" style={{ fontWeight: 700, color: "#4FA8C5" }}>
                              {student.score}
                            </p>
                            <p className="text-sm" style={{ color: "#9CA3AF", fontWeight: 600 }}>Score</p>
                          </div>

                          <div className="text-center">
                            <p className="text-2xl mb-1" style={{ fontWeight: 700, color: "#5FB89A" }}>
                              {student.attendance}%
                            </p>
                            <p className="text-sm" style={{ color: "#9CA3AF", fontWeight: 600 }}>Attendance</p>
                          </div>

                          <div className="text-center">
                            <p className="text-2xl mb-1" style={{ fontWeight: 700, color: "#F5C542" }}>
                              {student.completedLessons}
                            </p>
                            <p className="text-sm" style={{ color: "#9CA3AF", fontWeight: 600 }}>Lessons</p>
                          </div>

                          <div className="text-center">
                            <p className="text-2xl mb-1 flex items-center justify-center gap-1" style={{ fontWeight: 700, color: "#E85D8A" }}>
                              {student.streak} <Flame size={20} />
                            </p>
                            <p className="text-sm" style={{ color: "#9CA3AF", fontWeight: 600 }}>Streak</p>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4 bg-gray-200 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${student.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-3 rounded-full"
                          style={{ backgroundColor: "#A896C9" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload Form */}
                <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}>
                  <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                    <Upload size={28} color="#4FA8C5" />
                    Upload New Lesson
                  </h2>

                  {/* Upload Requirements Info */}
                  <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#4FA8C5]/10 to-[#4FA8C5]/5">
                    <p className="text-sm mb-2" style={{ fontWeight: 700, color: "#4A5568" }}>📋 Required Files (3 modes):</p>
                    <ul className="text-sm space-y-1" style={{ color: "#6B7280", fontWeight: 600 }}>
                      <li>🎬 Video Mode: Upload MP4 file</li>
                      <li>🎵 Audio Mode: Upload MP3 file</li>
                      <li>⚡ Interactive Mode: Upload HTML5 file</li>
                    </ul>
                  </div>

                  {showUploadSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 rounded-2xl bg-green-50 flex items-center gap-3"
                    >
                      <CheckCircle size={20} color="#10B981" />
                      <p style={{ color: "#10B981", fontWeight: 600 }}>Lesson uploaded successfully!</p>
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                        Lesson Title *
                      </label>
                      <input
                        type="text"
                        value={lessonTitle}
                        onChange={(e) => setLessonTitle(e.target.value)}
                        placeholder="e.g., Introduction to Fractions"
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#4FA8C5] outline-none"
                        style={{ fontWeight: 600 }}
                      />
                    </div>

                    <div>
                      <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                        Description *
                      </label>
                      <textarea
                        value={lessonDescription}
                        onChange={(e) => setLessonDescription(e.target.value)}
                        placeholder="Describe the lesson content..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#4FA8C5] outline-none resize-none"
                        style={{ fontWeight: 600 }}
                      />
                    </div>

                    <div>
                      <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                        Select Mode to Upload *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {(["Visual", "Auditory", "Interactive"] as LearningStyle[]).map((style) => (
                          <motion.button
                            key={style}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setLessonStyle(style)}
                            className="py-3 rounded-2xl border-2 transition-all relative"
                            style={{
                              backgroundColor: lessonStyle === style ? learningStyleColors[style] : "#F9FAFB",
                              borderColor: lessonStyle === style ? learningStyleColors[style] : "#E5E7EB",
                              color: lessonStyle === style ? "#FFF" : "#6B7280",
                              fontWeight: 700
                            }}
                          >
                            {style}
                            {((style === "Visual" && selectedVideoFile) || 
                              (style === "Auditory" && selectedAudioFile) || 
                              (style === "Interactive" && selectedInteractiveFile)) && (
                              <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                ✓
                              </span>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Conditional File Upload based on Selected Learning Style */}
                    {lessonStyle === "Visual" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <label className="block mb-2 flex items-center gap-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                          <span className="text-lg">🎬</span>
                          Video File (.mp4) *
                        </label>
                        <input
                          type="file"
                          id="video-upload"
                          accept=".mp4"
                          onChange={handleVideoFileSelect}
                          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#4FA8C5] outline-none"
                          style={{ fontWeight: 600 }}
                        />
                        {selectedVideoFile ? (
                          <p className="text-sm mt-1 flex items-center gap-1" style={{ color: "#10B981", fontWeight: 600 }}>
                            ✓ {selectedVideoFile.name}
                          </p>
                        ) : (
                          <p className="text-sm mt-1" style={{ color: "#EF4444", fontWeight: 600 }}>
                            Required - Upload MP4 video file
                          </p>
                        )}
                      </motion.div>
                    )}

                    {lessonStyle === "Auditory" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <label className="block mb-2 flex items-center gap-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                          <span className="text-lg">🎵</span>
                          Audio File (.mp3) *
                        </label>
                        <input
                          type="file"
                          id="audio-upload"
                          accept=".mp3"
                          onChange={handleAudioFileSelect}
                          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#F5C542] outline-none"
                          style={{ fontWeight: 600 }}
                        />
                        {selectedAudioFile ? (
                          <p className="text-sm mt-1 flex items-center gap-1" style={{ color: "#10B981", fontWeight: 600 }}>
                            ✓ {selectedAudioFile.name}
                          </p>
                        ) : (
                          <p className="text-sm mt-1" style={{ color: "#EF4444", fontWeight: 600 }}>
                            Required - Upload MP3 audio file
                          </p>
                        )}
                      </motion.div>
                    )}

                    {lessonStyle === "Interactive" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <label className="block mb-2 flex items-center gap-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                          <span className="text-lg">⚡</span>
                          Interactive File (.html) *
                        </label>
                        <input
                          type="file"
                          id="interactive-upload"
                          accept=".html,.htm"
                          onChange={handleInteractiveFileSelect}
                          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#5FB89A] outline-none"
                          style={{ fontWeight: 600 }}
                        />
                        {selectedInteractiveFile ? (
                          <p className="text-sm mt-1 flex items-center gap-1" style={{ color: "#10B981", fontWeight: 600 }}>
                            ✓ {selectedInteractiveFile.name}
                          </p>
                        ) : (
                          <p className="text-sm mt-1" style={{ color: "#EF4444", fontWeight: 600 }}>
                            Required - Upload HTML5 interactive file
                          </p>
                        )}
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUploadLesson}
                      className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2"
                      style={{ 
                        backgroundColor: (selectedVideoFile && selectedAudioFile && selectedInteractiveFile) ? "#4FA8C5" : "#9CA3AF", 
                        fontWeight: 700,
                        cursor: (selectedVideoFile && selectedAudioFile && selectedInteractiveFile) ? "pointer" : "not-allowed"
                      }}
                    >
                      <Upload size={20} />
                      Publish Lesson ({[selectedVideoFile, selectedAudioFile, selectedInteractiveFile].filter(Boolean).length}/3 files)
                    </motion.button>
                  </div>
                </div>

                {/* Lessons List */}
                <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}>
                  <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                    <BookOpen size={28} color="#5FB89A" />
                    Published Lessons
                  </h2>

                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {uploadedLessons.map((lesson) => (
                      <motion.div
                        key={lesson.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-2xl"
                        style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p style={{ fontWeight: 700, color: "#4A5568" }}>{lesson.title}</p>
                            <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>{lesson.description}</p>
                          </div>
                        </div>

                        {/* Display all 3 modes */}
                        <div className="flex items-center gap-2 mt-3 mb-3">
                          <p className="text-sm" style={{ fontWeight: 600, color: "#6B7280" }}>Available Modes:</p>
                          <div className="flex gap-2">
                            <div
                              className="px-3 py-1 rounded-xl text-xs text-white flex items-center gap-1"
                              style={{ backgroundColor: learningStyleColors["Visual"], fontWeight: 600 }}
                            >
                              🎬 Visual
                            </div>
                            <div
                              className="px-3 py-1 rounded-xl text-xs text-white flex items-center gap-1"
                              style={{ backgroundColor: learningStyleColors["Auditory"], fontWeight: 600 }}
                            >
                              🎵 Auditory
                            </div>
                            <div
                              className="px-3 py-1 rounded-xl text-xs text-white flex items-center gap-1"
                              style={{ backgroundColor: learningStyleColors["Interactive"], fontWeight: 600 }}
                            >
                              ⚡ Interactive
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span style={{ color: "#9CA3AF", fontWeight: 600 }}>
                            📊 {lesson.engagementRate}% engaged
                          </span>
                          <span style={{ color: "#9CA3AF", fontWeight: 600 }}>
                            ✅ {lesson.completionRate}% completed
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "messages" && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Message List */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-8" style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                      <MessageSquare size={28} color="#F5C542" />
                      Messages
                    </h2>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMessageFilter("all")}
                        className={`px-4 py-2 rounded-xl ${messageFilter === "all" ? "bg-[#F5C542] text-white" : "bg-gray-100 text-gray-600"}`}
                        style={{ fontWeight: 600 }}
                      >
                        All
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMessageFilter("unread")}
                        className={`px-4 py-2 rounded-xl ${messageFilter === "unread" ? "bg-[#F5C542] text-white" : "bg-gray-100 text-gray-600"}`}
                        style={{ fontWeight: 600 }}
                      >
                        Unread
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMessageFilter("sent")}
                        className={`px-4 py-2 rounded-xl ${messageFilter === "sent" ? "bg-[#F5C542] text-white" : "bg-gray-100 text-gray-600"}`}
                        style={{ fontWeight: 600 }}
                      >
                        Sent
                      </motion.button>
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[700px] overflow-y-auto">
                    {filteredMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        whileHover={{ scale: 1.01 }}
                        className="p-6 rounded-2xl cursor-pointer"
                        style={{
                          backgroundColor: message.isRead ? "#F9FAFB" : "#FFF4E6",
                          border: `2px solid ${message.isRead ? "#E5E7EB" : "#FB923C"}`
                        }}
                        onClick={() => !message.isRead && markAsRead(message.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p style={{ fontWeight: 700, color: "#4A5568" }}>{message.from}</p>
                              {!message.isRead && (
                                <span className="px-2 py-1 rounded-lg text-xs text-white" style={{ backgroundColor: "#FB923C", fontWeight: 600 }}>
                                  New
                                </span>
                              )}
                              {message.tag && (
                                <span className="px-2 py-1 rounded-lg text-xs" style={{ backgroundColor: "#E0F2F7", color: "#4FA8C5", fontWeight: 600 }}>
                                  {message.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-sm mb-2" style={{ color: "#9CA3AF", fontWeight: 600 }}>
                              To: {message.to}
                            </p>
                            <p style={{ fontWeight: 600, color: "#4A5568" }}>{message.subject}</p>
                            <p className="text-sm mt-2" style={{ color: "#6B7280" }}>{message.message}</p>
                            <p className="text-xs mt-2" style={{ color: "#9CA3AF" }}>{message.date}</p>
                          </div>
                        </div>

                        {/* Replies */}
                        {message.replies.length > 0 && (
                          <div className="mt-4 ml-6 space-y-2">
                            {message.replies.map((reply, index) => (
                              <div key={index} className="p-3 rounded-xl" style={{ backgroundColor: "#FFF" }}>
                                <p className="text-sm mb-1" style={{ fontWeight: 700, color: "#4FA8C5" }}>{reply.from}</p>
                                <p className="text-sm" style={{ color: "#6B7280" }}>{reply.message}</p>
                                <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{reply.date}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Input */}
                        {replyingTo === message.id ? (
                          <div className="mt-4 flex gap-2">
                            <input
                              type="text"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Type your reply..."
                              className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-[#F5C542] outline-none"
                              style={{ fontWeight: 600 }}
                            />
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleReply(message.id)}
                              className="px-4 py-2 rounded-xl text-white"
                              style={{ backgroundColor: "#F5C542", fontWeight: 600 }}
                            >
                              <Send size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText("");
                              }}
                              className="px-4 py-2 rounded-xl"
                              style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                            >
                              <X size={16} />
                            </motion.button>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setReplyingTo(message.id)}
                            className="mt-4 px-4 py-2 rounded-xl text-sm"
                            style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                          >
                            Reply
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Send New Message */}
                <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}>
                  <h2 className="text-2xl mb-6" style={{ fontWeight: 700, color: "#4A5568" }}>
                    Send Message
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                       To
                      </label>
                      <input
                        type="text"
                        value={newMessageTo}
                        onChange={(e) => setNewMessageTo(e.target.value)}
                        placeholder="Message recipient"
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#F5C542] outline-none"
                        style={{ fontWeight: 600 }}
                      />
                    </div>

                    <div>
                      <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                       Subject
                      </label>
                      <input
                        type="text"
                        value={newMessageSubject}
                        onChange={(e) => setNewMessageSubject(e.target.value)}
                        placeholder="e.g., Lesson 5"
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#F5C542] outline-none"
                        style={{ fontWeight: 600 }}
                      />
                    </div>

                    <div>
                      <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                        Message
                      </label>
                      <textarea
                        value={newMessageBody}
                        onChange={(e) => setNewMessageBody(e.target.value)}
                        placeholder="Type your message..."
                        rows={6}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#F5C542] outline-none resize-none"
                        style={{ fontWeight: 600 }}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSendMessage}
                      className="w-full py-3 rounded-2xl text-white flex items-center justify-center gap-2"
                      style={{ backgroundColor: "#F5C542", fontWeight: 700 }}
                    >
                      <Send size={20} />
                      Send Message
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Student Performance Overview */}
                <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}>
                  <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                    <Target size={28} color="#E85D8A" />
                    Student Performance
                  </h2>
                  <div className="space-y-4">
                    {students.map((student, index) => (
                      <div key={student.id} className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                          style={{ backgroundColor: "#F3F4F6" }}
                        >
                          {student.avatar}
                        </div>
                        <div className="flex-1">
                          <p style={{ fontWeight: 700, color: "#4A5568" }}>{student.name}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${student.score}%`,
                                backgroundColor: student.score >= 80 ? "#5FB89A" : student.score >= 60 ? "#F5C542" : "#E85D8A"
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-2xl" style={{ fontWeight: 700, color: "#4FA8C5" }}>
                          {student.score}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Lessons */}
                <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}>
                  <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                    <Award size={28} color="#A896C9" />
                    Top Performing Lessons
                  </h2>
                  <div className="space-y-4">
                    {uploadedLessons
                      .sort((a, b) => b.engagementRate - a.engagementRate)
                      .slice(0, 5)
                      .map((lesson, index) => (
                        <div key={lesson.id} className="flex items-center gap-4">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                            style={{ backgroundColor: learningStyleColors[lesson.learningStyle], fontWeight: 700 }}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p style={{ fontWeight: 700, color: "#4A5568" }}>{lesson.title}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm" style={{ color: "#9CA3AF", fontWeight: 600 }}>
                                📊 {lesson.engagementRate}%
                              </span>
                              <span className="text-sm" style={{ color: "#9CA3AF", fontWeight: 600 }}>
                                ⏱️ {lesson.avgTimeSpent}min
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Learning Style Distribution */}
                <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}>
                  <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                    <BookOpen size={28} color="#4FA8C5" />
                    Lesson Types
                  </h2>
                  <div className="space-y-4">
                    {(["Visual", "Auditory", "Interactive"] as LearningStyle[]).map((style) => {
                      const count = uploadedLessons.filter(l => l.learningStyle === style).length;
                      const percentage = uploadedLessons.length > 0 ? (count / uploadedLessons.length) * 100 : 0;
                      return (
                        <div key={style}>
                          <div className="flex items-center justify-between mb-2">
                            <p style={{ fontWeight: 700, color: "#4A5568" }}>{style}</p>
                            <p style={{ fontWeight: 700, color: learningStyleColors[style] }}>{count} lessons</p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: learningStyleColors[style]
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Class Engagement Stats */}
                <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}>
                  <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                    <TrendingUp size={28} color="#5FB89A" />
                    Class Engagement
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p style={{ fontWeight: 600, color: "#6B7280" }}>Average Attendance</p>
                        <p className="text-2xl" style={{ fontWeight: 700, color: "#5FB89A" }}>{avgAttendance.toFixed(0)}%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full"
                          style={{
                            width: `${avgAttendance}%`,
                            backgroundColor: "#5FB89A"
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p style={{ fontWeight: 600, color: "#6B7280" }}>Average Score</p>
                        <p className="text-2xl" style={{ fontWeight: 700, color: "#4FA8C5" }}>{avgScore.toFixed(0)}</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full"
                          style={{
                            width: `${avgScore}%`,
                            backgroundColor: "#4FA8C5"
                          }}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t-2 border-gray-100">
                      <p className="text-sm mb-4" style={{ fontWeight: 600, color: "#6B7280" }}>Total Badges Earned</p>
                      <div className="flex flex-wrap gap-2">
                        {students.flatMap(s => s.badges).map((badge, index) => (
                          <div
                            key={index}
                            className="px-3 py-1 rounded-xl text-sm bg-gradient-to-r from-[#A896C9] to-[#9080B5] text-white"
                            style={{ fontWeight: 600 }}
                          >
                            {badge}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}