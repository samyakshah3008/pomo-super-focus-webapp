import { Button } from "@/components/ui/primitives/button";
import Image from "next/image";
import NotFoundCat from "../../../public/404-cat.png";

const EmptyState = () => {
  return (
    <div className="flex flex-col gap-3 items-center mt-10">
      <div className="text-2xl underline text-center">My Gratitude List</div>
      <Image src={NotFoundCat} alt="notfound" className="w-40 h-40" />
      <div className="text-xl">
        Your gratitude list is empty, wirte your gratitudes today;)
      </div>
      <Button className="w-full">Add Gratitude</Button>
    </div>
  );
};

export default EmptyState;
