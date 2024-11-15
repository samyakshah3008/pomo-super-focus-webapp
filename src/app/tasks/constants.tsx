const howToModalTaskObj = {
  screenTitle: (
    <>
      Welcome to the{" "}
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Tasks Screen!
      </span>{" "}
      😻
    </>
  ),
  screenHeader: (
    <div>
      Create a task in
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        less than 60seconds
      </span>{" "}
    </div>
  ),
  screenDescription: (
    <>
      Shoutout to the Eisenhower Matrix, a framework that helps you avoid the
      "Urgency Trap" by prioritizing effectively. Learn more about it{" "}
      <a
        className="text-black underline cursor-pointer"
        href="https://todoist.com/productivity-methods/eisenhower-matrix"
        target="_blank"
      >
        here
      </a>
      .
      <br />
      <br />
      Start by tackling tasks that are both important and urgent. Set due dates
      for tasks that are important but not urgent. Try delegating unimportant
      but urgent tasks, and save unimportant, non-urgent tasks for last—or skip
      them altogether.
      <br />
      <br />
      Good luck! Let’s conquer that to-do list! 😎🏆
    </>
  ),
  showCats: true,
  ctaBtnText: "Got it! Thanks and close.",
};

const taskCategories = [
  { value: "Important and Urgent", label: "Important and Urgent" },
  { value: "Not Important but Urgent", label: "Not Important but Urgent" },
  { value: "Important but Not Urgent", label: "Important but Not Urgent" },
  {
    value: "Not Important and Not Urgent",
    label: "Not Important and Not Urgent",
  },
];

const p1PriorityKey = "Important and Urgent";
const p2PriorityKey = "Not Important but Urgent";
const p3PriorityKey = "Important but Not Urgent";
const p4PriorityKey = "Not Important and Not Urgent";

export {
  howToModalTaskObj,
  p1PriorityKey,
  p2PriorityKey,
  p3PriorityKey,
  p4PriorityKey,
  taskCategories,
};
