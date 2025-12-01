import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Lightbulb, Undo2 } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { MatterBasicsInteractive, WaterCycleInteractive, PlantLifeInteractive, AnimalKingdomInteractive, EnergyFormsInteractive } from "./ScienceInteractives";
import { ForcesMotionInteractive, SolarSystemInteractive, EcosystemsInteractive, HumanBodyInteractive, ScientificMethodInteractive } from "./ScienceInteractives2";

interface InteractiveLessonProps {
  subject: string;
  worldId: string;
  levelId: string;
  title: string;
  activities: {
    type: "explore" | "build" | "experiment" | "discover" | "drag-drop" | "matching";
    title: string;
    instruction: string;
    interactiveElement: any;
    explanation: string;
  }[];
  onComplete: () => void;
}

export function InteractiveLesson({
  subject,
  worldId,
  levelId,
  title,
  activities,
  onComplete,
}: InteractiveLessonProps) {
  const { avatar, pet } = useAppContext();

  const subjectColors: Record<string, { bg: string; accent: string; highlight: string }> = {
    math: { bg: "#A8D8EA", accent: "#7BA7BC", highlight: "#D4EBF7" },
    science: { bg: "#B8E6D5", accent: "#8BC9B0", highlight: "#D9F2E8" },
    reading: { bg: "#F7B7D2", accent: "#E889B1", highlight: "#FBD4E6" },
    art: { bg: "#FFE5A0", accent: "#FFD670", highlight: "#FFF3CC" },
  };

  const colors = subjectColors[subject] || subjectColors.math;

  // Render different interactive elements based on levelId
  const renderInteractive = () => {
    // Math lessons
    if (subject === "math") {
      // Level 1: Number Valley
      if (levelId === "level-1") {
        return <NumberValleyInteractive colors={colors} />;
      }
      
      // Level 2: Addition Trail
      if (levelId === "level-2") {
        return <AdditionTrailInteractive colors={colors} />;
      }
      
      // Level 3: Subtraction Path
      if (levelId === "level-3") {
        return <SubtractionPathInteractive colors={colors} />;
      }
      
      // Level 4: Multiplication Hill
      if (levelId === "level-4") {
        return <MultiplicationHillInteractive colors={colors} />;
      }
      
      // Level 5: Division Ridge
      if (levelId === "level-5") {
        return <DivisionRidgeInteractive colors={colors} />;
      }
      
      // Level 6: Fraction Falls
      if (levelId === "level-6") {
        return <FractionFallsInteractive colors={colors} />;
      }
      
      // Level 7: Decimal Forest
      if (levelId === "level-7") {
        return <DecimalForestInteractive colors={colors} />;
      }
      
      // Level 8: Geometry Peak
      if (levelId === "level-8") {
        return <GeometryPeakInteractive colors={colors} />;
      }
      
      // Level 9: Algebra Summit
      if (levelId === "level-9") {
        return <AlgebraSummitInteractive colors={colors} />;
      }
      
      // Level 10: Problem Solving Paradise
      if (levelId === "level-10") {
        return <ProblemSolvingInteractive colors={colors} />;
      }
    }

    // Science lessons
    if (subject === "science") {
      // Level 1: Matter Basics
      if (levelId === "level-1") {
        return <MatterBasicsInteractive colors={colors} />;
      }
      
      // Level 2: Water Cycle
      if (levelId === "level-2") {
        return <WaterCycleInteractive colors={colors} />;
      }
      
      // Level 3: Plant Life
      if (levelId === "level-3") {
        return <PlantLifeInteractive colors={colors} />;
      }
      
      // Level 4: Animal Kingdom
      if (levelId === "level-4") {
        return <AnimalKingdomInteractive colors={colors} />;
      }
      
      // Level 5: Energy Forms
      if (levelId === "level-5") {
        return <EnergyFormsInteractive colors={colors} />;
      }
      
      // Level 6: Forces & Motion
      if (levelId === "level-6") {
        return <ForcesMotionInteractive colors={colors} />;
      }
      
      // Level 7: Solar System
      if (levelId === "level-7") {
        return <SolarSystemInteractive colors={colors} />;
      }
      
      // Level 8: Ecosystems
      if (levelId === "level-8") {
        return <EcosystemsInteractive colors={colors} />;
      }
      
      // Level 9: Human Body
      if (levelId === "level-9") {
        return <HumanBodyInteractive colors={colors} />;
      }
      
      // Level 10: Scientific Method
      if (levelId === "level-10") {
        return <ScientificMethodInteractive colors={colors} />;
      }
    }

    return null;
  };

  const getLearningTip = () => {
    const mathTips: Record<string, string> = {
      "level-1": "Numbers help us count things! Each number represents a specific quantity. Practice counting objects one by one.",
      "level-2": "Addition means putting things together! When we combine groups, we get a larger amount.",
      "level-3": "Subtraction means taking away! When we remove items from a group, we have fewer left.",
      "level-4": "Multiplication is repeated addition! 3 × 4 means adding 4 three times: 4 + 4 + 4 = 12.",
      "level-5": "Division means sharing equally! When we split items into equal groups, everyone gets the same amount.",
      "level-6": "Fractions show parts of a whole! The bottom number tells you total parts, top tells you how many you have.",
      "level-7": "Decimals are another way to show parts! They use a decimal point and are based on tens.",
      "level-8": "Shapes are all around us! Each shape has special properties like sides, angles, and symmetry.",
      "level-9": "In algebra, we solve for unknown values! Use what you know to find what's missing.",
      "level-10": "Word problems tell math stories! Read carefully and figure out what operation to use.",
    };

    const scienceTips: Record<string, string> = {
      "level-1": "Matter comes in three states: solid, liquid, and gas. Adding heat or cold can change matter from one state to another!",
      "level-2": "The water cycle is always happening around us! Water evaporates, forms clouds, falls as rain, and starts over again.",
      "level-3": "Plants need three things to grow: sunlight, water, and soil. They make their own food through photosynthesis!",
      "level-4": "Animals can be grouped by their features! Mammals have fur, birds have feathers, reptiles have scales, and insects have 6 legs.",
      "level-5": "Energy is what makes things happen! Light, sound, heat, electrical, and mechanical energy are all around us.",
      "level-6": "Forces make things move! A push or pull can change how fast something goes or which direction it travels.",
      "level-7": "Our solar system has 8 planets that orbit the sun. Each planet is unique with different sizes, colors, and features!",
      "level-8": "An ecosystem is a community of living things and their environment. Different biomes have different plants and animals!",
      "level-9": "Your body is amazing! Different organs work together as systems to keep you healthy, active, and alive.",
      "level-10": "Scientists ask questions, make guesses (hypotheses), test them, and draw conclusions. You can be a scientist too!",
    };

    if (subject === "science") {
      return scienceTips[levelId] || "Keep practicing and you'll master this concept!";
    }
    
    return mathTips[levelId] || "Keep practicing and you'll master this concept!";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl p-6"
        style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl" style={{ fontWeight: 700, color: "#4A5568" }}>
            {title}
          </h2>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{avatar}</div>
            <div className="text-2xl">{pet}</div>
          </div>
        </div>
      </motion.div>

      {/* Activity Area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl p-12"
        style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
      >
        {renderInteractive()}

        {/* Mascot Guidance */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 rounded-2xl flex items-start gap-4"
          style={{ backgroundColor: colors.highlight }}
        >
          <div className="text-4xl">{pet}</div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={20} color={colors.accent} />
              <h4 className="text-lg" style={{ fontWeight: 700, color: "#4A5568" }}>
                Learning Tip
              </h4>
            </div>
            <p style={{ color: "#6B7280" }}>
              {getLearningTip()}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Complete Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onComplete}
        className="w-full py-6 rounded-2xl flex items-center justify-center gap-3 text-white text-xl"
        style={{
          backgroundColor: colors.accent,
          boxShadow: `0 4px 24px ${colors.accent}40`,
          fontWeight: 700,
        }}
      >
        Complete Lesson
        <Sparkles size={24} />
      </motion.button>
    </div>
  );
}

