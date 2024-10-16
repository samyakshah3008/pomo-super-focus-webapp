import { IconCircleCheckFilled, IconDotsVertical } from "@tabler/icons-react";
import Image from "next/image";
import EmptyStateCatPumpkin from "../../../../public/empty-state-cat-pumpkin.png";

const HabitsCompleted = ({ habits }: any) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="p-4 font-bold">Habits Completed:</div>
      <div className="w-[90%] m-auto flex flex-col gap-10">
        {!habits?.length ? (
          <div className="flex flex-col items-center justify-center">
            <Image
              src={EmptyStateCatPumpkin}
              width={200}
              height={200}
              alt="empty-state"
            />
            <div className="font-semibold">
              Complete a habit to see visual progress here;)
            </div>
          </div>
        ) : (
          habits?.map((habit: any, idx: any) => (
            <div
              key={idx}
              className="flex items-center gap-4 opacity-50 cursor-not-allowed"
            >
              <IconCircleCheckFilled size={20} className="text-green-500" />

              <div className="flex-1 flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-gray-500">{habit?.title}</div>
                  <div className="flex gap-2">
                    {habit?.categories?.map((category: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className="text-sm bg-blue-100 border-blue-300 p-1 rounded-md text-gray-500"
                        >
                          {category}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <IconDotsVertical size={20} className="text-gray-400" />
              </div>
            </div>
          ))
        )}
        {}
      </div>
    </div>
  );
};

export default HabitsCompleted;
