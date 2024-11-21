"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/primitives/carousel";
import { useSuperFocus } from "@/context/super-focus";
import { useRef } from "react";
import { tmkocTheme } from "./theme";

const Header = () => {
  const plugin: any = useRef(
    Autoplay({ delay: 10000, stopOnInteraction: false })
  );

  const { activeState } = useSuperFocus();

  return (
    <div className="flex flex-col items-center">
      <Carousel plugins={[plugin.current]} className="w-full max-w-xs">
        <CarouselContent>
          {tmkocTheme[activeState].map((item: any, index: any) => (
            <CarouselItem key={index}>
              <div className="">
                <div className="m-auto">
                  <Image
                    className="w-[500px] h-[250px] object-contain"
                    src={item}
                    alt="goals checklist"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="text-3xl font-bold text-center mt-2">
        Bapuji is <span className="text-blue-500">watching</span> You, Babuchak!
      </div>
    </div>
  );
};

export default Header;
