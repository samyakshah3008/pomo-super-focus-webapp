import { Goal } from "@/components/(goals)/data-table";

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

const goalsDummyData: Goal[] = [
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

export { goalCategories, goalsDummyData };
