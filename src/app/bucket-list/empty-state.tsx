import { Button } from "@/components/ui/primitives/button";
import Image from "next/image";
import NotFoundCat from "../../../public/404-cat.png";

const EmptyState = () => {
  return (
    <div className="flex flex-col gap-3 items-center mt-10">
      <div className="text-2xl underline text-center">My Bucket List</div>
      <Image src={NotFoundCat} alt="notfound" className="w-40 h-40" />
      <div className="text-xl">Your bucket list is empty, fill it today;)</div>
      <Button className="w-full">Add Item</Button>
    </div>
  );
};

export default EmptyState;
