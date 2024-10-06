import { Button } from "@/components/ui/primitives/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/primitives/sheet";

const WorkingFrameworkSidesheet = ({ children, item }: any) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold text-gray-800">
            {item?.title}
          </SheetTitle>
          <SheetDescription>
            Review the framework below. Click 'Activate' if you want to use it.
          </SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col gap-4">
          {item?.rules?.map((rule: string, index: number) => (
            <li
              key={index}
              className="flex items-start space-x-2 text-gray-700"
            >
              <span className="text-sm">
                {" "}
                {index + 1}. {rule}
              </span>
            </li>
          ))}
        </ul>
        <SheetFooter className="flex-1 items-end">
          <SheetClose asChild>
            <Button className="w-full">Activate</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default WorkingFrameworkSidesheet;
