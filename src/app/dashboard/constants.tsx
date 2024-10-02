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

const checklistAccordionItems = [
  {
    title: (
      <div className="flex gap-2">
        <div className="text-sm">1. </div>
        <div className="text-sm line-through">
          Complete your first pomodoro session!
        </div>
      </div>
    ),
    content:
      "Time to bring the focus momentum and kick off with your first pomodoro session!",
  },
  {
    title: (
      <div className="flex gap-2">
        <div className="text-sm">2. </div>
        <div className="text-sm line-through ">
          Create your habit - either breaking bad habit or building good habit!
        </div>
      </div>
    ),
    content:
      "Time to bring out your best potential! Let's create habits and achieve the best!",
  },
  {
    title: (
      <div className="flex gap-2">
        <div className="text-sm">3. </div>
        <div className="text-sm">Create your working framework!</div>
      </div>
    ),
    content:
      "It's crucial to create a working framework so you can follow it and make the most of each day!",
  },
  {
    title: (
      <div className="flex gap-2">
        <div className="text-sm">4. </div>
        <div className="text-sm">Create your first goal</div>
      </div>
    ),
    content:
      "You can't achieve success without clarity. So, create your first goal today!",
  },
];

export { checklistAccordionItems, quickStartLinks };
