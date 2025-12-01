import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, ArrowLeft, LogIn, AlertCircle } from "lucide-react";
import { useAppContext } from "../context/AppContext";

interface StudentLoginProps {
  onLogin: () => void;
  onBack: () => void;
  onSignup: () => void;
}

export function StudentLogin({ onLogin, onBack, onSignup }: StudentLoginProps) {
  const { loginStudent } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = loginStudent(email, password);
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
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-3xl mb-2" style={{ fontWeight: 800, color: "#4A5568" }}>
            Student Login
          </h1>
          <p style={{ color: "#9CA3AF", fontWeight: 600 }}>
            Welcome back! Let's continue your learning journey
          </p>
        </div>

        {/* Demo Account Info */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#FFB7C5]/20 to-[#AEE6FF]/20 border-2 border-[#FFB7C5]/30">
          <p className="text-sm mb-2" style={{ color: "#4A5568", fontWeight: 700 }}>
            📝 Demo Account:
          </p>
          <p className="text-xs" style={{ color: "#6B7280", fontWeight: 600 }}>
            Email: <span style={{ color: "#A896C9", fontWeight: 700 }}>gamila@gmail.com</span>
          </p>
          <p className="text-xs" style={{ color: "#6B7280", fontWeight: 600 }}>
            Password: <span style={{ color: "#A896C9", fontWeight: 700 }}>Gamila2003</span>
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
              color="#A896C9"
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="your.email@example.com"
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#A896C9] outline-none"
              style={{ fontWeight: 600 }}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
            Password
          </label>
          <div className="relative">
            <Lock
              size={20}
              color="#A896C9"
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter your password"
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#A896C9] outline-none"
              style={{ fontWeight: 600 }}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
        </div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2 mb-6"
          style={{
            background: "linear-gradient(135deg, #A896C9 0%, #8B7AB8 100%)",
            fontWeight: 700,
            boxShadow: "0 8px 24px rgba(168, 150, 201, 0.4)"
          }}
        >
          <LogIn size={20} />
          Login
        </motion.button>

        {/* Signup Link */}
        <div className="text-center">
          <p style={{ color: "#6B7280", fontWeight: 600 }}>
            Don't have an account?{" "}
            <button
              onClick={onSignup}
              className="text-[#A896C9] hover:underline"
              style={{ fontWeight: 700 }}
            >
              Sign up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
