import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import { useParentContext } from "../context/ParentContext";

interface ParentLoginProps {
  onLogin: () => void;
  onBack: () => void;
  onSignup: () => void;
}

export function ParentLogin({ onLogin, onBack, onSignup }: ParentLoginProps) {
  const { loginParent } = useParentContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = loginParent(email, password);
    
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
          <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
          <h1 className="text-3xl mb-2" style={{ fontWeight: 800, color: "#4A5568" }}>
            Parent Login
          </h1>
          <p style={{ color: "#9CA3AF", fontWeight: 600 }}>
            Welcome back! Monitor your child's learning journey
          </p>
        </div>

        {/* Demo Account Info */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#C9B6E4]/20 to-[#FFE5A5]/20 border-2 border-[#C9B6E4]/30">
          <p className="text-sm mb-2" style={{ color: "#4A5568", fontWeight: 700 }}>
            📝 Demo Account:
          </p>
          <p className="text-xs" style={{ color: "#6B7280", fontWeight: 600 }}>
            Email: <span style={{ color: "#C9B6E4", fontWeight: 700 }}>hazem@gmail.com</span>
          </p>
          <p className="text-xs" style={{ color: "#6B7280", fontWeight: 600 }}>
            Password: <span style={{ color: "#C9B6E4", fontWeight: 700 }}>Hazem123</span>
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
              color="#C9B6E4"
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@example.com"
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none"
              style={{ fontWeight: 600 }}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
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
              color="#C9B6E4"
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none"
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
            background: "linear-gradient(135deg, #C9B6E4 0%, #A896C9 100%)",
            fontWeight: 700,
            boxShadow: "0 8px 24px rgba(201, 182, 228, 0.4)"
          }}
        >
          Log In
        </motion.button>

        {/* Signup Link */}
        <div className="text-center">
          <p style={{ color: "#6B7280", fontWeight: 600 }}>
            Don't have an account?{" "}
            <button
              onClick={onSignup}
              className="text-[#C9B6E4] hover:underline"
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
