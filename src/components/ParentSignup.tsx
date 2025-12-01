import { useState } from "react";
import { motion } from "motion/react";
import { User, Mail, Lock, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { useParentContext } from "../context/ParentContext";

interface ParentSignupProps {
  onSignup: () => void;
  onBack: () => void;
  onLogin: () => void;
}

export function ParentSignup({ onSignup, onBack, onLogin }: ParentSignupProps) {
  const { signupParent } = useParentContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): { valid: boolean; message: string } => {
    // Minimum 8 characters
    if (password.length < 8) {
      return { valid: false, message: "Password must be at least 8 characters long" };
    }

    // Must contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: "Password must contain at least one uppercase letter" };
    }

    // Must contain at least one number
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: "Password must contain at least one number" };
    }

    return { valid: true, message: "" };
  };

  const handleSignup = () => {
    setError("");
    
    if (!name || !email || !password || !confirmPassword || !studentCode) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate student code exists
    const studentAccounts = JSON.parse(localStorage.getItem("studentAccounts") || "[]");
    const studentExists = studentAccounts.find((s: any) => s.studentCode === studentCode);
    
    if (!studentExists) {
      setError("Invalid student code. Please check and try again.");
      return;
    }

    const signupSuccess = signupParent(name, email, password, studentCode);
    
    if (signupSuccess) {
      setSuccess(true);
      setTimeout(() => {
        onSignup();
      }, 3000);
    } else {
      setError("Email already exists. Please use a different email.");
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white rounded-3xl p-16" 
          style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)", maxWidth: "600px" }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="text-8xl mb-8"
          >
            ✅
          </motion.div>
          <h2 className="text-4xl mb-4" style={{ fontWeight: 800, color: "#4A5568" }}>
            Account Created!
          </h2>
          <p className="text-lg mb-6" style={{ color: "#6B7280", fontWeight: 600 }}>
            Your parent account has been successfully linked to your child's account
          </p>
          <p style={{ color: "#6B7280", fontWeight: 600 }}>
            Redirecting to login...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] flex items-center justify-center px-8 py-12">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white rounded-2xl"
        style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }}
      >
        <ArrowLeft size={20} color="#6B7280" />
        <span style={{ fontWeight: 600, color: "#6B7280" }}>Back</span>
      </motion.button>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-3xl p-12" style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)" }}>
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block text-7xl mb-6"
            >
              👨‍👩‍👧‍👦
            </motion.div>
            <h1 className="text-4xl mb-3" style={{ fontWeight: 800, color: "#4A5568" }}>
              Create Parent Account
            </h1>
            <p className="text-lg" style={{ color: "#6B7280", fontWeight: 500 }}>
              Join to monitor your child's progress
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-5 bg-red-50 rounded-2xl flex items-start gap-3"
            >
              <AlertCircle size={24} color="#EF4444" className="flex-shrink-0 mt-1" />
              <span style={{ color: "#EF4444", fontWeight: 600, fontSize: "16px" }}>{error}</span>
            </motion.div>
          )}

          {/* Name Input */}
          <div className="mb-6">
            <label className="block mb-3 text-lg" style={{ fontWeight: 600, color: "#4A5568" }}>
              Full Name *
            </label>
            <div className="relative">
              <User
                size={24}
                color="#9CA3AF"
                className="absolute left-5 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-16 pr-5 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none transition-colors"
                style={{ fontWeight: 500 }}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block mb-3 text-lg" style={{ fontWeight: 600, color: "#4A5568" }}>
              Email Address *
            </label>
            <div className="relative">
              <Mail
                size={24}
                color="#9CA3AF"
                className="absolute left-5 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@domain.com"
                className="w-full pl-16 pr-5 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none transition-colors"
                style={{ fontWeight: 500 }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block mb-3 text-lg" style={{ fontWeight: 600, color: "#4A5568" }}>
              Password *
            </label>
            <div className="relative">
              <Lock
                size={24}
                color="#9CA3AF"
                className="absolute left-5 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full pl-16 pr-5 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none transition-colors"
                style={{ fontWeight: 500 }}
              />
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-sm" style={{ color: "#9CA3AF" }}>Password must contain:</p>
              <ul className="text-sm space-y-1 ml-4" style={{ color: "#9CA3AF" }}>
                <li className="flex items-center gap-2">
                  {password.length >= 8 ? (
                    <CheckCircle size={14} color="#10B981" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                  )}
                  At least 8 characters
                </li>
                <li className="flex items-center gap-2">
                  {/[A-Z]/.test(password) ? (
                    <CheckCircle size={14} color="#10B981" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                  )}
                  One uppercase letter
                </li>
                <li className="flex items-center gap-2">
                  {/[0-9]/.test(password) ? (
                    <CheckCircle size={14} color="#10B981" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                  )}
                  One number
                </li>
              </ul>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label className="block mb-3 text-lg" style={{ fontWeight: 600, color: "#4A5568" }}>
              Confirm Password *
            </label>
            <div className="relative">
              <Lock
                size={24}
                color="#9CA3AF"
                className="absolute left-5 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full pl-16 pr-5 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none transition-colors"
                style={{ fontWeight: 500 }}
              />
            </div>
          </div>

          {/* Student Code Input */}
          <div className="mb-8">
            <label className="block mb-3 text-lg" style={{ fontWeight: 600, color: "#4A5568" }}>
              Child's Student Code *
            </label>
            <div className="relative">
              <User
                size={24}
                color="#9CA3AF"
                className="absolute left-5 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                placeholder="STU-XXXXX-XXXXXX"
                className="w-full pl-16 pr-5 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-[#C9B6E4] outline-none transition-colors"
                style={{ fontWeight: 500 }}
              />
            </div>
            <p className="text-sm mt-2" style={{ color: "#9CA3AF" }}>
              Enter the unique code provided when your child created their account
            </p>
          </div>

          {/* Signup Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignup}
            className="w-full py-5 rounded-2xl text-white text-lg mb-6"
            style={{
              backgroundColor: "#C9B6E4",
              boxShadow: "0 4px 16px rgba(201, 182, 228, 0.3)",
              fontWeight: 700
            }}
          >
            Create Account
          </motion.button>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-base" style={{ color: "#6B7280", fontWeight: 500 }}>
              Already have an account?{" "}
            </span>
            <button
              onClick={onLogin}
              className="text-base"
              style={{ color: "#C9B6E4", fontWeight: 700 }}
            >
              Log In
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}