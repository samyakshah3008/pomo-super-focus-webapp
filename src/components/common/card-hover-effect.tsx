import { HoverEffect } from "../ui/card-hover-effect";

const CardHoverEffect = ({ cardItems, type }: any) => {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={cardItems} type={type} />
    </div>
  );
};

export default CardHoverEffect;