// Level 1: Number Valley - Drag stones and match groups
function NumberValleyInteractive({ colors }: any) {
  const [stones, setStones] = useState([
    { id: 1, num: 5, placed: false },
    { id: 2, num: 2, placed: false },
    { id: 3, num: 8, placed: false },
    { id: 4, num: 1, placed: false },
    { id: 5, num: 9, placed: false },
  ]);
  const [matchedGroups, setMatchedGroups] = useState<number[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  const toggleStone = (id: number) => {
    setHistory([...history, { stones, matchedGroups }]);
    setStones(stones.map(s => s.id === id ? { ...s, placed: !s.placed } : s));
  };

  const matchGroup = (value: number) => {
    setHistory([...history, { stones, matchedGroups }]);
    if (!matchedGroups.includes(value)) {
      setMatchedGroups([...matchedGroups, value]);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setStones(lastState.stones);
      setMatchedGroups(lastState.matchedGroups);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Number Valley Challenge
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Click stones to place them in order, then match groups to numbers!
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-6 py-3 rounded-xl flex items-center gap-2"
          style={{
            backgroundColor: history.length > 0 ? colors.bg : "#E5E7EB",
            fontWeight: 600,
            opacity: history.length > 0 ? 1 : 0.5,
          }}
        >
          <Undo2 size={20} />
          Undo
        </motion.button>
      </div>

      {/* Activity 1: Order stones */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          📍 Place the numbered stones
        </h4>
        <div className="flex justify-center gap-4 flex-wrap">
          {stones.sort((a, b) => a.num - b.num).map((stone) => (
            <motion.button
              key={stone.id}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleStone(stone.id)}
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: stone.placed ? colors.bg : "#FFF3E6",
                border: `3px solid ${stone.placed ? colors.accent : "#E5E7EB"}`,
              }}
            >
              <div className="text-center">
                <div className="text-3xl">🪨</div>
                <div className="text-xl" style={{ fontWeight: 700 }}>
                  {stone.num}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Activity 2: Match groups to numbers */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🎯 Match groups to their numbers
        </h4>
        <div className="grid grid-cols-3 gap-6">
          {[
            { num: 3, emoji: "🍎", label: "apples" },
            { num: 5, emoji: "🐸", label: "frogs" },
            { num: 7, emoji: "⭐", label: "stars" },
          ].map((group) => (
            <motion.button
              key={group.num}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => matchGroup(group.num)}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: matchedGroups.includes(group.num) ? colors.bg : "#FFF",
                border: `3px solid ${matchedGroups.includes(group.num) ? colors.accent : "#E5E7EB"}`,
              }}
            >
              <div className="text-5xl mb-2">{group.emoji.repeat(group.num)}</div>
              <div className="text-3xl" style={{ fontWeight: 700 }}>
                {group.num}
              </div>
              <div style={{ color: "#6B7280" }}>{group.label}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Level 2: Addition Trail - Drag fruit into baskets
function AdditionTrailInteractive({ colors }: any) {
  const [basket1, setBasket1] = useState(2);
  const [basket2, setBasket2] = useState(3);
  const [gemPiles, setGemPiles] = useState([
    { id: 1, value: 4, selected: false },
    { id: 2, value: 3, selected: false },
  ]);
  const [history, setHistory] = useState<any[]>([]);

  const handleAddStrawberry = () => {
    setHistory([...history, { basket1, basket2, gemPiles }]);
    setBasket1(Math.min(basket1 + 1, 9));
  };

  const handleAddBlueberry = () => {
    setHistory([...history, { basket1, basket2, gemPiles }]);
    setBasket2(Math.min(basket2 + 1, 9));
  };

  const handleToggleGem = (id: number) => {
    setHistory([...history, { basket1, basket2, gemPiles }]);
    setGemPiles(gemPiles.map(p => p.id === id ? { ...p, selected: !p.selected } : p));
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setBasket1(lastState.basket1);
      setBasket2(lastState.basket2);
      setGemPiles(lastState.gemPiles);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Addition Trail Adventure
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Combine items to practice addition!
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-6 py-3 rounded-xl flex items-center gap-2"
          style={{
            backgroundColor: history.length > 0 ? colors.bg : "#E5E7EB",
            fontWeight: 600,
            opacity: history.length > 0 ? 1 : 0.5,
          }}
        >
          <Undo2 size={20} />
          Undo
        </motion.button>
      </div>

      {/* Activity 1: Fruit baskets */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🧺 Add fruits to baskets
        </h4>
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-6xl mb-2">{"🍓".repeat(basket1)}</div>
            <div className="text-3xl p-4 rounded-2xl" style={{ backgroundColor: colors.bg, fontWeight: 700, color: "#FFF" }}>
              {basket1}
            </div>
          </div>

          <div className="text-5xl" style={{ fontWeight: 700, color: colors.accent }}>+</div>

          <div className="text-center">
            <div className="text-6xl mb-2">{"🫐".repeat(basket2)}</div>
            <div className="text-3xl p-4 rounded-2xl" style={{ backgroundColor: colors.bg, fontWeight: 700, color: "#FFF" }}>
              {basket2}
            </div>
          </div>

          <div className="text-5xl" style={{ fontWeight: 700, color: colors.accent }}>=</div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-6xl mb-2">🎉</div>
            <div className="text-5xl p-6 rounded-2xl" style={{ backgroundColor: colors.accent, fontWeight: 700, color: "#FFF" }}>
              {basket1 + basket2}
            </div>
          </motion.div>
        </div>
        <div className="flex justify-center gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddStrawberry}
            className="px-6 py-3 rounded-xl"
            style={{ backgroundColor: colors.bg, fontWeight: 600 }}
          >
            Add Strawberry 🍓
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddBlueberry}
            className="px-6 py-3 rounded-xl"
            style={{ backgroundColor: colors.bg, fontWeight: 600 }}
          >
            Add Blueberry 🫐
          </motion.button>
        </div>
      </div>

      {/* Activity 2: Gem piles */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          💎 Combine gem piles
        </h4>
        <div className="flex justify-center gap-6">
          {gemPiles.map((pile) => (
            <motion.button
              key={pile.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleToggleGem(pile.id)}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: pile.selected ? colors.bg : "#FFF",
                border: `3px solid ${pile.selected ? colors.accent : "#E5E7EB"}`,
              }}
            >
              <div className="text-5xl mb-2">{"💎".repeat(pile.value)}</div>
              <div className="text-3xl" style={{ fontWeight: 700 }}>{pile.value}</div>
            </motion.button>
          ))}
        </div>
        {gemPiles.filter(p => p.selected).length === 2 && (
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="mt-6 text-center p-6 rounded-2xl"
            style={{ backgroundColor: colors.accent }}
          >
            <div className="text-4xl mb-2" style={{ fontWeight: 700, color: "#FFF" }}>
              {gemPiles[0].value} + {gemPiles[1].value} = {gemPiles[0].value + gemPiles[1].value}
            </div>
            <div className="text-6xl">✨</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Level 3: Subtraction Path - Tap to remove items
function SubtractionPathInteractive({ colors }: any) {
  const [leaves, setLeaves] = useState([true, true, true, true, true, true, true, true]);
  const [acorns, setAcorns] = useState(6);
  const [history, setHistory] = useState<any[]>([]);

  const removeLeaf = (index: number) => {
    setHistory([...history, { leaves, acorns }]);
    setLeaves(leaves.map((leaf, i) => i === index ? false : leaf));
  };

  const removeAcorn = () => {
    setHistory([...history, { leaves, acorns }]);
    setAcorns(Math.max(0, acorns - 1));
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setLeaves(lastState.leaves);
      setAcorns(lastState.acorns);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Subtraction Path Journey
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Remove items to see what's left!
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-6 py-3 rounded-xl flex items-center gap-2"
          style={{
            backgroundColor: history.length > 0 ? colors.bg : "#E5E7EB",
            fontWeight: 600,
            opacity: history.length > 0 ? 1 : 0.5,
          }}
        >
          <Undo2 size={20} />
          Undo
        </motion.button>
      </div>

      {/* Activity 1: Cross out leaves */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🍂 Cross out 3 leaves (8 - 3 = ?)
        </h4>
        <div className="flex justify-center gap-3 flex-wrap mb-4">
          {leaves.map((visible, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => removeLeaf(i)}
              className="text-6xl relative"
              style={{ opacity: visible ? 1 : 0.3 }}
            >
              🍂
              {!visible && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-7xl" style={{ color: "#EF4444" }}>✕</div>
                </div>
              )}
            </motion.button>
          ))}
        </div>
        <div className="text-center text-3xl" style={{ fontWeight: 700, color: colors.accent }}>
          Remaining: {leaves.filter(l => l).length}
        </div>
      </div>

      {/* Activity 2: Remove acorns */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🌰 Tap to remove acorns
        </h4>
        <div className="text-center mb-4">
          <div className="text-6xl mb-3">{"🌰".repeat(acorns)}</div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={removeAcorn}
            disabled={acorns === 0}
            className="px-8 py-4 rounded-xl text-white text-xl"
            style={{
              backgroundColor: acorns > 0 ? colors.accent : "#E5E7EB",
              fontWeight: 700,
            }}
          >
            Remove One 🌰
          </motion.button>
        </div>
        <div className="text-center text-3xl" style={{ fontWeight: 700, color: colors.accent }}>
          {acorns} acorns left
        </div>
      </div>
    </div>
  );
}

// Level 4: Multiplication Hill - Build equal groups
function MultiplicationHillInteractive({ colors }: any) {
  const [groups, setGroups] = useState(3);
  const [itemsPerGroup, setItemsPerGroup] = useState(4);
  const [arrayRows, setArrayRows] = useState(2);
  const [arrayCols, setArrayCols] = useState(5);
  const [history, setHistory] = useState<any[]>([]);

  const handleAddGroup = () => {
    setHistory([...history, { groups, itemsPerGroup, arrayRows, arrayCols }]);
    setGroups(Math.min(groups + 1, 5));
  };

  const handleAddBerry = () => {
    setHistory([...history, { groups, itemsPerGroup, arrayRows, arrayCols }]);
    setItemsPerGroup(Math.min(itemsPerGroup + 1, 6));
  };

  const handleAddRow = () => {
    setHistory([...history, { groups, itemsPerGroup, arrayRows, arrayCols }]);
    setArrayRows(Math.min(arrayRows + 1, 4));
  };

  const handleAddCol = () => {
    setHistory([...history, { groups, itemsPerGroup, arrayRows, arrayCols }]);
    setArrayCols(Math.min(arrayCols + 1, 8));
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setGroups(lastState.groups);
      setItemsPerGroup(lastState.itemsPerGroup);
      setArrayRows(lastState.arrayRows);
      setArrayCols(lastState.arrayCols);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Multiplication Hill Challenge
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Build equal groups and arrays!
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-6 py-3 rounded-xl flex items-center gap-2"
          style={{
            backgroundColor: history.length > 0 ? colors.bg : "#E5E7EB",
            fontWeight: 600,
            opacity: history.length > 0 ? 1 : 0.5,
          }}
        >
          <Undo2 size={20} />
          Undo
        </motion.button>
      </div>

      {/* Activity 1: Equal groups of berries */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🫐 {groups} groups of {itemsPerGroup} berries each
        </h4>
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          {[...Array(groups)].map((_, groupIndex) => (
            <div
              key={groupIndex}
              className="p-4 rounded-2xl"
              style={{ backgroundColor: colors.bg }}
            >
              <div className="text-5xl">{"🫐".repeat(itemsPerGroup)}</div>
            </div>
          ))}
        </div>
        <div className="text-center text-4xl mb-4" style={{ fontWeight: 700, color: colors.accent }}>
          {groups} × {itemsPerGroup} = {groups * itemsPerGroup}
        </div>
        <div className="flex justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddGroup}
            className="px-6 py-3 rounded-xl"
            style={{ backgroundColor: colors.bg, fontWeight: 600 }}
          >
            Add Group
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddBerry}
            className="px-6 py-3 rounded-xl"
            style={{ backgroundColor: colors.bg, fontWeight: 600 }}
          >
            Add Berry per Group
          </motion.button>
        </div>
      </div>

      {/* Activity 2: Mushroom array */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🍄 Create a mushroom array: {arrayRows} × {arrayCols}
        </h4>
        <div className="flex flex-col items-center gap-2 mb-6">
          {[...Array(arrayRows)].map((_, row) => (
            <div key={row} className="flex gap-2">
              {[...Array(arrayCols)].map((_, col) => (
                <div
                  key={col}
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-3xl"
                  style={{ backgroundColor: colors.bg }}
                >
                  🍄
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="text-center text-3xl mb-4" style={{ fontWeight: 700, color: colors.accent }}>
          Total: {arrayRows * arrayCols} mushrooms
        </div>
        <div className="flex justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddRow}
            className="px-6 py-3 rounded-xl"
            style={{ backgroundColor: colors.bg, fontWeight: 600 }}
          >
            Add Row
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddCol}
            className="px-6 py-3 rounded-xl"
            style={{ backgroundColor: colors.bg, fontWeight: 600 }}
          >
            Add Column
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Level 5: Division Ridge - Split items evenly
function DivisionRidgeInteractive({ colors }: any) {
  const [gems, setGems] = useState(12);
  const [bags, setBags] = useState(3);
  const [cookies] = useState(15);
  const [friends, setFriends] = useState(5);
  const [history, setHistory] = useState<any[]>([]);

  const handleRemoveFriend = () => {
    setHistory([...history, { gems, bags, friends }]);
    setFriends(Math.max(1, friends - 1));
  };

  const handleAddFriend = () => {
    setHistory([...history, { gems, bags, friends }]);
    setFriends(Math.min(friends + 1, 5));
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setGems(lastState.gems);
      setBags(lastState.bags);
      setFriends(lastState.friends);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Division Ridge Adventure
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Share items equally into groups!
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-6 py-3 rounded-xl flex items-center gap-2"
          style={{
            backgroundColor: history.length > 0 ? colors.bg : "#E5E7EB",
            fontWeight: 600,
            opacity: history.length > 0 ? 1 : 0.5,
          }}
        >
          <Undo2 size={20} />
          Undo
        </motion.button>
      </div>

      {/* Activity 1: Divide gems into bags */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          💎 Divide {gems} gems into {bags} bags
        </h4>
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          {[...Array(bags)].map((_, bagIndex) => (
            <div
              key={bagIndex}
              className="p-6 rounded-2xl"
              style={{ backgroundColor: colors.bg }}
            >
              <div className="text-4xl mb-2">👜</div>
              <div className="text-5xl">{"💎".repeat(Math.floor(gems / bags))}</div>
              <div className="text-2xl mt-2" style={{ fontWeight: 700, color: "#FFF" }}>
                {Math.floor(gems / bags)} each
              </div>
            </div>
          ))}
        </div>
        <div className="text-center text-3xl" style={{ fontWeight: 700, color: colors.accent }}>
          {gems} ÷ {bags} = {Math.floor(gems / bags)}
        </div>
      </div>

      {/* Activity 2: Share cookies with friends */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🍪 Share {cookies} cookies with {friends} friends
        </h4>
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {[...Array(friends)].map((_, friendIndex) => (
            <div
              key={friendIndex}
              className="p-4 rounded-2xl text-center"
              style={{ backgroundColor: colors.bg }}
            >
              <div className="text-4xl mb-2">😊</div>
              <div className="text-3xl">{"🍪".repeat(cookies / friends)}</div>
              <div className="text-xl mt-2" style={{ fontWeight: 700, color: "#FFF" }}>
                {cookies / friends}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveFriend}
            className="px-6 py-3 rounded-xl"
            style={{ backgroundColor: colors.bg, fontWeight: 600 }}
          >
            Remove Friend
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddFriend}
            className="px-6 py-3 rounded-xl"
            style={{ backgroundColor: colors.bg, fontWeight: 600 }}
          >
            Add Friend
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Level 6: Fraction Falls - Slice and match fractions
function FractionFallsInteractive({ colors }: any) {
  const [selectedSlices, setSelectedSlices] = useState<number[]>([]);
  const [pizzaSlices] = useState(8);
  const [dropletsMatched, setDropletsMatched] = useState<string[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  const toggleSlice = (index: number) => {
    setHistory([...history, { selectedSlices, dropletsMatched }]);
    if (selectedSlices.includes(index)) {
      setSelectedSlices(selectedSlices.filter(i => i !== index));
    } else {
      setSelectedSlices([...selectedSlices, index]);
    }
  };

  const matchDroplet = (fraction: string) => {
    setHistory([...history, { selectedSlices, dropletsMatched }]);
    if (!dropletsMatched.includes(fraction)) {
      setDropletsMatched([...dropletsMatched, fraction]);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setSelectedSlices(lastState.selectedSlices);
      setDropletsMatched(lastState.dropletsMatched);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Fraction Falls Challenge
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Slice, match, and master fractions!
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-6 py-3 rounded-xl flex items-center gap-2"
          style={{
            backgroundColor: history.length > 0 ? colors.bg : "#E5E7EB",
            fontWeight: 600,
            opacity: history.length > 0 ? 1 : 0.5,
          }}
        >
          <Undo2 size={20} />
          Undo
        </motion.button>
      </div>

      {/* Activity 1: Pizza fraction builder */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🍕 Click to build your fraction
        </h4>
        <div className="flex justify-center gap-12">
          <div>
            <div className="grid grid-cols-4 gap-3 w-80 h-80">
              {[...Array(pizzaSlices)].map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSlice(i)}
                  className="rounded-2xl border-4 border-dashed flex items-center justify-center text-5xl"
                  style={{
                    backgroundColor: selectedSlices.includes(i) ? colors.bg : "#FFF3E6",
                    borderColor: colors.accent,
                  }}
                >
                  {selectedSlices.includes(i) ? "🍕" : ""}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div
              className="p-8 rounded-3xl"
              style={{ backgroundColor: colors.bg }}
            >
              <motion.div
                key={selectedSlices.length}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-8xl"
                style={{ fontWeight: 700, color: "#FFF" }}
              >
                {selectedSlices.length}
              </motion.div>
              <div className="h-1 bg-white my-4 rounded-full" />
              <div className="text-8xl" style={{ fontWeight: 700, color: "#FFF" }}>
                {pizzaSlices}
              </div>
            </div>
            <p className="text-center mt-4 text-xl" style={{ fontWeight: 600 }}>
              {selectedSlices.length === 0 && "Click slices!"}
              {selectedSlices.length === 2 && "Two eighths!"}
              {selectedSlices.length === 4 && "One half!"}
              {selectedSlices.length === 8 && "One whole!"}
            </p>
          </div>
        </div>
      </div>

      {/* Activity 2: Match fraction droplets */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          💧 Match the fraction droplets
        </h4>
        <div className="grid grid-cols-3 gap-6">
          {[
            { fraction: "1/2", visual: "●●●●●○○○○○", label: "One Half" },
            { fraction: "1/4", visual: "●●○○○○○○", label: "One Quarter" },
            { fraction: "3/4", visual: "●●●●●●○○", label: "Three Quarters" },
          ].map((droplet) => (
            <motion.button
              key={droplet.fraction}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => matchDroplet(droplet.fraction)}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: dropletsMatched.includes(droplet.fraction) ? colors.bg : "#FFF",
                border: `3px solid ${dropletsMatched.includes(droplet.fraction) ? colors.accent : "#E5E7EB"}`,
              }}
            >
              <div className="text-4xl mb-2">💧</div>
              <div className="text-3xl mb-2" style={{ fontWeight: 700 }}>{droplet.fraction}</div>
              <div className="text-2xl mb-2">{droplet.visual}</div>
              <div style={{ color: "#6B7280" }}>{droplet.label}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Level 7: Decimal Forest - Place fireflies on number line
function DecimalForestInteractive({ colors }: any) {
  const [selectedDecimal, setSelectedDecimal] = useState<number | null>(null);
  const [comparisonAnswer, setComparisonAnswer] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleSelectDecimal = (decimal: number) => {
    setHistory([...history, { selectedDecimal, comparisonAnswer }]);
    setSelectedDecimal(decimal);
  };

  const handleComparisonAnswer = (answer: string) => {
    setHistory([...history, { selectedDecimal, comparisonAnswer }]);
    setComparisonAnswer(answer);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setSelectedDecimal(lastState.selectedDecimal);
      setComparisonAnswer(lastState.comparisonAnswer);
      setHistory(history.slice(0, -1));
    }
  };

  const fireflyPositions = selectedDecimal !== null ? [selectedDecimal] : [0.3, 0.7];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Decimal Forest Adventure
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Explore decimals with glowing fireflies!
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-6 py-3 rounded-xl flex items-center gap-2"
          style={{
            backgroundColor: history.length > 0 ? colors.bg : "#E5E7EB",
            fontWeight: 600,
            opacity: history.length > 0 ? 1 : 0.5,
          }}
        >
          <Undo2 size={20} />
          Undo
        </motion.button>
      </div>

      {/* Activity 1: Firefly number line */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          ✨ Place fireflies on the decimal number line
        </h4>
        <div className="relative mb-8">
          <div className="h-3 rounded-full" style={{ backgroundColor: colors.bg }} />
          <div className="flex justify-between mt-2">
            {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map((num) => (
              <div key={num} className="text-center">
                <div
                  className="w-2 h-8"
                  style={{ backgroundColor: colors.accent, marginLeft: "-4px" }}
                />
                <div className="text-sm mt-1" style={{ fontWeight: 600 }}>
                  {num.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
          {fireflyPositions.map((pos, index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              className="absolute text-4xl"
              style={{
                left: `${pos * 100}%`,
                top: "-40px",
                transform: "translateX(-50%)",
              }}
            >
              🌟
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center gap-3">
          {[0.2, 0.5, 0.8].map((decimal) => (
            <motion.button
              key={decimal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelectDecimal(decimal)}
              className="px-6 py-3 rounded-xl text-xl"
              style={{
                backgroundColor: selectedDecimal === decimal ? colors.accent : colors.bg,
                fontWeight: 700,
                color: selectedDecimal === decimal ? "#FFF" : "#4A5568",
              }}
            >
              {decimal}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Activity 2: Compare brightness */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          💡 Which firefly is brighter? (0.1 vs 0.5)
        </h4>
        <div className="flex justify-center gap-12 mb-6">
          <div className="text-center">
            <motion.div
              animate={{ opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-8xl mb-2"
            >
              ✨
            </motion.div>
            <div className="text-3xl" style={{ fontWeight: 700 }}>0.1</div>
          </div>
          <div className="text-center">
            <motion.div
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-8xl mb-2"
            >
              🌟
            </motion.div>
            <div className="text-3xl" style={{ fontWeight: 700 }}>0.5</div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          {["0.1 is brighter", "0.5 is brighter", "Same brightness"].map((answer) => (
            <motion.button
              key={answer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleComparisonAnswer(answer)}
              className="px-6 py-3 rounded-xl"
              style={{
                backgroundColor: answer === "0.5 is brighter" && comparisonAnswer === answer ? colors.accent : "#FFF",
                border: `3px solid ${answer === "0.5 is brighter" && comparisonAnswer === answer ? colors.accent : "#E5E7EB"}`,
                fontWeight: 600,
                color: answer === "0.5 is brighter" && comparisonAnswer === answer ? "#FFF" : "#4A5568",
              }}
            >
              {answer}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Level 8: Geometry Peak - Match shapes and build structures
function GeometryPeakInteractive({ colors }: any) {
  const [matchedShapes, setMatchedShapes] = useState<string[]>([]);
  const [builtStructure, setBuiltStructure] = useState<string[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  const matchShape = (shape: string) => {
    setHistory([...history, { matchedShapes, builtStructure }]);
    if (!matchedShapes.includes(shape)) {
      setMatchedShapes([...matchedShapes, shape]);
    }
  };

  const addToStructure = (shape: string) => {
    setHistory([...history, { matchedShapes, builtStructure }]);
    if (builtStructure.length < 10) {
      setBuiltStructure([...builtStructure, shape]);
    }
  };

  const clearTower = () => {
    setHistory([...history, { matchedShapes, builtStructure }]);
    setBuiltStructure([]);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setMatchedShapes(lastState.matchedShapes);
      setBuiltStructure(lastState.builtStructure);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Geometry Peak Challenge
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Match crystal shapes and build structures!
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-6 py-3 rounded-xl flex items-center gap-2"
          style={{
            backgroundColor: history.length > 0 ? colors.bg : "#E5E7EB",
            fontWeight: 600,
            opacity: history.length > 0 ? 1 : 0.5,
          }}
        >
          <Undo2 size={20} />
          Undo
        </motion.button>
      </div>

      {/* Activity 1: Match shapes to outlines */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          💎 Match crystal shapes to their outlines
        </h4>
        <div className="grid grid-cols-3 gap-6">
          {[
            { shape: "triangle", emoji: "🔺", label: "Triangle", sides: "3 sides" },
            { shape: "square", emoji: "🟦", label: "Square", sides: "4 equal sides" },
            { shape: "circle", emoji: "🔵", label: "Circle", sides: "No sides" },
          ].map((item) => (
            <motion.button
              key={item.shape}
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => matchShape(item.shape)}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: matchedShapes.includes(item.shape) ? colors.bg : "#FFF",
                border: `3px solid ${matchedShapes.includes(item.shape) ? colors.accent : "#E5E7EB"}`,
              }}
            >
              <div className="text-6xl mb-2">{item.emoji}</div>
              <div className="text-xl mb-1" style={{ fontWeight: 700 }}>{item.label}</div>
              <div className="text-sm" style={{ color: "#6B7280" }}>{item.sides}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Activity 2: Build a shape structure */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🏗️ Build your crystal tower
        </h4>
        <div className="mb-6 p-6 rounded-2xl min-h-32" style={{ backgroundColor: colors.bg }}>
          {builtStructure.length === 0 ? (
            <p className="text-center" style={{ color: "#FFF", fontWeight: 600 }}>
              Click shapes below to build!
            </p>
          ) : (
            <div className="flex justify-center gap-2 flex-wrap">
              {builtStructure.map((shape, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-6xl"
                >
                  {shape === "triangle" && "🔺"}
                  {shape === "square" && "🟦"}
                  {shape === "circle" && "🔵"}
                  {shape === "star" && "⭐"}
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center gap-3">
          {["triangle", "square", "circle", "star"].map((shape) => (
            <motion.button
              key={shape}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addToStructure(shape)}
              className="w-16 h-16 rounded-xl text-4xl"
              style={{
                backgroundColor: "#FFF",
                border: `3px solid ${colors.accent}`,
              }}
            >
              {shape === "triangle" && "🔺"}
              {shape === "square" && "🟦"}
              {shape === "circle" && "🔵"}
              {shape === "star" && "⭐"}
            </motion.button>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearTower}
          className="mt-4 w-full py-3 rounded-xl"
          style={{ backgroundColor: colors.accent, fontWeight: 600, color: "#FFF" }}
        >
          Clear Tower
        </motion.button>
      </div>
    </div>
  );
}

// Level 9: Algebra Summit - Solve for missing numbers
function AlgebraSummitInteractive({ colors }: any) {
  const [equation1Answer, setEquation1Answer] = useState<number | null>(null);
  const [balanceLeft, setBalanceLeft] = useState(5);
  const [balanceRight, setBalanceRight] = useState(5);
  const [history, setHistory] = useState<any[]>([]);

  const handleSetAnswer = (num: number) => {
    setHistory([...history, { equation1Answer, balanceLeft, balanceRight }]);
    setEquation1Answer(num);
  };

  const handleBalanceLeft = (delta: number) => {
    setHistory([...history, { equation1Answer, balanceLeft, balanceRight }]);
    setBalanceLeft(Math.max(0, balanceLeft + delta));
  };

  const handleBalanceRight = (delta: number) => {
    setHistory([...history, { equation1Answer, balanceLeft, balanceRight }]);
    setBalanceRight(Math.max(0, balanceRight + delta));
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setEquation1Answer(lastState.equation1Answer);
      setBalanceLeft(lastState.balanceLeft);
      setBalanceRight(lastState.balanceRight);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Algebra Summit Challenge
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Solve for the unknown values!
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-6 py-3 rounded-xl flex items-center gap-2"
          style={{
            backgroundColor: history.length > 0 ? colors.bg : "#E5E7EB",
            fontWeight: 600,
            opacity: history.length > 0 ? 1 : 0.5,
          }}
        >
          <Undo2 size={20} />
          Undo
        </motion.button>
      </div>

      {/* Activity 1: Find the missing number */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🔍 Drag the number to fill the box: □ + 3 = 7
        </h4>
        <div className="flex items-center justify-center gap-6 mb-6">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl border-4 border-dashed"
            style={{
              backgroundColor: equation1Answer ? colors.bg : "#FFF",
              borderColor: colors.accent,
              fontWeight: 700,
              color: equation1Answer ? "#FFF" : "#4A5568",
            }}
          >
            {equation1Answer || "?"}
          </div>
          <div className="text-5xl" style={{ fontWeight: 700, color: "#4A5568" }}>+</div>
          <div className="text-5xl" style={{ fontWeight: 700, color: "#4A5568" }}>3</div>
          <div className="text-5xl" style={{ fontWeight: 700, color: "#4A5568" }}>=</div>
          <div className="text-5xl" style={{ fontWeight: 700, color: "#4A5568" }}>7</div>
        </div>
        <div className="flex justify-center gap-4">
          {[2, 3, 4, 5].map((num) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSetAnswer(num)}
              className="w-20 h-20 rounded-xl text-3xl"
              style={{
                backgroundColor: equation1Answer === num ? colors.accent : "#FFF",
                border: `3px solid ${equation1Answer === num ? colors.accent : "#E5E7EB"}`,
                fontWeight: 700,
                color: equation1Answer === num ? "#FFF" : "#4A5568",
              }}
            >
              {num}
            </motion.button>
          ))}
        </div>
        {equation1Answer === 4 && (
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="mt-4 text-center text-3xl"
          >
            🎉 Correct! 4 + 3 = 7
          </motion.div>
        )}
      </div>

      {/* Activity 2: Balance scale puzzle */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          ⚖️ Balance the scale (make both sides equal)
        </h4>
        <div className="flex items-end justify-center gap-12 mb-6">
          <div className="text-center">
            <div
              className="p-6 rounded-2xl mb-2"
              style={{
                backgroundColor: colors.bg,
                transform: balanceLeft > balanceRight ? "translateY(20px)" : balanceLeft < balanceRight ? "translateY(-20px)" : "translateY(0)",
                transition: "transform 0.3s",
              }}
            >
              <div className="text-5xl mb-2">{"⭐".repeat(balanceLeft)}</div>
              <div className="text-3xl" style={{ fontWeight: 700, color: "#FFF" }}>{balanceLeft}</div>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleBalanceLeft(-1)}
                className="px-4 py-2 rounded-lg"
                style={{ backgroundColor: colors.accent, fontWeight: 700, color: "#FFF" }}
              >
                −
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleBalanceLeft(1)}
                className="px-4 py-2 rounded-lg"
                style={{ backgroundColor: colors.accent, fontWeight: 700, color: "#FFF" }}
              >
                +
              </motion.button>
            </div>
          </div>

          <div className="text-7xl">⚖️</div>

          <div className="text-center">
            <div
              className="p-6 rounded-2xl mb-2"
              style={{
                backgroundColor: colors.bg,
                transform: balanceRight > balanceLeft ? "translateY(20px)" : balanceRight < balanceLeft ? "translateY(-20px)" : "translateY(0)",
                transition: "transform 0.3s",
              }}
            >
              <div className="text-5xl mb-2">{"💎".repeat(balanceRight)}</div>
              <div className="text-3xl" style={{ fontWeight: 700, color: "#FFF" }}>{balanceRight}</div>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleBalanceRight(-1)}
                className="px-4 py-2 rounded-lg"
                style={{ backgroundColor: colors.accent, fontWeight: 700, color: "#FFF" }}
              >
                −
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleBalanceRight(1)}
                className="px-4 py-2 rounded-lg"
                style={{ backgroundColor: colors.accent, fontWeight: 700, color: "#FFF" }}
              >
                +
              </motion.button>
            </div>
          </div>
        </div>
        {balanceLeft === balanceRight && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center text-3xl"
            style={{ fontWeight: 700, color: colors.accent }}
          >
            ✨ Balanced! {balanceLeft} = {balanceRight}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Level 10: Problem Solving Paradise - Word problem scenes
function ProblemSolvingInteractive({ colors }: any) {
  const [scenario1Answer, setScenario1Answer] = useState<number | null>(null);
  const [scenario2Answer, setScenario2Answer] = useState<string | null>(null);
  const [scenario3Answer, setScenario3Answer] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleScenario1 = (num: number) => {
    setHistory([...history, { scenario1Answer, scenario2Answer, scenario3Answer }]);
    setScenario1Answer(num);
  };

  const handleScenario2 = (answer: string) => {
    setHistory([...history, { scenario1Answer, scenario2Answer, scenario3Answer }]);
    setScenario2Answer(answer);
  };

  const handleScenario3 = (num: number) => {
    setHistory([...history, { scenario1Answer, scenario2Answer, scenario3Answer }]);
    setScenario3Answer(num);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setScenario1Answer(lastState.scenario1Answer);
      setScenario2Answer(lastState.scenario2Answer);
      setScenario3Answer(lastState.scenario3Answer);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Problem Solving Paradise
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Solve real-world math problems!
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-6 py-3 rounded-xl flex items-center gap-2"
          style={{
            backgroundColor: history.length > 0 ? colors.bg : "#E5E7EB",
            fontWeight: 600,
            opacity: history.length > 0 ? 1 : 0.5,
          }}
        >
          <Undo2 size={20} />
          Undo
        </motion.button>
      </div>

      {/* Scenario 1: Apple picking */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🍎 Scenario 1: Apple Picking
        </h4>
        <div className="mb-6 p-6 rounded-2xl" style={{ backgroundColor: "#FFF" }}>
          <p className="text-lg mb-4" style={{ color: "#4A5568" }}>
            Sarah picked <span style={{ fontWeight: 700 }}>8 apples</span> from one tree and{" "}
            <span style={{ fontWeight: 700 }}>5 apples</span> from another tree.
            How many apples did she pick in total?
          </p>
          <div className="flex justify-center gap-4 mb-4">
            <div className="text-6xl">{"🍎".repeat(8)}</div>
            <div className="text-5xl flex items-center" style={{ fontWeight: 700, color: colors.accent }}>+</div>
            <div className="text-6xl">{"🍎".repeat(5)}</div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          {[11, 12, 13, 14].map((num) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleScenario1(num)}
              className="w-20 h-20 rounded-xl text-3xl"
              style={{
                backgroundColor: scenario1Answer === num ? (num === 13 ? colors.accent : "#EF4444") : "#FFF",
                border: `3px solid ${scenario1Answer === num ? (num === 13 ? colors.accent : "#EF4444") : "#E5E7EB"}`,
                fontWeight: 700,
                color: scenario1Answer === num ? "#FFF" : "#4A5568",
              }}
            >
              {num}
            </motion.button>
          ))}
        </div>
        {scenario1Answer === 13 && (
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="mt-4 text-center text-2xl"
            style={{ fontWeight: 700, color: colors.accent }}
          >
            🎉 Correct! 8 + 5 = 13 apples!
          </motion.div>
        )}
      </div>

      {/* Scenario 2: Cookie sharing */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🍪 Scenario 2: Sharing Cookies
        </h4>
        <div className="mb-6 p-6 rounded-2xl" style={{ backgroundColor: "#FFF" }}>
          <p className="text-lg mb-4" style={{ color: "#4A5568" }}>
            Mom baked <span style={{ fontWeight: 700 }}>12 cookies</span>.
            She wants to share them equally among <span style={{ fontWeight: 700 }}>4 friends</span>.
            How many cookies does each friend get?
          </p>
          <div className="flex justify-center gap-8">
            <div>
              <div className="text-5xl mb-2">{"🍪".repeat(12)}</div>
              <div className="text-xl" style={{ color: "#6B7280" }}>12 cookies</div>
            </div>
            <div className="text-5xl flex items-center" style={{ fontWeight: 700, color: colors.accent }}>÷</div>
            <div>
              <div className="text-5xl mb-2">{"😊😊😊😊"}</div>
              <div className="text-xl" style={{ color: "#6B7280" }}>4 friends</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          {["2 cookies each", "3 cookies each", "4 cookies each"].map((answer) => (
            <motion.button
              key={answer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScenario2(answer)}
              className="px-6 py-3 rounded-xl"
              style={{
                backgroundColor: scenario2Answer === answer ? (answer === "3 cookies each" ? colors.accent : "#EF4444") : "#FFF",
                border: `3px solid ${scenario2Answer === answer ? (answer === "3 cookies each" ? colors.accent : "#EF4444") : "#E5E7EB"}`,
                fontWeight: 600,
                color: scenario2Answer === answer ? "#FFF" : "#4A5568",
              }}
            >
              {answer}
            </motion.button>
          ))}
        </div>
        {scenario2Answer === "3 cookies each" && (
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="mt-4 text-center text-2xl"
            style={{ fontWeight: 700, color: colors.accent }}
          >
            🎉 Perfect! 12 ÷ 4 = 3 cookies each!
          </motion.div>
        )}
      </div>

      {/* Scenario 3: Money math */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          💰 Scenario 3: Saving Money
        </h4>
        <div className="mb-6 p-6 rounded-2xl" style={{ backgroundColor: "#FFF" }}>
          <p className="text-lg mb-4" style={{ color: "#4A5568" }}>
            Tom had <span style={{ fontWeight: 700 }}>15 coins</span> in his piggy bank.
            He spent <span style={{ fontWeight: 700 }}>6 coins</span> on a toy.
            How many coins does he have left?
          </p>
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <div className="text-5xl mb-2">{"🪙".repeat(15)}</div>
              <div className="text-xl" style={{ color: "#6B7280" }}>Started with 15</div>
            </div>
            <div className="text-5xl flex items-center" style={{ fontWeight: 700, color: colors.accent }}>−</div>
            <div className="text-center">
              <div className="text-5xl mb-2">{"🪙".repeat(6)}</div>
              <div className="text-xl" style={{ color: "#6B7280" }}>Spent 6</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          {[7, 8, 9, 10].map((num) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleScenario3(num)}
              className="w-20 h-20 rounded-xl text-3xl"
              style={{
                backgroundColor: scenario3Answer === num ? (num === 9 ? colors.accent : "#EF4444") : "#FFF",
                border: `3px solid ${scenario3Answer === num ? (num === 9 ? colors.accent : "#EF4444") : "#E5E7EB"}`,
                fontWeight: 700,
                color: scenario3Answer === num ? "#FFF" : "#4A5568",
              }}
            >
              {num}
            </motion.button>
          ))}
        </div>
        {scenario3Answer === 9 && (
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="mt-4 text-center text-2xl"
            style={{ fontWeight: 700, color: colors.accent }}
          >
            🎉 Excellent! 15 - 6 = 9 coins left!
          </motion.div>
        )}
      </div>
    </div>
  );
}
