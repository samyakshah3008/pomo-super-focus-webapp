import Image from "next/image";
import Underconstruction from "../../../public/under-construction.png";

const Tasks = () => {
  return (
    <div className="w-[70%] m-auto flex flex-col items-center gap-5 justify-center">
      <Image
        src={Underconstruction}
        alt="under-construction"
        className="w-96 h-96"
      />
      <div className="text-2xl font-bold text-center">
        This feature is under construction, we will update you once we launch
        this. Meanwhile, we appreciate your patience:)
      </div>
    </div>
  );
};

export default Tasks;
