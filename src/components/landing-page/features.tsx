import Image from "next/image";
import BucketListImg from "../../../public/landing-page-features/bucket-list.png";
import ReportBugImg from "../../../public/landing-page-features/bug.png";
import DashboardImg from "../../../public/landing-page-features/dashboard.png";
import GoalsImg from "../../../public/landing-page-features/goals.png";
import GratitudeImg from "../../../public/landing-page-features/gratitude.png";
import HabitsImg from "../../../public/landing-page-features/habits.png";
import LeaderboardImg from "../../../public/landing-page-features/leaderboard.png";
import LogoutImg from "../../../public/landing-page-features/logout.png";
import SuperFocusImg from "../../../public/landing-page-features/super-focus.png";
import TasksImg from "../../../public/landing-page-features/tasks.png";
import MyLifeImg from "../../../public/landing-page-features/time-tracker.png";
import WorkingFrameworkImg from "../../../public/landing-page-features/working-framework.png";

const Features = () => {
  return (
    <div className="flex flex-col m-auto gap-5 p-4 w-full lg:w-[90%] mt-10">
      <div className="text-center text-blue-500 font-bold text-xl underline">
        Sneak Peak to our Features
      </div>
      <div className="flex flex-col gap-10 bg-gray-50 p-5">
        <div className="flex gap-5 items-center">
          <Image
            src={DashboardImg}
            alt="dashboard-img"
            width={500}
            height={500}
            className="flex-1 rounded-lg"
          />
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl font-bold">Witchy Dashboard</div>
            <div className="text-center w-[90%]">
              Witch lives here, she will daily greet you and let you how many
              days are left before year ends;)
            </div>
          </div>
        </div>

        {/* 2nd  */}

        <div className="flex gap-5 items-center">
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl font-bold">Pomodoro sessions!</div>
            <div className="text-center w-[90%]">
              Theme based highly configurable pomodoro sessions, for now enjoy
              the sessions with{" "}
              <span className="font-semibold">Babuchak Jethiya</span> as
              default, but we promise to bring new themes very soon;)
            </div>
          </div>

          <Image
            src={SuperFocusImg}
            alt="super-focus-img"
            width={500}
            height={500}
            className="flex-1 rounded-lg"
          />
        </div>

        <div className="flex gap-5 items-center">
          <Image
            src={TasksImg}
            alt="dashboard-img"
            width={500}
            height={500}
            className="flex-1 rounded-lg"
          />
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl font-bold">Eisenhower Matrix!</div>
            <div className="text-center w-[90%]">
              The Eisenhower Matrix method used by US President Dwight D.
              Eisenhower is based on the task evaluation using the criteria
              important/unimportant and urgent/not urgent.
            </div>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl font-bold">PomoSuperLeaders!</div>
            <div className="text-center w-[90%]">
              We rank leaders currently based on their focus time they give
              using our super timer to boost them!
            </div>
          </div>

          <Image
            src={LeaderboardImg}
            alt="dashboard-img"
            width={500}
            height={500}
            className="flex-1 rounded-lg"
          />
        </div>

        <div className="flex gap-5 items-center">
          <Image
            src={GoalsImg}
            alt="dashboard-img"
            width={500}
            height={500}
            className="flex-1 rounded-lg"
          />
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl font-bold">
              Himesh Madan's Goal setting
            </div>
            <div className="text-center w-[90%]">
              Break down your big dreams into smaller, actionable goals. Goal
              should have a clear title, description, and progress status. Stay
              on track and celebrate every milestone on your journey.
            </div>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl font-bold">We want to retain you!</div>
            <div className="text-center w-[90%]">
              Accept the humble request from bunch of cats!
            </div>
          </div>

          <Image
            src={LogoutImg}
            alt="dashboard-img"
            width={500}
            height={500}
            className="flex-1 rounded-lg"
          />
        </div>

        <div className="flex gap-5 items-center">
          <Image
            src={HabitsImg}
            alt="dashboard-img"
            width={500}
            height={500}
            className="flex-1 rounded-lg"
          />
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl font-bold">
              James Clear's Ultimate Atomic Habits!
            </div>
            <div className="text-center w-[90%]">
              Set habits in atomic habits way!
            </div>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl font-bold">
              Create your working framework!
            </div>
            <div className="text-center w-[90%]">
              Everyone wants to be successful, but it's the one who stay
              consistent with the working framework is able to make it to top 1%
              club.
            </div>
          </div>

          <Image
            src={WorkingFrameworkImg}
            alt="dashboard-img"
            width={500}
            height={500}
            className="flex-1 rounded-lg"
          />
        </div>

        <div className="flex gap-5 items-center">
          <Image
            src={GratitudeImg}
            alt="dashboard-img"
            width={500}
            height={500}
            className="flex-1 rounded-lg"
          />
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl font-bold">Review your Gratitudes!</div>
            <div className="text-center w-[90%]">
              For all the things which you have currently, someone is
              manifesting it to have them, be grateful for what you have. List
              down all your gratitudes as life moves fast.
            </div>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl font-bold">Your Bucket List!</div>
            <div className="text-center w-[90%]">
              Turning dreams into reality, one step at a time—whether in life or
              career.
            </div>
          </div>

          <Image
            src={BucketListImg}
            alt="dashboard-img"
            width={500}
            height={500}
            className="flex-1 rounded-lg"
          />
        </div>

        <div className="flex gap-5 items-center">
          <Image
            src={MyLifeImg}
            alt="dashboard-img"
            width={500}
            height={500}
            className="flex-1 rounded-lg"
          />
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl font-bold">Track your precious time!</div>
            <div className="text-center w-[90%]">
              Life moves very fast, set your personalized life span eg. 50years
              and see visual progress of how much span is left as per your age
              to get awared! 👀
            </div>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl font-bold">
              We promise to fix that Bug{" "}
            </div>
            <div className="text-center w-[90%]">
              Found a bug? please report us!
            </div>
          </div>

          <Image
            src={ReportBugImg}
            alt="dashboard-img"
            width={500}
            height={500}
            className="flex-1 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
