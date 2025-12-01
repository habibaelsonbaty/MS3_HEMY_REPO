import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, User, UserPlus, AlertCircle, BookOpen, Beaker, Palette } from "lucide-react";
import { useTeacherContext, TeacherSubject } from "../context/TeacherContext";

interface TeacherSignupProps {
  onSignup: () => void;
  onBack: () => void;
  onLogin?: () => void;
}

export function TeacherSignup({ onSignup, onBack, onLogin }: TeacherSignupProps) {
  const { signupTeacher } = useTeacherContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<TeacherSubject | null>(null);
  const [error, setError] = useState("");

  const subjects: { value: TeacherSubject; icon: any; color: string; bgColor: string }[] = [
    { value: "Math", icon: BookOpen, color: "#4FA8C5", bgColor: "#E0F2F7" },
    { value: "Science", icon: Beaker, color: "#5FB89A", bgColor: "#E8F5F1" },
    { value: "Art", icon: Palette, color: "#F5C542", bgColor: "#FEF9E7" }
  ];

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!selectedSubject) {
      setError("Please select a subject");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const success = signupTeacher(name, email, password, selectedSubject);
    if (success) {
      onSignup();
    } else {
      setError("Failed to create account");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-12 w-full max-w-2xl"
        style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)" }}
      >
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-xl"
          style={{ backgroundColor: "#F3F4F6" }}
        >
          <ArrowLeft size={20} color="#6B7280" />
          <span style={{ fontWeight: 600, color: "#6B7280" }}>Back</span>
        </motion.button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👩‍🏫</div>
          <h1 className="text-3xl mb-2" style={{ fontWeight: 800, color: "#4A5568" }}>
            Teacher Sign Up
          </h1>
          <p style={{ color: "#9CA3AF", fontWeight: 600 }}>
            Create your teacher account to start managing your classroom
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-red-50 flex items-center gap-3"
          >
            <AlertCircle size={20} color="#EF4444" />
            <p style={{ color: "#EF4444", fontWeight: 600 }}>{error}</p>
          </motion.div>
        )}

        {/* Subject Selection */}
        <div className="mb-6">
          <label className="block mb-3" style={{ fontWeight: 700, color: "#4A5568", fontSize: "16px" }}>
            Select Your Subject
          </label>
          <div className="grid grid-cols-3 gap-4">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <motion.button
                  key={subject.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedSubject(subject.value);
                    setError("");
                  }}
                  className="p-6 rounded-2xl border-2 transition-all"
                  style={{
                    backgroundColor: selectedSubject === subject.value ? subject.bgColor : "#F9FAFB",
                    borderColor: selectedSubject === subject.value ? subject.color : "#E5E7EB"
                  }}
                >
                  <Icon
                    size={32}
                    color={subject.color}
                    className="mx-auto mb-2"
                  />
                  <p style={{ fontWeight: 700, color: subject.color }}>
                    {subject.value}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
            Full Name
          </label>
          <div className="relative">
            <User
              size={20}
              color="#9CA3AF"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="Enter your full name"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#A896C9] outline-none transition-colors"
              style={{ fontWeight: 600 }}
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
            Email
          </label>
          <div className="relative">
            <Mail
              size={20}
              color="#9CA3AF"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#A896C9] outline-none transition-colors"
              style={{ fontWeight: 600 }}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
            Password
          </label>
          <div className="relative">
            <Lock
              size={20}
              color="#9CA3AF"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Create a password"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#A896C9] outline-none transition-colors"
              style={{ fontWeight: 600 }}
            />
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-8">
          <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
            Confirm Password
          </label>
          <div className="relative">
            <Lock
              size={20}
              color="#9CA3AF"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              onKeyPress={(e) => e.key === "Enter" && handleSignup()}
              placeholder="Confirm your password"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#A896C9] outline-none transition-colors"
              style={{ fontWeight: 600 }}
            />
          </div>
        </div>

        {/* Signup Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSignup}
          className="w-full py-4 rounded-2xl text-white mb-6 flex items-center justify-center gap-2"
          style={{ backgroundColor: "#A896C9", fontWeight: 700, fontSize: "18px" }}
        >
          <UserPlus size={24} />
          Create Teacher Account
        </motion.button>

        {/* Login Link */}
        {onLogin && (
          <div className="text-center">
            <p style={{ color: "#6B7280", fontWeight: 600 }}>
              Already have an account?{" "}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onLogin}
                style={{ color: "#A896C9", fontWeight: 700 }}
              >
                Sign In
              </motion.button>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}