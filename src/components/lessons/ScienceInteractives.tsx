import { motion, AnimatePresence } from "motion/react";
import { Undo2, Flame, Snowflake, Wind } from "lucide-react";
import { useState } from "react";

// Level 1: Matter Basics - Sort items into Solid/Liquid/Gas bins
export function MatterBasicsInteractive({ colors }: any) {
  const [items, setItems] = useState([
    { id: 1, emoji: "🧊", label: "Ice Cube", state: "solid", placed: false, bin: "" },
    { id: 2, emoji: "💧", label: "Water Drop", state: "liquid", placed: false, bin: "" },
    { id: 3, emoji: "💨", label: "Steam", state: "gas", placed: false, bin: "" },
    { id: 4, emoji: "🪨", label: "Rock", state: "solid", placed: false, bin: "" },
    { id: 5, emoji: "🫗", label: "Juice", state: "liquid", placed: false, bin: "" },
    { id: 6, emoji: "☁️", label: "Cloud", state: "gas", placed: false, bin: "" },
  ]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [heatingItem, setHeatingItem] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleItemClick = (id: number) => {
    setSelectedItem(id);
  };

  const handleBinClick = (binType: string) => {
    if (selectedItem !== null) {
      setHistory([...history, items]);
      setItems(items.map(item => 
        item.id === selectedItem 
          ? { ...item, placed: true, bin: binType }
          : item
      ));
      setSelectedItem(null);
    }
  };

  const handleHeatCool = (id: number, action: "heat" | "cool") => {
    setHeatingItem(id);
    setTimeout(() => setHeatingItem(null), 1000);
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
            Matter Master Challenge
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Drag items into Solid, Liquid, or Gas bins!
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

      {/* Items to sort */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🧪 Click an item to select it
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

      {/* Bins */}
      <div className="grid grid-cols-3 gap-6">
        {["solid", "liquid", "gas"].map((binType) => (
          <motion.button
            key={binType}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleBinClick(binType)}
            className="p-8 rounded-2xl border-4 border-dashed min-h-[200px]"
            style={{
              backgroundColor: colors.highlight,
              borderColor: selectedItem !== null ? colors.accent : "#E5E7EB",
            }}
          >
            <div className="text-2xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
              {binType === "solid" && "🧊 SOLID"}
              {binType === "liquid" && "💧 LIQUID"}
              {binType === "gas" && "💨 GAS"}
            </div>
            <div className="flex flex-col gap-2">
              {items.filter(item => item.bin === binType).map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="text-3xl">{item.emoji}</div>
                  {item.bin !== item.state && (
                    <div className="text-2xl">❌</div>
                  )}
                  {item.bin === item.state && (
                    <div className="text-2xl">✅</div>
                  )}
                </div>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      {items.filter(item => item.placed && item.bin === item.state).length === items.length && items.every(i => i.placed) && (
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="p-6 rounded-2xl text-center"
          style={{ backgroundColor: colors.accent }}
        >
          <div className="text-5xl mb-2">✨</div>
          <div className="text-2xl" style={{ fontWeight: 700, color: "#FFF" }}>
            Perfect! You sorted all states of matter correctly!
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Level 2: Water Cycle - Move droplet through stages
export function WaterCycleInteractive({ colors }: any) {
  const [currentStage, setCurrentStage] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const stages = [
    { id: 0, name: "Collection", emoji: "💧", description: "Water sits in lakes, rivers, and oceans" },
    { id: 1, name: "Evaporation", emoji: "☀️", description: "Sun heats water, turning it to vapor" },
    { id: 2, name: "Condensation", emoji: "☁️", description: "Water vapor cools and forms clouds" },
    { id: 3, name: "Precipitation", emoji: "🌧️", description: "Water falls as rain, snow, or hail" },
  ];

  const handleNextStage = () => {
    setHistory([...history, currentStage]);
    if (currentStage === 3) {
      setCurrentStage(0);
      setCompleted(true);
    } else {
      setCurrentStage(currentStage + 1);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      setCurrentStage(history[history.length - 1]);
      setHistory(history.slice(0, -1));
      setCompleted(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Water Cycle Explorer
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Guide Drippy the droplet through the water cycle!
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

      {/* Current stage display */}
      <motion.div
        key={currentStage}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-12 rounded-2xl text-center"
        style={{ backgroundColor: colors.highlight }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-9xl mb-4"
        >
          {stages[currentStage].emoji}
        </motion.div>
        <h4 className="text-3xl mb-3" style={{ fontWeight: 700, color: colors.accent }}>
          {stages[currentStage].name}
        </h4>
        <p className="text-xl" style={{ color: "#6B7280" }}>
          {stages[currentStage].description}
        </p>
      </motion.div>

      {/* Stage progress */}
      <div className="flex justify-center gap-4">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className="p-4 rounded-xl text-center"
            style={{
              backgroundColor: index <= currentStage ? colors.bg : "#F3F4F6",
              opacity: index <= currentStage ? 1 : 0.5,
            }}
          >
            <div className="text-4xl mb-1">{stage.emoji}</div>
            <div className="text-sm" style={{ fontWeight: 600 }}>{stage.name}</div>
          </div>
        ))}
      </div>

      {/* Action button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNextStage}
        className="w-full py-6 rounded-2xl text-white text-xl"
        style={{
          backgroundColor: colors.accent,
          fontWeight: 700,
        }}
      >
        {currentStage === 0 && "☀️ Heat the Water!"}
        {currentStage === 1 && "❄️ Cool into Clouds!"}
        {currentStage === 2 && "🌧️ Make it Rain!"}
        {currentStage === 3 && "💧 Collect the Water!"}
      </motion.button>

      {/* Completion message */}
      {completed && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="p-6 rounded-2xl text-center"
          style={{ backgroundColor: colors.accent }}
        >
          <div className="text-5xl mb-2">🎉</div>
          <div className="text-2xl" style={{ fontWeight: 700, color: "#FFF" }}>
            Amazing! You completed the water cycle!
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Level 3: Plant Life - Grow a plant
export function PlantLifeInteractive({ colors }: any) {
  const [hasSunlight, setHasSunlight] = useState(false);
  const [hasWater, setHasWater] = useState(false);
  const [hasSoil, setHasSoil] = useState(false);
  const [plantParts, setPlantParts] = useState<Record<string, boolean>>({
    roots: false,
    stem: false,
    leaves: false,
    flower: false,
  });
  const [history, setHistory] = useState<any[]>([]);

  const growthStage = [hasSunlight, hasWater, hasSoil].filter(Boolean).length;

  const handleToggleNeed = (need: string) => {
    setHistory([...history, { hasSunlight, hasWater, hasSoil, plantParts }]);
    if (need === "sunlight") setHasSunlight(!hasSunlight);
    if (need === "water") setHasWater(!hasWater);
    if (need === "soil") setHasSoil(!hasSoil);
  };

  const handleTogglePart = (part: string) => {
    setHistory([...history, { hasSunlight, hasWater, hasSoil, plantParts }]);
    setPlantParts({ ...plantParts, [part]: !plantParts[part] });
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setHasSunlight(lastState.hasSunlight);
      setHasWater(lastState.hasWater);
      setHasSoil(lastState.hasSoil);
      setPlantParts(lastState.plantParts);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Grow Your Own Plant
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Give your plant what it needs to grow!
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

      {/* Plant needs */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🌱 What does your plant need?
        </h4>
        <div className="flex justify-center gap-6">
          {[
            { id: "sunlight", emoji: "☀️", label: "Sunlight", active: hasSunlight },
            { id: "water", emoji: "💧", label: "Water", active: hasWater },
            { id: "soil", emoji: "🌱", label: "Soil", active: hasSoil },
          ].map((need) => (
            <motion.button
              key={need.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleToggleNeed(need.id)}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: need.active ? colors.bg : "#FFF",
                border: `3px solid ${need.active ? colors.accent : "#E5E7EB"}`,
              }}
            >
              <div className="text-6xl mb-2">{need.emoji}</div>
              <div style={{ fontWeight: 600 }}>{need.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Plant growth visual */}
      <motion.div
        className="p-12 rounded-2xl text-center"
        style={{ backgroundColor: colors.highlight }}
      >
        <div className="text-9xl mb-4">
          {growthStage === 0 && "🌰"}
          {growthStage === 1 && "🌱"}
          {growthStage === 2 && "🌿"}
          {growthStage === 3 && "🌻"}
        </div>
        <div className="text-xl" style={{ fontWeight: 600, color: colors.accent }}>
          Growth Stage: {growthStage}/3
        </div>
      </motion.div>

      {/* Plant parts matching */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🌸 Match the plant parts
        </h4>
        <div className="grid grid-cols-4 gap-4">
          {[
            { id: "roots", emoji: "🌱", label: "Roots" },
            { id: "stem", emoji: "🌿", label: "Stem" },
            { id: "leaves", emoji: "🍃", label: "Leaves" },
            { id: "flower", emoji: "🌸", label: "Flower" },
          ].map((part) => (
            <motion.button
              key={part.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTogglePart(part.id)}
              className="p-4 rounded-xl"
              style={{
                backgroundColor: plantParts[part.id] ? colors.bg : "#FFF",
                border: `2px solid ${plantParts[part.id] ? colors.accent : "#E5E7EB"}`,
              }}
            >
              <div className="text-4xl mb-1">{part.emoji}</div>
              <div className="text-sm" style={{ fontWeight: 600 }}>{part.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Success message */}
      {growthStage === 3 && Object.values(plantParts).every(v => v) && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="p-6 rounded-2xl text-center"
          style={{ backgroundColor: colors.accent }}
        >
          <div className="text-5xl mb-2">🎉</div>
          <div className="text-2xl" style={{ fontWeight: 700, color: "#FFF" }}>
            Excellent! You grew a healthy plant and know all its parts!
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Level 4: Animal Kingdom - Sort animals
export function AnimalKingdomInteractive({ colors }: any) {
  const [animals, setAnimals] = useState([
    { id: 1, emoji: "🐘", label: "Elephant", group: "mammal", placed: false, bin: "" },
    { id: 2, emoji: "🦜", label: "Parrot", group: "bird", placed: false, bin: "" },
    { id: 3, emoji: "🐍", label: "Snake", group: "reptile", placed: false, bin: "" },
    { id: 4, emoji: "🐝", label: "Bee", group: "insect", placed: false, bin: "" },
    { id: 5, emoji: "🐬", label: "Dolphin", group: "mammal", placed: false, bin: "" },
    { id: 6, emoji: "🦎", label: "Lizard", group: "reptile", placed: false, bin: "" },
  ]);
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleAnimalClick = (id: number) => {
    setSelectedAnimal(id);
  };

  const handleBinClick = (binType: string) => {
    if (selectedAnimal !== null) {
      setHistory([...history, animals]);
      setAnimals(animals.map(animal => 
        animal.id === selectedAnimal 
          ? { ...animal, placed: true, bin: binType }
          : animal
      ));
      setSelectedAnimal(null);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      setAnimals(history[history.length - 1]);
      setHistory(history.slice(0, -1));
      setSelectedAnimal(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Animal Kingdom Sorter
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Sort animals into their correct groups!
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

      {/* Animals to sort */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.highlight }}>
        <h4 className="text-xl mb-4" style={{ fontWeight: 600, color: "#4A5568" }}>
          🐾 Click an animal to select it
        </h4>
        <div className="flex justify-center gap-4 flex-wrap">
          {animals.filter(animal => !animal.placed).map((animal) => (
            <motion.button
              key={animal.id}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnimalClick(animal.id)}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: selectedAnimal === animal.id ? colors.accent : "#FFF",
                border: `3px solid ${selectedAnimal === animal.id ? colors.accent : "#E5E7EB"}`,
              }}
            >
              <div className="text-5xl mb-2">{animal.emoji}</div>
              <div style={{ fontWeight: 600, color: "#4A5568" }}>{animal.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Animal group bins */}
      <div className="grid grid-cols-2 gap-6">
        {[
          { type: "mammal", title: "🐘 Mammals", desc: "Warm-blooded, fur/hair" },
          { type: "bird", title: "🦜 Birds", desc: "Feathers, wings" },
          { type: "reptile", title: "🦎 Reptiles", desc: "Cold-blooded, scales" },
          { type: "insect", title: "🐝 Insects", desc: "6 legs, 3 body parts" },
        ].map((bin) => (
          <motion.button
            key={bin.type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleBinClick(bin.type)}
            className="p-6 rounded-2xl border-4 border-dashed min-h-[150px]"
            style={{
              backgroundColor: colors.highlight,
              borderColor: selectedAnimal !== null ? colors.accent : "#E5E7EB",
            }}
          >
            <div className="text-xl mb-2" style={{ fontWeight: 700, color: "#4A5568" }}>
              {bin.title}
            </div>
            <div className="text-sm mb-3" style={{ color: "#6B7280" }}>
              {bin.desc}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {animals.filter(animal => animal.bin === bin.type).map((animal) => (
                <motion.div
                  key={animal.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-3xl"
                >
                  {animal.emoji}
                </motion.div>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Success message */}
      {animals.filter(a => a.placed && a.bin === a.group).length === animals.length && animals.every(a => a.placed) && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="p-6 rounded-2xl text-center"
          style={{ backgroundColor: colors.accent }}
        >
          <div className="text-5xl mb-2">🎉</div>
          <div className="text-2xl" style={{ fontWeight: 700, color: "#FFF" }}>
            Perfect! You sorted all animals correctly!
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Level 5: Energy Forms - Match objects with energy types
export function EnergyFormsInteractive({ colors }: any) {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<any[]>([]);

  const energyTypes = [
    { id: "light", emoji: "💡", label: "Light Energy" },
    { id: "sound", emoji: "🔊", label: "Sound Energy" },
    { id: "heat", emoji: "🔥", label: "Heat Energy" },
    { id: "electrical", emoji: "⚡", label: "Electrical Energy" },
    { id: "mechanical", emoji: "⚙️", label: "Mechanical Energy" },
  ];

  const objects = [
    { id: "lightbulb", emoji: "💡", label: "Lightbulb", energy: "electrical" },
    { id: "campfire", emoji: "🔥", label: "Campfire", energy: "heat" },
    { id: "guitar", emoji: "🎸", label: "Guitar", energy: "sound" },
    { id: "bicycle", emoji: "🚲", label: "Bicycle", energy: "mechanical" },
    { id: "sun", emoji: "☀️", label: "Sun", energy: "light" },
  ];

  const handleMatch = (objectId: string, energyId: string) => {
    setHistory([...history, matches]);
    setMatches({ ...matches, [objectId]: energyId });
  };

  const handleUndo = () => {
    if (history.length > 0) {
      setMatches(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-2xl mb-3" style={{ fontWeight: 700, color: "#4A5568" }}>
            Energy Explorer Lab
          </h3>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            Match objects with their energy type!
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

      {/* Matching activity */}
      <div className="grid grid-cols-2 gap-8">
        {/* Objects */}
        <div className="space-y-4">
          <h4 className="text-xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
            Objects
          </h4>
          {objects.map((obj) => (
            <div
              key={obj.id}
              className="p-4 rounded-2xl flex items-center gap-4"
              style={{
                backgroundColor: matches[obj.id] ? colors.bg : colors.highlight,
                border: `2px solid ${matches[obj.id] === obj.energy ? colors.accent : "#E5E7EB"}`,
              }}
            >
              <div className="text-4xl">{obj.emoji}</div>
              <div className="flex-1">
                <div style={{ fontWeight: 600 }}>{obj.label}</div>
                {matches[obj.id] && (
                  <div className="text-sm" style={{ color: colors.accent }}>
                    Matched!
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Energy types */}
        <div className="space-y-4">
          <h4 className="text-xl mb-4" style={{ fontWeight: 700, color: "#4A5568" }}>
            Energy Types
          </h4>
          {energyTypes.map((energy) => (
            <div key={energy.id} className="space-y-2">
              <div
                className="p-4 rounded-2xl"
                style={{ backgroundColor: colors.highlight }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{energy.emoji}</div>
                  <div style={{ fontWeight: 700 }}>{energy.label}</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {objects.map((obj) => (
                    <motion.button
                      key={obj.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMatch(obj.id, energy.id)}
                      className="px-4 py-2 rounded-xl text-sm"
                      style={{
                        backgroundColor: matches[obj.id] === energy.id ? colors.accent : "#FFF",
                        color: matches[obj.id] === energy.id ? "#FFF" : "#4A5568",
                        fontWeight: 600,
                      }}
                    >
                      {obj.emoji} {obj.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success message */}
      {Object.keys(matches).length === objects.length &&
        objects.every(obj => matches[obj.id] === obj.energy) && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="p-6 rounded-2xl text-center"
            style={{ backgroundColor: colors.accent }}
          >
            <div className="text-5xl mb-2">⚡</div>
            <div className="text-2xl" style={{ fontWeight: 700, color: "#FFF" }}>
              Fantastic! You matched all energy types correctly!
            </div>
          </motion.div>
        )}
    </div>
  );
}