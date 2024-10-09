import { DotBackground } from "@/components/common/grid-and-dot-background";
import { Separator } from "@/components/ui/primitives/separator";

const Areas = () => {
  const sections = [""];
  return (
    <div>
      <DotBackground widthFull={true}>
        <div className="flex flex-col w-[100%] gap-10">
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

export default Areas;
