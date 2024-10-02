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
            <AccordionTrigger>{item?.title}</AccordionTrigger>
            <AccordionContent>{item?.content}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
