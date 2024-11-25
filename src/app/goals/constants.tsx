const goalCategories = [
  { value: "health", label: "Health & Fitness" },
  { value: "career", label: "Career & Professional" },
  { value: "personal-development", label: "Personal Growth" },
  { value: "finances", label: "Finances" },
  { value: "relationships", label: "Relationships" },
  { value: "education", label: "Education & Learning" },
  { value: "hobbies", label: "Hobbies & Recreation" },
  { value: "travel", label: "Travel & Adventure" },
  { value: "community", label: "Community & Giving Back" },
  { value: "spirituality", label: "Spirituality & Mindfulness" },
];

const goalsDummyData: any = [
  {
    id: "m5gr84i9",
    time: "31st October 2024",
    category: "Career & Professional",
    goals: "Launch a product on peerlist",
    steps: "Lorem Epsum",
    status: "achieved",
  },
  {
    id: "3u1reuv4",
    time: "31st October 2024",
    category: "Career & Professional",
    goals: "Hackthis fall hackathon",
    steps: "Lorem Epsum",
    status: "achieved",
  },
  {
    id: "derv1ws0",
    time: "31st October 2024",
    category: "Career & Professional",
    goals: "Complete Striver's A to Z DSA sheet",
    steps: "Lorem Epsum",
    status: "achieved",
  },
  {
    id: "5kma53ae",
    time: "31st October 2024",
    category: "Career & Professional",
    goals:
      "Give 10+ mock interviews Give 10+ mock interviews Give 10+ mock interviews",
    steps: "Lorem Epsum",
    status: "achieved",
  },
  {
    id: "bhqecj4p",
    time: "31st October 2024",
    category: "Health & Fitness",
    goals: "Fix sleep schedule",
    steps:
      "Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum",
    status: "achieved",
  },
];

const goalsGuestUserData: any = [
  {
    title: "Feed 1000 cats",
    doAbleActions: "Gonna save money for next 2 months",
    category: "career",
    estimatedTimeToComplete: "10-11-2024",
    status: true,
    id: "123",
  },
  {
    title: "Run a marathon",
    doAbleActions: "Start running 5km daily from tomorrow",
    category: "fitness",
    estimatedTimeToComplete: "01-03-2025",
    status: false,
    id: "124",
  },
  {
    title: "Read 20 books",
    doAbleActions: "Read one book every two weeks",
    category: "personal development",
    estimatedTimeToComplete: "12-31-2024",
    status: false,
    id: "125",
  },
  {
    title: "Save $5000",
    doAbleActions: "Set aside $500 from monthly salary",
    category: "financial",
    estimatedTimeToComplete: "06-30-2025",
    status: false,
    id: "126",
  },
  {
    title: "Learn to play guitar",
    doAbleActions: "Practice for 30 minutes daily",
    category: "hobby",
    estimatedTimeToComplete: "09-01-2024",
    status: true,
    id: "127",
  },
];

const howToModalGoalObj = {
  screenTitle: (
    <>
      Welcome to{" "}
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Goals Screen!
      </span>{" "}
      😻
    </>
  ),
  screenHeader: (
    <div>
      {" "}
      Himesh Madan's{" "}
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Goal setting
      </span>{" "}
      technique:
    </div>
  ),
  screenDescription: (
    <>
      We would like to give a shoutout to Himesh Madan who launched this
      technique to set goals on his YouTube channel -
      <a
        className="text-black underline cursor-pointer"
        href="https://www.youtube.com/watch?v=8l3yC8ceyUY"
        target="_blank"
      >
        watch here
      </a>{" "}
      <br />
      <br />
      The idea is simple: set a goal, outline your actions, give it a title,
      choose a category, and estimate the time it’ll take. But hold on, that’s
      just step one. Himesh Madan emphasizes a key point—"review often!" And it
      makes perfect sense. Without regular reviews, your goals and actions will
      just be data taking up space in our database. 😉
      <br />
      <br />
      Good luck! We hope you achieve everything you aim for! 😎🏆
    </>
  ),
  showCats: true,
  ctaBtnText:
    "Give a virtual cuddle to cats and close, cats have surprise for you as well!",
};

export {
  goalCategories,
  goalsDummyData,
  goalsGuestUserData,
  howToModalGoalObj,
};
