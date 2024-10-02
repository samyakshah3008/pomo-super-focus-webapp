import { HoverEffect } from "../ui/card-hover-effect";

const CardHoverEffect = ({ cardItems }: { cardItems: any }) => {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={cardItems} />
    </div>
  );
};

export default CardHoverEffect;
