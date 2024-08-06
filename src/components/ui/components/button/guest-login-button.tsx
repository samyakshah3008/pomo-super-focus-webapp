import { IconCat } from "@tabler/icons-react";
import { BottomGradient } from "../helpers/gradient";

export const GuestLoginButton = ({
  type,
  text,
  disabled,
  onClick = () => {},
}: any) => {
  return (
    <button
      className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-white dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <IconCat className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
        {text || "Guest Login"}
      </span>
      {!disabled ? <BottomGradient /> : null}
    </button>
  );
};
