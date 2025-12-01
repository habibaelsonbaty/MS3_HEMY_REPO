import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, User, ArrowLeft, UserPlus, Copy, CheckCircle } from "lucide-react";
import { useAppContext } from "../context/AppContext";

interface StudentSignupProps {
  onSignup: () => void;
  onBack: () => void;
  onLogin: () => void;
}

export function StudentSignup({ onSignup, onBack, onLogin }: StudentSignupProps) {
  const { signupStudent } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  };

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters with 1 uppercase and 1 number");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const code = signupStudent(name, email, password);
    if (code) {
      setStudentCode(code);
      setShowCode(true);
    } else {
      setError("Email already exists");
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(studentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback method using a temporary textarea
      const textarea = document.createElement("textarea");
      textarea.value = studentCode;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        alert(`Unable to copy. Please save this code manually: ${studentCode}`);
      }
      document.body.removeChild(textarea);
    }
  };

  const handleContinue = () => {
    onSignup();
  };

  if (showCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white rounded-3xl p-8 text-center" style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)" }}>
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl mb-2" style={{ fontWeight: 800, color: "#4A5568" }}>
              Account Created!
            </h1>
            <p className="mb-6" style={{ color: "#6B7280", fontWeight: 600 }}>
              Your unique student code is:
            </p>

            <div className="bg-gradient-to-br from-[#FFB7C5] to-[#FFE5A5] rounded-2xl p-6 mb-6">
              <p className="text-3xl mb-3" style={{ fontWeight: 800, color: "#4A5568", letterSpacing: "2px" }}>
                {studentCode}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyCode}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl mx-auto"
                style={{ fontWeight: 600, color: "#4A5568" }}
              >
                {copied ? <CheckCircle size={18} color="#10B981" /> : <Copy size={18} />}
                {copied ? "Copied!" : "Copy Code"}
              </motion.button>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 mb-6">
              <p className="text-sm" style={{ color: "#4A5568", fontWeight: 600 }}>
                ⚠️ Save this code! Your parent will need it to link their account to yours.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              className="w-full py-4 rounded-2xl text-white"
              style={{ backgroundColor: "#A896C9", fontWeight: 700, boxShadow: "0 4px 16px rgba(168, 150, 201, 0.3)" }}
            >
              Continue to Login
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1FF] to-[#F7F5FF] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl mb-6"
          style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }}
        >
          <ArrowLeft size={20} color="#6B7280" />
          <span style={{ fontWeight: 600, color: "#6B7280" }}>Back</span>
        </motion.button>

        {/* Signup Card */}
        <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)" }}>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-3xl mb-2" style={{ fontWeight: 800, color: "#4A5568" }}>
              Student Signup
            </h1>
            <p style={{ color: "#9CA3AF", fontWeight: 600 }}>
              Create your account and start learning!
            </p>
          </div>

          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="flex items-center gap-2 mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                <User size={18} color="#A896C9" />
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#A896C9] outline-none"
                style={{ fontWeight: 600 }}
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="flex items-center gap-2 mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                <Mail size={18} color="#A896C9" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#A896C9] outline-none"
                style={{ fontWeight: 600 }}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="flex items-center gap-2 mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                <Lock size={18} color="#A896C9" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="At least 8 characters"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#A896C9] outline-none"
                style={{ fontWeight: 600 }}
              />
              <p className="text-sm mt-1" style={{ color: "#9CA3AF", fontWeight: 600 }}>
                Minimum 8 characters, 1 uppercase, 1 number
              </p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="flex items-center gap-2 mb-2" style={{ fontWeight: 600, color: "#4A5568" }}>
                <Lock size={18} color="#A896C9" />
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-[#A896C9] outline-none"
                style={{ fontWeight: 600 }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 rounded-2xl"
              >
                <p style={{ color: "#EF4444", fontWeight: 600, fontSize: "14px" }}>
                  {error}
                </p>
              </motion.div>
            )}

            {/* Signup Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignup}
              className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2"
              style={{ backgroundColor: "#A896C9", fontWeight: 700, boxShadow: "0 4px 16px rgba(168, 150, 201, 0.3)" }}
            >
              <UserPlus size={20} />
              Create Account
            </motion.button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p style={{ color: "#6B7280", fontWeight: 600 }}>
                Already have an account?{" "}
                <button
                  onClick={onLogin}
                  className="text-[#A896C9] hover:underline"
                  style={{ fontWeight: 700 }}
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
