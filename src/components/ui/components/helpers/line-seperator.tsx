export const ORLineSeperator = () => {
  return (
    <div className="relative flex items-center justify-center gap-x-4 py-2 text-xs uppercase">
      <div className="bg-border h-px flex-1" />
      <span className="text-muted-foreground bg-transparent">OR</span>
      <div className="bg-border h-px flex-1" />
    </div>
  );
};

export const LineSeperator = () => {
  return (
    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full" />
  );
};
