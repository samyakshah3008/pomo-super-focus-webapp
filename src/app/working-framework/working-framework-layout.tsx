import { DotBackground } from "@/components/common/grid-and-dot-background";
import { Separator } from "@/components/ui/primitives/separator";
import CustomTemplate from "./custom-template";
import Header from "./header";
import Templates from "./templates";

const WorkingFrameworkLayout = () => {
  const sections = [<Header />, <Templates />, <CustomTemplate />];
  return (
    <div>
      <DotBackground widthFull={true}>
        <div className="flex flex-col w-[80%] gap-10 ">
          {sections.map((section: any, id: any) => {
            return (
              <>
                {section}
                {sections?.length !== id + 1 ? <Separator /> : null}
              </>
            );
          })}
        </div>
      </DotBackground>
    </div>
  );
};

export default WorkingFrameworkLayout;
