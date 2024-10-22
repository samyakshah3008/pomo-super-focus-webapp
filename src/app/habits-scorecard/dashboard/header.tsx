"use client";

import { useSelector } from "react-redux";

// type Word = {
//   text: string;
//   className?: string;
// };

const Header = () => {
  const currentUser = useSelector((state: any) => state?.user);
  //   const [words, setWords] = useState<Word[]>([]);

  //   useEffect(() => {
  //     if (!currentUser?.pomoSuperUser) return;
  //     setWords([
  //       {
  //         text: "Hi",
  //       },
  //       {
  //         text: `Chief,`,
  //         className: "text-blue-500 dark:text-blue-500",
  //       },

  //       {
  //         text: `what would you`,
  //       },
  //       {
  //         text: `like`,
  //       },
  //       {
  //         text: `to do today?`,
  //       },
  //     ]);
  //   }, [currentUser?.pomoSuperUser]);

  //   if (!currentUser?.pomoSuperUser || !words?.length) {
  //     return null;
  //   }

  return (
    <div className="flex flex-col items-center">
      <div></div>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
        Your life is too precious, don't waste a single second towards
        meaningless things. 👀
      </p>
    </div>
  );
};

export default Header;
