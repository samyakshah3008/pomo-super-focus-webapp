import ProgressWrapper from "@/components/(super-focus)/progress-wrapper";

const Statistics = () => {
  let progressPercentage = 89;
  return (
    <div className="flex flex-col gap-4 items-center">
      <ProgressWrapper
        progress={progressPercentage > 100 ? 100 : progressPercentage}
      >
        <div className="text-3xl font-bold tracking-tighter">
          {" "}
          {progressPercentage} %
        </div>
        <div className="text-sm text-muted-foreground">Total Progress</div>
      </ProgressWrapper>
      <div className="flex flex-col gap-1 items-center">
        <div className="text-sm text-muted-foreground">7 best streaks</div>
        <div className="text-sm text-muted-foreground">10 perfect days</div>
        <a
          href="/habits-scorecard/statistics"
          className="underline text-sm text-muted-foreground"
        >
          View detailed statistics
        </a>
      </div>
    </div>
  );
};

export default Statistics;
