const WelcomeContributors = () => {
  return (
    <div className="flex flex-col m-auto gap-5 p-4 w-full lg:w-[90%] mt-10">
      <div className="text-center text-blue-500 font-bold text-xl underline">
        Want to contribute? You are most welcome!
      </div>
      <div className="text-center">
        Please join our{" "}
        <a
          href="https://discord.gg/HmprpsBb"
          target="_blank"
          className="underline"
        >
          discord community server!
        </a>{" "}
      </div>
    </div>
  );
};

export default WelcomeContributors;
