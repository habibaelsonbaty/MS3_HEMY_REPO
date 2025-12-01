import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getMessagesForUser, GlobalMessage } from "../utils/messageStore";

interface LessonProgress {
  worldId: string;
  levelId: string;
  completed: boolean;
  score?: number;
  quizScore?: number;
  quizTotal?: number;
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  description: string;
}

interface StudentAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  studentCode: string;
  teacherId?: string; // Optional teacher linking
}

interface TeacherMessage {
  id: number;
  teacher: string;
  subject: string;
  message: string;
  timestamp: string;
  color: string;
  emoji: string;
}

interface AppState {
  // User Identity
  userName: string;
  userRole: string;
  avatar: string;
  pet: string;
  studentCode: string;
  isStudentLoggedIn: boolean;
  currentStudent: StudentAccount | null;

  // Progress
  totalXP: number;
  completedLessons: LessonProgress[];
  currentWorld: string;
  currentLevel: string;

  // Badges
  badges: Badge[];

  // Daily
  dailyMood: string;

  // Messages
  teacherMessages: TeacherMessage[];

  // Methods
  setAvatar: (avatar: string) => void;
  setPet: (pet: string) => void;
  setUserInfo: (name: string, role: string) => void;
  loginStudent: (email: string, password: string) => boolean;
  signupStudent: (
    name: string,
    email: string,
    password: string,
  ) => string | null;
  logoutStudent: () => void;
  completeLesson: (
    worldId: string,
    levelId: string,
    score: number,
  ) => void;
  completeQuiz: (
    worldId: string,
    levelId: string,
    quizScore: number,
    quizTotal: number,
  ) => void;
  unlockBadge: (badgeId: string) => void;
  setDailyMood: (mood: string) => void;
  addXP: (amount: number) => void;
  setCurrentWorld: (worldId: string) => void;
  setCurrentLevel: (levelId: string) => void;
  isLessonCompleted: (
    worldId: string,
    levelId: string,
  ) => boolean;
  getLessonScore: (worldId: string, levelId: string) => number;
  getQuizScore: (
    worldId: string,
    levelId: string,
  ) => { score: number; total: number } | null;
}

const AppContext = createContext<AppState | undefined>(
  undefined,
);

