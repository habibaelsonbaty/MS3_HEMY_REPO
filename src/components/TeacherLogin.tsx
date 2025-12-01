import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { useTeacherContext } from "../context/TeacherContext";

interface TeacherLoginProps {
  onLogin: () => void;
  onBack: () => void;
  onSignup?: () => void;
}

export function TeacherLogin({ onLogin, onBack, onSignup }: TeacherLoginProps) {
  const { loginTeacher } = useTeacherContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = loginTeacher(email, password);
    if (success) {
      onLogin();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-12 w-full max-w-lg"
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
            Teacher Login
          </h1>
          <p style={{ color: "#9CA3AF", fontWeight: 600 }}>
            Welcome back! Sign in to manage your classroom
          </p>
        </div>

        {/* Demo Account Info */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#FFE5A5]/20 to-[#AEE6FF]/20 border-2 border-[#FFE5A5]/30">
          <p className="text-sm mb-2" style={{ color: "#4A5568", fontWeight: 700 }}>
            📝 Demo Account:
          </p>
          <p className="text-xs" style={{ color: "#6B7280", fontWeight: 600 }}>
            Email: <span style={{ color: "#8B7AB8", fontWeight: 700 }}>habiba@gmail.com</span>
          </p>
          <p className="text-xs" style={{ color: "#6B7280", fontWeight: 600 }}>
            Password: <span style={{ color: "#8B7AB8", fontWeight: 700 }}>Habiba2003</span>
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

        {/* Email Field */}
        <div className="mb-6">
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
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#A896C9] outline-none transition-colors"
              style={{ fontWeight: 600 }}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-8">
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
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter your password"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#A896C9] outline-none transition-colors"
              style={{ fontWeight: 600 }}
            />
          </div>
        </div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          className="w-full py-4 rounded-2xl text-white mb-6 flex items-center justify-center gap-2"
          style={{ backgroundColor: "#A896C9", fontWeight: 700, fontSize: "18px" }}
        >
          <LogIn size={24} />
          Sign In
        </motion.button>

        {/* Signup Link */}
        {onSignup && (
          <div className="text-center">
            <p style={{ color: "#6B7280", fontWeight: 600 }}>
              Don't have an account?{" "}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onSignup}
                style={{ color: "#A896C9", fontWeight: 700 }}
              >
                Sign Up
              </motion.button>
            </p>
          </div>
        )}

        {/* Demo Account Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 rounded-2xl text-center"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <p className="text-base" style={{ color: "#6B7280", fontWeight: 600 }}>
            💡 Demo Account: <span style={{ color: "#4A5568", fontWeight: 700 }}>habiba@gmail.com</span> / <span style={{ color: "#4A5568", fontWeight: 700 }}>Habiba2003</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
