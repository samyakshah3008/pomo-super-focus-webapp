import { cn } from "@/lib/utils";
import Image from "next/image";
import NotFoundCat from "../../../public/404-cat.png";

const FrameworkNotFound = ({ className }: any) => {
  return (
    <div className={cn("flex flex-col justify-center items-center", className)}>
      <Image src={NotFoundCat} alt="Not Found" className="w-64 h-64" />
      <h1 className="text-2xl font-bold mt-4">Framework Not Found</h1>
      <p className="text-gray-600 mt-2">
        The framework you're looking for does not exist.
      </p>
    </div>
  );
};

export default FrameworkNotFound;
