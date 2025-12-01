import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { StudentIntro } from "./components/StudentIntro";
import { FlatDashboard } from "./components/FlatDashboard";
import { FlatLevelMap } from "./components/FlatLevelMap";
import { FlatMagicDoors } from "./components/FlatMagicDoors";
import { FlatLessonPage } from "./components/FlatLessonPage";
import { FlatCustomization } from "./components/FlatCustomization";
import { BadgesPage } from "./components/BadgesPage";
import { ArtWhiteboard } from "./components/ArtWhiteboard";
import { ArtGallery } from "./components/ArtGallery";
import { AppProvider } from "./context/AppContext";
import { ParentProvider } from "./context/ParentContext";
import { TeacherProvider } from "./context/TeacherContext";
import { ParentLogin } from "./components/ParentLogin";
import { ParentSignup } from "./components/ParentSignup";
import { ParentDashboard } from "./components/ParentDashboard";
import { ParentManageStudent } from "./components/ParentManageStudent";
import { TeacherLogin } from "./components/TeacherLogin";
import { TeacherSignup } from "./components/TeacherSignup";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { TeacherManageAccount } from "./components/TeacherManageAccount";
import { StudentLogin } from "./components/StudentLogin";
import { StudentSignup } from "./components/StudentSignup";

type Screen =
  | "welcome"
  | "student-login"
  | "student-signup"
  | "student-intro"
  | "dashboard"
  | "subject-worlds"
  | "level-map"
  | "lesson"
  | "lesson-mode-selection"
  | "magic-doors"
  | "customization"
  | "quiz"
  | "badges"
  | "parent-login"
  | "parent-signup"
  | "parent-dashboard"
  | "parent-manage"
  | "teacher-signup"
  | "teacher-login"
  | "teacher-dashboard"
  | "teacher-manage";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [userRole, setUserRole] = useState<"student" | "parent" | "teacher" | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>("math");
  const [selectedLevel, setSelectedLevel] = useState<string>("level-1");
  const [selectedMode, setSelectedMode] = useState<string>("visual");
  const [galleryKey, setGalleryKey] = useState(0); // Add key to force remount

  const handleRoleSelection = (role: "student" | "parent" | "teacher") => {
    setUserRole(role);
    if (role === "student") {
      setCurrentScreen("student-login");
    } else if (role === "parent") {
      setCurrentScreen("parent-login");
    } else if (role === "teacher") {
      setCurrentScreen("teacher-login");
    }
  };

  const handleNavigation = (destination: string) => {
    switch (destination) {
      case "math":
        setSelectedSubject("math");
        setCurrentScreen("subject-worlds");
        break;
      case "science":
        setSelectedSubject("science");
        setCurrentScreen("subject-worlds");
        break;
      case "art":
        setCurrentScreen("art-whiteboard");
        break;
      case "customize":
        setCurrentScreen("customization");
        break;
      case "badges":
        setCurrentScreen("badges");
        break;
      case "art-whiteboard":
        setCurrentScreen("art-whiteboard");
        break;
      case "art-gallery":
        setGalleryKey(galleryKey + 1); // Force remount
        setCurrentScreen("art-gallery");
        break;
      default:
        setCurrentScreen("dashboard");
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen 
          onSelectRole={handleRoleSelection}
        />;

      case "student-login":
        return <StudentLogin 
          onLogin={() => setCurrentScreen("student-intro")} 
          onBack={() => setCurrentScreen("welcome")}
          onSignup={() => setCurrentScreen("student-signup")}
        />;

      case "student-signup":
        return <StudentSignup 
          onSignup={() => setCurrentScreen("student-login")} 
          onBack={() => setCurrentScreen("student-login")}
          onLogin={() => setCurrentScreen("student-login")}
        />;

      case "student-intro":
        return <StudentIntro onBegin={() => setCurrentScreen("dashboard")} />;

      case "dashboard":
        return <FlatDashboard 
          onNavigate={handleNavigation} 
          onLogout={() => setCurrentScreen("welcome")}
        />;

      case "subject-worlds":
        return (
          <FlatLevelMap
            subject={selectedSubject}
            onSelectLevel={(level) => {
              setSelectedLevel(level);
              setCurrentScreen("lesson-mode-selection");
            }}
            onBack={() => setCurrentScreen("dashboard")}
          />
        );

      case "lesson-mode-selection":
        return (
          <FlatMagicDoors
            onSelectMode={(mode) => {
              setSelectedMode(mode);
              setCurrentScreen("lesson");
            }}
            onBack={() => setCurrentScreen("subject-worlds")}
          />
        );

      case "lesson":
        return (
          <FlatLessonPage
            subject={selectedSubject}
            worldId={selectedSubject}
            levelId={selectedLevel}
            mode={selectedMode as "visual" | "auditory" | "interactive"}
            onBack={() => setCurrentScreen("lesson-mode-selection")}
            onFinish={() => setCurrentScreen("subject-worlds")}
          />
        );

      case "customization":
        return <FlatCustomization onBack={() => setCurrentScreen("dashboard")} />;

      case "badges":
        return <BadgesPage onBack={() => setCurrentScreen("dashboard")} />;

      case "art-whiteboard":
        return (
          <ArtWhiteboard 
            onBack={() => setCurrentScreen("dashboard")} 
            onViewGallery={() => {
              setGalleryKey(galleryKey + 1); // Force remount
              setCurrentScreen("art-gallery");
            }}
          />
        );

      case "art-gallery":
        return <ArtGallery key={galleryKey} onBack={() => setCurrentScreen("art-whiteboard")} />;

      case "parent-login":
        return <ParentLogin 
          onLogin={() => setCurrentScreen("parent-dashboard")} 
          onBack={() => setCurrentScreen("welcome")}
          onSignup={() => setCurrentScreen("parent-signup")}
        />;

      case "parent-signup":
        return <ParentSignup 
          onSignup={() => setCurrentScreen("parent-login")}
          onBack={() => setCurrentScreen("welcome")}
          onLogin={() => setCurrentScreen("parent-login")}
        />;

      case "parent-dashboard":
        return <ParentDashboard 
          onManageStudent={() => setCurrentScreen("parent-manage")}
          onLogout={() => setCurrentScreen("welcome")}
        />;

      case "parent-manage":
        return <ParentManageStudent onBack={() => setCurrentScreen("parent-dashboard")} />;

      case "teacher-login":
        return <TeacherLogin 
          onLogin={() => setCurrentScreen("teacher-dashboard")} 
          onBack={() => setCurrentScreen("welcome")}
          onSignup={() => setCurrentScreen("teacher-signup")}
        />;

      case "teacher-signup":
        return <TeacherSignup 
          onSignup={() => setCurrentScreen("teacher-dashboard")}
          onBack={() => setCurrentScreen("welcome")}
          onLogin={() => setCurrentScreen("teacher-login")}
        />;

      case "teacher-dashboard":
        return <TeacherDashboard 
          onLogout={() => setCurrentScreen("welcome")}
          onManageAccount={() => setCurrentScreen("teacher-manage")}
        />;

      case "teacher-manage":
        return <TeacherManageAccount onBack={() => setCurrentScreen("teacher-dashboard")} />;

      default:
        return <WelcomeScreen 
          onSelectRole={handleRoleSelection}
        />;
    }
  };

  return <div className="min-h-screen">{renderScreen()}</div>;
}

function AppWrapper() {
  return (
    <AppProvider>
      <ParentProvider>
        <TeacherProvider>
          <App />
        </TeacherProvider>
      </ParentProvider>
    </AppProvider>
  );
}

export default AppWrapper;