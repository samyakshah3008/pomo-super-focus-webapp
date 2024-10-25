const quickStartLinks = [
  {
    title: "Super Focus",
    description:
      "Achieve peak productivity with dedicated focus sessions using the Pomodoro technique.",
    link: "/super-focus",
  },
  {
    title: "Leaderboard",
    description:
      "Check out the top performers based on total focus time and challenge yourself to climb the ranks.",
    link: "/leaderboard",
  },
  {
    title: "Goals Review",
    description:
      "Track and review your yearly goals to ensure you're on the path to success.",
    link: "/goals",
  },
  {
    title: "Tasks",
    description:
      "Manage and organize your daily tasks to stay on top of your to-do list.",
    link: "/tasks",
  },
  {
    title: "Working Framework",
    description:
      "Develop a personal framework to streamline your workflow and boost daily productivity.",
    link: "/working-framework",
  },
  {
    title: "Habits Scorecard",
    description:
      "Monitor and improve your habits with daily tracking to build consistency over time.",
    link: "/habits-scorecard",
  },
];

const howToModalDashboardObj = {
  screenTitle: (
    <>
      Welcome to{" "}
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Dashboard Screen
      </span>{" "}
      😻
    </>
  ),
  screenHeader: (
    <div>
      {" "}
      Our valuable user of{" "}
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        PomoSuperFocus,
      </span>{" "}
      Cats are super pleased to have you!
    </div>
  ),
  screenDescription:
    "Please note that PomoSuperFocus is free and open source software and we won't charge anything forever. However, we encourage you when you see a stray animal, please feed them if you liked our product, and that's the only thing we request from our side.",
  showCats: true,
  ctaBtnText:
    "Give a virtual cuddle to cats and close, cats have surprise for you as well!",
};

export { howToModalDashboardObj, quickStartLinks };
