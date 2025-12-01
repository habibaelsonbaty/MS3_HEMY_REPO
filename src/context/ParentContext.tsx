import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getMessagesForUser, addMessage as addGlobalMessage, addReply as addGlobalReply } from "../utils/messageStore";

interface ParentAccount {
  id: string;
  name: string;
  email: string;
  linkedStudents: string[]; // Student IDs
  studentCode: string; // Student code for linking
}

interface Feedback {
  id: string;
  from: string;
  subject: string;
  message: string;
  date: string;
  replies: { from: string; message: string; date: string }[];
}

interface ScreenTimeData {
  date: string;
  minutes: number;
}

interface AttendanceData {
  date: string;
  active: boolean;
}

interface ParentContextType {
  isParentLoggedIn: boolean;
  currentParent: ParentAccount | null;
  loginParent: (email: string, password: string) => boolean;
  signupParent: (name: string, email: string, password: string, studentCode?: string) => boolean;
  logoutParent: () => void;
  linkStudent: (studentId: string) => void;
  updateParentInfo: (name: string, email: string, password?: string) => void;
  feedbacks: Feedback[];
  addFeedbackReply: (feedbackId: string, message: string) => void;
  sendNewMessage: (teacher: string, subject: string, message: string) => void;
  screenTimeData: ScreenTimeData[];
  attendanceData: AttendanceData[];
  weeklyProgressData: { subject: string; completed: number }[];
  xpOverTime: { week: string; xp: number }[];
  screenTimeLimit: number;
  setScreenTimeLimit: (limit: number) => void;
  dailyLimitEnabled: boolean;
  setDailyLimitEnabled: (enabled: boolean) => void;
  weeklyLimitEnabled: boolean;
  setWeeklyLimitEnabled: (enabled: boolean) => void;
  weeklyLimit: number;
  setWeeklyLimit: (limit: number) => void;
  getLinkedStudentData: () => {
    name: string;
    code: string;
    avatar: string;
    pet: string;
    totalXP: number;
    completedLessons: any[];
    badges: any[];
  } | null;
}

const ParentContext = createContext<ParentContextType | undefined>(undefined);

