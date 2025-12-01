// Comprehensive Science Mountain Lesson Content - All 10 Levels with 3 Modes + Quiz

export const scienceLessons: Record<string, any> = {
  "level-1": {
    name: "Matter Basics",
    theme: "A glowing chemistry table filled with potions, solids, liquids, gas clouds",
    visual: {
      title: "Matter Basics - States of Matter",
      description: "Animated potions changing state with tiny spark effects",
      chapters: [
        { time: "0:00", title: "Welcome to the Potion Room", thumbnail: "🧪" },
        { time: "1:45", title: "Solid - Ice Crystals", thumbnail: "🧊" },
        { time: "3:30", title: "Liquid - Sloshing Potions", thumbnail: "🫗" },
        { time: "5:15", title: "Gas - Drifting Fog", thumbnail: "💨" },
      ],
      diagrams: [
        {
          emoji: "🧊",
          title: "Solid State",
          description: "Ice crystal blocks stay still - particles are packed close together and vibrate slowly!",
        },
        {
          emoji: "🫗",
          title: "Liquid State",
          description: "Potion bottles slosh around - particles move faster and flow freely!",
        },
        {
          emoji: "💨",
          title: "Gas State",
          description: "Fog drifts upward - particles move super fast and spread everywhere!",
        },
        {
          emoji: "✨",
          title: "Changing States",
          description: "Add heat to melt ice → water. Add more heat → steam rises!",
        },
      ],
    },
    auditory: {
      title: "The Potion Room Story",
      description: "A wizard apprentice sorting magical materials",
      chapters: [
        {
          title: "The Apprentice's Task",
          duration: "2:30",
          keyPoints: [
            "You're a wizard apprentice learning about matter",
            "Listen to ice cubes crackle (solid sounds)",
            "Hear water pour into bottles (liquid sounds)",
          ],
        },
        {
          title: "Identifying States by Sound",
          duration: "2:45",
          keyPoints: [
            "Steam whooshes as it rises (gas sounds)",
            "Can you guess solid, liquid, or gas?",
            "Each state has a unique sound signature",
          ],
        },
        {
          title: "The Magic of Changing States",
          duration: "2:00",
          keyPoints: [
            "Hear ice melting into water",
            "Listen to water boiling into steam",
            "Sound cues help you understand transformations",
          ],
        },
      ],
    },
    interactive: {
      title: "Matter Master Challenge",
      description: "Drag items into solid/liquid/gas boxes and change their states",
      activities: [
        {
          type: "drag-drop" as const,
          question: "Drag each item into the correct state: Solid, Liquid, or Gas",
          items: [
            { emoji: "🧊", label: "Ice Cube", value: "solid" },
            { emoji: "💧", label: "Water Drop", value: "liquid" },
            { emoji: "💨", label: "Steam", value: "gas" },
            { emoji: "🪨", label: "Rock", value: "solid" },
            { emoji: "🫗", label: "Juice", value: "liquid" },
          ],
          correctOrder: ["solid", "liquid", "gas", "solid", "liquid"],
        },
        {
          type: "matching" as const,
          question: "Tap to HEAT the ice cube. What happens?",
          items: [
            { emoji: "🧊", label: "Ice Cube", value: "melts" },
            { emoji: "🔥", label: "Heat", value: "heat" },
          ],
          correctAnswer: "melts",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "What are the three states of matter?",
          options: ["Solid, Liquid, Gas", "Hot, Cold, Warm", "Big, Medium, Small", "Fast, Slow, Still"],
          correctAnswer: "Solid, Liquid, Gas",
        },
        {
          question: "Ice is an example of which state?",
          options: ["Solid", "Liquid", "Gas", "Plasma"],
          correctAnswer: "Solid",
        },
        {
          question: "What happens when you heat water?",
          options: ["It freezes", "It turns to steam", "It disappears", "Nothing"],
          correctAnswer: "It turns to steam",
        },
      ],
    },
  },

  "level-2": {
    name: "Water Cycle",
    theme: "A floating cloud playground",
    visual: {
      title: "Journey Through the Water Cycle",
      description: "Animated cycle with cute cloud character 'Puffy'",
      chapters: [
        { time: "0:00", title: "Meet Puffy the Cloud", thumbnail: "☁️" },
        { time: "1:30", title: "Evaporation - Rising Up", thumbnail: "☀️" },
        { time: "3:00", title: "Condensation - Forming Clouds", thumbnail: "🌥️" },
        { time: "4:30", title: "Precipitation & Collection", thumbnail: "🌧️" },
      ],
      diagrams: [
        {
          emoji: "☀️",
          title: "Evaporation",
          description: "The sun heats water, and droplets dance upward turning into invisible water vapor!",
        },
        {
          emoji: "☁️",
          title: "Condensation",
          description: "Water vapor cools down high in the sky and forms tiny droplets - that's a cloud!",
        },
        {
          emoji: "🌧️",
          title: "Precipitation",
          description: "When clouds get heavy, rain falls back to Earth!",
        },
        {
          emoji: "💧",
          title: "Collection",
          description: "Rain collects in rivers, lakes, and oceans - ready to start again!",
        },
      ],
    },
    auditory: {
      title: "Journey of a Water Drop - Drippy's Adventure",
      description: "Follow Drippy the droplet through the water cycle",
      chapters: [
        {
          title: "Drippy Wakes Up",
          duration: "2:15",
          keyPoints: [
            "Drippy lives in a puddle on a sunny day",
            "Listen to the sun's warmth (gentle music)",
            "Drippy feels lighter and starts to rise!",
          ],
        },
        {
          title: "Floating to the Sky",
          duration: "2:30",
          keyPoints: [
            "Whoosh! Drippy evaporates and floats upward",
            "Hears wind sounds and bird chirps",
            "Meets other droplets forming a cloud",
          ],
        },
        {
          title: "The Big Rain",
          duration: "2:00",
          keyPoints: [
            "Cloud gets heavy - pitter-patter sounds begin",
            "Drippy falls as rain back to Earth",
            "Splashes into a river - the cycle continues!",
          ],
        },
      ],
    },
    interactive: {
      title: "Water Cycle Explorer",
      description: "Guide Drippy through the water cycle stages",
      activities: [
        {
          type: "drag-drop" as const,
          question: "Put the water cycle stages in the correct order",
          items: [
            { emoji: "🌧️", label: "Precipitation", value: "3" },
            { emoji: "☀️", label: "Evaporation", value: "1" },
            { emoji: "💧", label: "Collection", value: "4" },
            { emoji: "☁️", label: "Condensation", value: "2" },
          ],
          correctOrder: ["1", "2", "3", "4"],
        },
        {
          type: "matching" as const,
          question: "Tap the Rain Button to make it rain!",
          items: [
            { emoji: "☁️", label: "Heavy Cloud", value: "rain" },
            { emoji: "🌧️", label: "Rain", value: "rain" },
          ],
          correctAnswer: "rain",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "What makes water evaporate?",
          options: ["The sun's heat", "Wind", "Rain", "Snow"],
          correctAnswer: "The sun's heat",
        },
        {
          question: "What is condensation?",
          options: ["Water turning into ice", "Water vapor turning into clouds", "Rain falling", "Water flowing"],
          correctAnswer: "Water vapor turning into clouds",
        },
        {
          question: "What is it called when rain, snow, or hail falls from clouds?",
          options: ["Evaporation", "Condensation", "Precipitation", "Collection"],
          correctAnswer: "Precipitation",
        },
      ],
    },
  },

  "level-3": {
    name: "Plant Life",
    theme: "Magical garden with glowing leaves and sprouting seedlings",
    visual: {
      title: "How Plants Grow",
      description: "Time-lapse animation from seed to full plant with friendly bee guide",
      chapters: [
        { time: "0:00", title: "Meet Buzzy the Bee", thumbnail: "🐝" },
        { time: "1:45", title: "Seed to Sprout", thumbnail: "🌱" },
        { time: "3:30", title: "Roots Drink Water", thumbnail: "💧" },
        { time: "5:00", title: "Photosynthesis Magic", thumbnail: "☀️" },
      ],
      diagrams: [
        {
          emoji: "🌱",
          title: "Tiny Seed",
          description: "A seed has everything needed to grow into a plant - it just needs soil, water, and sun!",
        },
        {
          emoji: "🌿",
          title: "Roots & Stems",
          description: "Roots grow down to drink water. Stems grow up toward the light!",
        },
        {
          emoji: "🍃",
          title: "Leaves & Sunlight",
          description: "Leaves catch sunlight and use it to make food - that's photosynthesis!",
        },
        {
          emoji: "🌻",
          title: "Full Grown Plant",
          description: "With sunlight, water, and soil, the plant blooms into a beautiful flower!",
        },
      ],
    },
    auditory: {
      title: "The Garden Song",
      description: "Buzzy the bee describes how plants grow",
      chapters: [
        {
          title: "Buzzy's Garden Tour",
          duration: "2:30",
          keyPoints: [
            "Listen to calm music and nature sounds",
            "Buzzy explains: plants need sunlight, water, and soil",
            "Hear keywords: roots, stems, leaves",
          ],
        },
        {
          title: "The Magic Word: Photosynthesis",
          duration: "2:15",
          keyPoints: [
            "Photo = light, Synthesis = making something",
            "Plants use sunlight to make their food",
            "Leaves are like tiny food factories!",
          ],
        },
        {
          title: "Plant Parts Song",
          duration: "1:45",
          keyPoints: [
            "Roots dig deep, stems grow tall",
            "Leaves reach for sunlight, flowers bloom for all!",
            "Repeat and sing along",
          ],
        },
      ],
    },
    interactive: {
      title: "Grow Your Own Plant",
      description: "Give your plant sunlight, water, and soil to help it grow",
      activities: [
        {
          type: "drag-drop" as const,
          question: "Match each plant part to its name",
          items: [
            { emoji: "🌱", label: "Roots", value: "roots" },
            { emoji: "🌿", label: "Stem", value: "stem" },
            { emoji: "🍃", label: "Leaves", value: "leaves" },
            { emoji: "🌸", label: "Flower", value: "flower" },
          ],
          correctOrder: ["roots", "stem", "leaves", "flower"],
        },
        {
          type: "matching" as const,
          question: "What does your plant need next?",
          items: [
            { emoji: "☀️", label: "Sunlight", value: "sunlight" },
            { emoji: "💧", label: "Water", value: "water" },
            { emoji: "🌱", label: "Soil", value: "soil" },
          ],
          correctAnswer: "sunlight",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "What three things do plants need to grow?",
          options: ["Sunlight, water, soil", "Candy, toys, games", "Rain, snow, wind", "Friends, family, fun"],
          correctAnswer: "Sunlight, water, soil",
        },
        {
          question: "What is photosynthesis?",
          options: ["Plants taking a photo", "Plants making food from sunlight", "Plants sleeping", "Plants moving"],
          correctAnswer: "Plants making food from sunlight",
        },
        {
          question: "Which plant part drinks water from the soil?",
          options: ["Leaves", "Flowers", "Roots", "Stems"],
          correctAnswer: "Roots",
        },
      ],
    },
  },

  "level-4": {
    name: "Animal Kingdom",
    theme: "A jungle treehouse classroom",
    visual: {
      title: "Exploring Animal Groups",
      description: "Animals grouped by mammals, reptiles, birds, and insects",
      chapters: [
        { time: "0:00", title: "Welcome to the Jungle", thumbnail: "🌴" },
        { time: "1:45", title: "Mammals", thumbnail: "🐘" },
        { time: "3:15", title: "Birds & Reptiles", thumbnail: "🦜" },
        { time: "4:45", title: "Insects", thumbnail: "🐛" },
      ],
      diagrams: [
        {
          emoji: "🐘",
          title: "Mammals",
          description: "Warm-blooded animals with fur or hair. They feed their babies milk!",
        },
        {
          emoji: "🦎",
          title: "Reptiles",
          description: "Cold-blooded animals with scales. Snakes, lizards, and turtles!",
        },
        {
          emoji: "🦜",
          title: "Birds",
          description: "Warm-blooded animals with feathers and wings. Most can fly!",
        },
        {
          emoji: "🐝",
          title: "Insects",
          description: "Small animals with 6 legs and 3 body parts. Bees, ants, butterflies!",
        },
      ],
    },
    auditory: {
      title: "Voices of the Jungle",
      description: "Listen to animal calls and learn about each group",
      chapters: [
        {
          title: "Jungle Symphony",
          duration: "2:30",
          keyPoints: [
            "Listen to different animal sounds",
            "Lion roars (mammal), parrot squawks (bird)",
            "Snake hisses (reptile), cricket chirps (insect)",
          ],
        },
        {
          title: "Warm vs. Cold Blooded",
          duration: "2:00",
          keyPoints: [
            "Warm-blooded: body temperature stays the same",
            "Cold-blooded: body temperature changes with environment",
            "Narrator explains with examples",
          ],
        },
        {
          title: "Guess the Animal Group",
          duration: "2:15",
          keyPoints: [
            "Hear an animal sound - guess if it's a mammal, bird, reptile, or insect",
            "Fun sound quiz with feedback",
            "Learn classification through listening",
          ],
        },
      ],
    },
    interactive: {
      title: "Animal Kingdom Sorter",
      description: "Sort animals by their group and habitat",
      activities: [
        {
          type: "drag-drop" as const,
          question: "Drag each animal to its correct group",
          items: [
            { emoji: "🐘", label: "Elephant", value: "mammal" },
            { emoji: "🦜", label: "Parrot", value: "bird" },
            { emoji: "🐍", label: "Snake", value: "reptile" },
            { emoji: "🐝", label: "Bee", value: "insect" },
            { emoji: "🐬", label: "Dolphin", value: "mammal" },
          ],
          correctOrder: ["mammal", "bird", "reptile", "insect", "mammal"],
        },
        {
          type: "matching" as const,
          question: "Which habitat does the lion belong to?",
          items: [
            { emoji: "🦁", label: "Lion", value: "savanna" },
            { emoji: "🌴", label: "Jungle", value: "jungle" },
            { emoji: "🏜️", label: "Savanna", value: "savanna" },
          ],
          correctAnswer: "savanna",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Which of these is a mammal?",
          options: ["Snake", "Parrot", "Elephant", "Butterfly"],
          correctAnswer: "Elephant",
        },
        {
          question: "How many legs do insects have?",
          options: ["4", "6", "8", "10"],
          correctAnswer: "6",
        },
        {
          question: "What makes birds different from other animals?",
          options: ["They have feathers", "They have scales", "They have fur", "They live underwater"],
          correctAnswer: "They have feathers",
        },
      ],
    },
  },

  "level-5": {
    name: "Energy Forms",
    theme: "A futuristic energy lab with glowing orbs",
    visual: {
      title: "Exploring Energy Forms",
      description: "Animated examples of light, sound, heat, electrical, and mechanical energy",
      chapters: [
        { time: "0:00", title: "Welcome to the Energy Lab", thumbnail: "⚡" },
        { time: "1:30", title: "Light & Sound Energy", thumbnail: "💡" },
        { time: "3:00", title: "Heat & Electrical Energy", thumbnail: "🔥" },
        { time: "4:30", title: "Mechanical Energy", thumbnail: "⚙️" },
      ],
      diagrams: [
        {
          emoji: "💡",
          title: "Light Energy",
          description: "Comes from the sun, lightbulbs, and fire. Helps us see!",
        },
        {
          emoji: "🔊",
          title: "Sound Energy",
          description: "Made by vibrations. Music, voices, and instruments create sound!",
        },
        {
          emoji: "🔥",
          title: "Heat Energy",
          description: "Makes things warm! Fire, sun, and ovens produce heat energy.",
        },
        {
          emoji: "⚡",
          title: "Electrical Energy",
          description: "Powers our lights, computers, and phones!",
        },
        {
          emoji: "⚙️",
          title: "Mechanical Energy",
          description: "Energy of motion! Bikes, cars, and swings use mechanical energy.",
        },
      ],
    },
    auditory: {
      title: "Sounds of Energy",
      description: "Hear examples and guess the energy type",
      chapters: [
        {
          title: "Energy All Around Us",
          duration: "2:15",
          keyPoints: [
            "Energy makes things happen!",
            "Listen to different energy examples",
            "Narrator explains each energy type",
          ],
        },
        {
          title: "The Energy Guessing Game",
          duration: "2:30",
          keyPoints: [
            "Hear a lightbulb buzz (electrical energy)",
            "Hear music playing (sound energy)",
            "Guess which energy you're hearing!",
          ],
        },
        {
          title: "Real-World Energy",
          duration: "2:00",
          keyPoints: [
            "The sun gives us light and heat",
            "Your voice creates sound",
            "Batteries store electrical energy",
          ],
        },
      ],
    },
    interactive: {
      title: "Energy Explorer Lab",
      description: "Match energy types with objects that use them",
      activities: [
        {
          type: "drag-drop" as const,
          question: "Match each object to its energy type",
          items: [
            { emoji: "💡", label: "Lightbulb", value: "electrical" },
            { emoji: "🔥", label: "Campfire", value: "heat" },
            { emoji: "🎸", label: "Guitar", value: "sound" },
            { emoji: "🚲", label: "Bicycle", value: "mechanical" },
          ],
          correctOrder: ["electrical", "heat", "sound", "mechanical"],
        },
        {
          type: "matching" as const,
          question: "Which object uses electrical energy?",
          items: [
            { emoji: "💻", label: "Computer", value: "electrical" },
            { emoji: "🕯️", label: "Candle", value: "heat" },
          ],
          correctAnswer: "electrical",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "What type of energy does a lightbulb use?",
          options: ["Sound energy", "Heat energy", "Electrical energy", "Mechanical energy"],
          correctAnswer: "Electrical energy",
        },
        {
          question: "What type of energy is sound?",
          options: ["Energy from vibrations", "Energy from light", "Energy from heat", "Energy from motion"],
          correctAnswer: "Energy from vibrations",
        },
        {
          question: "Which gives us light AND heat energy?",
          options: ["The sun", "A phone", "A guitar", "A bicycle"],
          correctAnswer: "The sun",
        },
      ],
    },
  },

  "level-6": {
    name: "Forces & Motion",
    theme: "A physics playground with ramps, balls, and magnets",
    visual: {
      title: "Understanding Forces",
      description: "Push, pull, gravity, and motion demonstrations",
      chapters: [
        { time: "0:00", title: "What is a Force?", thumbnail: "💪" },
        { time: "1:45", title: "Push & Pull", thumbnail: "⬅️➡️" },
        { time: "3:15", title: "Gravity in Action", thumbnail: "🌍" },
        { time: "4:45", title: "Ramps & Speed", thumbnail: "🛝" },
      ],
      diagrams: [
        {
          emoji: "💪",
          title: "Force = Push or Pull",
          description: "A force makes things move, stop, or change direction!",
        },
        {
          emoji: "⬇️",
          title: "Gravity",
          description: "Gravity pulls everything down toward Earth. That's why balls fall!",
        },
        {
          emoji: "🧲",
          title: "Magnetic Force",
          description: "Magnets pull metal objects toward them without touching!",
        },
        {
          emoji: "🛝",
          title: "Motion on Ramps",
          description: "Steeper ramps make objects roll faster. Gentle ramps = slower motion!",
        },
      ],
    },
    auditory: {
      title: "Roll, Slide, Push! - A Motion Story",
      description: "Listen to movement sounds and identify forces",
      chapters: [
        {
          title: "The Ball's Adventure",
          duration: "2:30",
          keyPoints: [
            "Hear a ball rolling down a ramp",
            "Listen to it bounce and slide",
            "Narrator explains push, pull, and gravity",
          ],
        },
        {
          title: "Magnet Mystery",
          duration: "2:00",
          keyPoints: [
            "Sound of metal objects snapping to a magnet",
            "Magnetic force pulls without touching!",
            "Try to identify the force by sound",
          ],
        },
        {
          title: "Forces Everywhere",
          duration: "2:15",
          keyPoints: [
            "Pushing a shopping cart (push force)",
            "Opening a door (pull force)",
            "Dropping a toy (gravity force)",
          ],
        },
      ],
    },
    interactive: {
      title: "Force Genius Lab",
      description: "Push objects on ramps, adjust angles, use magnets",
      activities: [
        {
          type: "drag-drop" as const,
          question: "Which action shows a PUSH force?",
          items: [
            { emoji: "🛒", label: "Push shopping cart", value: "push" },
            { emoji: "🚪", label: "Pull door open", value: "pull" },
            { emoji: "🧲", label: "Magnet attracts", value: "pull" },
          ],
          correctOrder: ["push", "pull", "pull"],
        },
        {
          type: "matching" as const,
          question: "Adjust the ramp angle - what makes the ball roll faster?",
          items: [
            { emoji: "🛝", label: "Steep ramp", value: "faster" },
            { emoji: "📏", label: "Gentle ramp", value: "slower" },
          ],
          correctAnswer: "faster",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "What force pulls objects toward the ground?",
          options: ["Gravity", "Magnetism", "Electricity", "Wind"],
          correctAnswer: "Gravity",
        },
        {
          question: "What are the two main types of forces?",
          options: ["Push and Pull", "Hot and Cold", "Fast and Slow", "Big and Small"],
          correctAnswer: "Push and Pull",
        },
        {
          question: "What makes a ball roll faster down a ramp?",
          options: ["A flatter ramp", "A steeper ramp", "A shorter ramp", "A colorful ramp"],
          correctAnswer: "A steeper ramp",
        },
      ],
    },
  },

  "level-7": {
    name: "Solar System",
    theme: "A colorful outer-space map with cute planets",
    visual: {
      title: "Journey Through the Solar System",
      description: "Orbit animations with planet sizes, colors, and comet trails",
      chapters: [
        { time: "0:00", title: "Welcome to Space", thumbnail: "🚀" },
        { time: "1:30", title: "The Sun & Inner Planets", thumbnail: "☀️" },
        { time: "3:00", title: "Outer Planets", thumbnail: "🪐" },
        { time: "4:30", title: "Moons & Comets", thumbnail: "☄️" },
      ],
      diagrams: [
        {
          emoji: "☀️",
          title: "The Sun",
          description: "The sun is a giant star at the center - it gives us light and warmth!",
        },
        {
          emoji: "🌍",
          title: "Earth - Our Home",
          description: "The third planet from the sun. The only planet with life we know of!",
        },
        {
          emoji: "🪐",
          title: "Saturn's Rings",
          description: "Saturn has beautiful rings made of ice and rock!",
        },
        {
          emoji: "🌙",
          title: "Moons",
          description: "Many planets have moons that orbit around them. Earth has one moon!",
        },
      ],
    },
    auditory: {
      title: "Space Travel Story",
      description: "Rocket launch and planetary tour narration",
      chapters: [
        {
          title: "Blast Off!",
          duration: "2:00",
          keyPoints: [
            "Hear rocket engines roaring",
            "Countdown: 10, 9, 8... blast off!",
            "We're heading to space!",
          ],
        },
        {
          title: "Visiting Each Planet",
          duration: "3:00",
          keyPoints: [
            "Mercury - closest to the sun, super hot!",
            "Venus - covered in thick clouds",
            "Mars - the red planet",
            "Fun facts about each planet with 'planetary voices'",
          ],
        },
        {
          title: "The Outer Giants",
          duration: "2:30",
          keyPoints: [
            "Jupiter - the biggest planet!",
            "Saturn - famous for its rings",
            "Uranus and Neptune - icy and blue",
          ],
        },
      ],
    },
    interactive: {
      title: "Space Ranger Mission",
      description: "Put planets in order and match facts",
      activities: [
        {
          type: "drag-drop" as const,
          question: "Put the planets in order from the Sun",
          items: [
            { emoji: "🌍", label: "Earth", value: "3" },
            { emoji: "☿️", label: "Mercury", value: "1" },
            { emoji: "🪐", label: "Saturn", value: "6" },
            { emoji: "♀️", label: "Venus", value: "2" },
          ],
          correctOrder: ["1", "2", "3", "6"],
        },
        {
          type: "matching" as const,
          question: "Which planet has rings?",
          items: [
            { emoji: "🪐", label: "Saturn", value: "saturn" },
            { emoji: "🌍", label: "Earth", value: "earth" },
          ],
          correctAnswer: "saturn",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "What is at the center of our solar system?",
          options: ["The Moon", "The Sun", "Earth", "Jupiter"],
          correctAnswer: "The Sun",
        },
        {
          question: "Which planet is known for its beautiful rings?",
          options: ["Earth", "Mars", "Saturn", "Venus"],
          correctAnswer: "Saturn",
        },
        {
          question: "Which planet do we live on?",
          options: ["Mars", "Venus", "Earth", "Jupiter"],
          correctAnswer: "Earth",
        },
      ],
    },
  },

  "level-8": {
    name: "Ecosystems",
    theme: "Beautiful biomes with transitions: desert, forest, ocean, tundra",
    visual: {
      title: "Exploring Earth's Ecosystems",
      description: "Living and non-living elements, food chains, and biome animations",
      chapters: [
        { time: "0:00", title: "What is an Ecosystem?", thumbnail: "🌍" },
        { time: "1:45", title: "Desert & Forest Biomes", thumbnail: "🌵" },
        { time: "3:15", title: "Ocean & Tundra", thumbnail: "🌊" },
        { time: "4:45", title: "Food Chains", thumbnail: "🦁" },
      ],
      diagrams: [
        {
          emoji: "🌵",
          title: "Desert Ecosystem",
          description: "Hot and dry with cactus plants, lizards, and snakes. Very little rain!",
        },
        {
          emoji: "🌲",
          title: "Forest Ecosystem",
          description: "Tall trees, birds, deer, and lots of rainfall. Full of life!",
        },
        {
          emoji: "🌊",
          title: "Ocean Ecosystem",
          description: "Fish, whales, coral, and seaweed live in salty water!",
        },
        {
          emoji: "❄️",
          title: "Tundra Ecosystem",
          description: "Cold, icy, and frozen. Polar bears and penguins live here!",
        },
        {
          emoji: "🦁➡️🦓➡️🌱",
          title: "Food Chain",
          description: "Grass → Zebra → Lion. Energy flows from plants to animals!",
        },
      ],
    },
    auditory: {
      title: "Life in Every Place",
      description: "Immersive soundscapes from different biomes",
      chapters: [
        {
          title: "Desert Sounds",
          duration: "2:00",
          keyPoints: [
            "Hear wind blowing over sand dunes",
            "Coyote howls in the distance",
            "Narrator describes desert life",
          ],
        },
        {
          title: "Forest Symphony",
          duration: "2:15",
          keyPoints: [
            "Birds singing, leaves rustling",
            "Stream water flowing gently",
            "So many living things!",
          ],
        },
        {
          title: "Ocean Waves & Tundra Winds",
          duration: "2:30",
          keyPoints: [
            "Whale songs and ocean waves (ocean)",
            "Icy winds and cracking ice (tundra)",
            "Each ecosystem has unique sounds",
          ],
        },
        {
          title: "Producers, Consumers, Decomposers",
          duration: "2:00",
          keyPoints: [
            "Producers = plants (make their own food)",
            "Consumers = animals (eat plants or other animals)",
            "Decomposers = break down dead things",
          ],
        },
      ],
    },
    interactive: {
      title: "Eco Explorer Challenge",
      description: "Drag animals to correct biomes and build food chains",
      activities: [
        {
          type: "drag-drop" as const,
          question: "Drag each animal/plant to its correct ecosystem",
          items: [
            { emoji: "🌵", label: "Cactus", value: "desert" },
            { emoji: "🐻‍❄️", label: "Polar Bear", value: "tundra" },
            { emoji: "🐠", label: "Fish", value: "ocean" },
            { emoji: "🦌", label: "Deer", value: "forest" },
          ],
          correctOrder: ["desert", "tundra", "ocean", "forest"],
        },
        {
          type: "matching" as const,
          question: "Build a simple food chain: What eats grass?",
          items: [
            { emoji: "🌱", label: "Grass", value: "producer" },
            { emoji: "🦓", label: "Zebra", value: "consumer" },
          ],
          correctAnswer: "consumer",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Which ecosystem is hot and dry with very little rain?",
          options: ["Forest", "Desert", "Ocean", "Tundra"],
          correctAnswer: "Desert",
        },
        {
          question: "What are plants called in a food chain?",
          options: ["Consumers", "Decomposers", "Producers", "Predators"],
          correctAnswer: "Producers",
        },
        {
          question: "Which animal would you find in a tundra ecosystem?",
          options: ["Lion", "Polar Bear", "Zebra", "Parrot"],
          correctAnswer: "Polar Bear",
        },
      ],
    },
  },

  "level-9": {
    name: "Human Body",
    theme: "A friendly medical robot teaching inside a 'body city'",
    visual: {
      title: "Inside the Human Body",
      description: "Digestive, circulatory, and respiratory systems with kid-friendly animations",
      chapters: [
        { time: "0:00", title: "Meet Dr. Robot", thumbnail: "🤖" },
        { time: "1:45", title: "The Digestive System", thumbnail: "🍔" },
        { time: "3:15", title: "The Heart & Blood", thumbnail: "❤️" },
        { time: "4:45", title: "Breathing & Lungs", thumbnail: "🫁" },
      ],
      diagrams: [
        {
          emoji: "🍔➡️🤢",
          title: "Digestive System",
          description: "Food goes in your mouth → stomach breaks it down → energy for your body!",
        },
        {
          emoji: "❤️",
          title: "Heart & Circulatory System",
          description: "Your heart pumps blood all around your body - lub-dub, lub-dub!",
        },
        {
          emoji: "🫁",
          title: "Respiratory System",
          description: "Your lungs breathe in oxygen and breathe out carbon dioxide!",
        },
        {
          emoji: "🧠",
          title: "The Brain",
          description: "Your brain controls everything - thinking, moving, and feeling!",
        },
      ],
    },
    auditory: {
      title: "Inside You! - A Body Journey",
      description: "Guided narration with body sounds",
      chapters: [
        {
          title: "Dr. Robot's Welcome",
          duration: "2:00",
          keyPoints: [
            "Your body is amazing!",
            "Listen to your heartbeat: lub-dub, lub-dub",
            "Hear yourself breathing in and out",
          ],
        },
        {
          title: "Digestive Journey",
          duration: "2:30",
          keyPoints: [
            "Stomach gurgles as it breaks down food",
            "Food travels through your body",
            "Gives you energy to play and learn!",
          ],
        },
        {
          title: "Breathing & Blood Flow",
          duration: "2:15",
          keyPoints: [
            "Lungs inflate - whoosh! Oxygen in",
            "Lungs deflate - whoosh! Carbon dioxide out",
            "Blood carries oxygen everywhere",
          ],
        },
      ],
    },
    interactive: {
      title: "Body Explorer Challenge",
      description: "Place organs in the right location and match functions",
      activities: [
        {
          type: "drag-drop" as const,
          question: "Match each organ to its function",
          items: [
            { emoji: "❤️", label: "Heart", value: "pumps blood" },
            { emoji: "🫁", label: "Lungs", value: "breathing" },
            { emoji: "🧠", label: "Brain", value: "thinking" },
            { emoji: "🤢", label: "Stomach", value: "digests food" },
          ],
          correctOrder: ["pumps blood", "breathing", "thinking", "digests food"],
        },
        {
          type: "matching" as const,
          question: "What does the heart do?",
          items: [
            { emoji: "❤️", label: "Heart", value: "pumps blood" },
            { emoji: "🫁", label: "Lungs", value: "breathing" },
          ],
          correctAnswer: "pumps blood",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "What organ pumps blood through your body?",
          options: ["Brain", "Lungs", "Heart", "Stomach"],
          correctAnswer: "Heart",
        },
        {
          question: "What do your lungs help you do?",
          options: ["Digest food", "Breathe", "Think", "Pump blood"],
          correctAnswer: "Breathe",
        },
        {
          question: "Which organ breaks down the food you eat?",
          options: ["Heart", "Brain", "Stomach", "Lungs"],
          correctAnswer: "Stomach",
        },
      ],
    },
  },

  "level-10": {
    name: "Scientific Method",
    theme: "A detective-style experiment room",
    visual: {
      title: "Become a Science Detective",
      description: "Step-by-step scientific method with detective notebook",
      chapters: [
        { time: "0:00", title: "What is the Scientific Method?", thumbnail: "🔬" },
        { time: "1:45", title: "Ask a Question", thumbnail: "❓" },
        { time: "3:00", title: "Hypothesize & Test", thumbnail: "🧪" },
        { time: "4:30", title: "Observe & Conclude", thumbnail: "📝" },
      ],
      diagrams: [
        {
          emoji: "❓",
          title: "Step 1: Ask a Question",
          description: "What do you want to find out? Example: Do plants grow faster with music?",
        },
        {
          emoji: "💭",
          title: "Step 2: Make a Hypothesis",
          description: "Make a guess! I think plants WILL grow faster with music.",
        },
        {
          emoji: "🧪",
          title: "Step 3: Test Your Hypothesis",
          description: "Do an experiment! Play music for one plant, not the other.",
        },
        {
          emoji: "👀",
          title: "Step 4: Observe",
          description: "Watch what happens and write it down in your notebook!",
        },
        {
          emoji: "📝",
          title: "Step 5: Conclude",
          description: "Was your hypothesis right or wrong? Either way, you learned something!",
        },
      ],
    },
    auditory: {
      title: "The Science Detective Mystery",
      description: "Narrator guides you through solving a mystery using the scientific method",
      chapters: [
        {
          title: "The Mystery Begins",
          duration: "2:30",
          keyPoints: [
            "Detective has a mystery: Why did the plant die?",
            "Ask a question: Did it get enough water?",
            "Form a hypothesis",
          ],
        },
        {
          title: "Testing the Clues",
          duration: "2:45",
          keyPoints: [
            "Student helps design the experiment",
            "Sound effects: watering plants, writing in notebook",
            "Observe what happens over time",
          ],
        },
        {
          title: "Solving the Mystery",
          duration: "2:00",
          keyPoints: [
            "Collect all the clues",
            "Draw a conclusion",
            "The scientific method solved the case!",
          ],
        },
      ],
    },
    interactive: {
      title: "Science Detective Lab",
      description: "Build your own experiment using the scientific method",
      activities: [
        {
          type: "drag-drop" as const,
          question: "Put the scientific method steps in order",
          items: [
            { emoji: "🧪", label: "Test", value: "3" },
            { emoji: "❓", label: "Ask Question", value: "1" },
            { emoji: "📝", label: "Conclude", value: "5" },
            { emoji: "💭", label: "Hypothesize", value: "2" },
            { emoji: "👀", label: "Observe", value: "4" },
          ],
          correctOrder: ["1", "2", "3", "4", "5"],
        },
        {
          type: "matching" as const,
          question: "What do you do first in the scientific method?",
          items: [
            { emoji: "❓", label: "Ask a question", value: "question" },
            { emoji: "📝", label: "Make a conclusion", value: "conclusion" },
          ],
          correctAnswer: "question",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "What is the first step in the scientific method?",
          options: ["Make a hypothesis", "Ask a question", "Do an experiment", "Draw a conclusion"],
          correctAnswer: "Ask a question",
        },
        {
          question: "What is a hypothesis?",
          options: ["A final answer", "An educated guess", "A question", "An observation"],
          correctAnswer: "An educated guess",
        },
        {
          question: "What do you do after you test your hypothesis?",
          options: ["Stop", "Observe and record results", "Guess again", "Ask a new question"],
          correctAnswer: "Observe and record results",
        },
      ],
    },
  },
};
