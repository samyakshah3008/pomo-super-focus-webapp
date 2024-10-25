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

export { buildCustomFrameworkCard, howToModalWorkingFrameworkObj };
