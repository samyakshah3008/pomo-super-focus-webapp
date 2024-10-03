import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/primitives/accordion";

export function AccordionBlocks({ accordionItems }: any) {
  if (!accordionItems?.length) {
    return null;
  }

  return (
    <Accordion type="single" collapsible className="w-[600px] ">
      {accordionItems?.map((item: any, id: any) => {
        return (
          <AccordionItem value={`item-${id}`} key={id}>
            <AccordionTrigger>
              <div className="flex gap-2">
                <div className="text-sm">{id + 1}. </div>
                <div
                  className={`text-sm ${item?.completed ? "line-through" : ""}`}
                >
                  {item?.title}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>{item?.content}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
