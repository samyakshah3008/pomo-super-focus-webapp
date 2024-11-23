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
