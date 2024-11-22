"use client";

import Lottie from "lottie-react";
import TomatoLottie from "../../../../public/tomato-lottie.json";
import { pomoSuperFocusTimerFeatures } from "../constants";

const MainContainer = () => {
  return (
    <main className="flex flex-col w-[80%] m-auto p-4">
      <article className="flex flex-col gap-16">
        {/* Lottie  */}
        <div className="w-[250px] h-[200px] mt-5 m-auto">
          <Lottie
            animationData={TomatoLottie}
            loop={true}
            width={250}
            height={200}
          />
        </div>
        {/* Section 1 */}
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold">
            What is <span className="text-blue-500 font-semibold"></span>{" "}
            <span className="text-blue-500 font-semibold">PomoSuperFocus</span>{" "}
            Timer?
          </h1>
          <div className="text-xl ">
            <span className=" font-semibold">PomoSuperFocus Timer</span> is the
            pomodoro timer with <span className=" font-semibold">flavor</span>.
            It's <span className=" font-semibold">highly configurable</span> and
            aesthetically pleasing. It{" "}
            <span className=" font-semibold">syncs music</span> with your study
            sessions to keep you focused and{" "}
            <span className=" font-semibold">eliminate distractions</span>. And
            the best part is we support various themes, starting off, we have
            added default theme as{" "}
            <span className="font-semibold">babuchak jethiya</span> and we
            promise to bring more themes very soon!
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold ">
            What is{" "}
            <span className="text-blue-500 font-semibold">Pomodoro</span>?
          </h1>
          <div className="text-xl ">
            Pomodoro is a type of tomato and a{" "}
            <span className=" font-semibold">
              popular productivity technique
            </span>
            . It can be useful for people who may get overwhelmed,
            procrastinate, or struggle to concentrate.
          </div>
          <div className="text-xl ">
            A <span className=" font-semibold">pomosuperfocus timer</span> is
            also a type of tomato. It's used to make salsa verde, and in this
            case, make you more productive.
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold ">
            PomoSuperFocus Timer{" "}
            <span className="text-blue-500 font-semibold">Features</span>
          </h1>
          <ul className="flex flex-col gap-2">
            {pomoSuperFocusTimerFeatures.map((feature, index) => (
              <li key={index} className="text-xl">
                {feature.icon} <span className="">{feature.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4 */}
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold ">
            How is it <span className="text-blue-500 font-semibold">Free</span>?
          </h1>
          <div className="text-xl ">
            <span className="font-bold">PomoSuperFocus</span> will be{" "}
            <span className="font-bold">
              free and open source software forever.
            </span>{" "}
            However, we encourage you to{" "}
            <span className="font-bold">feed stray animals</span> if you see
            them next time, or by spreading the word to your{" "}
            <span className="font-bold">friends or on socials.</span> This keeps
            PomoSuperFocus{" "}
            <span className="font-bold">free-to-use and free of ads.</span> You
            can support PomoSuperFocus by{" "}
            <span className="font-bold">starring the GitHub repo</span> as well:{" "}
            <a
              href="https://github.com/samyakshah3008/pomo-super-focus-webapp"
              target="_blank"
              className="text-blue-500 font-semibold"
            >
              github
            </a>
          </div>
        </div>
      </article>
    </main>
  );
};

export default MainContainer;
