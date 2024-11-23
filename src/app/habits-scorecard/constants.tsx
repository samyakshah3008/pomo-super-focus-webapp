const habitCategories = [
  "Fitness",
  "Health",
  "Work",
  "Education",
  "Personal Development",
  "Hobbies",
  "Finance",
  "Social",
];

const howToModalHabitsObj = {
  screenTitle: (
    <>
      Welcome to{" "}
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Habits Screen!
      </span>{" "}
      😻
    </>
  ),
  screenHeader: (
    <div>
      {" "}
      James Clear's Ultimate{" "}
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Atomic Habits
      </span>{" "}
      technique:
    </div>
  ),
  screenDescription: (
    <>
      We would like to give a shoutout to James Clear who have published Atomic
      Habits Self help book -
      <a
        className="text-black underline cursor-pointer"
        href="https://atomichabits.com/cheatsheet"
        target="_blank"
      >
        check here
      </a>{" "}
      <br />
      <br />
      Now, set habits in atomic habits way, we highly recommend to check above
      cheatsheet link 😉
      <br />
      <br />
      Good luck! We hope you achieve everything you aim for! 😎🏆
    </>
  ),
  showCats: true,
  ctaBtnText:
    "Give a virtual cuddle to cats and close, cats have surprise for you as well!",
};
export { habitCategories, howToModalHabitsObj };
