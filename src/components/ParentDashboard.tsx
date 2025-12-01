import { useState } from "react";
import { motion } from "motion/react";
import {
  LogOut,
  TrendingUp,
  Calendar,
  MessageSquare,
  Clock,
  Bell,
  Settings,
  BarChart3,
  Award,
  Shield,
  CheckCircle,
  AlertCircle,
  Plus,
  Send
} from "lucide-react";
import { useParentContext } from "../context/ParentContext";
import { useAppContext } from "../context/AppContext";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface ParentDashboardProps {
  onManageStudent: () => void;
  onLogout: () => void;
  onBackToWelcome?: () => void;
}

export function ParentDashboard({ onManageStudent, onLogout, onBackToWelcome }: ParentDashboardProps) {
  const { currentParent, feedbacks, addFeedbackReply, sendNewMessage, screenTimeData, attendanceData, screenTimeLimit, setScreenTimeLimit, dailyLimitEnabled, setDailyLimitEnabled, weeklyLimitEnabled, setWeeklyLimitEnabled, weeklyLimit, setWeeklyLimit, getLinkedStudentData } = useParentContext();
  
  // Get linked student data instead of using AppContext
  const linkedStudentData = getLinkedStudentData();
  const avatar = linkedStudentData?.avatar || "😊";
  const pet = linkedStudentData?.pet || "🐰";
  const userName = linkedStudentData?.name || "Student";
  const totalXP = linkedStudentData?.totalXP || 0;
  const completedLessons = linkedStudentData?.completedLessons || [];
  const badges = linkedStudentData?.badges || [];
  
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [showLimitSaved, setShowLimitSaved] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isHoveringLogout, setIsHoveringLogout] = useState(false);
  
  // Get available teachers from localStorage
  const availableTeachers = (() => {
    const teachers = JSON.parse(localStorage.getItem("teacherAccounts") || "[]");
    
    // Always include Habiba (the demo teacher)
    const habibaTeacher = { name: "Habiba", email: "habiba@gmail.com", subject: "Math" };
    
    const hardcodedTeachers = [
      { name: "Dr. Emily Brown", email: "emily.brown@school.com", subject: "Science" },
      { name: "Ms. Sarah Johnson", email: "sarah.johnson@school.com", subject: "English" },
      { name: "Mr. David Chen", email: "david.chen@school.com", subject: "Art" }
    ];
    
    // Combine all teachers: Habiba + registered teachers + hardcoded ones
    const allTeachers = [habibaTeacher, ...teachers, ...hardcodedTeachers];
    
    // Remove duplicates based on email
    const uniqueTeachers = allTeachers.filter((teacher, index, self) =>
      index === self.findIndex((t) => t.email === teacher.email)
    );
    
    return uniqueTeachers;
  })();
  
  // New message state
  const [showNewMessagePopup, setShowNewMessagePopup] = useState(false);
  const [newMessageTeacher, setNewMessageTeacher] = useState(availableTeachers.length > 0 ? availableTeachers[0].name : "");
  const [newMessageSubject, setNewMessageSubject] = useState("");
  const [newMessageText, setNewMessageText] = useState("");

  const handleSendReply = (feedbackId: string) => {
    if (replyText.trim()) {
      addFeedbackReply(feedbackId, replyText);
      setReplyText("");
      setReplyingTo(null);
    }
  };

  const handleSendNewMessage = () => {
    if (newMessageSubject.trim() && newMessageText.trim()) {
      sendNewMessage(newMessageTeacher, newMessageSubject, newMessageText);
      setNewMessageSubject("");
      setNewMessageText("");
      setShowNewMessagePopup(false);
    }
  };

  // Calculate real-time lessons by subject from completed lessons
  const weeklyProgressData = (() => {
    const mathLessons = completedLessons.filter(l => l.worldId === "math" && l.completed).length;
    const scienceLessons = completedLessons.filter(l => l.worldId === "science" && l.completed).length;
    
    return [
      { subject: "Mathematics", completed: mathLessons },
      { subject: "Science", completed: scienceLessons }
    ];
  })();

  // Calculate real-time XP over time (simulated weekly progress)
  const xpOverTime = (() => {
    const maxXP = Math.max(totalXP, 100); // Ensure at least 100 for chart visibility
    const week4 = totalXP;
    const week3 = Math.floor(week4 * 0.75);
    const week2 = Math.floor(week4 * 0.5);
    const week1 = Math.floor(week4 * 0.3);
    
    return [
      { week: "Week 1", xp: week1 },
      { week: "Week 2", xp: week2 },
      { week: "Week 3", xp: week3 },
      { week: "Week 4", xp: week4 }
    ];
  })();

  // Calculate stats
  const totalScreenTime = screenTimeData.reduce((acc, day) => acc + day.minutes, 0);
  const avgScreenTime = screenTimeData.length > 0 ? Math.round(totalScreenTime / screenTimeData.length) : 0;
  const recommendedLimit = 60; // 60 minutes per day
  const screenTimeStatus = avgScreenTime <= recommendedLimit ? "healthy" : avgScreenTime <= recommendedLimit * 1.5 ? "warning" : "exceeded";

  const activeDays = attendanceData.filter(d => d.active).length;
  const totalDays = attendanceData.length;
  const attendanceRate = totalDays > 0 ? Math.round((activeDays / totalDays) * 100) : 0;



  // Weekly notifications
  const notifications = [
    {
      id: "1",
      icon: "🎉",
      message: `${userName} completed ${completedLessons.length} lessons this week!`,
      time: "2 hours ago",
      type: "success"
    },
    {
      id: "2",
      icon: "💬",
      message: "New teacher feedback available",
      time: "1 day ago",
      type: "info"
    },
    screenTimeStatus === "exceeded" ? {
      id: "3",
      icon: "⚠️",
      message: "Screen time exceeded recommended limit",
      time: "Today",
      type: "warning"
    } : null,
    {
      id: "4",
      icon: "🏆",
      message: `${badges.filter(b => b.unlocked).length} badges earned so far!`,
      time: "3 days ago",
      type: "success"
    }
  ].filter(Boolean);

  // Subject colors
  const COLORS = {
    Mathematics: "#4FA8C5",
    Science: "#5FB89A",
    Art: "#F5C542"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] pb-12">
      <div className="w-full px-12 py-8">
        {/* Header - Centered Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl text-center mb-8" style={{ fontWeight: 800, color: "#4A5568" }}>
            Welcome back, {currentParent?.name}!
          </h1>

          {/* Action Buttons - Top Right */}
          <div className="flex items-center justify-end gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onManageStudent}
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-2xl"
              style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }}
            >
              <Settings size={20} color="#6B7280" />
              <span style={{ fontWeight: 600, color: "#6B7280" }}>Manage</span>
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
          </div>
        </motion.div>

        {/* Child Overview Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 mb-6"
          style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
        >
          <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
            <Award size={28} color="#FFD670" />
            Child Overview
          </h2>

          {/* Student Code Display */}
          {currentParent?.studentCode && (
            <div className="mb-6 p-4 bg-gradient-to-br from-[#A8D8EA]/20 to-[#C9B6E4]/20 rounded-2xl">
              <p className="text-sm mb-1" style={{ color: "#6B7280", fontWeight: 600 }}>
                Student Code:
              </p>
              <code className="text-xl" style={{ fontWeight: 800, color: "#4A5568" }}>
                {currentParent.studentCode}
              </code>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Avatar & Pet */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-3">
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
              <p style={{ fontWeight: 700, color: "#4A5568" }}>{userName}</p>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>Grade 4</p>
            </div>

            {/* Stats Cards */}
            <div className="bg-gradient-to-br from-[#4FA8C5] to-[#3B8BA8] rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2" style={{ fontWeight: 800, color: "#FFF" }}>
                {totalXP}
              </div>
              <div className="text-sm" style={{ color: "#FFF", fontWeight: 600 }}>Total XP</div>
            </div>

            <div className="bg-gradient-to-br from-[#F5C542] to-[#E0B030] rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2" style={{ fontWeight: 800, color: "#FFF" }}>
                {completedLessons.length}
              </div>
              <div className="text-sm" style={{ color: "#FFF", fontWeight: 600 }}>Lessons Done</div>
            </div>

            <div className="bg-gradient-to-br from-[#A896C9] to-[#9080B5] rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2" style={{ fontWeight: 800, color: "#FFF" }}>
                {badges.filter(b => b.unlocked).length}/{badges.length}
              </div>
              <div className="text-sm" style={{ color: "#FFF", fontWeight: 600 }}>Badges</div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Progress Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 h-full"
              style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
            >
              <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
                <TrendingUp size={28} color="#A8D8EA" />
                Learning Progress
              </h2>

              {/* XP Over Time Chart */}
              <div className="mb-8">
                <h3 className="text-lg mb-4" style={{ fontWeight: 600, color: "#6B7280" }}>
                  XP Progress (Last 4 Weeks)
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={xpOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="week" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFF",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="xp"
                      stroke="#A8D8EA"
                      strokeWidth={3}
                      dot={{ fill: "#A8D8EA", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Subject Progress */}
              <div>
                <h3 className="text-lg mb-4" style={{ fontWeight: 600, color: "#6B7280" }}>
                  Lessons by Subject
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="subject" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFF",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                    <Bar dataKey="completed" radius={[8, 8, 0, 0]}>
                      {weeklyProgressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.subject as keyof typeof COLORS]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8"
            style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
          >
            <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
              <Bell size={28} color="#FFD670" />
              Notifications
            </h2>

            <div className="space-y-4">
              {notifications.map((notif: any) => (
                <motion.div
                  key={notif.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white"
                  style={{ border: "1px solid #F3F4F6" }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{notif.icon}</div>
                    <div className="flex-1">
                      <p style={{ fontWeight: 700, color: "#4A5568", fontSize: "17px", lineHeight: "1.5" }}>
                        {notif.message}
                      </p>
                      <p className="text-sm mt-2" style={{ color: "#9CA3AF", fontWeight: 600 }}>
                        {notif.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Attendance Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8"
            style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
          >
            <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
              <Calendar size={28} color="#B8E6D5" />
              Attendance
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: "#F0FDF4" }}>
                <div className="text-2xl mb-1" style={{ fontWeight: 800, color: "#10B981" }}>
                  {activeDays}
                </div>
                <div className="text-xs" style={{ color: "#6B7280" }}>Active Days</div>
              </div>
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: "#FEF2F2" }}>
                <div className="text-2xl mb-1" style={{ fontWeight: 800, color: "#EF4444" }}>
                  {totalDays - activeDays}
                </div>
                <div className="text-xs" style={{ color: "#6B7280" }}>Missed Days</div>
              </div>
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: "#EFF6FF" }}>
                <div className="text-2xl mb-1" style={{ fontWeight: 800, color: "#3B82F6" }}>
                  {attendanceRate}%
                </div>
                <div className="text-xs" style={{ color: "#6B7280" }}>Rate</div>
              </div>
            </div>

            {/* Calendar View (Last 30 Days) */}
            <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2">
              {attendanceData.map((day, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  className="aspect-square rounded-lg"
                  style={{
                    backgroundColor: day.active ? "#10B981" : "#E5E7EB"
                  }}
                  title={`${day.date}: ${day.active ? "Active" : "Absent"}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Screen Time Control Module */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white rounded-3xl p-8 mb-6"
            style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
          >
            <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
              <Shield size={28} color="#C9B6E4" />
              Screen Time Control
            </h2>

            <p className="mb-6" style={{ color: "#6B7280", lineHeight: "1.6" }}>
              Set healthy screen time limits for {userName}'s learning activities. Enable daily or weekly limits to encourage balanced learning habits.
            </p>

            {/* Current Usage Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-6 rounded-2xl text-center bg-gradient-to-br from-[#C9B6E4]/10 to-[#C9B6E4]/5">
                <div className="text-3xl mb-2" style={{ fontWeight: 800, color: "#C9B6E4" }}>
                  {avgScreenTime}
                </div>
                <div className="text-sm" style={{ color: "#6B7280" }}>Daily Average (min)</div>
              </div>
              <div className="p-6 rounded-2xl text-center bg-gradient-to-br from-[#A8D8EA]/10 to-[#A8D8EA]/5">
                <div className="text-3xl mb-2" style={{ fontWeight: 800, color: "#A8D8EA" }}>
                  {totalScreenTime}
                </div>
                <div className="text-sm" style={{ color: "#6B7280" }}>This Week (min)</div>
              </div>
              <div className="p-6 rounded-2xl text-center bg-gradient-to-br from-[#B8E6D5]/10 to-[#B8E6D5]/5">
                <div className="text-3xl mb-2" style={{ fontWeight: 800, color: "#B8E6D5" }}>
                  {screenTimeData.filter(d => d.minutes <= screenTimeLimit).length}
                </div>
                <div className="text-sm" style={{ color: "#6B7280" }}>Days Under Limit</div>
              </div>
            </div>

            {/* Daily Limit Control */}
            <div className="border-2 border-gray-100 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9B6E4] to-[#A896C9] flex items-center justify-center">
                    <Clock size={24} color="#FFF" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-1" style={{ fontWeight: 700, color: "#4A5568" }}>
                      Daily Time Limit
                    </h3>
                    <p className="text-sm" style={{ color: "#9CA3AF" }}>
                      Maximum learning time per day
                    </p>
                  </div>
                </div>
                
                {/* Toggle Switch */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDailyLimitEnabled(!dailyLimitEnabled)}
                  className={`relative w-16 h-8 rounded-full transition-colors ${
                    dailyLimitEnabled ? "bg-[#C9B6E4]" : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    className="absolute top-1 w-6 h-6 bg-white rounded-full"
                    animate={{ left: dailyLimitEnabled ? "36px" : "4px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
                  />
                </motion.button>
              </div>

              {dailyLimitEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-4 border-t-2 border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ fontWeight: 600, color: "#6B7280" }}>Limit:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl" style={{ fontWeight: 800, color: "#C9B6E4" }}>
                        {screenTimeLimit}
                      </span>
                      <span style={{ fontWeight: 600, color: "#9CA3AF" }}>minutes</span>
                    </div>
                  </div>
                  
                  {/* Slider */}
                  <input
                    type="range"
                    min="15"
                    max="180"
                    step="15"
                    value={screenTimeLimit}
                    onChange={(e) => setScreenTimeLimit(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #C9B6E4 0%, #C9B6E4 ${((screenTimeLimit - 15) / (180 - 15)) * 100}%, #E5E7EB ${((screenTimeLimit - 15) / (180 - 15)) * 100}%, #E5E7EB 100%)`
                    }}
                  />
                  
                  <div className="flex justify-between mt-2">
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>15 min</span>
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>180 min</span>
                  </div>

                  {/* Visual Feedback */}
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#C9B6E4]/10 to-[#C9B6E4]/5">
                    <div className="flex items-center gap-2">
                      {avgScreenTime <= screenTimeLimit ? (
                        <>
                          <CheckCircle size={20} color="#10B981" />
                          <span className="text-sm" style={{ fontWeight: 600, color: "#10B981" }}>
                            Current usage is within the limit
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={20} color="#F59E0B" />
                          <span className="text-sm" style={{ fontWeight: 600, color: "#F59E0B" }}>
                            Current usage exceeds the limit by {avgScreenTime - screenTimeLimit} min/day
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Weekly Limit Control */}
            <div className="border-2 border-gray-100 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A8D8EA] to-[#87CEEB] flex items-center justify-center">
                    <Calendar size={24} color="#FFF" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-1" style={{ fontWeight: 700, color: "#4A5568" }}>
                      Weekly Time Limit
                    </h3>
                    <p className="text-sm" style={{ color: "#9CA3AF" }}>
                      Maximum learning time per week
                    </p>
                  </div>
                </div>
                
                {/* Toggle Switch */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setWeeklyLimitEnabled(!weeklyLimitEnabled)}
                  className={`relative w-16 h-8 rounded-full transition-colors ${
                    weeklyLimitEnabled ? "bg-[#A8D8EA]" : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    className="absolute top-1 w-6 h-6 bg-white rounded-full"
                    animate={{ left: weeklyLimitEnabled ? "36px" : "4px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
                  />
                </motion.button>
              </div>

              {weeklyLimitEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-4 border-t-2 border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ fontWeight: 600, color: "#6B7280" }}>Limit:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl" style={{ fontWeight: 800, color: "#A8D8EA" }}>
                        {weeklyLimit}
                      </span>
                      <span style={{ fontWeight: 600, color: "#9CA3AF" }}>minutes</span>
                    </div>
                  </div>
                  
                  {/* Slider */}
                  <input
                    type="range"
                    min="100"
                    max="600"
                    step="50"
                    value={weeklyLimit}
                    onChange={(e) => setWeeklyLimit(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #A8D8EA 0%, #A8D8EA ${((weeklyLimit - 100) / (600 - 100)) * 100}%, #E5E7EB ${((weeklyLimit - 100) / (600 - 100)) * 100}%, #E5E7EB 100%)`
                    }}
                  />
                  
                  <div className="flex justify-between mt-2">
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>100 min</span>
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>600 min</span>
                  </div>

                  {/* Visual Feedback */}
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#A8D8EA]/10 to-[#A8D8EA]/5">
                    <div className="flex items-center gap-2">
                      {totalScreenTime <= weeklyLimit ? (
                        <>
                          <CheckCircle size={20} color="#10B981" />
                          <span className="text-sm" style={{ fontWeight: 600, color: "#10B981" }}>
                            This week's usage is within the limit
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={20} color="#F59E0B" />
                          <span className="text-sm" style={{ fontWeight: 600, color: "#F59E0B" }}>
                            This week's usage exceeds the limit by {totalScreenTime - weeklyLimit} minutes
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Save Button */}
            <div className="bg-gradient-to-br from-[#5FB89A] to-[#4A9B82] rounded-2xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/30 rounded-xl flex items-center justify-center">
                  <Shield size={28} color="#FFF" />
                </div>
                <div>
                  <h3 className="text-xl text-white mb-1" style={{ fontWeight: 700 }}>
                    {showLimitSaved ? "Limits Saved Successfully!" : "Apply Screen Time Limits"}
                  </h3>
                  <p className="text-sm text-white/90" style={{ fontWeight: 600 }}>
                    {showLimitSaved 
                      ? "Your screen time settings are now active"
                      : "Save your changes to enforce these limits"}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowLimitSaved(true);
                  setTimeout(() => setShowLimitSaved(false), 3000);
                }}
                className="px-10 py-4 rounded-2xl text-xl bg-white"
                style={{ 
                  fontWeight: 700, 
                  color: "#5FB89A",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)"
                }}
              >
                {showLimitSaved ? "✓ Saved" : "Save Limits"}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Feedback Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8"
          style={{ boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
              <MessageSquare size={28} color="#FFD670" />
              Teacher Feedback
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNewMessagePopup(true)}
              className="px-6 py-3 rounded-2xl text-white flex items-center gap-2"
              style={{ backgroundColor: "#C9B6E4", fontWeight: 600 }}
            >
              <Plus size={20} />
              New Message
            </motion.button>
          </div>

          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="border-2 border-gray-100 rounded-2xl p-8">
                {/* Main Feedback */}
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#A8D8EA] to-[#87CEEB] flex items-center justify-center text-2xl">
                      👨‍🏫
                    </div>
                    <div>
                      <p className="text-lg" style={{ fontWeight: 800, color: "#4A5568" }}>{feedback.from}</p>
                      <p className="text-sm" style={{ color: "#9CA3AF", fontWeight: 600 }}>{feedback.subject} • {feedback.date}</p>
                    </div>
                  </div>
                  <p className="text-lg" style={{ color: "#4A5568", lineHeight: "1.7", fontWeight: 500 }}>{feedback.message}</p>
                </div>

                {/* Replies */}
                {feedback.replies.length > 0 && (
                  <div className="ml-10 space-y-4 mb-6">
                    {feedback.replies.map((reply, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <p className="text-base" style={{ fontWeight: 800, color: "#4A5568" }}>
                            {reply.from}
                          </p>
                          <p className="text-sm" style={{ color: "#9CA3AF", fontWeight: 600 }}>{reply.date}</p>
                        </div>
                        <p className="text-base" style={{ color: "#6B7280", lineHeight: "1.7" }}>{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                {replyingTo === feedback.id ? (
                  <div className="ml-8">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none mb-2"
                      rows={3}
                      style={{ fontWeight: 500 }}
                    />
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSendReply(feedback.id)}
                        className="px-6 py-2 rounded-xl text-white"
                        style={{ backgroundColor: "#C9B6E4", fontWeight: 600 }}
                      >
                        Send
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyText("");
                        }}
                        className="px-6 py-2 rounded-xl"
                        style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setReplyingTo(feedback.id)}
                    className="ml-8 px-6 py-2 rounded-xl"
                    style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                  >
                    Reply
                  </motion.button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* New Message Popup */}
      {showNewMessagePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowNewMessagePopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 w-full max-w-2xl"
            style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl mb-6 flex items-center gap-2" style={{ fontWeight: 700, color: "#4A5568" }}>
              <Send size={28} color="#C9B6E4" />
              Send New Message
            </h2>

            <div className="space-y-4">
              {/* Teacher Selection */}
              <div>
                <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                  To Teacher:
                </label>
                <select
                  value={newMessageTeacher}
                  onChange={(e) => setNewMessageTeacher(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none"
                  style={{ fontWeight: 500 }}
                >
                  {availableTeachers.map((teacher) => (
                    <option key={teacher.email} value={teacher.name}>
                      {teacher.name} ({teacher.subject} Teacher)
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                  Subject:
                </label>
                <input
                  type="text"
                  value={newMessageSubject}
                  onChange={(e) => setNewMessageSubject(e.target.value)}
                  placeholder="Enter message subject..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none"
                  style={{ fontWeight: 500 }}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                  Message:
                </label>
                <textarea
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none"
                  rows={6}
                  style={{ fontWeight: 500 }}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-end pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowNewMessagePopup(false);
                    setNewMessageSubject("");
                    setNewMessageText("");
                  }}
                  className="px-6 py-3 rounded-xl"
                  style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendNewMessage}
                  className="px-6 py-3 rounded-xl text-white flex items-center gap-2"
                  style={{ backgroundColor: "#C9B6E4", fontWeight: 600 }}
                  disabled={!newMessageSubject.trim() || !newMessageText.trim()}
                >
                  <Send size={18} />
                  Send Message
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center"
        >
          <div className="bg-white rounded-3xl p-8 w-96">
            <h2 className="text-xl mb-4 text-center" style={{ fontWeight: 700, color: "#4A5568" }}>
              Confirm Logout
            </h2>
            <p className="text-sm mb-6 text-center" style={{ color: "#6B7280", fontWeight: 600 }}>
              Are you sure you want to log out?
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLogoutConfirm(false)}
                className="px-6 py-2 rounded-xl"
                style={{ backgroundColor: "#F3F4F6", fontWeight: 600, color: "#6B7280" }}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="px-6 py-2 rounded-xl text-white"
                style={{ backgroundColor: "#EF4444", fontWeight: 600 }}
              >
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}