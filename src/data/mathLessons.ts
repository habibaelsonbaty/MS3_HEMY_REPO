// Comprehensive Math Mountain Lesson Content - All 10 Levels with 3 Modes + Quiz

export const mathLessons: Record<string, any> = {
  "level-1": {
    name: "Number Valley",
    theme: "A calm valley filled with numbered stones and counting rivers",
    visual: {
      title: "Number Valley Adventure",
      description: "Animated walk through the valley with bunny mascot",
      chapters: [
        { time: "0:00", title: "Welcome to Number Valley", thumbnail: "🏞️" },
        { time: "1:30", title: "Counting Stones 1-5", thumbnail: "🪨" },
        { time: "3:00", title: "Counting Stones 6-10", thumbnail: "1️⃣0️⃣" },
        { time: "4:30", title: "Counting Rivers", thumbnail: "🌊" },
      ],
      diagrams: [
        {
          emoji: "🪨",
          title: "Numbered Stones",
          description: "Bunny hops on stones labeled 1, 2, 3, 4, 5... all the way to 10!",
        },
        {
          emoji: "🌊",
          title: "Counting Rivers",
          description: "Streams flow by with groups: 3 apples 🍎🍎🍎, 7 birds 🐦🐦🐦🐦🐦🐦🐦",
        },
        {
          emoji: "🔢",
          title: "Understanding Quantities",
          description: "Each number represents a specific amount of things.",
        },
        {
          emoji: "⭐",
          title: "Practice Counting",
          description: "Count objects one by one to find the total!",
        },
      ],
    },
    auditory: {
      title: "The Lost Numbers of the Valley",
      description: "A counting adventure story with bunny narrator",
      chapters: [
        {
          title: "The Lost Numbers Story",
          duration: "2:30",
          keyPoints: [
            "Numbers 1-10 have hidden behind stones in the valley",
            "Bunny needs your help to find them",
            "Listen for counting songs and rhythm tapping",
          ],
        },
        {
          title: "Counting Song 1-5",
          duration: "2:00",
          keyPoints: [
            "Sing along: One, two, buckle my shoe",
            "Three, four, knock on the door",
            "Five, six, pick up sticks",
          ],
        },
        {
          title: "Counting Song 6-10",
          duration: "2:15",
          keyPoints: [
            "Seven, eight, lay them straight",
            "Nine, ten, do it again!",
            "Tap your hands for each number",
          ],
        },
      ],
    },
    interactive: {
      title: "Number Valley Challenge",
      description: "Drag stones and match groups to numbers",
      activities: [
        {
          type: "drag-drop" as const,
          question: "Drag the numbered stones into the correct order (1-10)",
          items: [
            { emoji: "🪨", label: "7", value: "7" },
            { emoji: "🪨", label: "3", value: "3" },
            { emoji: "🪨", label: "1", value: "1" },
            { emoji: "🪨", label: "9", value: "9" },
            { emoji: "🪨", label: "5", value: "5" },
          ],
          correctOrder: ["1", "3", "5", "7", "9"],
        },
        {
          type: "matching" as const,
          question: "Match the group to its number",
          items: [
            { emoji: "🍎🍎🍎", label: "3 apples", value: "3" },
            { emoji: "🐦🐦🐦🐦🐦", label: "5 birds", value: "5" },
            { emoji: "⭐⭐⭐⭐⭐⭐⭐", label: "7 stars", value: "7" },
          ],
          correctAnswer: "3",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "How many apples are there? 🍎🍎🍎🍎",
          options: ["3", "4", "5", "6"],
          correctAnswer: "4",
        },
        {
          question: "What number comes after 7?",
          options: ["6", "8", "9", "10"],
          correctAnswer: "8",
        },
        {
          question: "Count the stars: ⭐⭐⭐⭐⭐⭐",
          options: ["5", "6", "7", "8"],
          correctAnswer: "6",
        },
      ],
    },
  },

  "level-2": {
    name: "Addition Trail",
    theme: "A forest path where creatures combine fruit and gems",
    visual: {
      title: "Addition Trail Journey",
      description: "Learn addition with forest creatures",
      chapters: [
        { time: "0:00", title: "Welcome to the Forest", thumbnail: "🌲" },
        { time: "2:00", title: "Combining Items", thumbnail: "🫐" },
        { time: "3:30", title: "Number Line Hops", thumbnail: "📏" },
        { time: "5:00", title: "Addition Practice", thumbnail: "➕" },
      ],
      diagrams: [
        {
          emoji: "🫐",
          title: "Combining Blueberries",
          description: "3 blueberries + 2 blueberries = 5 blueberries total!",
        },
        {
          emoji: "📏",
          title: "Number Line Hops",
          description: "Start at 3, hop forward 2 times, land on 5!",
        },
        {
          emoji: "🎉",
          title: "Forest Creatures Cheer",
          description: "Animals celebrate every correct sum with you!",
        },
        {
          emoji: "➕",
          title: "Addition Symbol",
          description: "The + sign means 'put together' or 'combine'",
        },
      ],
    },
    auditory: {
      title: "The Forest Helpers",
      description: "Animals guide you through addition",
      chapters: [
        {
          title: "Meeting the Forest Friends",
          duration: "2:00",
          keyPoints: [
            "The squirrel found 4 nuts in one tree",
            "Can you help count 3 more nuts?",
            "Together that's 4 + 3 = 7 nuts!",
          ],
        },
        {
          title: "Adding with Animals",
          duration: "3:00",
          keyPoints: [
            "Rabbit has 2 carrots, finds 5 more",
            "Bird has 3 berries, picks 4 more",
            "Listen and add along with the story",
          ],
        },
        {
          title: "Practice Together",
          duration: "2:30",
          keyPoints: [
            "Pause and try each problem",
            "Say the answer out loud",
            "Slow, guided explanations for each",
          ],
        },
      ],
    },
    interactive: {
      title: "Forest Addition Challenge",
      description: "Drag items to baskets and watch them add up",
      activities: [
        {
          type: "drag-drop" as const,
          question: "Drag 3 berries to one basket, then 4 to another. How many total?",
          items: [
            { emoji: "🫐", label: "Berry", value: "berry1" },
            { emoji: "🫐", label: "Berry", value: "berry2" },
            { emoji: "🫐", label: "Berry", value: "berry3" },
          ],
          correctAnswer: "7",
        },
        {
          type: "number-line" as const,
          question: "Start at 5, add 3. Where do you land?",
          start: 5,
          jump: 3,
          correctAnswer: "8",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "3 + 2 = ?",
          options: ["4", "5", "6", "7"],
          correctAnswer: "5",
        },
        {
          question: "If you have 4 apples and find 3 more, how many do you have?",
          options: ["6", "7", "8", "9"],
          correctAnswer: "7",
        },
        {
          question: "6 + 1 = ?",
          options: ["5", "6", "7", "8"],
          correctAnswer: "7",
        },
      ],
    },
  },

  "level-3": {
    name: "Subtraction Path",
    theme: "A foggy path where numbers disappear from groups",
    visual: {
      title: "Subtraction Path Mystery",
      description: "Watch items vanish as we subtract",
      chapters: [
        { time: "0:00", title: "The Foggy Path", thumbnail: "🌫️" },
        { time: "2:00", title: "Items Vanishing", thumbnail: "✨" },
        { time: "3:30", title: "Taking Away", thumbnail: "📦" },
        { time: "5:00", title: "Number Line Steps", thumbnail: "📉" },
      ],
      diagrams: [
        {
          emoji: "🍎",
          title: "Disappearing Apples",
          description: "Start with 9 apples, take away 4, you have 5 left!",
        },
        {
          emoji: "⭐",
          title: "Erasing Stars",
          description: "8 stars in the sky, 3 vanish, 5 remain shining!",
        },
        {
          emoji: "📉",
          title: "Stepping Backward",
          description: "Number line: start at 7, step back 2, land on 5!",
        },
        {
          emoji: "➖",
          title: "Subtraction Sign",
          description: "The minus sign means 'take away' or 'remove'",
        },
      ],
    },
    auditory: {
      title: "The Vanishing Lights",
      description: "Magical lanterns teach subtraction",
      chapters: [
        {
          title: "The Magical Lanterns",
          duration: "2:15",
          keyPoints: [
            "10 magical lanterns glow in the dark",
            "One by one, some lose their light",
            "How many lanterns are still glowing?",
          ],
        },
        {
          title: "Counting What's Left",
          duration: "3:00",
          keyPoints: [
            "Start with 8, subtract 3, you have 5",
            "If 6 birds fly away from 10, 4 remain",
            "Bunny helps you figure out what's left",
          ],
        },
        {
          title: "Subtraction Stories",
          duration: "2:45",
          keyPoints: [
            "Listen to real-world examples",
            "Practice with each story problem",
            "Visualize items disappearing",
          ],
        },
      ],
    },
    interactive: {
      title: "Vanishing Challenge",
      description: "Tap to remove items and find how many remain",
      activities: [
        {
          type: "tap-to-remove" as const,
          question: "Tap to cross out 4 leaves from these 9 leaves",
          totalItems: 9,
          removeCount: 4,
          correctAnswer: "5",
        },
        {
          type: "matching" as const,
          question: "7 - 3 = ?",
          items: [
            { emoji: "3️⃣", label: "3", value: "3" },
            { emoji: "4️⃣", label: "4", value: "4" },
            { emoji: "5️⃣", label: "5", value: "5" },
          ],
          correctAnswer: "4",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "8 - 3 = ?",
          options: ["4", "5", "6", "7"],
          correctAnswer: "5",
        },
        {
          question: "You have 10 candies and eat 4. How many are left?",
          options: ["5", "6", "7", "8"],
          correctAnswer: "6",
        },
        {
          question: "9 - 5 = ?",
          options: ["3", "4", "5", "6"],
          correctAnswer: "4",
        },
      ],
    },
  },

  "level-4": {
    name: "Multiplication Hill",
    theme: "A grassy hill where creatures stack groups",
    visual: {
      title: "Multiplication Hill Adventure",
      description: "Learn multiplication through equal groups",
      chapters: [
        { time: "0:00", title: "The Grassy Hill", thumbnail: "🌄" },
        { time: "2:00", title: "Equal Groups", thumbnail: "🍄" },
        { time: "3:30", title: "Arrays and Rows", thumbnail: "📊" },
        { time: "5:00", title: "Skip Counting", thumbnail: "🦘" },
      ],
      diagrams: [
        {
          emoji: "🍄",
          title: "Berry Groups",
          description: "3 groups of 4 berries = 12 berries total!",
        },
        {
          emoji: "📊",
          title: "Arrays",
          description: "2 rows × 5 mushrooms = 10 mushrooms arranged neatly!",
        },
        {
          emoji: "⬆️",
          title: "Hill Levels",
          description: "Bunny uses hill levels as multiplication layers!",
        },
        {
          emoji: "✖️",
          title: "Times Symbol",
          description: "3 × 4 means '3 groups of 4' or '3 times 4'",
        },
      ],
    },
    auditory: {
      title: "The Growing Garden",
      description: "Plants grow in equal groups",
      chapters: [
        {
          title: "Garden Planning",
          duration: "2:30",
          keyPoints: [
            "The bunny plants seeds in equal rows",
            "4 rows with 3 carrots each",
            "How many carrots total?",
          ],
        },
        {
          title: "Multiplication Stories",
          duration: "3:15",
          keyPoints: [
            "Skip counting: 2, 4, 6, 8, 10...",
            "5 baskets with 2 apples each = 10 apples",
            "Practice with garden examples",
          ],
        },
        {
          title: "Times Table Songs",
          duration: "2:45",
          keyPoints: [
            "Sing the 2× table: 2, 4, 6, 8...",
            "Sing the 5× table: 5, 10, 15, 20...",
            "Rhythm helps remember multiplication",
          ],
        },
      ],
    },
    interactive: {
      title: "Hill Builder Challenge",
      description: "Create equal groups and count the total",
      activities: [
        {
          type: "array-builder" as const,
          question: "Build 3 groups of 4 items",
          groups: 3,
          itemsPerGroup: 4,
          correctAnswer: "12",
        },
        {
          type: "matching" as const,
          question: "5 × 2 = ?",
          items: [
            { emoji: "8️⃣", label: "8", value: "8" },
            { emoji: "🔟", label: "10", value: "10" },
            { emoji: "1️⃣2️⃣", label: "12", value: "12" },
          ],
          correctAnswer: "10",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "3 × 4 = ?",
          options: ["7", "10", "12", "14"],
          correctAnswer: "12",
        },
        {
          question: "If there are 5 bags with 3 candies each, how many candies total?",
          options: ["8", "12", "15", "18"],
          correctAnswer: "15",
        },
        {
          question: "2 × 6 = ?",
          options: ["8", "10", "12", "14"],
          correctAnswer: "12",
        },
      ],
    },
  },

  "level-5": {
    name: "Division Ridge",
    theme: "A tall ridge where you split things into equal parts",
    visual: {
      title: "Division Ridge Sharing",
      description: "Learn to divide by sharing equally",
      chapters: [
        { time: "0:00", title: "The Tall Ridge", thumbnail: "⛰️" },
        { time: "2:00", title: "Splitting Treasures", thumbnail: "💎" },
        { time: "3:30", title: "Equal Sharing", thumbnail: "🍎" },
        { time: "5:00", title: "Division Practice", thumbnail: "➗" },
      ],
      diagrams: [
        {
          emoji: "💎",
          title: "Treasure Division",
          description: "12 gems divided among 3 friends = 4 gems each!",
        },
        {
          emoji: "🍎",
          title: "Fruit Sharing",
          description: "10 apples shared between 2 baskets = 5 in each!",
        },
        {
          emoji: "🦊",
          title: "Fair Sharing",
          description: "Animals learn to share snacks equally!",
        },
        {
          emoji: "➗",
          title: "Division Symbol",
          description: "12 ÷ 3 means 'split 12 into 3 equal groups'",
        },
      ],
    },
    auditory: {
      title: "Share the Ridge Snacks",
      description: "Bunny explains division through sharing",
      chapters: [
        {
          title: "Sharing with Friends",
          duration: "2:20",
          keyPoints: [
            "15 berries need to be shared among 3 bunnies",
            "Each bunny gets the same amount",
            "15 ÷ 3 = 5 berries for each!",
          ],
        },
        {
          title: "Division Stories",
          duration: "3:10",
          keyPoints: [
            "20 nuts divided into 4 bags",
            "18 carrots shared by 6 rabbits",
            "Nature theme sounds and examples",
          ],
        },
        {
          title: "Practice Problems",
          duration: "2:30",
          keyPoints: [
            "Listen and solve division problems",
            "Think about fair sharing",
            "Check if everyone gets equal amounts",
          ],
        },
      ],
    },
    interactive: {
      title: "Fair Sharing Challenge",
      description: "Drag items to divide equally",
      activities: [
        {
          type: "drag-to-divide" as const,
          question: "Divide 12 gems into 3 equal bags",
          totalItems: 12,
          groups: 3,
          correctAnswer: "4",
        },
        {
          type: "matching" as const,
          question: "20 ÷ 4 = ?",
          items: [
            { emoji: "4️⃣", label: "4", value: "4" },
            { emoji: "5️⃣", label: "5", value: "5" },
            { emoji: "6️⃣", label: "6", value: "6" },
          ],
          correctAnswer: "5",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "12 ÷ 3 = ?",
          options: ["3", "4", "5", "6"],
          correctAnswer: "4",
        },
        {
          question: "If you share 15 cookies equally among 5 friends, how many does each get?",
          options: ["2", "3", "4", "5"],
          correctAnswer: "3",
        },
        {
          question: "20 ÷ 5 = ?",
          options: ["3", "4", "5", "6"],
          correctAnswer: "4",
        },
      ],
    },
  },

  "level-6": {
    name: "Fraction Falls",
    theme: "A magical waterfall with colored fraction droplets",
    visual: {
      title: "Fraction Falls Magic",
      description: "Understanding fractions with colorful visuals",
      chapters: [
        { time: "0:00", title: "The Magical Waterfall", thumbnail: "💧" },
        { time: "2:00", title: "Pizza Fractions", thumbnail: "🍕" },
        { time: "3:30", title: "Halves and Thirds", thumbnail: "½" },
        { time: "5:00", title: "Fraction Practice", thumbnail: "📊" },
      ],
      diagrams: [
        {
          emoji: "🍕",
          title: "Pizza Slices",
          description: "A pizza cut into 4 slices - each slice is 1/4 of the whole!",
        },
        {
          emoji: "💧",
          title: "Water Droplets",
          description: "Waterfall droplets show halves (1/2), thirds (1/3), fourths (1/4)",
        },
        {
          emoji: "🎨",
          title: "Colorful Fractions",
          description: "Clean animations of slicing objects into equal parts!",
        },
        {
          emoji: "⭐",
          title: "Parts of a Whole",
          description: "The bottom number shows total parts, top shows how many you have",
        },
      ],
    },
    auditory: {
      title: "Drops of Fractions",
      description: "Musical waterfall teaches fractions",
      chapters: [
        {
          title: "Introduction to Fractions",
          duration: "2:45",
          keyPoints: [
            "A fraction is part of a whole thing",
            "The waterfall sings when fractions match",
            "1/2 means 1 out of 2 equal parts",
          ],
        },
        {
          title: "Understanding Parts",
          duration: "3:00",
          keyPoints: [
            "Numerator = top number (parts you have)",
            "Denominator = bottom number (total parts)",
            "Gentle guided explanations with examples",
          ],
        },
        {
          title: "Fraction Songs",
          duration: "2:30",
          keyPoints: [
            "Musical tones for different fractions",
            "Half, third, quarter melodies",
            "Listen and identify fractions by sound",
          ],
        },
      ],
    },
    interactive: {
      title: "Fraction Falls Challenge",
      description: "Slice items and match fractions",
      activities: [
        {
          type: "slice-matcher" as const,
          question: "Slice the pizza to show 1/4",
          shape: "pizza",
          targetFraction: "1/4",
          correctAnswer: "4",
        },
        {
          type: "matching" as const,
          question: "Which droplet shows one half?",
          items: [
            { emoji: "1/2", label: "One half", value: "half" },
            { emoji: "1/3", label: "One third", value: "third" },
            { emoji: "1/4", label: "One fourth", value: "fourth" },
          ],
          correctAnswer: "half",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "If you cut a pizza into 4 equal slices and eat 1, what fraction did you eat?",
          options: ["1/2", "1/3", "1/4", "1/5"],
          correctAnswer: "1/4",
        },
        {
          question: "What is the top number of a fraction called?",
          options: ["Denominator", "Numerator", "Divisor", "Factor"],
          correctAnswer: "Numerator",
        },
        {
          question: "Which is bigger: 1/2 or 1/4?",
          options: ["1/2", "1/4", "Same size", "Can't tell"],
          correctAnswer: "1/2",
        },
      ],
    },
  },

  "level-7": {
    name: "Decimal Forest",
    theme: "Glowing decimal fireflies in an enchanted forest",
    visual: {
      title: "Decimal Forest Lights",
      description: "Fireflies teach decimals with glowing numbers",
      chapters: [
        { time: "0:00", title: "The Enchanted Forest", thumbnail: "🌲" },
        { time: "2:00", title: "Firefly Numbers", thumbnail: "✨" },
        { time: "3:30", title: "Tenths and Hundredths", thumbnail: "0.1" },
        { time: "5:00", title: "Decimal Practice", thumbnail: "📊" },
      ],
      diagrams: [
        {
          emoji: "✨",
          title: "Glowing Fireflies",
          description: "Fireflies light up with decimals: 0.1, 0.2, 0.3, 0.4, 0.5...",
        },
        {
          emoji: "💡",
          title: "Brightness Levels",
          description: "Show tenths and hundredths using glowing orb scales!",
        },
        {
          emoji: "📏",
          title: "Decimal Number Line",
          description: "Animated number line shows 0.0 to 1.0 with firefly markers",
        },
        {
          emoji: "🌟",
          title: "Understanding Decimals",
          description: "Decimals are parts of a whole, just like fractions! 0.5 = 1/2",
        },
      ],
    },
    auditory: {
      title: "The Firefly Lights",
      description: "Each firefly has a brightness level as a decimal",
      chapters: [
        {
          title: "Meeting the Fireflies",
          duration: "2:30",
          keyPoints: [
            "Fireflies glow at different brightness levels",
            "0.1 is very dim, 0.9 is very bright",
            "The decimal point separates whole numbers from parts",
          ],
        },
        {
          title: "Comparing Brightness",
          duration: "3:00",
          keyPoints: [
            "Which firefly is brighter: 0.3 or 0.7?",
            "0.7 is bigger than 0.3",
            "Student listens and identifies larger/smaller decimals",
          ],
        },
        {
          title: "Decimal Stories",
          duration: "2:45",
          keyPoints: [
            "Real-world decimals: money, measurements",
            "$0.50 is fifty cents",
            "0.1 meters is one tenth of a meter",
          ],
        },
      ],
    },
    interactive: {
      title: "Firefly Decimal Challenge",
      description: "Place fireflies on correct decimal markers",
      activities: [
        {
          type: "decimal-placement" as const,
          question: "Place the firefly with 0.4 on the correct spot on the number line",
          range: [0, 1],
          targetDecimal: 0.4,
          correctAnswer: "0.4",
        },
        {
          type: "comparison" as const,
          question: "Which is brighter: 0.6 or 0.3?",
          items: [
            { emoji: "✨", label: "0.6", value: "0.6" },
            { emoji: "✨", label: "0.3", value: "0.3" },
          ],
          correctAnswer: "0.6",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Which decimal is larger: 0.5 or 0.8?",
          options: ["0.5", "0.8", "Same", "Can't tell"],
          correctAnswer: "0.8",
        },
        {
          question: "What is 0.5 as a fraction?",
          options: ["1/4", "1/2", "1/3", "1/5"],
          correctAnswer: "1/2",
        },
        {
          question: "Which number is smallest?",
          options: ["0.2", "0.7", "0.1", "0.5"],
          correctAnswer: "0.1",
        },
      ],
    },
  },

  "level-8": {
    name: "Geometry Peak",
    theme: "A snowy mountain full of geometric crystal shapes",
    visual: {
      title: "Geometry Peak Crystals",
      description: "Discover shapes in a crystal wonderland",
      chapters: [
        { time: "0:00", title: "The Snowy Peak", thumbnail: "⛰️" },
        { time: "2:00", title: "Crystal Shapes", thumbnail: "💎" },
        { time: "3:30", title: "Triangles & Squares", thumbnail: "△" },
        { time: "5:00", title: "Real-World Shapes", thumbnail: "🏠" },
      ],
      diagrams: [
        {
          emoji: "△",
          title: "Triangle Crystals",
          description: "3 sides, 3 corners - triangles sparkle in the snow!",
        },
        {
          emoji: "□",
          title: "Square Crystals",
          description: "4 equal sides, 4 right angles - perfect squares!",
        },
        {
          emoji: "⬡",
          title: "Other Polygons",
          description: "Pentagons (5 sides), Hexagons (6 sides), Circles (no corners)",
        },
        {
          emoji: "🏠",
          title: "Shapes Around Us",
          description: "Houses, signs, wheels - shapes are everywhere!",
        },
      ],
    },
    auditory: {
      title: "Shapes of the Summit",
      description: "Bunny describes shapes while climbing",
      chapters: [
        {
          title: "Introduction to Shapes",
          duration: "2:40",
          keyPoints: [
            "Shapes have sides and corners",
            "A triangle has 3 sides",
            "A square has 4 equal sides",
          ],
        },
        {
          title: "Climbing the Mountain",
          duration: "3:20",
          keyPoints: [
            "Bunny spots triangular rocks",
            "Square ice blocks on the path",
            "Round snowballs rolling down",
          ],
        },
        {
          title: "Shape Rhythm Game",
          duration: "2:30",
          keyPoints: [
            "Clap 3 times for triangle",
            "Clap 4 times for square",
            "Rhythmic shape identification",
          ],
        },
      ],
    },
    interactive: {
      title: "Crystal Shape Challenge",
      description: "Match shapes and build crystal structures",
      activities: [
        {
          type: "shape-matcher" as const,
          question: "Drag shapes to match their outlines",
          shapes: ["triangle", "square", "circle", "pentagon"],
          correctAnswer: "all",
        },
        {
          type: "builder" as const,
          question: "Build a crystal structure using geometric shapes",
          availableShapes: ["triangle", "square", "hexagon"],
          correctAnswer: "structure",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "How many sides does a triangle have?",
          options: ["2", "3", "4", "5"],
          correctAnswer: "3",
        },
        {
          question: "Which shape has no corners?",
          options: ["Square", "Triangle", "Circle", "Rectangle"],
          correctAnswer: "Circle",
        },
        {
          question: "How many sides does a square have?",
          options: ["3", "4", "5", "6"],
          correctAnswer: "4",
        },
      ],
    },
  },

  "level-9": {
    name: "Algebra Summit",
    theme: "High mountain peak with mystical number puzzles",
    visual: {
      title: "Algebra Summit Mysteries",
      description: "Solve unknown number puzzles",
      chapters: [
        { time: "0:00", title: "The Mystery Peak", thumbnail: "🗻" },
        { time: "2:00", title: "Unknown Numbers", thumbnail: "❓" },
        { time: "3:30", title: "Solving for X", thumbnail: "✖️" },
        { time: "5:00", title: "Algebra Practice", thumbnail: "🧮" },
      ],
      diagrams: [
        {
          emoji: "❓",
          title: "Mystery Boxes",
          description: "Simple animations with variables: □ + 3 = 7... what's in the box?",
        },
        {
          emoji: "⚖️",
          title: "Balance Scale",
          description: "Visual solving: both sides must be equal!",
        },
        {
          emoji: "✖️",
          title: "Unknown Variable",
          description: "The box or 'x' represents a number we need to find!",
        },
        {
          emoji: "✅",
          title: "Checking Answers",
          description: "Plug the answer back in to check if it works!",
        },
      ],
    },
    auditory: {
      title: "Mystery of the Empty Box",
      description: "Bunny explains solving unknowns",
      chapters: [
        {
          title: "What is Algebra?",
          duration: "2:50",
          keyPoints: [
            "Algebra uses letters or boxes for unknown numbers",
            "□ + 5 = 8... what number goes in the box?",
            "We solve puzzles to find the mystery number",
          ],
        },
        {
          title: "Solving Step by Step",
          duration: "3:15",
          keyPoints: [
            "If x + 3 = 7, subtract 3 from both sides",
            "x = 7 - 3, so x = 4!",
            "Student guesses and checks answers",
          ],
        },
        {
          title: "Practice Problems",
          duration: "2:45",
          keyPoints: [
            "Listen to each mystery number problem",
            "Think about what number makes it true",
            "Bunny guides you through each solution",
          ],
        },
      ],
    },
    interactive: {
      title: "Algebra Mystery Challenge",
      description: "Drag numbers to solve equations",
      activities: [
        {
          type: "equation-solver" as const,
          question: "Drag the correct number into the box: □ + 3 = 7",
          equation: "x + 3 = 7",
          options: [2, 3, 4, 5],
          correctAnswer: "4",
        },
        {
          type: "balance-scale" as const,
          question: "Balance the scale: x + 2 = 6",
          leftSide: "x + 2",
          rightSide: 6,
          correctAnswer: "4",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "If □ + 5 = 9, what number goes in the box?",
          options: ["3", "4", "5", "14"],
          correctAnswer: "4",
        },
        {
          question: "Solve: x + 2 = 8",
          options: ["4", "5", "6", "10"],
          correctAnswer: "6",
        },
        {
          question: "If □ - 3 = 5, what is □?",
          options: ["2", "6", "8", "15"],
          correctAnswer: "8",
        },
      ],
    },
  },

  "level-10": {
    name: "Problem Solving Paradise",
    theme: "A tropical paradise for final challenges",
    visual: {
      title: "Paradise Problem Solving",
      description: "Real-world word problems in paradise",
      chapters: [
        { time: "0:00", title: "Welcome to Paradise", thumbnail: "🏝️" },
        { time: "2:00", title: "Shopping Problems", thumbnail: "🛒" },
        { time: "3:30", title: "Nature Adventures", thumbnail: "🌴" },
        { time: "5:00", title: "Sharing with Friends", thumbnail: "👥" },
      ],
      diagrams: [
        {
          emoji: "🛒",
          title: "Shopping Scenario",
          description: "You have $10. A toy costs $6. How much change do you get?",
        },
        {
          emoji: "🌴",
          title: "Nature Problem",
          description: "There are 5 palm trees, each has 3 coconuts. How many total?",
        },
        {
          emoji: "👥",
          title: "Friends Sharing",
          description: "6 friends share 18 shells equally. How many does each get?",
        },
        {
          emoji: "🎯",
          title: "Logic Problems",
          description: "Use all the math skills you've learned to solve real problems!",
        },
      ],
    },
    auditory: {
      title: "Adventure Day at the Beach",
      description: "Problems woven into a story",
      chapters: [
        {
          title: "Beach Day Story",
          duration: "3:00",
          keyPoints: [
            "Bunny and friends visit the beach",
            "Problems appear in the story naturally",
            "Listen for numbers and questions",
          ],
        },
        {
          title: "Problem Solving Steps",
          duration: "3:30",
          keyPoints: [
            "Read the problem carefully",
            "Find the important numbers",
            "Decide what operation to use",
            "Solve and check your answer",
          ],
        },
        {
          title: "Logic Questions",
          duration: "2:45",
          keyPoints: [
            "Bunny asks: 'Which path should we take?'",
            "Use reasoning and math together",
            "Multiple ways to solve the same problem",
          ],
        },
      ],
    },
    interactive: {
      title: "Paradise Quest Challenge",
      description: "Solve mixed problems to reach treasure",
      activities: [
        {
          type: "word-problem" as const,
          question: "You collect 12 shells in the morning and 8 in the afternoon. How many shells total?",
          correctAnswer: "20",
        },
        {
          type: "multi-step" as const,
          question: "A coconut costs $3. You buy 4 coconuts and pay with $20. How much change?",
          steps: ["Calculate total cost", "Subtract from $20"],
          correctAnswer: "8",
        },
        {
          type: "path-chooser" as const,
          question: "Choose the correct path: If you walk 5 steps forward and 2 steps back, where are you?",
          options: ["3 steps forward", "7 steps forward", "2 steps back"],
          correctAnswer: "3 steps forward",
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: "Sarah has 15 stickers. She gives 6 to her friend. How many does she have left?",
          options: ["7", "8", "9", "21"],
          correctAnswer: "9",
        },
        {
          question: "A bag has 4 apples. If you have 3 bags, how many apples total?",
          options: ["7", "10", "12", "16"],
          correctAnswer: "12",
        },
        {
          question: "You have $20. After buying a book for $7 and a toy for $5, how much is left?",
          options: ["$6", "$7", "$8", "$12"],
          correctAnswer: "$8",
        },
      ],
    },
  },
};
