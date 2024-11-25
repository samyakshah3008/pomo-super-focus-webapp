import { BucketItem } from "@/components/(bucket-list)/data-table";

const dummyBucketList: BucketItem[] = [
  {
    id: "1",
    title: "Build a remote office",
    description: "Lorem Epsum",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Retire parents",
    description: "Lorem Epsum",
    isCompleted: false,
  },
  {
    id: "3",
    title: "Earn first income!",
    description: "Lorem Epsum",
    isCompleted: true,
  },
  {
    id: "4",
    title: "Watch Royal Challengers Bangalore winning IPL Trophy alive.",
    description: "Lorem Epsum",
    isCompleted: false,
  },
  {
    id: "5",
    title: "Selfie with Virat Kohli!",
    description: "Lorem Epsum",
    isCompleted: false,
  },
];

const howToModalBucketListObj = {
  screenTitle: (
    <>
      Welcome to{" "}
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Bucket List Screen!
      </span>{" "}
      😻
    </>
  ),
  screenHeader: (
    <div>
      {" "}
      C'mon! Fill your
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Bucket!
      </span>{" "}
    </div>
  ),
  screenDescription: (
    <>
      A bucket list is a powerful way to manifest your dreams, filled with life
      experiences that go beyond just career milestones. It’s about exploring
      new places, embracing personal growth, and cherishing moments that spark
      joy and fulfillment. From adventures that push your boundaries to quiet
      reflections that deepen your soul, your bucket list is a roadmap to a life
      well-lived.
      <br />
      <br />
      You can add as many items you want in your bucket and can also track which
      items are completed. Enjoy our tabular format of displaying your bucket
      list;)
    </>
  ),
  showCats: true,
  ctaBtnText: "Understood, Thanks and close.",
};

const guestUserBucketItems = [
  {
    title: "Retire Parents",
    description:
      "I strongly manifest to retire my parents someday very soon and give them all the treatment and life experiences which they gave me in growing me!",
    isCompleted: false,
    id: "671e15d62cd0374307c",
  },
  {
    id: "1",
    title: "Build a remote office",
    description:
      "I strongly manifest to build a remote office with setup I always dream for!",
    isCompleted: false,
  },

  {
    id: "3",
    title: "Earn first income!",
    description:
      "I want to get that first pay cheque, it's always a special feeling with own hard work!",
    isCompleted: true,
  },
  {
    id: "4",
    title: "Watch RCB winning IPL Trophy!",
    description: "Dream of every RCBian to see thier team lifting cup, alive!",
    isCompleted: false,
  },
  {
    id: "5",
    title: "Selfie with Virat Kohli!",
    description: "Dream of every VK fan! Been admiring him since my childhood!",
    isCompleted: false,
  },
];

export { dummyBucketList, guestUserBucketItems, howToModalBucketListObj };
