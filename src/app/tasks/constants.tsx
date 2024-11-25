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
  ctaBtnText:
    "Give a virtual cuddle to cats and close, cats have surprise for you as well!",
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

const guestUserTasksItems = [
  {
    title: "Watch Batman - The Dark Knight Rises",
    description: "Want to watch this since long!",
    isCompleted: false,
    priority: "Not Important and Not Urgent",
    dueDate: "30-11-2024",
    _id: "672362c7f25befa10fc6b",
  },

  {
    title: "Launch PomoSuperFocus on Peerlist!",
    description: "I'll be dividing work in chunks to complete this project!",
    isCompleted: false,
    priority: "Important and Urgent",
    dueDate: "17-11-2024",
    _id: "67236264f25b35410fc5f",
  },
  {
    title: "Write 1 year internship experience blog at Cosmofeed",
    description:
      "I recently completed 1 year of internship at Cosmofeed, I want to take a moment to reflect on that journey and publish a blog!",
    isCompleted: false,
    priority: "Important but Not Urgent",
    dueDate: "15-11-2024",
    _id: "67236210f2a35410fc55",
  },
  {
    title: "Complete Eisen hower matrix flow",
    description:
      "Going to prepare the backend\nGoing to prepare FE UI\nGoing to integrate APIs",
    isCompleted: true,
    priority: "Important and Urgent",
    dueDate: "01-11-2024",
    _id: "672274a6868a9bafa571d",
  },
];

export {
  guestUserTasksItems,
  howToModalTaskObj,
  p1PriorityKey,
  p2PriorityKey,
  p3PriorityKey,
  p4PriorityKey,
  taskCategories,
};
