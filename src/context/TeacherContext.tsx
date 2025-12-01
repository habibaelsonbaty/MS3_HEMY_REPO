import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAppContext } from "./AppContext";
import { getMessagesForUser, addMessage as addGlobalMessage, addReply as addGlobalReply, markAsRead as markGlobalMessageAsRead, GlobalMessage } from "../utils/messageStore";

export type TeacherSubject = "Math" | "Science" | "Art";
export type LearningStyle = "Visual" | "Auditory" | "Interactive";

export interface StudentInfo {
  id: string;
  name: string;
  avatar: string;
  progress: number;
  attendance: number;
  currentLesson: string;
  totalXP: number;
  completedLessons: number;
  grades: { subject: string; grade: number }[];
  learningStyleUsage: { style: LearningStyle; percentage: number }[];
  attendanceTimeline: { date: string; present: boolean }[];
  score: number;
  streak: number;
  badges: string[];
  parentInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface UploadedLesson {
  id: string;
  title: string;
  description: string;
  learningStyle: LearningStyle;
  fileName: string;
  fileType: string;
  uploadDate: string;
  engagementRate: number;
  completionRate: number;
  avgTimeSpent: number;
}

export interface Message {
  id: string;
  from: string;
  fromType?: "student" | "parent" | "teacher";
  to: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  replies: { from: string; message: string; date: string }[];
}

interface TeacherAccount {
  id: string;
  name: string;
  email: string;
  subject: TeacherSubject;
}

interface TeacherContextType {
  isTeacherLoggedIn: boolean;
  currentTeacher: TeacherAccount | null;
  loginTeacher: (email: string, password: string) => boolean;
  signupTeacher: (name: string, email: string, password: string, subject: TeacherSubject) => boolean;
  logoutTeacher: () => void;
  updateTeacherInfo: (name: string, email: string, subject: TeacherSubject, password?: string) => void;
  students: StudentInfo[];
  uploadedLessons: UploadedLesson[];
  uploadLesson: (lesson: Omit<UploadedLesson, "id" | "uploadDate" | "engagementRate" | "completionRate" | "avgTimeSpent">) => void;
  messages: Message[];
  sendMessage: (to: string, subject: string, message: string) => void;
  replyToMessage: (messageId: string, reply: string) => void;
  markAsRead: (messageId: string) => void;
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

export function TeacherProvider({ children }: { children: ReactNode }) {
  // Remove dependency on AppContext to prevent unnecessary re-renders
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<TeacherAccount | null>(null);
  
  const [uploadedLessons, setUploadedLessons] = useState<UploadedLesson[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Get Gamila's current lesson based on completed lessons and subject
  const getGamilaCurrentLesson = (subject: TeacherSubject) => {
    const mathLessons = [
      "Number Valley", "Addition Trail", "Subtraction Path", "Multiplication Hill",
      "Division Ridge", "Fraction Falls", "Decimal Forest", "Geometry Peak",
      "Algebra Summit", "Problem Solving Paradise"
    ];
    
    const scienceLessons = [
      "Solar System", "Plant Life", "Water Cycle", "Human Body",
      "Animal Kingdom", "Earth Layers", "Weather Patterns", "Chemical Reactions",
      "Ecosystems", "Energy & Motion"
    ];
    
    const artLessons = [
      "Color Theory", "Drawing Basics", "Painting Techniques", "Sculpture",
      "Digital Art", "Art History", "Portrait Drawing", "Landscape Art",
      "Abstract Art", "Creative Expression"
    ];
    
    let lessons: string[];
    let worldId: string;
    
    if (subject === "Math") {
      lessons = mathLessons;
      worldId = "math";
    } else if (subject === "Science") {
      lessons = scienceLessons;
      worldId = "science";
    } else {
      lessons = artLessons;
      worldId = "art";
    }
    
    // Load Gamila's actual completed lessons from localStorage
    const gamilaDataKey = "studentData_student-1";
    const gamilaData = localStorage.getItem(gamilaDataKey);
    let completedSubjectLessons = 0;
    
    if (gamilaData) {
      const data = JSON.parse(gamilaData);
      const completedLessons = data.completedLessons || [];
      completedSubjectLessons = completedLessons.filter((l: any) => l.worldId === worldId).length;
    }
    
    return lessons[completedSubjectLessons] || lessons[0];
  };

  // Get Gamila's student info - always visible to all teachers
  const getGamilaStudentInfo = (subject: TeacherSubject): StudentInfo => {
    // Load Gamila's actual data from localStorage
    const students = JSON.parse(localStorage.getItem("studentAccounts") || "[]");
    const gamilaAccount = students.find((s: any) => s.email === "gamila@gmail.com");
    
    if (!gamilaAccount) {
      // Fallback if Gamila's account doesn't exist
      return {
        id: "1",
        name: "Gamila",
        avatar: "👧",
        progress: 0,
        attendance: 0,
        currentLesson: "Number Valley",
        totalXP: 0,
        completedLessons: 0,
        grades: [],
        learningStyleUsage: [],
        attendanceTimeline: [],
        score: 0,
        streak: 0,
        badges: [],
        parentInfo: {
          name: "No parent linked",
          email: "N/A",
          phone: "N/A"
        }
      };
    }
    
    // Load Gamila's progress data
    const studentDataKey = `studentData_${gamilaAccount.id}`;
    const studentData = JSON.parse(localStorage.getItem(studentDataKey) || "{}");
    
    const totalXP = studentData.totalXP || 0;
    const completedLessons = studentData.completedLessons || [];
    const worldId = subject === "Math" ? "math" : subject === "Science" ? "science" : "art";
    const subjectCompletedLessons = completedLessons.filter((l: any) => l.worldId === worldId).length;
    
    const grades = [
      { subject: "Math", grade: 85 },
      { subject: "Science", grade: 90 },
      { subject: "Art", grade: 88 }
    ];
    
    const subjectGrade = grades.find(g => g.subject === subject)?.grade || 85;
    
    // Find parent info
    const parentAccounts = JSON.parse(localStorage.getItem("parentAccounts") || "[]");
    const parentAccount = parentAccounts.find((p: any) => p.studentCode === gamilaAccount.studentCode);
    
    const parentInfo = parentAccount ? {
      name: parentAccount.name,
      email: parentAccount.email,
      phone: parentAccount.phone || "123-456-7890"
    } : {
      name: "Hazem",
      email: "hazem@gmail.com",
      phone: "123-456-7890"
    };
    
    return {
      id: gamilaAccount.id,
      name: gamilaAccount.name,
      avatar: studentData.avatar || "👧",
      progress: Math.min((totalXP / 1000) * 100, 100),
      attendance: 95,
      currentLesson: getGamilaCurrentLesson(subject),
      totalXP: totalXP,
      completedLessons: subjectCompletedLessons,
      grades,
      learningStyleUsage: [
        { style: "Visual", percentage: 45 },
        { style: "Auditory", percentage: 30 },
        { style: "Interactive", percentage: 25 }
      ],
      attendanceTimeline: [
        { date: "2025-11-20", present: true },
        { date: "2025-11-21", present: true },
        { date: "2025-11-22", present: false },
        { date: "2025-11-23", present: true },
        { date: "2025-11-24", present: true },
        { date: "2025-11-25", present: true }
      ],
      score: subjectGrade,
      streak: 5,
      badges: studentData.badges ? studentData.badges.filter((b: any) => b.unlocked).map((b: any) => b.name) : ["Math Wizard", "Science Star"],
      parentInfo: parentInfo
    };
  };

  // Get demo students (only for Habiba) - subject-specific data
  const getDemoStudents = (subject: TeacherSubject): StudentInfo[] => {
    const subjectLessons: Record<TeacherSubject, string[]> = {
      Math: [
        "Number Valley", "Addition Trail", "Subtraction Path", "Multiplication Hill",
        "Division Ridge", "Fraction Falls", "Decimal Forest", "Geometry Peak",
        "Algebra Summit", "Problem Solving Paradise"
      ],
      Science: [
        "Solar System", "Plant Life", "Water Cycle", "Human Body",
        "Animal Kingdom", "Earth Layers", "Weather Patterns", "Chemical Reactions",
        "Ecosystems", "Energy & Motion"
      ],
      Art: [
        "Color Theory", "Drawing Basics", "Painting Techniques", "Sculpture",
        "Digital Art", "Art History", "Portrait Drawing", "Landscape Art",
        "Abstract Art", "Creative Expression"
      ]
    };
    
    const lessons = subjectLessons[subject];
    
    return [
      {
        id: "2",
        name: "Emma Wilson",
        avatar: "👧",
        progress: 78,
        attendance: 92,
        currentLesson: lessons[6] || lessons[0],
        totalXP: 780,
        completedLessons: 12,
        grades: [
          { subject: "Math", grade: 82 },
          { subject: "Science", grade: 85 },
          { subject: "Art", grade: 91 }
        ],
        learningStyleUsage: [
          { style: "Visual", percentage: 55 },
          { style: "Auditory", percentage: 25 },
          { style: "Interactive", percentage: 20 }
        ],
        attendanceTimeline: [
          { date: "2025-11-20", present: true },
          { date: "2025-11-21", present: true },
          { date: "2025-11-22", present: true },
          { date: "2025-11-23", present: false },
          { date: "2025-11-24", present: true },
          { date: "2025-11-25", present: true }
        ],
        score: subject === "Math" ? 82 : subject === "Science" ? 85 : 91,
        streak: 4,
        badges: [subject === "Math" ? "Geometry Guru" : subject === "Science" ? "Science Explorer" : "Art Master"],
        parentInfo: {
          name: "John Wilson",
          email: "john.wilson@example.com",
          phone: "098-765-4321"
        }
      },
      {
        id: "3",
        name: "Liam Johnson",
        avatar: "🧒",
        progress: 92,
        attendance: 98,
        currentLesson: lessons[8] || lessons[0],
        totalXP: 920,
        completedLessons: 15,
        grades: [
          { subject: "Math", grade: 95 },
          { subject: "Science", grade: 92 },
          { subject: "Art", grade: 87 }
        ],
        learningStyleUsage: [
          { style: "Visual", percentage: 35 },
          { style: "Auditory", percentage: 40 },
          { style: "Interactive", percentage: 25 }
        ],
        attendanceTimeline: [
          { date: "2025-11-20", present: true },
          { date: "2025-11-21", present: true },
          { date: "2025-11-22", present: true },
          { date: "2025-11-23", present: true },
          { date: "2025-11-24", present: true },
          { date: "2025-11-25", present: true }
        ],
        score: subject === "Math" ? 95 : subject === "Science" ? 92 : 87,
        streak: 6,
        badges: [subject === "Math" ? "Algebra Ace" : subject === "Science" ? "Lab Expert" : "Creative Genius"],
        parentInfo: {
          name: "Emily Johnson",
          email: "emily.johnson@example.com",
          phone: "555-123-4567"
        }
      },
      {
        id: "4",
        name: "Sophia Martinez",
        avatar: "👩",
        progress: 65,
        attendance: 88,
        currentLesson: lessons[2] || lessons[0],
        totalXP: 650,
        completedLessons: 10,
        grades: [
          { subject: "Math", grade: 78 },
          { subject: "Science", grade: 80 },
          { subject: "Art", grade: 93 }
        ],
        learningStyleUsage: [
          { style: "Visual", percentage: 60 },
          { style: "Auditory", percentage: 20 },
          { style: "Interactive", percentage: 20 }
        ],
        attendanceTimeline: [
          { date: "2025-11-20", present: true },
          { date: "2025-11-21", present: false },
          { date: "2025-11-22", present: true },
          { date: "2025-11-23", present: true },
          { date: "2025-11-24", present: false },
          { date: "2025-11-25", present: true }
        ],
        score: subject === "Math" ? 78 : subject === "Science" ? 80 : 93,
        streak: 3,
        badges: [subject === "Math" ? "Equation Expert" : subject === "Science" ? "Nature Explorer" : "Color Master"],
        parentInfo: {
          name: "Carlos Martinez",
          email: "carlos.martinez@example.com",
          phone: "111-222-3333"
        }
      },
      {
        id: "5",
        name: "Noah Brown",
        avatar: "🧑",
        progress: 88,
        attendance: 94,
        currentLesson: lessons[5] || lessons[0],
        totalXP: 880,
        completedLessons: 14,
        grades: [
          { subject: "Math", grade: 88 },
          { subject: "Science", grade: 86 },
          { subject: "Art", grade: 84 }
        ],
        learningStyleUsage: [
          { style: "Visual", percentage: 40 },
          { style: "Auditory", percentage: 35 },
          { style: "Interactive", percentage: 25 }
        ],
        attendanceTimeline: [
          { date: "2025-11-20", present: true },
          { date: "2025-11-21", present: true },
          { date: "2025-11-22", present: true },
          { date: "2025-11-23", present: true },
          { date: "2025-11-24", present: false },
          { date: "2025-11-25", present: true }
        ],
        score: subject === "Math" ? 88 : subject === "Science" ? 86 : 84,
        streak: 5,
        badges: [subject === "Math" ? "Word Problem Wizard" : subject === "Science" ? "Space Cadet" : "Sketch Artist"],
        parentInfo: {
          name: "Laura Brown",
          email: "laura.brown@example.com",
          phone: "444-555-6666"
        }
      }
    ];
  };

  // Get all registered students from localStorage with their actual progress
  const getAllStudentsWithProgress = (subject: TeacherSubject): StudentInfo[] => {
    const studentAccounts = JSON.parse(localStorage.getItem("studentAccounts") || "[]");
    const worldId = subject === "Math" ? "math" : subject === "Science" ? "science" : "art";
    
    // Filter students by teacherId
    const filteredStudents = currentTeacher
      ? studentAccounts.filter((student: any) => student.teacherId === currentTeacher.id)
      : [];
    
    return filteredStudents.map((student: any) => {
      // Load student's progress data
      const studentDataKey = `studentData_${student.id}`;
      const studentData = JSON.parse(localStorage.getItem(studentDataKey) || "{}");
      
      const totalXP = studentData.totalXP || 0;
      const completedLessons = studentData.completedLessons || [];
      const avatar = studentData.avatar || "😊";
      const badges = studentData.badges || [];
      
      // Calculate subject-specific metrics
      const subjectCompletedLessons = completedLessons.filter((l: any) => l.worldId === worldId).length;
      
      // Calculate score based on completed lessons (0-100)
      const maxLessons = 10; // Assuming 10 lessons per subject
      const score = Math.min(Math.round((subjectCompletedLessons / maxLessons) * 100), 100);
      
      // Calculate attendance (0% if no activity)
      const attendanceTimeline = studentData.attendanceTimeline || [];
      const attendance = attendanceTimeline.length > 0
        ? Math.round((attendanceTimeline.filter((a: any) => a.present).length / attendanceTimeline.length) * 100)
        : 0;
      
      // Calculate streak (0 if no activity)
      const streak = studentData.currentStreak || 0;
      
      // Get current lesson for this subject
      const subjectLessons: Record<TeacherSubject, string[]> = {
        Math: [
          "Number Valley", "Addition Trail", "Subtraction Path", "Multiplication Hill",
          "Division Ridge", "Fraction Falls", "Decimal Forest", "Geometry Peak",
          "Algebra Summit", "Problem Solving Paradise"
        ],
        Science: [
          "Solar System", "Plant Life", "Water Cycle", "Human Body",
          "Animal Kingdom", "Earth Layers", "Weather Patterns", "Chemical Reactions",
          "Ecosystems", "Energy & Motion"
        ],
        Art: [
          "Color Theory", "Drawing Basics", "Painting Techniques", "Sculpture",
          "Digital Art", "Art History", "Portrait Drawing", "Landscape Art",
          "Abstract Art", "Creative Expression"
        ]
      };
      
      const lessons = subjectLessons[subject];
      const currentLesson = lessons[subjectCompletedLessons] || lessons[0];
      
      // Find parent info
      const parentAccounts = JSON.parse(localStorage.getItem("parentAccounts") || "[]");
      const parentAccount = parentAccounts.find((p: any) => p.studentCode === student.studentCode);
      
      const parentInfo = parentAccount ? {
        name: parentAccount.name,
        email: parentAccount.email,
        phone: parentAccount.phone || "Not provided"
      } : {
        name: "No parent linked",
        email: "N/A",
        phone: "N/A"
      };
      
      return {
        id: student.id,
        name: student.name,
        avatar: avatar,
        progress: Math.min((totalXP / 1000) * 100, 100),
        attendance: attendance,
        currentLesson: currentLesson,
        totalXP: totalXP,
        completedLessons: subjectCompletedLessons,
        grades: [
          { subject: "Math", grade: score },
          { subject: "Science", grade: score },
          { subject: "Art", grade: score }
        ],
        learningStyleUsage: [
          { style: "Visual", percentage: 33 },
          { style: "Auditory", percentage: 33 },
          { style: "Interactive", percentage: 34 }
        ],
        attendanceTimeline: attendanceTimeline,
        score: score,
        streak: streak,
        badges: badges.filter((b: any) => b.unlocked).map((b: any) => b.name),
        parentInfo: parentInfo
      };
    });
  };

  // Determine which students to show
  const students: StudentInfo[] = currentTeacher
    ? currentTeacher.email === "habiba@gmail.com" 
      ? [getGamilaStudentInfo(currentTeacher.subject), ...getDemoStudents(currentTeacher.subject)]
      : getAllStudentsWithProgress(currentTeacher.subject)
    : [];
  
  // Save teacher data whenever it changes
  useEffect(() => {
    if (isTeacherLoggedIn && currentTeacher) {
      const teacherDataKey = `teacherData_${currentTeacher.id}`;
      const dataToSave = {
        uploadedLessons,
        messages
      };
      localStorage.setItem(teacherDataKey, JSON.stringify(dataToSave));
    }
  }, [isTeacherLoggedIn, currentTeacher, uploadedLessons, messages]);

  const loginTeacher = (email: string, password: string): boolean => {
    // Check for stored teacher accounts
    const teachers = JSON.parse(localStorage.getItem("teacherAccounts") || "[]");
    const teacher = teachers.find((t: any) => t.email === email && t.password === password);
    
    // Hard-coded teacher account
    if (email === "habiba@gmail.com" && password === "Habiba2003") {
      setIsTeacherLoggedIn(true);
      const habibaTeacher = {
        id: "teacher-1",
        name: "Habiba",
        email: "habiba@gmail.com",
        subject: "Math" as TeacherSubject
      };
      setCurrentTeacher(habibaTeacher);
      
      // Ensure Habiba is in the teacherAccounts list for messaging lookup
      if (!teachers.some((t: any) => t.email === "habiba@gmail.com")) {
        teachers.push({
          id: "teacher-1",
          name: "Habiba",
          email: "habiba@gmail.com",
          password: "Habiba2003",
          subject: "Math"
        });
        localStorage.setItem("teacherAccounts", JSON.stringify(teachers));
      }
      
      // Load teacher-specific data or use demo data for Habiba
      const teacherDataKey = `teacherData_teacher-1`;
      const savedData = localStorage.getItem(teacherDataKey);
      
      if (!savedData) {
        // Initialize Habiba with demo data
        const habibaLessons: UploadedLesson[] = [
          {
            id: "1",
            title: "Number Valley",
            description: "Learn the basics of numbers with visual aids",
            learningStyle: "Visual",
            fileName: "number_valley.pdf",
            fileType: "PDF",
            uploadDate: "2025-11-15",
            engagementRate: 85,
            completionRate: 92,
            avgTimeSpent: 25
          },
          {
            id: "2",
            title: "Addition Trail",
            description: "Master addition through interactive exercises",
            learningStyle: "Interactive",
            fileName: "addition_trail.mp4",
            fileType: "Video",
            uploadDate: "2025-11-18",
            engagementRate: 78,
            completionRate: 88,
            avgTimeSpent: 30
          }
        ];
        
        const habibaMessages: Message[] = [
          {
            id: "1",
            from: "Hazem (Parent of Gamila)",
            to: "Habiba",
            subject: "Question about homework",
            message: "Hi Ms. Habiba, my daughter is having some trouble with the multiplication exercises. Could you provide some additional resources?",
            date: "2025-11-22",
            isRead: false,
            replies: []
          }
        ];
        
        setUploadedLessons(habibaLessons);
        setMessages(habibaMessages);
      } else {
        const data = JSON.parse(savedData);
        setUploadedLessons(data.uploadedLessons || []);
        setMessages(data.messages || []);
      }
      
      return true;
    } else if (teacher) {
      setIsTeacherLoggedIn(true);
      setCurrentTeacher({
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        subject: teacher.subject
      });
      
      // Load teacher-specific data
      const teacherDataKey = `teacherData_${teacher.id}`;
      const savedData = localStorage.getItem(teacherDataKey);
      
      if (savedData) {
        const data = JSON.parse(savedData);
        setUploadedLessons(data.uploadedLessons || []);
        setMessages(data.messages || []);
      } else {
        // New teacher starts with empty data
        setUploadedLessons([]);
        setMessages([]);
      }
      
      return true;
    }
    
    return false;
  };

  const signupTeacher = (name: string, email: string, password: string, subject: TeacherSubject): boolean => {
    const teachers = JSON.parse(localStorage.getItem("teacherAccounts") || "[]");
    
    // Check if email already exists
    if (teachers.some((t: any) => t.email === email)) {
      return false;
    }
    
    const newTeacher = {
      id: `teacher-${Date.now()}`,
      name,
      email,
      password,
      subject
    };
    
    teachers.push(newTeacher);
    localStorage.setItem("teacherAccounts", JSON.stringify(teachers));
    
    setIsTeacherLoggedIn(true);
    setCurrentTeacher({
      id: newTeacher.id,
      name,
      email,
      subject
    });
    
    // Initialize new teacher with empty data
    const teacherDataKey = `teacherData_${newTeacher.id}`;
    const initialData = {
      uploadedLessons: [],
      messages: []
    };
    localStorage.setItem(teacherDataKey, JSON.stringify(initialData));
    setUploadedLessons([]);
    setMessages([]);
    
    return true;
  };

  const logoutTeacher = () => {
    setIsTeacherLoggedIn(false);
    setCurrentTeacher(null);
  };

  const updateTeacherInfo = (name: string, email: string, subject: TeacherSubject, password?: string) => {
    if (currentTeacher) {
      // Preserve the original email for Habiba to maintain hardcoded student list access
      const preservedEmail = currentTeacher.id === "teacher-1" ? "habiba@gmail.com" : email;
      
      setCurrentTeacher({
        ...currentTeacher,
        name,
        email: preservedEmail,
        subject
      });
      
      // Update the teacher account in localStorage
      const teachers = JSON.parse(localStorage.getItem("teacherAccounts") || "[]");
      const updatedTeachers = teachers.map((t: any) => {
        if (t.id === currentTeacher.id) {
          return {
            ...t,
            name,
            email: preservedEmail,
            subject,
            ...(password && { password })
          };
        }
        return t;
      });
      localStorage.setItem("teacherAccounts", JSON.stringify(updatedTeachers));
    }
  };

  const uploadLesson = (lesson: Omit<UploadedLesson, "id" | "uploadDate" | "engagementRate" | "completionRate" | "avgTimeSpent">) => {
    const newLesson: UploadedLesson = {
      ...lesson,
      id: `lesson-${Date.now()}`,
      uploadDate: new Date().toISOString().split("T")[0],
      engagementRate: 0,
      completionRate: 0,
      avgTimeSpent: 0
    };
    setUploadedLessons([...uploadedLessons, newLesson]);
  };

  const sendMessage = (to: string, subject: string, message: string) => {
    if (!currentTeacher) return;
    
    // Determine recipient type and email
    let toType: "student" | "parent" | "teacher" = "student";
    let toEmail = to;
    
    // Check if sending to a student email
    const students = JSON.parse(localStorage.getItem("studentAccounts") || "[]");
    const student = students.find((s: any) => s.email.toLowerCase() === to.toLowerCase());
    
    if (student) {
      toType = "student";
      toEmail = student.email;
    } else {
      // Check if sending to a parent email
      const parents = JSON.parse(localStorage.getItem("parentAccounts") || "[]");
      const parent = parents.find((p: any) => p.email.toLowerCase() === to.toLowerCase());
      
      if (parent) {
        toType = "parent";
        toEmail = parent.email;
      }
    }
    
    // Add to global message store
    const globalMessage = addGlobalMessage({
      from: currentTeacher.email,
      fromType: "teacher",
      to: toEmail,
      toType,
      subject,
      message
    });
    
    // Also add to local state for immediate UI update
    const newMessage: Message = {
      id: globalMessage.id,
      from: "Teacher",
      to,
      subject,
      message,
      date: new Date().toISOString().split("T")[0],
      isRead: false,
      replies: []
    };
    setMessages([newMessage, ...messages]);
  };

  const replyToMessage = (messageId: string, reply: string) => {
    if (!currentTeacher) return;
    
    // Add reply to global message store
    addGlobalReply(messageId, {
      from: currentTeacher.email,
      fromType: "teacher",
      message: reply
    });
    
    // Update local state
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          replies: [
            ...msg.replies,
            {
              from: "Teacher",
              message: reply,
              date: new Date().toISOString().split("T")[0]
            }
          ]
        };
      }
      return msg;
    }));
  };

  const markAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
    markGlobalMessageAsRead(messageId);
  };

  // Sync messages from global store
  useEffect(() => {
    if (isTeacherLoggedIn && currentTeacher) {
      const syncMessages = () => {
        const globalMessages = getMessagesForUser(currentTeacher.email, "teacher");
        const formattedMessages: Message[] = globalMessages.map(m => {
          let displayFrom = m.from;
          
          if (m.fromType === "parent") {
            // Find parent name from email
            const parents = JSON.parse(localStorage.getItem("parentAccounts") || "[]");
            const parent = parents.find((p: any) => p.email.toLowerCase() === m.from.toLowerCase());
            const parentName = parent ? parent.name : m.from;
            displayFrom = `${parentName} (Parent)`;
          }
          
          return {
            id: m.id,
            from: displayFrom,
            fromType: m.fromType,
            to: m.to,
            subject: m.subject,
            message: m.message,
            date: new Date(m.timestamp).toLocaleDateString(),
            isRead: m.isRead,
            replies: m.replies.map(r => ({
              from: r.fromType === "parent" ? "Parent" : r.fromType === "student" ? "Student" : "Teacher",
              message: r.message,
              date: new Date(r.timestamp).toLocaleDateString()
            }))
          };
        });
        setMessages(formattedMessages);
      };
      
      syncMessages();
      
      // Poll for new messages every 2 seconds
      const interval = setInterval(syncMessages, 2000);
      return () => clearInterval(interval);
    }
  }, [isTeacherLoggedIn, currentTeacher]);

  return (
    <TeacherContext.Provider
      value={{
        isTeacherLoggedIn,
        currentTeacher,
        loginTeacher,
        signupTeacher,
        logoutTeacher,
        updateTeacherInfo,
        students,
        uploadedLessons,
        uploadLesson,
        messages,
        sendMessage,
        replyToMessage,
        markAsRead
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
}

export function useTeacherContext() {
  const context = useContext(TeacherContext);
  if (context === undefined) {
    throw new Error("useTeacherContext must be used within a TeacherProvider");
  }
  return context;
}