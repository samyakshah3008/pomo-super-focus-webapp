const howToModalSelfReviewListObj = {
  screenTitle: (
    <>
      Welcome to{" "}
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        You vs You Screen!
      </span>{" "}
      😻
    </>
  ),
  screenHeader: (
    <div>
      {" "}
      It's always
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        You vs You!
      </span>{" "}
    </div>
  ),
  screenDescription: (
    <>
      You vs You is a daily reminder that the real competition is with yourself.
      It’s about striving to be better than you were yesterday, pushing past
      your own limits, and breaking through personal barriers. Whether it’s in
      fitness, personal growth, or any life goal, your biggest opponent is the
      version of you that doubts, procrastinates, or holds back. It’s all about
      self-improvement and leveling up—one step at a time.
      <br />
      <br />
      You can maintain a track of your yearly ups and downs events and review it
      anytime you want to!
    </>
  ),
  showCats: true,
  ctaBtnText:
    "Give a virtual cuddle to cats and close, cats have surprise for you as well!",
};

const guestUserSelfReviewItems = {
  2024: [
    {
      title: "Burn out due to over work at Internship!",
      description:
        "Yes, 2024 didn't start that well. I was meeting company's very important deadlines and have to deliver the project to the soonest! I got up health issues due to over work.",
      date: new Date("2024-01-12T18:30:00.000Z"),
      _id: "673c7f7581c82945abad85cd",
      createdAt: new Date("2024-11-19T12:07:17.517Z"),
      updatedAt: new Date("2024-11-19T12:07:17.517Z"),
    },
    {
      title: "RCB won WPL 2024!",
      description:
        "Most awaited life experience moment being an RCBian, I got to witness RCB women's team lifting maiden trophy! Best feeling ever!",
      date: new Date("2024-03-16T18:30:00.000Z"),
      _id: "673b71a31237deebe4e0ff4b",
      createdAt: new Date("2024-11-18T16:56:03.497Z"),
      updatedAt: new Date("2024-11-19T12:04:41.275Z"),
    },
    {
      title: "Won mechanical keyboard from hackthisfall!!",
      description:
        "Year end is turning out to be lucky for me, I won the discord 10k members giveaway where I will get a mechanical keyboard! ✨🙀 Loved it!!",
      date: new Date("2024-11-18T17:12:40.370Z"),
      _id: "673b758b1237deebe4e0ff6d",
      createdAt: new Date("2024-11-18T17:12:43.286Z"),
      updatedAt: new Date("2024-11-19T12:09:06.061Z"),
    },
  ],
};

export { guestUserSelfReviewItems, howToModalSelfReviewListObj };