export function AppProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isStudentLoggedIn, setIsStudentLoggedIn] =
    useState(false);
  const [currentStudent, setCurrentStudent] =
    useState<StudentAccount | null>(null);
  const [userName, setUserName] = useState("Gamila");
  const [userRole, setUserRole] = useState("Student");
  const [avatar, setAvatar] = useState("😊");
  const [pet, setPet] = useState("🐰");
  const [studentCode, setStudentCode] = useState(
    "STU-GAMILA-ABC123",
  );
  const [totalXP, setTotalXP] = useState(400); // 4 lessons × 100 XP each
  const [completedLessons, setCompletedLessons] = useState<
    LessonProgress[]
  >([
    {
      worldId: "math",
      levelId: "level-1",
      completed: true,
      score: 95,
    },
    {
      worldId: "math",
      levelId: "level-2",
      completed: true,
      score: 88,
    },
    {
      worldId: "science",
      levelId: "level-1",
      completed: true,
      score: 92,
    },
    {
      worldId: "science",
      levelId: "level-2",
      completed: true,
      score: 85,
    },
  ]);
  const [currentWorld, setCurrentWorld] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [dailyMood, setDailyMood] = useState("happy");
  const [teacherMessages, setTeacherMessages] = useState<
    TeacherMessage[]
  >([]);

  // Store registered students (in real app, this would be in a database)
  const [registeredStudents, setRegisteredStudents] = useState<
    StudentAccount[]
  >(() => {
    const stored = localStorage.getItem("studentAccounts");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: "student-1",
            name: "Gamila",
            email: "gamila@gmail.com",
            password: "Gamila2003",
            studentCode: "STU-GAMILA-ABC123",
            teacherId: "teacher-1", // Linked to Habiba
          },
        ];
  });

  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "first-lesson",
      name: "First Steps",
      icon: "🌟",
      unlocked: true,
      description: "Complete your first lesson",
    },
    {
      id: "math-master",
      name: "Math Master",
      icon: "🔢",
      unlocked: false,
      description: "Complete 5 math lessons",
    },
    {
      id: "science-star",
      name: "Science Star",
      icon: "🔬",
      unlocked: false,
      description: "Complete 5 science lessons",
    },
    {
      id: "speed-demon",
      name: "Speed Demon",
      icon: "⚡",
      unlocked: false,
      description: "Complete a lesson in under 3 minutes",
    },
    {
      id: "streak-master",
      name: "Streak Master",
      icon: "🔥",
      unlocked: false,
      description: "Login 7 days in a row",
    },
    {
      id: "super-learner",
      name: "Super Learner",
      icon: "🚀",
      unlocked: false,
      description: "Complete 10 lessons total",
    },
    {
      id: "perfect-score",
      name: "Perfect!",
      icon: "💯",
      unlocked: false,
      description: "Get 100% on any lesson",
    },
    {
      id: "explorer",
      name: "Explorer",
      icon: "🗺️",
      unlocked: false,
      description: "Visit all worlds",
    },
  ]);

  // Initialize localStorage with default student if not exists
  useEffect(() => {
    const stored = localStorage.getItem("studentAccounts");
    if (!stored) {
      localStorage.setItem(
        "studentAccounts",
        JSON.stringify(registeredStudents),
      );
    }
    
    // Initialize Gamila's demo data if it doesn't exist
    const gamilaDataKey = "studentData_student-1";
    const gamilaData = localStorage.getItem(gamilaDataKey);
    if (!gamilaData) {
      const initialGamilaData = {
        totalXP: 400,
        completedLessons: [
          {
            worldId: "math",
            levelId: "level-1",
            completed: true,
            score: 95,
          },
          {
            worldId: "math",
            levelId: "level-2",
            completed: true,
            score: 88,
          },
          {
            worldId: "science",
            levelId: "level-1",
            completed: true,
            score: 92,
          },
          {
            worldId: "science",
            levelId: "level-2",
            completed: true,
            score: 85,
          },
        ],
        badges: [
          {
            id: "first-lesson",
            name: "First Steps",
            icon: "🌟",
            unlocked: true,
            description: "Complete your first lesson",
          },
          {
            id: "math-master",
            name: "Math Master",
            icon: "🔢",
            unlocked: false,
            description: "Complete 5 math lessons",
          },
          {
            id: "science-star",
            name: "Science Star",
            icon: "🔬",
            unlocked: false,
            description: "Complete 5 science lessons",
          },
          {
            id: "speed-demon",
            name: "Speed Demon",
            icon: "⚡",
            unlocked: false,
            description: "Complete a lesson in under 3 minutes",
          },
          {
            id: "streak-master",
            name: "Streak Master",
            icon: "🔥",
            unlocked: false,
            description: "Login 7 days in a row",
          },
          {
            id: "super-learner",
            name: "Super Learner",
            icon: "🚀",
            unlocked: false,
            description: "Complete 10 lessons total",
          },
          {
            id: "perfect-score",
            name: "Perfect!",
            icon: "💯",
            unlocked: false,
            description: "Get 100% on any lesson",
          },
          {
            id: "explorer",
            name: "Explorer",
            icon: "🗺️",
            unlocked: false,
            description: "Visit all worlds",
          },
        ],
        avatar: "😊",
        pet: "🐰",
        dailyMood: "happy",
        teacherMessages: [],
      };
      localStorage.setItem(gamilaDataKey, JSON.stringify(initialGamilaData));
    }
    
    // Initialize demo messages in global store if empty
    const globalMessages = localStorage.getItem("globalMessages");
    if (!globalMessages) {
      const demoMessages = [
        {
          id: "msg-demo-1",
          from: "habiba@gmail.com",
          fromType: "teacher",
          to: "gamila@gmail.com",
          toType: "student",
          subject: "Math",
          message: "Great work on your math homework! You've shown excellent understanding of multiplication.",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          isRead: false,
          replies: []
        },
        {
          id: "msg-demo-2",
          from: "habiba@gmail.com",
          fromType: "teacher",
          to: "hazem@gmail.com",
          toType: "parent",
          subject: "Progress Update",
          message: "Gamila is doing excellently in Mathematics! She's mastered multiplication and is ready for more advanced topics.",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          isRead: false,
          replies: []
        }
      ];
      localStorage.setItem("globalMessages", JSON.stringify(demoMessages));
    }
  }, []);

  // Sync messages from global store
  useEffect(() => {
    if (isStudentLoggedIn && currentStudent) {
      const syncMessages = () => {
        const globalMessages = getMessagesForUser(currentStudent.email, "student");
        const formattedMessages: TeacherMessage[] = globalMessages
          .filter(m => m.toType === "student" && m.to.toLowerCase() === currentStudent.email.toLowerCase())
          .map(m => ({
            id: parseInt(m.id.replace("msg-", "")),
            teacher: m.from,
            subject: m.subject,
            message: m.message,
            timestamp: new Date(m.timestamp).toLocaleDateString(),
            color: "#4FA8C5",
            emoji: "📧"
          }));
        setTeacherMessages(formattedMessages);
      };
      
      syncMessages();
      
      // Poll for new messages every 2 seconds
      const interval = setInterval(syncMessages, 2000);
      return () => clearInterval(interval);
    }
  }, [isStudentLoggedIn, currentStudent]);

  // Save student data whenever it changes
  useEffect(() => {
    if (isStudentLoggedIn && currentStudent) {
      const studentDataKey = `studentData_${currentStudent.id}`;
      const dataToSave = {
        totalXP,
        completedLessons,
        badges,
        avatar,
        pet,
        dailyMood,
        teacherMessages,
      };
      localStorage.setItem(
        studentDataKey,
        JSON.stringify(dataToSave),
      );
    }
  }, [
    isStudentLoggedIn,
    currentStudent,
    totalXP,
    completedLessons,
    badges,
    avatar,
    pet,
    dailyMood,
    teacherMessages,
  ]);

  const setUserInfo = (name: string, role: string) => {
    setUserName(name);
    setUserRole(role);
  };

  const loginStudent = (
    email: string,
    password: string,
  ): boolean => {
    const student = registeredStudents.find(
      (s) => s.email === email && s.password === password,
    );

    if (student) {
      setIsStudentLoggedIn(true);
      setCurrentStudent(student);
      setUserName(student.name);
      setStudentCode(student.studentCode);
      setUserRole("Student");

      // Load student-specific data from localStorage
      const studentDataKey = `studentData_${student.id}`;
      const savedData = localStorage.getItem(studentDataKey);

      if (savedData) {
        const data = JSON.parse(savedData);
        setTotalXP(data.totalXP || 0);
        setCompletedLessons(data.completedLessons || []);
        setBadges(data.badges || getInitialBadges());
        setAvatar(data.avatar || "😊");
        setPet(data.pet || "🐰");
        setDailyMood(data.dailyMood || "");
        setTeacherMessages(data.teacherMessages || []);
      } else {
        // Initialize new student with empty data (except Gamila who has demo data)
        if (student.email === "gamila@gmail.com") {
          setTotalXP(400);
          setCompletedLessons([
            {
              worldId: "math",
              levelId: "level-1",
              completed: true,
              score: 95,
            },
            {
              worldId: "math",
              levelId: "level-2",
              completed: true,
              score: 88,
            },
            {
              worldId: "science",
              levelId: "level-1",
              completed: true,
              score: 92,
            },
            {
              worldId: "science",
              levelId: "level-2",
              completed: true,
              score: 85,
            },
          ]);
          const initialBadges = getInitialBadges();
          initialBadges[0].unlocked = true; // Unlock "First Steps" badge
          setBadges(initialBadges);
          setTeacherMessages([
            {
              id: 1,
              teacher: "Ms. Johnson",
              subject: "Mathematics",
              message:
                "Excellent work on your fractions quiz! You're showing great improvement in understanding equivalent fractions. Keep up the fantastic effort!",
              timestamp: "2 days ago",
              color: "#4FA8C5",
              emoji: "🔢",
            },
            {
              id: 2,
              teacher: "Mr. Chen",
              subject: "Science",
              message:
                "I loved your creativity in the solar system project! Your model of Jupiter was so detailed. You're developing a real passion for astronomy!",
              timestamp: "5 days ago",
              color: "#5FB89A",
              emoji: "🔬",
            },
            {
              id: 3,
              teacher: "Ms. Rivera",
              subject: "Art",
              message:
                "Your use of colors in the landscape painting was wonderful! I can see you're experimenting with different techniques. Your artwork brings so much joy!",
              timestamp: "1 week ago",
              color: "#F5C542",
              emoji: "🎨",
            },
          ]);
        } else {
          setTotalXP(0);
          setCompletedLessons([]);
          setBadges(getInitialBadges());
          setTeacherMessages([]);
        }
        setAvatar("😊");
        setPet("🐰");
        setDailyMood("");
      }

      return true;
    }
    return false;
  };

  const getInitialBadges = (): Badge[] => [
    {
      id: "first-lesson",
      name: "First Steps",
      icon: "🌟",
      unlocked: false,
      description: "Complete your first lesson",
    },
    {
      id: "math-master",
      name: "Math Master",
      icon: "🔢",
      unlocked: false,
      description: "Complete 5 math lessons",
    },
    {
      id: "science-star",
      name: "Science Star",
      icon: "🔬",
      unlocked: false,
      description: "Complete 5 science lessons",
    },
    {
      id: "speed-demon",
      name: "Speed Demon",
      icon: "⚡",
      unlocked: false,
      description: "Complete a lesson in under 3 minutes",
    },
    {
      id: "streak-master",
      name: "Streak Master",
      icon: "🔥",
      unlocked: false,
      description: "Login 7 days in a row",
    },
    {
      id: "super-learner",
      name: "Super Learner",
      icon: "🚀",
      unlocked: false,
      description: "Complete 10 lessons total",
    },
    {
      id: "perfect-score",
      name: "Perfect!",
      icon: "💯",
      unlocked: false,
      description: "Get 100% on any lesson",
    },
    {
      id: "explorer",
      name: "Explorer",
      icon: "🗺️",
      unlocked: false,
      description: "Visit all worlds",
    },
  ];

  const signupStudent = (
    name: string,
    email: string,
    password: string,
  ): string | null => {
    // Check if email already exists
    if (registeredStudents.find((s) => s.email === email)) {
      return null;
    }

    // Generate unique student code
    const code = `STU-${name.toUpperCase().replace(/\s/g, "")}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const newStudent: StudentAccount = {
      id: `student-${Date.now()}`,
      name,
      email,
      password,
      studentCode: code,
    };

    const updatedStudents = [...registeredStudents, newStudent];
    setRegisteredStudents(updatedStudents);
    localStorage.setItem(
      "studentAccounts",
      JSON.stringify(updatedStudents),
    );

    // Initialize new student with empty data
    const studentDataKey = `studentData_${newStudent.id}`;
    const initialData = {
      totalXP: 0,
      completedLessons: [],
      badges: getInitialBadges(),
      avatar: "😊",
      pet: "🐰",
      dailyMood: "",
    };
    localStorage.setItem(
      studentDataKey,
      JSON.stringify(initialData),
    );

    // Auto-link new student to Hazem's parent account
    const parents = JSON.parse(
      localStorage.getItem("parentAccounts") || "[]",
    );
    const hazemAccount = parents.find(
      (p: any) => p.email === "hazem@gmail.com",
    );

    if (hazemAccount) {
      if (!hazemAccount.linkedStudents) {
        hazemAccount.linkedStudents = [];
      }
      hazemAccount.linkedStudents.push(code);
      localStorage.setItem(
        "parentAccounts",
        JSON.stringify(parents),
      );
    }

    return code;
  };

  const logoutStudent = () => {
    setIsStudentLoggedIn(false);
    setCurrentStudent(null);
  };

  const completeLesson = (
    worldId: string,
    levelId: string,
    score: number,
  ) => {
    setCompletedLessons((prev) => {
      const existing = prev.find(
        (l) => l.worldId === worldId && l.levelId === levelId,
      );
      let newLessons;
      if (existing) {
        newLessons = prev.map((l) =>
          l.worldId === worldId && l.levelId === levelId
            ? {
                ...l,
                completed: true,
                score: Math.max(l.score || 0, score),
              }
            : l,
        );
      } else {
        newLessons = [
          ...prev,
          { worldId, levelId, completed: true, score },
        ];
      }

      // Check badge progress based on new lessons
      checkBadgeProgress(newLessons, score);

      return newLessons;
    });

    // Add XP
    addXP(score);
  };

  const completeQuiz = (
    worldId: string,
    levelId: string,
    quizScore: number,
    quizTotal: number,
  ) => {
    setCompletedLessons((prev) => {
      const existing = prev.find(
        (l) => l.worldId === worldId && l.levelId === levelId,
      );
      if (existing) {
        return prev.map((l) =>
          l.worldId === worldId && l.levelId === levelId
            ? { ...l, quizScore, quizTotal }
            : l,
        );
      } else {
        return [
          ...prev,
          {
            worldId,
            levelId,
            completed: false,
            quizScore,
            quizTotal,
          },
        ];
      }
    });

    // Add XP for quiz
    addXP(quizScore);
  };

  const checkBadgeProgress = (
    lessons: LessonProgress[],
    latestScore: number,
  ) => {
    // First lesson badge
    if (lessons.length === 1) {
      unlockBadge("first-lesson");
    }

    // Perfect score badge
    if (latestScore === 100) {
      unlockBadge("perfect-score");
    }

    // Subject-specific badges
    const mathLessons = lessons.filter(
      (l) => l.worldId === "math",
    ).length;
    const scienceLessons = lessons.filter(
      (l) => l.worldId === "science",
    ).length;
    const artLessons = lessons.filter(
      (l) => l.worldId === "art",
    ).length;

    if (mathLessons >= 5) {
      unlockBadge("math-master");
    }
    if (scienceLessons >= 5) {
      unlockBadge("science-star");
    }
    if (artLessons >= 5) {
      unlockBadge("artist");
    }

    // Rocket Thinker badge - 10 lessons total
    if (lessons.length >= 10) {
      unlockBadge("super-learner");
    }

    // Explorer badge - visited all 3 subjects
    const uniqueSubjects = new Set(
      lessons.map((l) => l.worldId),
    );
    if (uniqueSubjects.size >= 3) {
      unlockBadge("explorer");
    }
  };

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) =>
        b.id === badgeId ? { ...b, unlocked: true } : b,
      ),
    );
  };

  const addXP = (amount: number) => {
    setTotalXP((prev) => prev + amount);
  };

  const isLessonCompleted = (
    worldId: string,
    levelId: string,
  ) => {
    return completedLessons.some(
      (l) =>
        l.worldId === worldId &&
        l.levelId === levelId &&
        l.completed,
    );
  };

  const getLessonScore = (worldId: string, levelId: string) => {
    const lesson = completedLessons.find(
      (l) => l.worldId === worldId && l.levelId === levelId,
    );
    return lesson?.score || 0;
  };

  const getQuizScore = (worldId: string, levelId: string) => {
    const lesson = completedLessons.find(
      (l) => l.worldId === worldId && l.levelId === levelId,
    );
    if (
      lesson?.quizScore !== undefined &&
      lesson?.quizTotal !== undefined
    ) {
      return {
        score: lesson.quizScore,
        total: lesson.quizTotal,
      };
    }
    return null;
  };

  return (
    <AppContext.Provider
      value={{
        userName,
        userRole,
        avatar,
        pet,
        studentCode,
        isStudentLoggedIn,
        currentStudent,
        totalXP,
        completedLessons,
        currentWorld,
        currentLevel,
        badges,
        dailyMood,
        teacherMessages,
        setAvatar,
        setPet,
        setUserInfo,
        loginStudent,
        signupStudent,
        logoutStudent,
        completeLesson,
        completeQuiz,
        unlockBadge,
        setDailyMood,
        addXP,
        setCurrentWorld,
        setCurrentLevel,
        isLessonCompleted,
        getLessonScore,
        getQuizScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      "useAppContext must be used within an AppProvider",
    );
  }
  return context;
}