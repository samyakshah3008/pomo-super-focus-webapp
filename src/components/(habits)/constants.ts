const defineHabitsExamples = [
  "Put up my running shoes",
  "Take a deep breath",
  "Meditate for 5mins",
  "Eat one bite of spinach",
  "Write one sentence",
  "Text one friend",
  "Go for a 10min walk",
];

const getSpecificExamples = [
  "Every day at 8am",
  "Every weekday lunch hour",
  "After I eat breakfast",
  "In the bathroom",
  "When I wake up",
  "When I close my work laptop",
];

const groundItToIdentityExamples = [
  "An active person",
  "A mindful person",
  "A person who is wise with money",
  "A dedicated musician",
  "A gardener",
  "A writer",
  "A healthy person",
];

const guestUserAllHabits = [
  {
    defineHabitText: "Meditate for 5mins",
    getSpecificText: "When I wake up",
    identityText: "A healthy person",
    repeat: "weekly",
    selectedDays: ["Mon", "Tue", "Wed"],
    _id: "673b2e661237deebe4e0febb",
  },
  {
    defineHabitText: "Drink 2 liters of water",
    getSpecificText: "After every meal",
    identityText: "A hydrated person",
    repeat: "daily",
    selectedDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    _id: "673b2e661237deebe4e0fefc",
  },
  {
    defineHabitText: "Write in a journal",
    getSpecificText: "Before going to bed",
    identityText: "An introspective person",
    repeat: "daily",
    selectedDays: ["Mon", "Wed", "Fri"],
    _id: "673b2e661237deebe4e0feff",
  },
  {
    defineHabitText: "Exercise for 30 minutes",
    getSpecificText: "After work",
    identityText: "A fit person",
    repeat: "weekly",
    selectedDays: ["Tue", "Thu", "Sat"],
    _id: "673b2e661237deebe4e0ff01",
  },
  {
    defineHabitText: "Read for 15 minutes",
    getSpecificText: "Before breakfast",
    identityText: "A knowledgeable person",
    repeat: "daily",
    selectedDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    _id: "673b2e661237deebe4e0ff03",
  },
];

const guestUserTodayHabits = [
  {
    defineHabitText: "Meditate for 5mins",
    getSpecificText: "When I wake up",
    identityText: "A healthy person",
    repeat: "weekly",
    selectedDays: ["Mon", "Tue", "Wed"],
    _id: "673b2e661237deebe4e0febb",
  },
];

export {
  defineHabitsExamples,
  getSpecificExamples,
  groundItToIdentityExamples,
  guestUserAllHabits,
  guestUserTodayHabits,
};