export function ParentProvider({ children }: { children: ReactNode }) {
  const [isParentLoggedIn, setIsParentLoggedIn] = useState(false);
  const [currentParent, setCurrentParent] = useState<ParentAccount | null>(null);

  // Mock feedbacks
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: "1",
      from: "Ms. Rodriguez (Math Teacher)",
      subject: "Mathematics",
      message: "Your child is doing excellent work in Mathematics! They've shown great improvement in problem-solving skills and always participate actively in class.",
      date: "2025-11-20",
      replies: []
    },
    {
      id: "2",
      from: "Mr. Chen (Science Teacher)",
      subject: "Science",
      message: "Great progress in Science experiments! Your child shows curiosity and follows safety procedures well.",
      date: "2025-11-18",
      replies: [
        {
          from: "You",
          message: "Thank you for the update! We're so proud of their progress.",
          date: "2025-11-19"
        }
      ]
    }
  ]);

  // Dynamic screen time and attendance data
  const [screenTimeData, setScreenTimeData] = useState<ScreenTimeData[]>([]);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [weeklyProgressData, setWeeklyProgressData] = useState<{ subject: string; completed: number }[]>([]);
  const [xpOverTime, setXpOverTime] = useState<{ week: string; xp: number }[]>([]);

  // Initialize hardcoded parent account
  useEffect(() => {
    const parents = JSON.parse(localStorage.getItem("parentAccounts") || "[]");
    const hardcodedExists = parents.some((p: any) => p.email === "hazem@gmail.com");
    
    if (!hardcodedExists) {
      const hardcodedParent = {
        id: "hardcoded-parent-1",
        name: "Hazem",
        email: "hazem@gmail.com",
        password: "Hazem123",
        linkedStudents: ["STU-GAMILA-ABC123"],
        studentCode: "STU-GAMILA-ABC123"
      };
      parents.push(hardcodedParent);
      localStorage.setItem("parentAccounts", JSON.stringify(parents));
    }
  }, []);

  // Load parent session from localStorage
  useEffect(() => {
    const savedParent = localStorage.getItem("currentParent");
    if (savedParent) {
      setCurrentParent(JSON.parse(savedParent));
      setIsParentLoggedIn(true);
    }
  }, []);
  
  // Save parent data whenever it changes
  useEffect(() => {
    if (isParentLoggedIn && currentParent) {
      const parentDataKey = `parentData_${currentParent.id}`;
      const dataToSave = {
        feedbacks,
        screenTimeData,
        attendanceData,
        weeklyProgressData,
        xpOverTime
      };
      localStorage.setItem(parentDataKey, JSON.stringify(dataToSave));
    }
  }, [isParentLoggedIn, currentParent, feedbacks, screenTimeData, attendanceData, weeklyProgressData, xpOverTime]);

  const loginParent = (email: string, password: string): boolean => {
    // Check localStorage for parent accounts
    const parents = JSON.parse(localStorage.getItem("parentAccounts") || "[]");
    const parent = parents.find((p: any) => p.email === email && p.password === password);
    
    if (parent) {
      const parentAccount: ParentAccount = {
        id: parent.id,
        name: parent.name,
        email: parent.email,
        linkedStudents: parent.linkedStudents || [],
        studentCode: parent.studentCode || ""
      };
      setCurrentParent(parentAccount);
      setIsParentLoggedIn(true);
      localStorage.setItem("currentParent", JSON.stringify(parentAccount));
      
      // Load parent-specific data from localStorage
      const parentDataKey = `parentData_${parent.id}`;
      const savedData = localStorage.getItem(parentDataKey);
      
      if (savedData) {
        const data = JSON.parse(savedData);
        setFeedbacks(data.feedbacks || []);
        setScreenTimeData(data.screenTimeData || []);
        setAttendanceData(data.attendanceData || []);
        setWeeklyProgressData(data.weeklyProgressData || []);
        setXpOverTime(data.xpOverTime || []);
      } else {
        // Initialize with demo data for Hazem, empty for new parents
        if (email === "hazem@gmail.com") {
          setFeedbacks([
            {
              id: "1",
              from: "Ms. Rodriguez (Math Teacher)",
              subject: "Mathematics",
              message: "Your child is doing excellent work in Mathematics! They've shown great improvement in problem-solving skills and always participate actively in class.",
              date: "2025-11-20",
              replies: []
            },
            {
              id: "2",
              from: "Mr. Chen (Science Teacher)",
              subject: "Science",
              message: "Great progress in Science experiments! Your child shows curiosity and follows safety procedures well.",
              date: "2025-11-18",
              replies: [
                {
                  from: "You",
                  message: "Thank you for the update! We're so proud of their progress.",
                  date: "2025-11-19"
                }
              ]
            }
          ]);
          
          // Demo screen time data
          setScreenTimeData([
            { date: "Mon", minutes: 45 },
            { date: "Tue", minutes: 62 },
            { date: "Wed", minutes: 38 },
            { date: "Thu", minutes: 55 },
            { date: "Fri", minutes: 71 },
            { date: "Sat", minutes: 85 },
            { date: "Sun", minutes: 52 }
          ]);
          
          // Demo attendance data
          const demoAttendance: AttendanceData[] = [];
          const today = new Date();
          for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            demoAttendance.push({
              date: date.toISOString().split('T')[0],
              active: Math.random() > 0.15
            });
          }
          setAttendanceData(demoAttendance);
          
          // Demo weekly progress
          setWeeklyProgressData([
            { subject: "Mathematics", completed: 6 },
            { subject: "Science", completed: 4 },
            { subject: "Art", completed: 3 }
          ]);
          
          // Demo XP over time
          setXpOverTime([
            { week: "Week 1", xp: 450 },
            { week: "Week 2", xp: 680 },
            { week: "Week 3", xp: 920 },
            { week: "Week 4", xp: 1250 }
          ]);
        } else {
          // New parent - empty data
          setFeedbacks([]);
          setScreenTimeData([]);
          setAttendanceData([]);
          setWeeklyProgressData([]);
          setXpOverTime([]);
        }
      }
      
      return true;
    }
    
    return false;
  };

  const signupParent = (name: string, email: string, password: string, studentCode?: string): boolean => {
    const parents = JSON.parse(localStorage.getItem("parentAccounts") || "[]");
    
    // Check if email already exists
    if (parents.some((p: any) => p.email === email)) {
      return false;
    }
    
    // If student code provided, verify it exists
    let linkedStudentCode = "";
    if (studentCode) {
      const students = JSON.parse(localStorage.getItem("studentAccounts") || "[]");
      const student = students.find((s: any) => s.studentCode === studentCode);
      if (student) {
        linkedStudentCode = studentCode;
      }
    }
    
    const newParent = {
      id: `parent-${Date.now()}`,
      name,
      email,
      password,
      linkedStudents: linkedStudentCode ? [linkedStudentCode] : [],
      studentCode: linkedStudentCode
    };
    
    parents.push(newParent);
    localStorage.setItem("parentAccounts", JSON.stringify(parents));
    
    return true;
  };

  const logoutParent = () => {
    setCurrentParent(null);
    setIsParentLoggedIn(false);
    localStorage.removeItem("currentParent");
  };

  const linkStudent = (studentId: string) => {
    if (currentParent) {
      const updatedParent = {
        ...currentParent,
        linkedStudents: [...currentParent.linkedStudents, studentId]
      };
      setCurrentParent(updatedParent);
      localStorage.setItem("currentParent", JSON.stringify(updatedParent));
      
      // Update in parentAccounts
      const parents = JSON.parse(localStorage.getItem("parentAccounts") || "[]");
      const updatedParents = parents.map((p: any) => 
        p.id === currentParent.id ? { ...p, linkedStudents: updatedParent.linkedStudents } : p
      );
      localStorage.setItem("parentAccounts", JSON.stringify(updatedParents));
    }
  };

  const updateParentInfo = (name: string, email: string, password?: string) => {
    if (currentParent) {
      const updatedParent = {
        ...currentParent,
        name,
        email,
        password: password || currentParent.password
      };
      setCurrentParent(updatedParent);
      localStorage.setItem("currentParent", JSON.stringify(updatedParent));
      
      // Update in parentAccounts
      const parents = JSON.parse(localStorage.getItem("parentAccounts") || "[]");
      const updatedParents = parents.map((p: any) => 
        p.id === currentParent.id ? { ...p, name, email, password: password || p.password } : p
      );
      localStorage.setItem("parentAccounts", JSON.stringify(updatedParents));
    }
  };

  const addFeedbackReply = (feedbackId: string, message: string) => {
    if (!currentParent) return;
    
    // Add reply to global message store
    addGlobalReply(feedbackId, {
      from: currentParent.email,
      fromType: "parent",
      message
    });
    
    // Update local state
    setFeedbacks(prevFeedbacks =>
      prevFeedbacks.map(feedback =>
        feedback.id === feedbackId
          ? {
              ...feedback,
              replies: [
                ...feedback.replies,
                {
                  from: "You",
                  message,
                  date: new Date().toISOString().split('T')[0]
                }
              ]
            }
          : feedback
      )
    );
  };

  const sendNewMessage = (teacher: string, subject: string, message: string) => {
    if (!currentParent) return;
    
    // Find teacher email - check both registered teachers and hardcoded ones
    const teachers = JSON.parse(localStorage.getItem("teacherAccounts") || "[]");
    
    // Always include Habiba and hardcoded teachers
    const habibaTeacher = { name: "Habiba", email: "habiba@gmail.com", subject: "Math" };
    const hardcodedTeachers = [
      habibaTeacher,
      { name: "Dr. Emily Brown", email: "emily.brown@school.com", subject: "Science" },
      { name: "Ms. Sarah Johnson", email: "sarah.johnson@school.com", subject: "English" },
      { name: "Mr. David Chen", email: "david.chen@school.com", subject: "Art" }
    ];
    
    // Combine all teachers
    const allTeachers = [...teachers, ...hardcodedTeachers];
    
    const teacherAccount = allTeachers.find((t: any) => t.name.toLowerCase() === teacher.toLowerCase());
    
    if (teacherAccount) {
      // Add to global message store
      addGlobalMessage({
        from: currentParent.email,
        fromType: "parent",
        to: teacherAccount.email,
        toType: "teacher",
        subject,
        message
      });
    }
  };

  const [screenTimeLimit, setScreenTimeLimit] = useState(60);
  const [dailyLimitEnabled, setDailyLimitEnabled] = useState(false);
  const [weeklyLimitEnabled, setWeeklyLimitEnabled] = useState(false);
  const [weeklyLimit, setWeeklyLimit] = useState(300);

  // Sync messages from global store
  useEffect(() => {
    if (isParentLoggedIn && currentParent) {
      const syncMessages = () => {
        const globalMessages = getMessagesForUser(currentParent.email, "parent");
        const formattedFeedbacks: Feedback[] = globalMessages.map(m => {
          // Determine who the message is from/to based on parent's perspective
          let displayFrom: string;
          const teachers = JSON.parse(localStorage.getItem("teacherAccounts") || "[]");
          
          // Always include Habiba and hardcoded teachers
          const habibaTeacher = { name: "Habiba", email: "habiba@gmail.com", subject: "Math" };
          const hardcodedTeachers = [
            habibaTeacher,
            { name: "Dr. Emily Brown", email: "emily.brown@school.com", subject: "Science" },
            { name: "Ms. Sarah Johnson", email: "sarah.johnson@school.com", subject: "English" },
            { name: "Mr. David Chen", email: "david.chen@school.com", subject: "Art" }
          ];
          
          // Combine all teachers
          const allTeachers = [...teachers, ...hardcodedTeachers];
          
          if (m.fromType === "parent" && m.from.toLowerCase() === currentParent.email.toLowerCase()) {
            // Message sent BY this parent TO a teacher
            // Find teacher name and subject from email
            const teacher = allTeachers.find((t: any) => t.email.toLowerCase() === m.to.toLowerCase());
            const teacherName = teacher ? teacher.name : m.to;
            const teacherSubject = teacher ? teacher.subject : "Teacher";
            displayFrom = `To: ${teacherName} (${teacherSubject} Teacher)`;
          } else if (m.fromType === "teacher") {
            // Message sent FROM a teacher TO this parent
            // Find teacher name and subject from email
            const teacher = allTeachers.find((t: any) => t.email.toLowerCase() === m.from.toLowerCase());
            const teacherName = teacher ? teacher.name : m.from;
            const teacherSubject = teacher ? teacher.subject : "Teacher";
            displayFrom = `${teacherName} (${teacherSubject} Teacher)`;
          } else {
            displayFrom = m.from;
          }
          
          return {
            id: m.id,
            from: displayFrom,
            subject: m.subject,
            message: m.message,
            date: new Date(m.timestamp).toLocaleDateString(),
            replies: m.replies.map(r => ({
              from: r.fromType === "parent" ? "You" : r.fromType === "teacher" ? "Teacher" : "Student",
              message: r.message,
              date: new Date(r.timestamp).toLocaleDateString()
            }))
          };
        });
        setFeedbacks(formattedFeedbacks);
      };
      
      syncMessages();
      
      // Poll for new messages every 2 seconds
      const interval = setInterval(syncMessages, 2000);
      return () => clearInterval(interval);
    }
  }, [isParentLoggedIn, currentParent]);

  const getLinkedStudentData = () => {
    if (!currentParent || !currentParent.studentCode) {
      return null;
    }
    
    // Find student account by studentCode
    const students = JSON.parse(localStorage.getItem("studentAccounts") || "[]");
    const student = students.find((s: any) => s.studentCode === currentParent.studentCode);
    
    if (!student) {
      return null;
    }
    
    // Load student's progress data
    const studentDataKey = `studentData_${student.id}`;
    const studentData = JSON.parse(localStorage.getItem(studentDataKey) || "{}");
    
    return {
      name: student.name,
      code: student.studentCode,
      avatar: studentData.avatar || "😊",
      pet: studentData.pet || "🐰",
      totalXP: studentData.totalXP || 0,
      completedLessons: studentData.completedLessons || [],
      badges: studentData.badges || []
    };
  };

  return (
    <ParentContext.Provider
      value={{
        isParentLoggedIn,
        currentParent,
        loginParent,
        signupParent,
        logoutParent,
        linkStudent,
        updateParentInfo,
        feedbacks,
        addFeedbackReply,
        sendNewMessage,
        screenTimeData,
        attendanceData,
        weeklyProgressData,
        xpOverTime,
        screenTimeLimit,
        setScreenTimeLimit,
        dailyLimitEnabled,
        setDailyLimitEnabled,
        weeklyLimitEnabled,
        setWeeklyLimitEnabled,
        weeklyLimit,
        setWeeklyLimit,
        getLinkedStudentData
      }}
    >
      {children}
    </ParentContext.Provider>
  );
}

export function useParentContext() {
  const context = useContext(ParentContext);
  if (!context) {
    throw new Error("useParentContext must be used within ParentProvider");
  }
  return context;
}