import { motion, AnimatePresence } from "motion/react";
import { Undo2 } from "lucide-react";
import { useState } from "react";

// Level 6: Forces & Motion - Interactive physics playground
export function ForcesMotionInteractive({ colors }: any) {
  const [rampAngle, setRampAngle] = useState(30);
  const [ballPosition, setBallPosition] = useState(0);
  const [magnetActive, setMagnetActive] = useState(false);
  const [pushedItems, setPushedItems] = useState<string[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  const handlePushBall = () => {
    setHistory([...history, { rampAngle, ballPosition, magnetActive, pushedItems }]);
    const speed = rampAngle / 10;
    setBallPosition(Math.min(100, ballPosition + speed * 20));
  };

  const handleResetBall = () => {
    setHistory([...history, { rampAngle, ballPosition, magnetActive, pushedItems }]);
    setBallPosition(0);
  };

  const handleRampChange = (angle: number) => {
    setHistory([...history, { rampAngle, ballPosition, magnetActive, pushedItems }]);
    setRampAngle(angle);
    setBallPosition(0);
  };

  const handleMagnetToggle = () => {
    setHistory([...history, { rampAngle, ballPosition, magnetActive, pushedItems }]);
    setMagnetActive(!magnetActive);
  };

  const handlePushItem = (item: string) => {
    setHistory([...history, { rampAngle, ballPosition, magnetActive, pushedItems }]);
    if (!pushedItems.includes(item)) {
      setPushedItems([...pushedItems, item]);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setRampAngle(lastState.rampAngle);
      setBallPosition(lastState.ballPosition);
      setMagnetActive(lastState.magnetActive);
      setPushedItems(lastState.pushedItems);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Force Genius Lab
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Experiment with push, pull, and gravity!
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

      {/* Ramp activity */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🛝 Ramp Experiment - Angle: {rampAngle}°
        </h4>
        <div className="relative h-48 mb-4 p-6 rounded-xl" style={{ backgroundColor: "#FFF" }}>
          {/* Ramp visualization */}
          <div
            className="absolute bottom-0 left-0 w-2/3 bg-gradient-to-r from-amber-300 to-amber-500 rounded-lg"
            style={{
              height: "8px",
              transform: `rotate(-${rampAngle / 2}deg)`,
              transformOrigin: "bottom left",
            }}
          />
          {/* Ball */}
          <motion.div
            className="absolute text-5xl"
            style={{
              left: `${ballPosition}%`,
              bottom: `${ballPosition * (rampAngle / 100)}%`,
            }}
            animate={{ rotate: ballPosition * 3.6 }}
          >
            ⚽
          </motion.div>
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleRampChange(15)}
            className="px-4 py-2 rounded-xl"
            style={{
              backgroundColor: rampAngle === 15 ? colors.accent : colors.bg,
              color: rampAngle === 15 ? "#FFF" : "#4A5568",
              fontWeight: 600,
            }}
          >
            Gentle (15°)
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleRampChange(30)}
            className="px-4 py-2 rounded-xl"
            style={{
              backgroundColor: rampAngle === 30 ? colors.accent : colors.bg,
              color: rampAngle === 30 ? "#FFF" : "#4A5568",
              fontWeight: 600,
            }}
          >
            Medium (30°)
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleRampChange(45)}
            className="px-4 py-2 rounded-xl"
            style={{
              backgroundColor: rampAngle === 45 ? colors.accent : colors.bg,
              color: rampAngle === 45 ? "#FFF" : "#4A5568",
              fontWeight: 600,
            }}
          >
            Steep (45°)
          </motion.button>
        </div>
        <div className="flex gap-3 justify-center mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePushBall}
            className="px-6 py-3 rounded-xl text-white"
            style={{ backgroundColor: colors.accent, fontWeight: 600 }}
          >
            Push Ball ➡️
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetBall}
            className="px-6 py-3 rounded-xl"
            style={{ backgroundColor: colors.bg, fontWeight: 600 }}
          >
            Reset
          </motion.button>
        </div>
      </div>

      {/* Magnet activity */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🧲 Magnetic Force
        </h4>
        <div className="flex items-center justify-center gap-12 mb-4">
          <div className="text-7xl">🧲</div>
          {magnetActive && (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-6xl"
            >
              🔩
            </motion.div>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMagnetToggle}
          className="w-full py-4 rounded-xl text-white text-xl"
          style={{ backgroundColor: colors.accent, fontWeight: 700 }}
        >
          {magnetActive ? "🧲 Magnet is Pulling!" : "🧲 Activate Magnet"}
        </motion.button>
      </div>

      {/* Push/Pull activity */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          💪 Push & Pull Forces
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: "cart", emoji: "🛒", label: "Shopping Cart" },
            { id: "door", emoji: "🚪", label: "Door" },
            { id: "box", emoji: "📦", label: "Box" },
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, x: 10 }}
              onClick={() => handlePushItem(item.id)}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: pushedItems.includes(item.id) ? colors.bg : "#FFF",
                border: `2px solid ${pushedItems.includes(item.id) ? colors.accent : "#E5E7EB"}`,
              }}
            >
              <div className="text-5xl mb-2">{item.emoji}</div>
              <div style={{ fontWeight: 600 }}>{item.label}</div>
              {pushedItems.includes(item.id) && (
                <div className="text-sm mt-2" style={{ color: colors.accent }}>
                  Pushed! ➡️
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Level 7: Solar System - Order planets
export function SolarSystemInteractive({ colors }: any) {
  const [planetOrder, setPlanetOrder] = useState<string[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const planets = [
    { id: "mercury", emoji: "☿️", name: "Mercury", order: 1 },
    { id: "venus", emoji: "♀️", name: "Venus", order: 2 },
    { id: "earth", emoji: "🌍", name: "Earth", order: 3 },
    { id: "mars", emoji: "♂️", name: "Mars", order: 4 },
    { id: "jupiter", emoji: "🪐", name: "Jupiter", order: 5 },
    { id: "saturn", emoji: "🪐", name: "Saturn", order: 6 },
  ];

  const handlePlanetClick = (planetId: string) => {
    setHistory([...history, planetOrder]);
    if (planetOrder.includes(planetId)) {
      setPlanetOrder(planetOrder.filter(p => p !== planetId));
    } else {
      setPlanetOrder([...planetOrder, planetId]);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      setPlanetOrder(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

  const isCorrectOrder = () => {
    return planetOrder.length === planets.length &&
      planetOrder.every((pid, idx) => {
        const planet = planets.find(p => p.id === pid);
        return planet && planet.order === idx + 1;
      });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Space Ranger Mission
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Put the planets in order from the Sun!
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

      {/* Sun */}
      <div className="flex justify-center mb-6">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-9xl"
        >
          ☀️
        </motion.div>
      </div>

      {/* Ordered planets */}
      <div className="p-6 rounded-2xl min-h-[120px]" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🪐 Your Planet Order
        </h4>
        <div className="flex justify-center gap-4 flex-wrap">
          {planetOrder.map((planetId, index) => {
            const planet = planets.find(p => p.id === planetId);
            return planet ? (
              <motion.div
                key={planetId}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <div className="text-5xl mb-1">{planet.emoji}</div>
                <div className="text-sm" style={{ fontWeight: 600 }}>{index + 1}</div>
              </motion.div>
            ) : null;
          })}
        </div>
      </div>

      {/* Available planets */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          Click planets in order from the Sun
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {planets.map((planet) => (
            <motion.button
              key={planet.id}
              whileHover={{ scale: planetOrder.includes(planet.id) ? 1 : 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePlanetClick(planet.id)}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: planetOrder.includes(planet.id) ? colors.bg : "#FFF",
                border: `3px solid ${planetOrder.includes(planet.id) ? colors.accent : "#E5E7EB"}`,
                opacity: planetOrder.includes(planet.id) ? 0.5 : 1,
              }}
            >
              <motion.div
                animate={planetOrder.includes(planet.id) ? {} : { rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-6xl mb-2"
              >
                {planet.emoji}
              </motion.div>
              <div style={{ fontWeight: 600 }}>{planet.name}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Success */}
      {isCorrectOrder() && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="p-6 rounded-2xl text-center"
          style={{ backgroundColor: colors.accent }}
        >
          <div className="text-5xl mb-2">🚀</div>
          <div className="text-2xl" style={{ fontWeight: 700, color: "#FFF" }}>
            Perfect! You ordered the planets correctly!
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Level 8: Ecosystems - Sort biomes
export function EcosystemsInteractive({ colors }: any) {
  const [items, setItems] = useState([
    { id: 1, emoji: "🌵", label: "Cactus", biome: "desert", placed: false, bin: "" },
    { id: 2, emoji: "🐻‍❄️", label: "Polar Bear", biome: "tundra", placed: false, bin: "" },
    { id: 3, emoji: "🐠", label: "Fish", biome: "ocean", placed: false, bin: "" },
    { id: 4, emoji: "🦌", label: "Deer", biome: "forest", placed: false, bin: "" },
    { id: 5, emoji: "🦎", label: "Lizard", biome: "desert", placed: false, bin: "" },
    { id: 6, emoji: "🌲", label: "Pine Tree", biome: "forest", placed: false, bin: "" },
  ]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleItemClick = (id: number) => {
    setSelectedItem(id);
  };

  const handleBinClick = (biome: string) => {
    if (selectedItem !== null) {
      setHistory([...history, items]);
      setItems(items.map(item => 
        item.id === selectedItem 
          ? { ...item, placed: true, bin: biome }
          : item
      ));
      setSelectedItem(null);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      setItems(history[history.length - 1]);
      setHistory(history.slice(0, -1));
      setSelectedItem(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Eco Explorer Challenge
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Sort plants and animals into their biomes!
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

      {/* Items */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🌍 Click an item to select it
        </h4>
        <div className="flex justify-center gap-4 flex-wrap">
          {items.filter(item => !item.placed).map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleItemClick(item.id)}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: selectedItem === item.id ? colors.accent : "#FFF",
                border: `3px solid ${selectedItem === item.id ? colors.accent : "#E5E7EB"}`,
              }}
            >
              <div className="text-5xl mb-2">{item.emoji}</div>
              <div style={{ fontWeight: 600, color: "#4A5568" }}>{item.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Biomes */}
      <div className="grid grid-cols-2 gap-6">
        {[
          { type: "desert", title: "🏜️ Desert", desc: "Hot, dry, sandy" },
          { type: "forest", title: "🌲 Forest", desc: "Trees, rain, wildlife" },
          { type: "ocean", title: "🌊 Ocean", desc: "Salty water, fish" },
          { type: "tundra", title: "❄️ Tundra", desc: "Cold, icy, frozen" },
        ].map((biome) => (
          <motion.button
            key={biome.type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleBinClick(biome.type)}
            className="p-6 rounded-2xl border-4 border-dashed min-h-[150px]"
            style={{
              backgroundColor: colors.highlight,
              borderColor: selectedItem !== null ? colors.accent : "#E5E7EB",
            }}
          >
            <div className="text-xl mb-2" style={{ fontWeight: 700, color: "#4A5568" }}>
              {biome.title}
            </div>
            <div className="text-sm mb-3" style={{ color: "#6B7280" }}>
              {biome.desc}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {items.filter(item => item.bin === biome.type).map((item) => (
                <div key={item.id} className="flex items-center gap-1">
                  <div className="text-3xl">{item.emoji}</div>
                  {item.bin !== item.biome && (
                    <div className="text-xl">❌</div>
                  )}
                  {item.bin === item.biome && (
                    <div className="text-xl">✅</div>
                  )}
                </div>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Success */}
      {items.filter(i => i.placed && i.bin === i.biome).length === items.length && items.every(i => i.placed) && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="p-6 rounded-2xl text-center"
          style={{ backgroundColor: colors.accent }}
        >
          <div className="text-5xl mb-2">🌍</div>
          <div className="text-2xl" style={{ fontWeight: 700, color: "#FFF" }}>
            Excellent! You sorted all items into their correct ecosystems!
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Level 9: Human Body - Place organs
export function HumanBodyInteractive({ colors }: any) {
  const [organMatches, setOrganMatches] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<any[]>([]);

  const organs = [
    { id: "heart", emoji: "❤️", name: "Heart", function: "pumps blood" },
    { id: "lungs", emoji: "🫁", name: "Lungs", function: "breathing" },
    { id: "brain", emoji: "🧠", name: "Brain", function: "thinking" },
    { id: "stomach", emoji: "🤢", name: "Stomach", function: "digests food" },
  ];

  const functions = [
    { id: "pumps blood", label: "Pumps Blood" },
    { id: "breathing", label: "Helps You Breathe" },
    { id: "thinking", label: "Controls Thinking" },
    { id: "digests food", label: "Digests Food" },
  ];

  const handleMatch = (organId: string, functionId: string) => {
    setHistory([...history, organMatches]);
    setOrganMatches({ ...organMatches, [organId]: functionId });
  };

  const handleUndo = () => {
    if (history.length > 0) {
      setOrganMatches(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Body Explorer Challenge
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Match each organ to its function!
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

      {/* Organs and Functions */}
      <div className="grid grid-cols-2 gap-8">
        {/* Organs */}
        <div className="space-y-4">
          <h4 className="text-xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
            Organs
          </h4>
          {organs.map((organ) => (
            <div
              key={organ.id}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: organMatches[organ.id] ? colors.bg : colors.highlight,
                border: `2px solid ${organMatches[organ.id] === organ.function ? colors.accent : "#E5E7EB"}`,
              }}
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">{organ.emoji}</div>
                <div className="flex-1">
                  <div className="text-xl" style={{ fontWeight: 700 }}>{organ.name}</div>
                  {organMatches[organ.id] && (
                    <div className="text-sm mt-1" style={{ color: colors.accent }}>
                      Matched!
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Functions */}
        <div className="space-y-4">
          <h4 className="text-xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
            Functions
          </h4>
          {functions.map((func) => (
            <div
              key={func.id}
              className="p-4 rounded-2xl"
              style={{ backgroundColor: colors.highlight }}
            >
              <div className="text-lg mb-3" style={{ fontWeight: 700 }}>{func.label}</div>
              <div className="flex gap-2 flex-wrap">
                {organs.map((organ) => (
                  <motion.button
                    key={organ.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMatch(organ.id, func.id)}
                    className="px-4 py-2 rounded-xl"
                    style={{
                      backgroundColor: organMatches[organ.id] === func.id ? colors.accent : "#FFF",
                      color: organMatches[organ.id] === func.id ? "#FFF" : "#4A5568",
                      fontWeight: 600,
                    }}
                  >
                    {organ.emoji} {organ.name}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success */}
      {Object.keys(organMatches).length === organs.length &&
        organs.every(organ => organMatches[organ.id] === organ.function) && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="p-6 rounded-2xl text-center"
            style={{ backgroundColor: colors.accent }}
          >
            <div className="text-5xl mb-2">🎉</div>
            <div className="text-2xl" style={{ fontWeight: 700, color: "#FFF" }}>
              Perfect! You matched all organs with their functions!
            </div>
          </motion.div>
        )}
    </div>
  );
}

// Level 10: Scientific Method - Build an experiment
export function ScientificMethodInteractive({ colors }: any) {
  const [steps, setSteps] = useState<string[]>([]);
  const [hypothesis, setHypothesis] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<any[]>([]);

  const methodSteps = [
    { id: "question", emoji: "❓", name: "Ask Question", order: 1 },
    { id: "hypothesis", emoji: "💭", name: "Make Hypothesis", order: 2 },
    { id: "test", emoji: "🧪", name: "Test", order: 3 },
    { id: "observe", emoji: "👀", name: "Observe", order: 4 },
    { id: "conclude", emoji: "📝", name: "Conclude", order: 5 },
  ];

  const handleStepClick = (stepId: string) => {
    setHistory([...history, { steps, hypothesis, result }]);
    if (steps.includes(stepId)) {
      setSteps(steps.filter(s => s !== stepId));
    } else {
      setSteps([...steps, stepId]);
    }
  };

  const handleSetHypothesis = (hyp: string) => {
    setHistory([...history, { steps, hypothesis, result }]);
    setHypothesis(hyp);
  };

  const handleTest = () => {
    setHistory([...history, { steps, hypothesis, result }]);
    setResult(hypothesis === "yes" ? "The plant with music grew taller!" : "Both plants grew the same.");
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setSteps(lastState.steps);
      setHypothesis(lastState.hypothesis);
      setResult(lastState.result);
      setHistory(history.slice(0, -1));
    }
  };

  const isCorrectOrder = () => {
    return steps.length === methodSteps.length &&
      steps.every((stepId, idx) => {
        const step = methodSteps.find(s => s.id === stepId);
        return step && step.order === idx + 1;
      });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Science Detective Lab
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Build your experiment using the scientific method!
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

      {/* Question */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-2xl mb-3" style={{ fontWeight: 700, color: colors.accent }}>
          ❓ Research Question
        </h4>
        <p className="text-lg" style={{ color: "#4A5568" }}>
          Do plants grow faster with music?
        </p>
      </div>

      {/* Hypothesis */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
          💭 Make Your Hypothesis
        </h4>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSetHypothesis("yes")}
            className="flex-1 py-4 rounded-xl"
            style={{
              backgroundColor: hypothesis === "yes" ? colors.accent : "#FFF",
              color: hypothesis === "yes" ? "#FFF" : "#4A5568",
              border: `2px solid ${hypothesis === "yes" ? colors.accent : "#E5E7EB"}`,
              fontWeight: 600,
            }}
          >
            Yes, music helps plants grow
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSetHypothesis("no")}
            className="flex-1 py-4 rounded-xl"
            style={{
              backgroundColor: hypothesis === "no" ? colors.accent : "#FFF",
              color: hypothesis === "no" ? "#FFF" : "#4A5568",
              border: `2px solid ${hypothesis === "no" ? colors.accent : "#E5E7EB"}`,
              fontWeight: 600,
            }}
          >
            No, music doesn't help
          </motion.button>
        </div>
      </div>

      {/* Test */}
      {hypothesis && (
        <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
          <h4 className="text-xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
            🧪 Run Your Test
          </h4>
          <div className="flex gap-6 justify-center mb-4">
            <div className="text-center">
              <div className="text-6xl mb-2">🌱🎵</div>
              <div style={{ fontWeight: 600 }}>Plant with music</div>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-2">🌱</div>
              <div style={{ fontWeight: 600 }}>Plant without music</div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTest}
            className="w-full py-4 rounded-xl text-white"
            style={{ backgroundColor: colors.accent, fontWeight: 700 }}
          >
            Run Experiment
          </motion.button>
        </div>
      )}

      {/* Result */}
      {result && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="p-6 rounded-2xl text-center"
          style={{ backgroundColor: colors.accent }}
        >
          <div className="text-5xl mb-3">📊</div>
          <div className="text-2xl mb-2" style={{ fontWeight: 700, color: "#FFF" }}>
            Results: {result}
          </div>
          <div className="text-lg" style={{ color: "#FFF" }}>
            Great job following the scientific method!
          </div>
        </motion.div>
      )}

      {/* Method steps order */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
          📋 Put the Scientific Method steps in order
        </h4>
        <div className="flex justify-center gap-3 mb-4">
          {steps.map((stepId, index) => {
            const step = methodSteps.find(s => s.id === stepId);
            return step ? (
              <div
                key={stepId}
                className="p-3 rounded-xl text-center"
                style={{ backgroundColor: colors.bg }}
              >
                <div className="text-3xl mb-1">{step.emoji}</div>
                <div className="text-sm" style={{ fontWeight: 600 }}>{index + 1}</div>
              </div>
            ) : null;
          })}
        </div>
        <div className="grid grid-cols-5 gap-3">
          {methodSteps.map((step) => (
            <motion.button
              key={step.id}
              whileHover={{ scale: steps.includes(step.id) ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStepClick(step.id)}
              className="p-4 rounded-xl"
              style={{
                backgroundColor: steps.includes(step.id) ? colors.bg : "#FFF",
                border: `2px solid ${steps.includes(step.id) ? colors.accent : "#E5E7EB"}`,
                opacity: steps.includes(step.id) ? 0.5 : 1,
              }}
            >
              <div className="text-4xl mb-2">{step.emoji}</div>
              <div className="text-xs" style={{ fontWeight: 600 }}>{step.name}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Success */}
      {isCorrectOrder() && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="p-6 rounded-2xl text-center"
          style={{ backgroundColor: colors.accent }}
        >
          <div className="text-5xl mb-2">🔬</div>
          <div className="text-2xl" style={{ fontWeight: 700, color: "#FFF" }}>
            Perfect! You mastered the scientific method!
          </div>
        </motion.div>
      )}
    </div>
  );
}