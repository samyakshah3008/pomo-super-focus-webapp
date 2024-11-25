import { GratitudeItem } from "@/components/(gratitude-list)/data-table";

const dummyGratitudeList: GratitudeItem[] = [
  {
    id: "1",
    title: "Best health",
    description:
      "This is most underrated, but I want to remind this to myself. ",
    date: "23rd October 2024",
  },
  {
    id: "2",
    title: "Good Quality of life",
    description:
      "This is most underrated, but I want to remind this to myself. ",
    date: "23rd October 2024",
  },
  {
    id: "3",
    title: "Living with parents",
    description:
      "This is most underrated, but I want to remind this to myself. ",
    date: "23rd October 2024",
  },
  {
    id: "4",
    title: "Born in India!",
    description:
      "This is most underrated, but I want to remind this to myself. ",
    date: "23rd October 2024",
  },
  {
    id: "5",
    title: "Born in a jain family!",
    description:
      "This is most underrated, but I want to remind this to myself. ",
    date: "23rd October 2024",
  },
];

const guestUserGratitudeList = [
  {
    title: "Best health",
    description: "I am utmost grateful for my best health today!",
    dateOfCreation: "28-10-2024",
    id: "671fb9df97351d93478",
    createdAt: "2024-10-28T16:20:47.818Z",
    updatedAt: "2024-10-28T16:20:47.818Z",
  },
  {
    title: "Supportive family",
    description:
      "Grateful for my family's endless love and support through thick and thin!",
    dateOfCreation: "15-11-2024",
    id: "671fb9df97351d93479",
    createdAt: "2024-11-15T10:15:20.000Z",
    updatedAt: "2024-11-15T10:15:20.000Z",
  },
  {
    title: "Great friends",
    description:
      "Thankful for the amazing friends who lift me up and make life joyful!",
    dateOfCreation: "12-11-2024",
    id: "671fb9df97351d93480",
    createdAt: "2024-11-12T08:30:15.000Z",
    updatedAt: "2024-11-12T08:30:15.000Z",
  },
  {
    title: "Job opportunity",
    description:
      "I feel immense gratitude for landing my dream internship earlier this year.",
    dateOfCreation: "10-08-2024",
    id: "671fb9df97351d93481",
    createdAt: "2024-08-10T14:45:30.000Z",
    updatedAt: "2024-08-10T14:45:30.000Z",
  },
  {
    title: "Access to learning resources",
    description:
      "Thankful for all the online courses and mentors helping me grow every day.",
    dateOfCreation: "05-09-2024",
    id: "671fb9df97351d93482",
    createdAt: "2024-09-05T11:00:50.000Z",
    updatedAt: "2024-09-05T11:00:50.000Z",
  },
];

const howToModalGratitudeListObj = {
  screenTitle: (
    <>
      Welcome to{" "}
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Gratitude List Screen!
      </span>{" "}
      😻
    </>
  ),
  screenHeader: (
    <div>
      {" "}
      Start and end your day with
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Gratitude!
      </span>{" "}
    </div>
  ),
  screenDescription: `A gratitude list is a simple yet profound way to reflect on the blessings in your life. It helps shift your focus from what's missing to what truly matters—whether it's the love of family, the beauty of nature, or small daily joys. By regularly acknowledging what you're thankful for, you cultivate a mindset of positivity and abundance, making room for more goodness to flow into your life.`,
  showCats: true,
  ctaBtnText: "Understood, Thanks and close.",
};

export {
  dummyGratitudeList,
  guestUserGratitudeList,
  howToModalGratitudeListObj,
};
