const buildCustomFrameworkCard = [
  {
    title: "Craft your Custom Framework!",
    description:
      "Everyone have their own productivity formula, rediscover your best formula by creating your framework and follow it. You can always come back and change it.",
    link: "/working-framework/create",
  },
];

const howToModalWorkingFrameworkObj = {
  screenTitle: (
    <>
      Welcome to{" "}
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Working Framework Screen!
      </span>{" "}
      😻
    </>
  ),
  screenHeader: (
    <div>
      {" "}
      James Clear's{" "}
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Working Framework -
      </span>{" "}
      technique:
    </div>
  ),
  screenDescription: (
    <>
      We would like to give a shoutout to James Clear who launched this
      technique in his book Atomic Habits, which you can read more here -
      <a
        className="text-black underline cursor-pointer"
        href="https://jamesclear.com/atomic-habits-summary#:~:text=The%20framework%20is%20called%20the,Craving)%3A%20Make%20it%20attractive."
        target="_blank"
      >
        Framework called four laws of behavior change!
      </a>{" "}
      <br />
      <br />
      What the hack is working framework?? It is a set of habits which you will
      prepare for yourself which aligns with the identity you admire. It is the
      compilation of your habits which you are going to follow when you wake up
      till you sleep. Please look at some starter templates on this page, they
      will guide you;) We also understand everyone have their own routine, which
      might not fit in starter templates, hence we also have option where you
      can prepare your custom framework!
      <br />
      <br />
      Good luck! We hope you win your day with your working framework! 😎🏆
    </>
  ),
  showCats: false,
  ctaBtnText:
    "Give a virtual cuddle to cats and close, cats have surprise for you as well!",
};

const guestUserActiveWorkingFramework = {
  title: "Early Riser",
  rules: [
    "I'll wake up before 6am to start my day early.",
    "I'll use the Pomodoro technique for focused work sessions.",
    "I'll complete my top 3 tasks before noon.",
    "I'll take short stretching breaks between Pomodoro sessions.",
    "I'll avoid social media during work blocks.",
    "I'll plan my tasks the night before to ensure a productive start.",
    "I'll not eat until I've finished 2 hours of deep work.",
    "I'll keep my desk clean to stay organized and focused.",
    "I'll drink water regularly to stay hydrated and energized.",
    "I'll reflect on my achievements at the end of the day.",
    "I'll review my goals before wrapping up for the day.",
    "I'll ensure a proper work-life balance with quality time for loved ones.",
    "I'll limit distractions by turning off notifications during Pomodoro sessions.",
    "I'll prioritize deep focus time over multitasking.",
  ],
  description:
    "Kickstart your day with structured focus sessions using the Pomodoro technique, ensuring consistent morning productivity.",
  createdBy: "PomoSuperFocus Team",
};

export {
  buildCustomFrameworkCard,
  guestUserActiveWorkingFramework,
  howToModalWorkingFrameworkObj,
};
