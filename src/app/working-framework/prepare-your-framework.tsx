import CardHoverEffect from "@/components/common/card-hover-effect";
import Image from "next/image";
import cookingChef from "../../../public/chef-cooking.png";
import { buildCustomFrameworkCard } from "./constants";

const PrepareYourFramework = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[300px] h-[300px]">
        <Image src={cookingChef} alt="cooking-chef" />
      </div>
      <p className="text-2xl font-bold text-center ">
        Prepare your own Custom Framework!
      </p>
      <CardHoverEffect cardItems={buildCustomFrameworkCard} />
    </div>
  );
};

export default PrepareYourFramework;
