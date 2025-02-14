import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import PeerlistSupporters from "../../../public/pomo-super-focus-supporters-light.png";

const Awards = () => {
  return (
    <div className="flex flex-col m-auto gap-5 p-4 w-full lg:w-[90%] mt-10">
      <div className="text-center text-blue-500 font-bold text-xl underline">
        Awards and Recognization 💝
      </div>
      <div className="flex flex-col gap-10 p-5 justify-center items-center">
        <Image src={PeerlistSupporters} alt="peerlist" />
      </div>
      <Link
        target="_blank"
        className="text-green-500 font-semibold text-center text-xl underline flex gap-2 justify-center items-center"
        href="https://peerlist.io/samyakshah/project/pomosuperfocus"
      >
        View all supporters on Peerlist <IconArrowRight />
      </Link>
    </div>
  );
};

export default Awards;
